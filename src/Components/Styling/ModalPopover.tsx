import React, { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

export default function ModalPopover({ children }: Props) {
	return (
		<div className="shadow-2xl rounded-2xl bg-white p-5 my-5 mx-auto border-2 w-full sm:w-2/3">
			{children}
		</div>
	);
}
