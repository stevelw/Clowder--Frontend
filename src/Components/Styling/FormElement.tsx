import React from 'react';

interface Props {
	label: string;
	children?: React.ReactNode;
}

export default function FormElement({ label, children }: Props) {
	return (
		<div className="inline-block">
			<label className="font-bold m-5">
				{label}
				{children}
			</label>
		</div>
	);
}
