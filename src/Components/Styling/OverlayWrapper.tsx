import React, { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

export default function OverlayWrapper({ children }: Props) {
	return (
		<div className="fixed mt-10 z-10 w-screen flex flex-col justify-between">
			{children}
		</div>
	);
}
