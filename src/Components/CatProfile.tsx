import React from 'react';
import { useState, useEffect, ChangeEvent } from 'react';
import { getCatsProfiles } from '../api';
import FormInput from './Styling/FormInput';
import FormElement from './Styling/FormElement';
import Button from './Styling/Button';
import { Cat } from '../api';

function CatProfile() {
	const [changeName, setChangeName] = useState<string>('');
	const [changePictureurl, setChangePictureurl] = useState<string>('');
	const [changeDescription, setChangeDescription] = useState<string>('');
	const [catsProfile, setCatsProfile] = useState<Cat[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		getCatsProfiles().then((fetchedProfiles) => {
			if (Array.isArray(fetchedProfiles) && fetchedProfiles.length > 0) {
				const profile = fetchedProfiles[0];

				setCatsProfile(fetchedProfiles);
				setIsLoading(false);
				setChangeName(profile.name);
				setChangePictureurl(profile.pictureurl);
				setChangeDescription(profile.description);
			}
		});
	}, []);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	const handleProfileEditBy = (event: ChangeEvent<HTMLInputElement>) => {
		//Handle editing process of Cat's profile, allow users to edit the profile
		const { name, value } = event.target;

		if (name === 'name') {
			setChangeName(value);
		} else if (name === 'pictureurl') {
			setChangePictureurl(value);
		} else if (name === 'description') {
			setChangeDescription(value);
		}
	};

	const handleSavedChanges = () => {};

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
						value={changeName}
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
						value={changePictureurl}
						onChange={handleProfileEditBy}
					/>
				</label>
			</FormElement>
			<FormElement>
				<label>
					Description
					<FormInput
						type=""
						name="description"
						value={changeDescription}
						onChange={handleProfileEditBy}
					/>
				</label>
			</FormElement>
			<Button onClick={handleSavedChanges}>Save</Button>
		</div>
	);
}

export default CatProfile;
