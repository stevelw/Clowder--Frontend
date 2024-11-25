import React from 'react';

interface Props {
	type: React.HTMLInputTypeAttribute | undefined;
	name: string | undefined;
	value: string | number | readonly string[] | undefined;
	onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

export default function FormInput({ type, name, value, onChange }: Props) {
	return (
		<input
			className="w-28 p-10 m-auto bg-cyan-200"
			type={type}
			name={name}
			value={value}
			onChange={onChange}
		/>
	);
}
