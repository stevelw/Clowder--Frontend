import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Cat from '../Interfaces/Cat';
import Coordinates from '../Types/Coordinates';
import createMap from '../createMap';
import axios from 'axios';
import Device from '../Interfaces/Device';
import CatFromAxios from '../Interfaces/CatFromAxios';

export default function MapContainer() {
	const mapContainer = useRef<HTMLDivElement | null>(null);
	const map = useRef<mapboxgl.Map | null>(null);
	const [catsMapInfo, setCatsMapInfo] = useState<Cat[]>([]);
	const home: Coordinates = [-1.45054, 53.80619];
	const [userId, setUserId] = useState<string>('cm3op7iwu0000jrcqa60tc9kv'); // Test user id for now as no global user variable

	useEffect(() => {
		Promise.all([
			axios.get(`http://localhost:9090/api/users/${userId}/devices`),
			axios.get(`http://localhost:9090/api/users/${userId}/cats`),
		]).then(([devices, cats]) => {
			const catsHistory: { lat: number; lon: number }[][] =
				devices.data.data.map(
					(device: Device) => device.location_history.slice(-205) // If it updates every 7 mins this should be the last 24 hours
				);
			const catsNameAndImage: { name: string; image: string }[] =
				cats.data.data.map((cat: CatFromAxios) => ({
					name: cat.name,
					image: cat.picture_url,
				}));

			const fullCatsMapInfo: Cat[] = catsHistory.map(
				(history, index: number) => ({
					name: catsNameAndImage[index].name,
					image: catsNameAndImage[index].image,
					history,
				})
			);
			setCatsMapInfo(fullCatsMapInfo);
		});
	}, []);

	useEffect(
		() => createMap(mapContainer, home, catsMapInfo, map),
		[catsMapInfo]
	);

	return <div className="w-full max-w-screen-lg h-4/5" ref={mapContainer} />;
}
