import React from 'react';
import Card from './Styling/Card';

export default function Settings() {
	return (
		<>
			<h1>Settings</h1>
			<Card heading="Privacy">
				<label>
					Visibility
					<select>
						<option>Public</option>
						<option>Friends only</option>
						<option>Hidden</option>
					</select>
				</label>
			</Card>
		</>
	);
}
