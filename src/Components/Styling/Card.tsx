import React, { ReactNode } from 'react';
import H3 from './H3';

interface Props {
	children?: ReactNode;
	heading: string;
}

export default function Card(props: Props) {
	return (
		<div className="bg-gray-200 p-5 my-5">
			<div className="border-b-2 border-blue-500 mb-5">
				<H3>{props.heading}</H3>
			</div>
			{props.children}
		</div>
	);
}
