import React, { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

export default function ModalPopover({ children }: Props) {
	return <div className="shadow-2xl bg-white p-5">{children}</div>;
}
