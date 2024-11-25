import React from 'react';
import FormInput from './Styling/FormInput';
import FormElement from './Styling/FormElement';
import Button from './Styling/Button';

function CatProfile() {
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
