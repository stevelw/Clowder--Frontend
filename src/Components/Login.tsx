import React, { useContext, useState } from 'react';
import { UserContext } from '../Contexts/UserContext';

export default function Login() {
	const [formUsername, setFormUsername] = useState<string>('');
	const [latitude, setLatitude] = useState<string>('');
	const [longitude, setLongitude] = useState<string>('');

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
	}

	return (
		<form onSubmit={handleSubmit}>
			<label>
				User
				<input
					type="text"
					name="username"
					placeholder="Username"
					value={formUsername}
					onChange={({ target: { value } }) => setFormUsername(value)}
				/>
			</label>
			<p>Home Location</p>
			<label>
				Lat.
				<input
					type="text"
					name="latitude"
					placeholder="Latitude"
					value={latitude}
					onChange={({ target: { value } }) => setLatitude(value)}
				/>
			</label>
			<label>
				Long.
				<input
					type="text"
					name="longitude"
					placeholder="Longitude"
					value={longitude}
					onChange={({ target: { value } }) => setLongitude(value)}
				/>
			</label>
			<button type="submit">Create User</button>
		</form>
	);
}
