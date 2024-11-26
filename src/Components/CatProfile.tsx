import React from 'react';
import FormInput from './Styling/FormInput';
import FormElement from './Styling/FormElement';
import Button from './Styling/Button';
import H3 from './Styling/H3';

function CatProfile() {
	return (
		<div className="">
			<H3>Cat&apos;s Profile</H3>
			<FormElement>
				<label>
					Name
					<FormInput
						type="text"
						name="name"
						value="Cat name"
						onChange={() => {}}
					/>
				</label>
			</FormElement>
			<FormElement>
				<label>
					Pricture
					<FormInput
						type="text"
						name="pictureurl"
						value="Picture URL"
						onChange={() => {}}
					/>
				</label>
			</FormElement>
			<FormElement>
				<label>
					Description
					<FormInput
						type=""
						name="description"
						value="A good girl"
						onChange={() => {}}
					/>
				</label>
			</FormElement>
			<Button onClick={() => {}}>Save</Button>
		</div>
	);
}

export default CatProfile;
