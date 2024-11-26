import React from 'react';

interface Props {
	type: React.HTMLInputTypeAttribute | undefined;
	label: string;
	name: string | undefined;
	value: string | number | readonly string[] | undefined;
	onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

export default function FormInput({
	type,
	label,
	name,
	value,
	onChange,
}: Props) {
	return (
		<label className="font-bold m-5">
			{label}
			<input
				className="ml-3 shadow-inner bg-gray-200 p-2 rounded-lg"
				type={type}
				name={name}
				value={value}
				onChange={onChange}
			/>
		</label>
	);
}
