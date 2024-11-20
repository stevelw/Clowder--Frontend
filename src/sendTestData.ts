import axios from 'axios';

function sendTestData(deviceUuid: string): void {
	const locationHistory = [
		{ lat: -1.447, lon: 53.8035 },
		{ lat: -1.4485, lon: 53.804 },
		{ lat: -1.449, lon: 53.8045 },
		{ lat: -1.45, lon: 53.805 },
		{ lat: -1.451106, lon: 53.806201 },
	];

	locationHistory.forEach((location) => {
		axios
			.patch(
				'/api/devices/update',
				{ lat: location.lat, lon: location.lon },
				{ headers: { Authorization: `${deviceUuid}` } }
			)
			.catch((error) => {
				console.log(error);
			});
	});
}

sendTestData('5804f943-4aaf-432f-83d8-62028827ac57'); // Run file to give test data
