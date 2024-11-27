import React, { useContext, useState } from 'react';
import { UserContext } from '../Contexts/UserContext';
import { registerUser } from '../network';

export default function Login() {
	const { setUsername, setHome } = useContext(UserContext);
	const [formUsername, setFormUsername] = useState<string>('');
	const [latitude, setLatitude] = useState<string>('');
	const [longitude, setLongitude] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string>('');

	function isValidLat(input: string): boolean {
		const value = parseFloat(input);
		return !isNaN(value) && value >= -90 && value <= 90;
	}

	function isValidLong(input: string): boolean {
		const value = parseFloat(input);
		return !isNaN(value) && value >= -180 && value <= 180;
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		return registerUser(formUsername).then(
			(newUser: null | { username: string }) => {
				if (!newUser) {
					setErrorMessage(
						'Sorry, there was an error creating an account. Please try again later.'
					);
				} else {
					setUsername(newUser.username);
					setHome([parseFloat(latitude), parseFloat(longitude)]);
				}
			}
		);
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
			{errorMessage && <p>{errorMessage}</p>}
			<button
				type="submit"
				disabled={
					!formUsername || !isValidLat(latitude) || !isValidLong(longitude)
				}
			>
				Create User
			</button>
		</form>
	);
}
