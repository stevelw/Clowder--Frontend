import React from 'react';
import FormElement from './FormElement';

interface Props {
	type: React.HTMLInputTypeAttribute | undefined;
	label: string;
	name: string | undefined;
	value: string | number | readonly string[] | undefined;
	onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
	placeholder?: string;
}

export default function FormInput({
	type,
	label,
	name,
	value,
	onChange,
}: Props) {
	return (
		<FormElement label={label}>
			<input
				className="m-5 shadow-inner bg-gray-200 p-2 rounded-xl"
				type={type}
				name={name}
				value={value}
				onChange={onChange}
			/>
		</FormElement>
	);
}
