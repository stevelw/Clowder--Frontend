import React, { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Cat from '../Types/Cat';
import Coordinates from '../Types/Coordinates';
import createMap from '../createMap';
import Device from '../Types/Device';
import CatFromAxios from '../Types/CatFromAxios';
import { getCatsForUser, getCatsNear, getDevicesForUser } from '../network';

export default function MapContainer() {
	const mapContainer = useRef<HTMLDivElement | null>(null);
	const map = useRef<mapboxgl.Map | null>(null);
	const [catsMapInfo, setCatsMapInfo] = useState<Cat[]>([]);
	const home: Coordinates = [53.80619, -1.45054];
	const [userId, setUserId] = useState<string>('cm3op7iwu0000jrcqa60tc9kv'); // Test user id for now as no global user variable

	useEffect(() => {
		Promise.all([getDevicesForUser(userId), getCatsForUser(userId)])
			.then(([devices, cats]: [Device[], CatFromAxios[]]) => {
				const ownedCats: Cat[] = devices.map((device) => {
					const catWearingDevice = cats.find(
						(aCat) => (aCat.device_id = device.id)
					);
					if (!catWearingDevice)
						throw new Error('No cat found for that device');
					return {
						id: catWearingDevice.id,
						name: catWearingDevice.name,
						image: catWearingDevice.picture_url,
						history: device.location_history.slice(-205),
						owned: true,
					};
				});
				return Promise.all([
					ownedCats,
					...ownedCats.map(({ id }) => getCatsNear(id)),
				]);
			})
			.then(([ownedCats, ...nearbyCats]) => {
				const dedupedNearbyCats: Cat[] = Array.from(
					new Set(nearbyCats.flat())
				).map(({ cat: { id, name, picture_url }, last_location }) => {
					return {
						id,
						name,
						image: picture_url,
						history: [last_location],
						owned: false,
					};
				});
				setCatsMapInfo([...ownedCats, ...dedupedNearbyCats]);
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
