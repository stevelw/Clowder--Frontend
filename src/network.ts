import axios, { AxiosResponse } from 'axios';
import { User } from './Types/User';

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
