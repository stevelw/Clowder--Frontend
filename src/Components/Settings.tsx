import React, { useEffect, useState } from 'react';
import Card from './Styling/Card';
import { getUser, updateUser } from '../network';
import { type User, Privacy } from '../Types/User';
import H2 from './Styling/H2';
import FormSelect from './Styling/FormSelect';

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
			<H2>Settings</H2>
			<Card heading="Privacy">
				<FormSelect
					label="Visibility"
					value={visibilityUserSetting}
					options={new Set(['Public', 'Friends only', 'Hidden'])}
					onChange={({ target: { value } }) => handlePrivacyChange(value)}
				></FormSelect>
			</Card>
		</>
	);
}
