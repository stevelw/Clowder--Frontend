import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Cat from '../Interfaces/Cat';
import Coordinates from '../Types/Coordinates';
import createMap from '../createMap';
import axios from 'axios';

export default function MapContainer() {
	const mapContainer = useRef<HTMLDivElement | null>(null);
	const map = useRef<mapboxgl.Map | null>(null);
	const [cats, setCats] = useState<Cat[]>([]);
	const home: Coordinates = [-1.45054, 53.80619];

	useEffect(() => {
		axios
			.get('/api/users/cm3op7iwu0000jrcqa60tc9kv/devices')
			.then((response: any) => {
				// Needs better type
				const updatedCats = response.data.data.map((device: any) => {
					// Needs better type
					// Black image for now as no there's images column
					return {
						name: device.name,
						image:
							'https://png.pngtree.com/png-clipart/20201029/ourmid/pngtree-circle-clipart-black-circle-png-image_2381996.jpg',
						history: device.location_history,
					};
				});
				setCats(updatedCats);
			});
	}, []);

	useEffect(() => createMap(mapContainer, home, cats, map), [cats]);

	return <div style={{ width: '800px', height: '550px' }} ref={mapContainer} />;
}
