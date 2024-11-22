import axios, { AxiosResponse } from 'axios';

const network = axios.create({
	baseURL: process.env.BACKEND_HOST,
});

export function updateUser(data: {
	requested_privacy?: string;
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
