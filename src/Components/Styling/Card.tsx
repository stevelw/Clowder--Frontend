import React, { ReactNode } from 'react';
import H3 from './H3';

interface Props {
	children?: ReactNode;
	heading: string;
	className?: string;
}

export default function Card(props: Props) {
	return (
		<div className="bg-gray-200 p-5">
			<div className="border-b-2 border-blue-500 mb-5">
				<H3 className={''}>{props.heading}</H3>
			</div>
			{props.children}
		</div>
	);
}
