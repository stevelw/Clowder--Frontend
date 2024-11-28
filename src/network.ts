import axios, { AxiosResponse } from 'axios';
import { User } from './Types/User';
import CatFromAxios from './Interfaces/CatFromAxios';

const network = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_HOST,
	headers: {
		authorization: process.env.REACT_APP_LOGGED_IN_USER,
	},
});

export function getUser(): Promise<User> {
	return network
		.get('/api/users/settings')
		.then((res: AxiosResponse) => {
			return res.data.data;
		})
		.catch((err: Error) => {
			console.log(`Network error: ${err.message}`);
			return {};
		});
}

export function updateUser(data: User): Promise<User> {
	return network
		.patch('/api/users/settings', data)
		.then((res: AxiosResponse) => {
			return res.data.data;
		})
		.catch((err: Error) => {
			console.log(`Network error: ${err.message}`);
			return {};
		});
}

export const getCatsProfiles = (id: string): Promise<void | CatFromAxios[]> => {
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

export const deleteCatProfile = (
	id: string
): Promise<void | CatFromAxios[]> => {
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
	updatedProfile: CatFromAxios
): Promise<void | CatFromAxios[]> => {
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

export function registerUser(
	username: string
): Promise<null | { username: string }> {
	return network
		.post('/api/users', {
			username,
		})
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			console.log(err);
			return null;
		});
}
