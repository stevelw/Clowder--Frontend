import React, { useEffect, useState } from 'react';
import Card from './Styling/Card';
import { updateUser } from '../network';

export default function Settings() {
	const [visibilityUserSetting, setVisibilityUserSetting] =
		useState<string>('Public');

	useEffect(() => {
		updateUser({ requested_privacy: visibilityUserSetting });
	}, [visibilityUserSetting]);

	return (
		<>
			<h1>Settings</h1>
			<Card heading="Privacy">
				<label>
					Visibility
					<select
						value={visibilityUserSetting}
						onChange={({ target: { value } }) => {
							setVisibilityUserSetting(value);
						}}
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
