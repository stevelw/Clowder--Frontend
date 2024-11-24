import axios from 'axios';

interface Cat {
	id: string;
	name: string;
	description: string;
	pictureurl: string;
	device_id: string;
	owner_id: string;
	updated_at: string;
	created_at: string;
	deleted_at: null;
}

const getCatsProfiles = (): Promise<void | Cat[]> => {
	return Promise.resolve([
		{
			id: '01',
			name: 'Snow',
			description: 'a playful cat',
			pictureurl: '123',
			device_id: '234',
			owner_id: 'id_50',
			updated_at: '2024-09-10T10:00:00Z',
			created_at: '2024-01-01T10:00:00Z',
			deleted_at: null,
		},
		{
			id: '02',
			name: 'happy',
			description: 'a cutie cat',
			pictureurl: '321',
			device_id: '876',
			owner_id: 'id_51',
			updated_at: '2023-02-10T12:00:00Z',
			created_at: '2023-04-09T15:00:00Z',
			deleted_at: null,
		},
	]);
};

// const getCatsProfiles = (): Promise<void | CatProfile[]> => {
// 	return axios
// 		.get<CatProfile[]>(
// 			'http://localhost:9090/api/users/cm3op7iwu0000jrcqa60tc9kv/cats'
// 		)
// 		.then((response) => {
// 			return response.data;
// 		})
// 		.catch((error) => {
// 			console.log("That's an error:", error);
// 		});
// };

export { getCatsProfiles, type Cat };
