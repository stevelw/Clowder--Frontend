import Coordinates from '../Types/Coordinates';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../Contexts/UserContext';

export default function Login() {
	const { setUsername, setHome } = useContext(UserContext);
	const [formUsername, setFormUsername] = useState<string>('');
	const [latitude, setLatitude] = useState<string>('');
	const [longitude, setLongitude] = useState<string>('');

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		const lat = parseFloat(latitude);
		const lon = parseFloat(longitude);

		if (!formUsername) {
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

		//axios.post('http://localhost:9090/api/users', username) // For when the endpoint gets setup
		// 	.catch(err => alert(err));  // If the the user(name) is not in the databse you won't be able to make a cat profile unless we make set ones to pick from

		setUsername(formUsername);
		setHome([lat, lon]);

		localStorage.setItem('username', formUsername);
		localStorage.setItem('home', JSON.stringify([lat, lon]));
	}

	return (
		<form onSubmit={handleSubmit}>
			<label>User:</label>
			<input
				type="text"
				name="username"
				placeholder="Username"
				value={formUsername}
				onChange={(e) => setFormUsername(e.target.value)}
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
