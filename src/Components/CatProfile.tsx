import React from 'react';
import { useState, useEffect, ChangeEvent } from 'react';
import {
	getCatsProfiles,
	deleteCatProfile,
	updateCatProfile,
} from '../network';
import FormInput from './Styling/FormInput';
import Button from './Styling/Button';
import H3 from './Styling/H3';
import CatFromAxios from '../Interfaces/CatFromAxios';
import Messages from './Styling/Messages';

const { REACT_APP_LOGGED_IN_USER } = process.env;

function CatProfile() {
	const [catName, setCatName] = useState<string>('');
	const [catPicture, setCatPicture] = useState<string | null>('');
	const [catDescription, setCatDescription] = useState<string | null>('');
	const [catProfiles, setCatProfiles] = useState<CatFromAxios[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [message, setMessage] = useState<string>('');

	useEffect(() => {
		getCatsProfiles(REACT_APP_LOGGED_IN_USER as string).then(
			(fetchedProfiles) => {
				if (Array.isArray(fetchedProfiles) && fetchedProfiles.length > 0) {
					const profile = fetchedProfiles[0];
					setCatProfiles(fetchedProfiles);
					setCatName(profile.name);
					setCatPicture(profile.picture_url);
					setCatDescription(profile.description);
				}
				setIsLoading(false);
			}
		);
	}, []);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	const handleProfileEditBy = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		if (name === 'name') {
			setCatName(value);
		} else if (name === 'pictureurl') {
			setCatPicture(value);
		} else if (name === 'description') {
			setCatDescription(value);
		}
	};

	const handleSavedChanges = () => {
		const updatedProfile: CatFromAxios = {
			id: catProfiles[0]?.id,
			name: catName,
			picture_url: catPicture,
			description: catDescription,
			device_id: catProfiles[0].device_id,
			owner_id: catProfiles[0].owner_id,
			updated_at: new Date().toISOString(),
			created_at: new Date().toISOString(),
			deleted_at: null,
			battle_profile: catProfiles[0].battle_profile,
		};
		updateCatProfile(updatedProfile)
			.then(() => {
				setCatProfiles((previousProfiles) =>
					previousProfiles?.map((profile) =>
						profile.id === updatedProfile.id ? updatedProfile : profile
					)
				);
				setMessage('Updates have been saved');
			})
			.catch(() => {
				setMessage('Updates havent been saved');
			});
	};

	const handleDeleteProfile = () => {
		deleteCatProfile(REACT_APP_LOGGED_IN_USER as string)
			.then(() => {
				setCatProfiles((fetchedProfiles) =>
					fetchedProfiles.filter((profile) => profile.id !== profile.id)
				);
				setMessage('Profile Removed');
			})
			.catch(() => {
				setMessage('Failed to delete the profile');
			});
	};

	return (
		<div className="w-72 p-20 m-auto bg-emerald-100	">
			<H3>Cat&apos;s Profile</H3>
			{message && (
				<>
					{message === 'Updates have been saved' && (
						<Messages text="Updates have been saved" status="success" />
					)}
					{message === "Updates haven't been saved" && (
						<Messages text="Updates haven't been saved" status="error" />
					)}
					{message === 'Profile Removed' && (
						<Messages text="Profile Removed" status="success" />
					)}
					{message === 'Failed to delete the profile' && (
						<Messages text="Failed to delete the profile" status="error" />
					)}
				</>
			)}
			<div className="flex flex-col">
				<FormInput
					label="Name"
					type="text"
					name="name"
					value={catName}
					onChange={handleProfileEditBy}
				/>
				<FormInput
					label="Picture"
					type="text"
					name="pictureurl"
					value={catPicture ?? ''}
					onChange={handleProfileEditBy}
				/>
				<FormInput
					label="Description"
					type="text"
					name="description"
					value={catDescription ?? ''}
					onChange={handleProfileEditBy}
				/>
				<Button type="submit" onClick={handleSavedChanges}>
					Submit
				</Button>
				<Button onClick={handleDeleteProfile}>Delete</Button>
			</div>
		</div>
	);
}
export default CatProfile;
