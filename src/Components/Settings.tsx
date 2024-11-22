import React, { useEffect, useState } from 'react';
import Card from './Styling/Card';

export default function Settings() {
	const [visibilityUserSetting, setVisibilityUserSetting] =
		useState<string>('Public');

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
