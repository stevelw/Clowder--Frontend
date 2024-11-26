import React, { ReactNode } from 'react';

interface Props {
	children?: ReactNode;
	heading: string;
}

export default function Card(props: Props) {
	return (
		<div className="border-solid border-2 border-gray-200">
			<h2>{props.heading}</h2>
			{props.children}
		</div>
	);
}
