import axios from 'axios';
import CatProfile from './Components/CatProfile';

const network = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_HOST,
	headers: {
		authorization: process.env.REACT_APP_LOGGED_IN_USER,
	},
});

export interface Cat {
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

export const getCatsProfiles = (id: string): Promise<void | Cat[]> => {
	return network
		.get(`/api/users/${id}/cats`)
		.then(({ data: { data: catProfiles } }) => {
			return catProfiles;
		})
		.catch((error) => {
			console.log(error);
			return [];
		});
};

export const deleteCatProfile = (id: string): Promise<void | Cat[]> => {
	return network
		.delete(`/api/users/${id}/cats`)
		.then(() => {
			console.log('Cats profile has been deleted');
		})
		.catch((error) => {
			console.log('Cats profile hasnt been deleted');
		});
};

export const updateCatProfile = (
	updatedProfile: Cat
): Promise<void | Cat[]> => {
	return network
		.post(`/api/cats/update`, updatedProfile)
		.then(({ data: { data: updatedProfile } }) => {
			return updatedProfile;
		})
		.catch((error) => {
			console.log(error);
			return [];
		});
};
