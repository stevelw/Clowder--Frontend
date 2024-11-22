import React, { useEffect, useState } from 'react';
import Card from './Styling/Card';
import { updateUser } from '../network';
import { Privacy } from '../Types/Privacy';

export default function Settings() {
	const [visibilityUserSetting, setVisibilityUserSetting] = useState<Privacy>(
		Privacy.PUBLIC
	);

	useEffect(() => {
		updateUser({ requested_privacy: visibilityUserSetting });
	}, [visibilityUserSetting]);

	function handleVisibilityChange(value: string) {
		switch (value) {
			case 'Public':
				setVisibilityUserSetting(Privacy.PUBLIC);
				break;
			case 'Friends only':
				setVisibilityUserSetting(Privacy.FRIENDS);
				break;
			case 'Hidden':
				setVisibilityUserSetting(Privacy.PRIVATE);
				break;
			default:
				console.log('Error converting privacy setting type.');
				break;
		}
	}

	return (
		<>
			<h1>Settings</h1>
			<Card heading="Privacy">
				<label>
					Visibility
					<select
						value={visibilityUserSetting}
						onChange={({ target: { value } }) => handleVisibilityChange(value)}
					>
						<option>Public</option>
						<option>Friends only</option>
						<option>Hidden</option>
					</select>
				</label>
			</Card>
		</>
	);
}
