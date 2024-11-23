import axios, { AxiosResponse } from 'axios';
import { Privacy } from './Types/Privacy';

const network = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_HOST,
});

export function updateUser(data: {
	requested_privacy?: Privacy;
}): Promise<Object> {
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
