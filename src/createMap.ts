import mapboxgl from 'mapbox-gl';
import Cat from './Interfaces/Cat';

export default function map(
	mapContainer: React.RefObject<HTMLDivElement | null>,
	home: [number, number],
	cats: Cat[],
	map: React.MutableRefObject<mapboxgl.Map | null>
) {
	const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN; // My mapbox access token

	if (!accessToken)
		throw new Error(
			'Mapbox access token is not defined in the environment variables'
		);

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
			console.log(cat.history);

			const historyFormatted = cat.history.map((coord) => [
				coord.lon,
				coord.lat,
			]);

			if (historyFormatted.length > 0) {
				const markerElement = document.createElement('div'); // Creates cat icon
				markerElement.style.width = '50px';
				markerElement.style.height = '50px';
				markerElement.style.backgroundImage = `url(${cat.image})`;
				markerElement.style.backgroundSize = 'cover'; // Sets icon ontop of map properly

				console.log('Marker element styles:', markerElement.style);

				const popup = new mapboxgl.Popup({ offset: 25 }) // Creates popup for marker
					.setHTML(`<h3>${cat.name}</h3>`); // Popup with cat's name

				new mapboxgl.Marker({ element: markerElement }) // Adds cat icon
					.setLngLat([
						// Icon location
						historyFormatted[historyFormatted.length - 1][0],
						historyFormatted[historyFormatted.length - 1][1],
					])
					.addTo(map.current!) // Adds marker to map
					.setPopup(popup); // Adds popup to marker

				const catPathGeoJSON: GeoJSON.FeatureCollection = {
					// GeoJSON object with the cat's path
					type: 'FeatureCollection',
					features: [
						{
							type: 'Feature',
							geometry: {
								type: 'LineString',
								coordinates: historyFormatted, // Uses catHistory as the line's coordinates
							},
							properties: {},
						},
					],
				};

				map.current!.on('load', () => {
					if (map.current!.getLayer(`cat-path-${cat.name}`)) {
						map.current!.removeLayer(`cat-path-${cat.name}`);
						map.current!.removeSource(`cat-path-${cat.name}`);
					} // It tries to add layer again on re-render so need to delete it first

					map.current!.addLayer({
						// Adds line of where cat has been based off GeoJSON data
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
			}
		});
	}
}
