import Coordinates from '../Types/Coordinates';
import React, { useState } from 'react';
import axios from 'axios';

export default function Login({
	setUser,
	setHome,
}: {
	setUser: React.Dispatch<React.SetStateAction<string | null>>;
	setHome: React.Dispatch<React.SetStateAction<Coordinates | null>>;
}) {
	const [username, setUsername] = useState<string>('');
	const [latitude, setLatitude] = useState<string>('');
	const [longitude, setLongitude] = useState<string>('');

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		const lat = parseFloat(latitude);
		const lon = parseFloat(longitude);

		if (!username) {
			alert('Please enter a username.');
			return;
		}

		if (
			isNaN(lat) ||
			isNaN(lon) ||
			lat < -90 ||
			lat > 90 ||
			lon < -180 ||
			lon > 180
		) {
			alert('Please enter valid numbers for latitude and longitude.');
			return;
		}

		axios
			.post('http://localhost:9090/api/users', username) // For when the endpoint gets setup
			.catch((err) => alert(err));

		localStorage.setItem('username', username);
		localStorage.setItem('home', JSON.stringify([lat, lon]));

		setUser(username);
		setHome([lat, lon]);
	}

	return (
		<form onSubmit={handleSubmit}>
			<label>User:</label>
			<input
				type="text"
				name="username"
				placeholder="Username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<br />
			<label>Home Location:</label>
			<input
				type="text"
				name="latitude"
				placeholder="Latitude"
				value={latitude}
				onChange={(e) => setLatitude(e.target.value)}
			/>
			<input
				type="text"
				name="longitude"
				placeholder="Longitude"
				value={longitude}
				onChange={(e) => setLongitude(e.target.value)}
			/>
			<br />

			<button type="submit">Create User</button>
		</form>
	);
}
