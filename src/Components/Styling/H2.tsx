import React, { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

export default function H2({ children }: Props) {
	return <h2 className="fixed mt-20 ml-5 text-2xl">{children}</h2>;
}
