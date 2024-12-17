import React, { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Cat from '../Types/Cat';
import Coordinates from '../Types/Coordinates';
import createMap from '../createMap';
import axios from 'axios';
import Device from '../Types/Device';
import CatFromAxios from '../Types/CatFromAxios';

export default function MapContainer() {
	const mapContainer = useRef<HTMLDivElement | null>(null);
	const map = useRef<mapboxgl.Map | null>(null);
	const [catsMapInfo, setCatsMapInfo] = useState<Cat[]>([]);
	const home: Coordinates = [53.80619, -1.45054];
	const [userId, setUserId] = useState<string>('cm3op7iwu0000jrcqa60tc9kv'); // Test user id for now as no global user variable

	useEffect(() => {
		Promise.all([
			axios.get(`http://localhost:9090/api/users/${userId}/devices`),
			axios.get(`http://localhost:9090/api/users/${userId}/cats`),
		])
			.then(
				([
					{
						data: { data: deviceData },
					},
					{
						data: { data: catData },
					},
				]) => {
					const catsHistory: { lat: number; lon: number }[][] = deviceData.map(
						(device: Device) => device.location_history.slice(-205) // If it updates every 7 mins this should be the last 24 hours
					);
					const catsNameAndImage: {
						id: string;
						name: string;
						image: string;
					}[] = catData.map((cat: CatFromAxios) => ({
						id: cat.id,
						name: cat.name,
						image: cat.picture_url,
					}));

					const fullCatsMapInfo: Cat[] = catsHistory.map(
						(history, index: number) => ({
							id: catsNameAndImage[index].id,
							name: catsNameAndImage[index].name,
							image: catsNameAndImage[index].image,
							history,
						})
					);
					setCatsMapInfo(fullCatsMapInfo);
				}
			)
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(
		() => createMap(mapContainer, home, catsMapInfo, map),
		[catsMapInfo]
	);

	return <div className="w-screen h-screen" ref={mapContainer} />;
}
