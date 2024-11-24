import React, { ReactNode } from 'react';

interface Props {
	children: ReactNode;
	onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function Button({ children, onClick }: Props) {
	return (
		<button
			className="mt-16 py-10 px-20 bg-blue-500 text-white text-base border-none rounded cursor-pointer"
			onClick={onClick}
		>
			{children}
		</button>
	);
}
