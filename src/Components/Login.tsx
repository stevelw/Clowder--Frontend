import React, { useContext, useState } from 'react';
import { UserContext } from '../Contexts/UserContext';
// import { registerUser } from '../network';
import FormInput from './Styling/FormInput';
import H2 from './Styling/H2';
import Button from './Styling/Button';
import ModalPopover from './Styling/ModalPopover';

export default function Login() {
	const { setUsername, setUserId, setHome } = useContext(UserContext);
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

		// For demo

		setUsername('user1');
		setUserId('cm3op7iwu0000jrcqa60tc9kv');
		// return registerUser(formUsername).then(
		// 	(newUser: null | { username: string }) => {
		// 		if (!newUser) {
		// 			setErrorMessage(
		// 				'Sorry, there was an error creating an account. Please try again later.'
		// 			);
		// 		} else {
		// 			setUsername(newUser.username);
		// 			setHome([parseFloat(latitude), parseFloat(longitude)]);
		// 		}
		// 	}
		// );
	}

	return (
		<>
			<ModalPopover>
				<H2>Login</H2>
				<form onSubmit={handleSubmit}>
					<FormInput
						label="User"
						type="text"
						name="username"
						placeholder="Username"
						value={formUsername}
						onChange={({ target: { value } }) => setFormUsername(value)}
					/>
					<section>
						<H2>Home Location</H2>
						<FormInput
							label="Lat."
							type="text"
							name="latitude"
							placeholder="Latitude"
							value={latitude}
							onChange={({ target: { value } }) => setLatitude(value)}
						/>
						<FormInput
							label="Long."
							type="text"
							name="longitude"
							placeholder="Longitude"
							value={longitude}
							onChange={({ target: { value } }) => setLongitude(value)}
						/>
					</section>
					{errorMessage && <p>{errorMessage}</p>}
					<Button
						type="submit"
						disabled={
							!formUsername || !isValidLat(latitude) || !isValidLong(longitude)
						}
					>
						Create User
					</Button>
				</form>
			</ModalPopover>
		</>
	);
}
