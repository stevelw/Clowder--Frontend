import React, { ReactNode } from 'react';

interface Props {
	children: ReactNode;
	className: string;
}

export default function H3({ children, className }: Props) {
	return <h3 className="text-2xl font-bold mb-5">{children}</h3>;
}
