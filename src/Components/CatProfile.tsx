import React from 'react';
import FormInput from './Styling/FormInput';
import Button from './Styling/Button';
import H3 from './Styling/H3';

function CatProfile() {
	return (
		<div className="">
			<H3>Cat&apos;s Profile</H3>
			<div className="flex flex-col">
				<FormInput
					label="Name"
					type="text"
					name="name"
					value="Cat name"
					onChange={() => {}}
				/>
				<FormInput
					label="Pricture"
					type="text"
					name="pictureurl"
					value="Picture URL"
					onChange={() => {}}
				/>
				<FormInput
					label="Description"
					type=""
					name="description"
					value="A good girl"
					onChange={() => {}}
				/>
				<Button onClick={() => {}}>Save</Button>
			</div>
		</div>
	);
}

export default CatProfile;
