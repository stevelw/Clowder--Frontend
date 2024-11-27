import React, { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

export default function H3({ children }: Props) {
	return <h3 className="text-2xl font-bold mb-5">{children}</h3>;
}
