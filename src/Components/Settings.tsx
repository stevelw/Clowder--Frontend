import React, { useEffect, useState } from 'react';
import Card from './Styling/Card';
import { getUser, updateUser } from '../network';
import { type User, Privacy } from '../Types/User';

export default function Settings() {
	const [visibilityUserSetting, setVisibilityUserSetting] =
		useState<string>('Hidden');

	useEffect(() => {
		fetchPrivacySetting();
	});

	function fetchPrivacySetting() {
		getUser().then((user: User) =>
			setVisibilityUserSetting(
				displayStringFromPrivacyEnum(user.requested_privacy)
			)
		);
	}

	function handlePrivacyChange(newValue: string) {
		setVisibilityUserSetting(newValue);
		updateUser({
			requested_privacy: privacyEnumFromDisplayString(newValue),
		}).catch(() => {
			fetchPrivacySetting();
		});
	}

	function privacyEnumFromDisplayString(str: String): Privacy {
		switch (str) {
			case 'Public':
				return Privacy.PUBLIC;
			case 'Friends only':
				return Privacy.FRIENDS;
			case 'Hidden':
				return Privacy.PRIVATE;
			default:
				console.log('Error converting privacy setting type.');
				return Privacy.PRIVATE;
		}
	}

	function displayStringFromPrivacyEnum(privacy: Privacy): string {
		switch (privacy) {
			case Privacy.PUBLIC:
				return 'Public';
			case Privacy.FRIENDS:
				return 'Friends only';
			case Privacy.PRIVATE:
				return 'Hidden';
			default:
				console.log('Error converting privacy setting type.');
				return '';
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
						onChange={({ target: { value } }) => handlePrivacyChange(value)}
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
