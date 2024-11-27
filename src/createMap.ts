import mapboxgl from 'mapbox-gl';
import Cat from './Types/Cat';
import Coordinates from './Types/Coordinates';

export default function annotateMap(
	mapContainer: React.RefObject<HTMLDivElement | null>,
	home: Coordinates,
	cats: Cat[],
	map: React.MutableRefObject<mapboxgl.Map | null>
): void {
	if (!process.env.REACT_APP_MAPBOX_ACCESS_TOKEN)
		throw new Error(
			'Mapbox access token is not defined in the environment variables'
		);

	mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

	if (mapContainer.current) {
		// Check if mapContainer is not null
		map.current = new mapboxgl.Map({
			// Creates new map
			container: mapContainer.current, // Adds map to map container
			center: {
				lat: home[0],
				lon: home[1],
			}, // Sets map center to home location. LngLatLike takes array items in non-standard order when provided an array. Use Object instead to avoid confusion.
			zoom: 15,
		});
	}

	if (map.current) {
		cats.forEach((cat) => {
			const historyFormatted: Coordinates[] = cat.history.map((coord) => [
				coord.lat,
				coord.lon,
			]);

			if (historyFormatted.length > 0) {
				drawCat(cat, historyFormatted, map);
			}
		});
	}
}
function drawCat(
	cat: Cat,
	historyFormatted: Coordinates[],
	map: React.MutableRefObject<mapboxgl.Map | null>
) {
	drawCatPopup(cat, historyFormatted, map);

	drawCatPath(historyFormatted, map, cat);
}

function drawCatPath(
	historyFormatted: Coordinates[],
	map: React.MutableRefObject<mapboxgl.Map | null>,
	cat: Cat
) {
	const catPathGeoJSON: GeoJSON.FeatureCollection = {
		type: 'FeatureCollection',
		features: [
			{
				type: 'Feature',
				geometry: {
					type: 'LineString',
					coordinates: historyFormatted.map(([lat, lon]) => [lon, lat]), // GeoJSON takes array items in non-standard order of [lon, lat]
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
			id: `cat-path-${cat.name}`,
			type: 'line',
			source: {
				type: 'geojson',
				data: catPathGeoJSON,
			},
			paint: {
				'line-color': '#FF0000',
				'line-width': 3,
			},
		});
	});
}

function drawCatPopup(
	cat: Cat,
	historyFormatted: Coordinates[],
	map: React.MutableRefObject<mapboxgl.Map | null>
) {
	const catLocation: Coordinates | undefined = historyFormatted.at(-1);
	if (catLocation) {
		const catIcon = document.createElement('div');
		catIcon.style.width = '50px';
		catIcon.style.height = '50px';
		catIcon.style.backgroundImage = `url(${cat.image})`;
		catIcon.style.backgroundSize = 'cover'; // Sets icon ontop of map properly

		const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
			`<header>${cat.name}</header>`
		);

		new mapboxgl.Marker({ element: catIcon })
			.setLngLat({
				// Type LngLatLike takes array items in non-standard order when provided an array. Use Object instead to avoid confusion.
				lat: catLocation[0],
				lon: catLocation[1],
			})
			.addTo(map.current!)
			.setPopup(popup);
	}
}
