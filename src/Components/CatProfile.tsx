import React from 'react';
import { useState, useEffect, ChangeEvent } from 'react';
import { getCatsProfiles } from '../api';

function CatProfile() {
	const [changeName, setChangeName] = useState<string>('');
	const [changePictureurl, setChangePictureurl] = useState<string>('');
	const [changeDescription, setChangeDescription] = useState<string>('');
	const [catsProfile, setCatsProfile] = useState<any>(''); //it will be an interface
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		getCatsProfiles().then((fetchedProfiles) => {
			if (Array.isArray(fetchedProfiles) && fetchedProfiles.length > 0) {
				const profile = fetchedProfiles[0];

				console.log(fetchedProfiles);
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

	const handleSavedChanges = () => {
		console.log({ changeName, changePictureurl, changeDescription });
	};

	return (
		<div className="profile-container">
			<h2 className="profile-title">Cat's Profile</h2>
			<div className="profile-field">
				<label>Name</label>
				<input
					className="profile-input"
					type="text"
					name="name"
					value={changeName}
					onChange={handleProfileEditBy}
				/>
			</div>
			<div className="profile-field">
				<label>Pricture</label>
				<input
					className="profile-input"
					type="text"
					name="pictureurl"
					value={changePictureurl}
					onChange={handleProfileEditBy}
				/>
			</div>
			<div className="profile-field">
				<label>Description</label>
				<input
					className="profile-input"
					type="text"
					name="description"
					value={changeDescription}
					onChange={handleProfileEditBy}
				/>
			</div>
			<button className="save-button" onClick={handleSavedChanges}>
				Save
			</button>
		</div>
	);
}

export default CatProfile;
