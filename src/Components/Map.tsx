import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Cat from '../Interfaces/Cat';
import Coordinates from '../Types/Coordinates';

export default function Map({ cats }: { cats: Cat[] }) {
	const mapContainer = useRef<HTMLDivElement | null>(null); //  Lets you create a reference to a DOM element that stays between renders without triggering a re-render
	const map = useRef<mapboxgl.Map | null>(null);

	const home: Coordinates = [-1.45054, 53.80619];

	useEffect(() => {
		const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN; // My mapbox access token

		if (!accessToken) {
			throw new Error(
				'Mapbox access token is not defined in the environment variables'
			);
		}

		mapboxgl.accessToken = accessToken;
		if (mapContainer.current) {
			// Check if mapContainer is not null
			map.current = new mapboxgl.Map({
				// Creates new map
				container: mapContainer.current, // Adds map to map container
				center: home, // Sets map center to home location
				zoom: 15,
			});
		}

		if (map.current) {
			cats.forEach((cat) => {
				const markerElement = document.createElement('div'); // Creates cat icon
				markerElement.style.width = '50px';
				markerElement.style.height = '50px';
				markerElement.style.backgroundImage = `url(${cat.image})`;
				markerElement.style.backgroundSize = 'cover'; // Sets icon ontop of map properly

				const popup = new mapboxgl.Popup({ offset: 25 }) // Creates popup for marker
					.setHTML(`<h3>${cat.name}</h3>`); // Popup with cat's name

				new mapboxgl.Marker({ element: markerElement }) // Adds cat icon
					.setLngLat(cat.history[cat.history.length - 1]) // Icon location
					.addTo(map.current!) // Adds marker to map
					.setPopup(popup); // Adds popup to marker

				const catPathGeoJSON: GeoJSON.FeatureCollection = {
					type: 'FeatureCollection',
					features: [
						{
							type: 'Feature',
							geometry: {
								type: 'LineString',
								coordinates: cat.history, // Uses catHistory as the line's coordinates
							},
							properties: {},
						},
					],
				}; // GeoJSON object with the cat's path

				map.current!.on('load', () => {
					// Adds line of where cat has been based off GeoJSON data
					if (map.current!.getLayer(`cat-path-${cat.name}`)) {
						map.current!.removeLayer(`cat-path-${cat.name}`);
						map.current!.removeSource(`cat-path-${cat.name}`);
					} // It tries to add layer again on re-render so need to delete it first

					map.current!.addLayer({
						// Adds layer to map
						id: `cat-path-${cat.name}`,
						type: 'line', // Specifies layer type
						source: {
							type: 'geojson',
							data: catPathGeoJSON, // Data the GeoJSON
						},
						paint: {
							'line-color': '#FF0000',
							'line-width': 3,
						},
					});
				});
			});
		}
	}, [cats]);

	return <div style={{ width: '800px', height: '550px' }} ref={mapContainer} />;
}
