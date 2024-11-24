import axios from 'axios';
import CatProfile from './Components/CatProfile';

const network = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_HOST,
	headers: {
		authorization: process.env.REACT_APP_LOGGED_IN_USER,
	},
});

const loggedInUser = 'cm3op7iwu0000jrcqa60tc9kv'; // For demonstration purposes

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
	return network
		.get(`/api/users/${loggedInUser}/cats`)
		.then(({ data: { data: catProfiles } }) => {
			return catProfiles;
		})
		.catch((error) => {
			console.log(error);
			return [];
		});
};

export { getCatsProfiles, type Cat };
