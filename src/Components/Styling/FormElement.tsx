import React, { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

export default function FormElement({ children }: Props) {
	return <div className="block text-sm mb-5 text-red-950">{children}</div>;
}
