import React, { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Cat from '../Types/Cat';
import Coordinates from '../Types/Coordinates';
import createMap from '../createMap';
import Device from '../Types/Device';
import CatFromAxios from '../Types/CatFromAxios';
import { getCatsForUser, getDevicesForUser } from '../network';

export default function MapContainer() {
	const mapContainer = useRef<HTMLDivElement | null>(null);
	const map = useRef<mapboxgl.Map | null>(null);
	const [catsMapInfo, setCatsMapInfo] = useState<Cat[]>([]);
	const home: Coordinates = [53.80619, -1.45054];
	const [userId, setUserId] = useState<string>('cm3op7iwu0000jrcqa60tc9kv'); // Test user id for now as no global user variable

	useEffect(() => {
		Promise.all([getDevicesForUser(userId), getCatsForUser(userId)])
			.then(([devices, cats]: [Device[], CatFromAxios[]]) => {
				setCatsMapInfo(
					devices.map((device) => {
						const theCat = cats.find((aCat) => (aCat.device_id = device.id));
						if (!theCat) throw new Error('No cat found for that device');
						return {
							id: theCat.id,
							name: theCat.name,
							image: theCat.picture_url,
							history: device.location_history.slice(-205),
						};
					})
				);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		createMap(mapContainer, home, catsMapInfo, map);
	}, [catsMapInfo]);

	return <div className="w-screen h-screen" ref={mapContainer} />;
}
