import React, { ReactNode } from 'react';

interface Props {
	children: ReactNode;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
	onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
	disabled?: React.ButtonHTMLAttributes<HTMLButtonElement>['disabled'];
}

export default function Button({
	children,
	type = 'button',
	onClick,
	disabled,
}: Props) {
	let colour = 'bg-blue-500';
	switch (children) {
		case 'Submit':
			colour = 'bg-green-500';
			break;
		case 'Delete':
			colour = 'bg-red-500';
			break;
		default:
			break;
	}

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={
				'text-white text-base border-none rounded-xl cursor-pointer h-10 mx-auto my-5 p-2 block disabled:bg-gray-200' +
				' ' +
				colour
			}
		>
			{children}
		</button>
	);
}
