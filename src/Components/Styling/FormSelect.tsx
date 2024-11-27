import React from 'react';
import FormElement from './FormElement';

interface Props {
	label: string;
	value: string | number | readonly string[] | undefined;
	options: Set<string>;
	onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined;
}

export default function FormSelect({ label, value, options, onChange }: Props) {
	return (
		<FormElement label={label}>
			<select
				value={value}
				onChange={onChange}
				className="ml-3 shadow-inner bg-gray-50 p-2 rounded-xl"
			>
				{Array.from(options).map((option: string) => {
					return <option key={option}>{option}</option>;
				})}
			</select>
		</FormElement>
	);
}
