import React from 'react';
import { useState, useEffect, ChangeEvent } from 'react';
import { getCatsProfiles, deleteCatProfile, updateCatProfile } from '../api';
import FormInput from './Styling/FormInput';
import FormElement from './Styling/FormElement';
import Button from './Styling/Button';
import { Cat } from '../api';

function CatProfile() {
	const [catName, setCatName] = useState<string>('');
	const [catPicture, setCatPicture] = useState<string>('');
	const [catDescription, setCatDescription] = useState<string>('');
	const [catProfiles, setCatProfiles] = useState<Cat[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		getCatsProfiles('USER1').then((fetchedProfiles) => {
			if (Array.isArray(fetchedProfiles) && fetchedProfiles.length > 0) {
				const profile = fetchedProfiles[0];

				setCatProfiles(fetchedProfiles);
				setIsLoading(false);
				setCatName(profile.name);
				setCatPicture(profile.pictureurl);
				setCatDescription(profile.description);
			}
		});
	}, []);

	const handleProfileEditBy = (event: ChangeEvent<HTMLInputElement>) => {
		//Handle editing process of Cat's profile, allow users to edit the profile
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
		const updatedProfile = {
			id: catProfiles[0]?.id,
			name: catName,
			pictureurl: catPicture,
			description: catDescription,
			device_id: catProfiles[0].device_id,
			owner_id: catProfiles[0].owner_id,
			updated_at: catProfiles[0].updated_at,
			created_at: catProfiles[0].created_at,
			deleted_at: null,
		};
		updateCatProfile(updatedProfile)
			.then(() => {
				setCatProfiles((previousProfiles) =>
					previousProfiles?.map((profile) =>
						profile.id === updatedProfile.id ? updatedProfile : profile
					)
				);
			})
			.catch(() => {
				console.log('Updates havent been saved');
			});
	};

	const handleDeleteProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
		deleteCatProfile('USER1')
			.then(() => {
				console.log('Profile Removed');
				setCatProfiles((fetchedProfiles) =>
					fetchedProfiles.filter((profile) => profile.id !== profile.id)
				);
			})
			.catch(() => {
				console.log('Failed to delete the profile');
			});
	};

	return (
		<div className="w-72 p-20 m-auto bg-emerald-100	">
			<h2 className="text-2xl font-bold text-red-950	mb-20">
				Cat&apos;s Profile
			</h2>
			<FormElement>
				<label>
					Name
					<FormInput
						type="text"
						name="name"
						value={catName}
						onChange={handleProfileEditBy}
					/>
				</label>
			</FormElement>
			<FormElement>
				<label>
					Pricture
					<FormInput
						type="text"
						name="pictureurl"
						value={catPicture}
						onChange={handleProfileEditBy}
					/>
				</label>
			</FormElement>
			<FormElement>
				<label>
					Description
					<FormInput
						type="text"
						name="description"
						value={catDescription}
						onChange={handleProfileEditBy}
					/>
				</label>
			</FormElement>
			<Button onClick={handleSavedChanges}>Save</Button>
			{catProfiles.length > 0 && (
				<Button onClick={handleDeleteProfile}>Delete</Button>
			)}
		</div>
	);
}

export default CatProfile;
