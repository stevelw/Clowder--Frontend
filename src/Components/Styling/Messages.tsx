import React from 'react';

interface Props {
	text: string;
	status: 'success' | 'error';
}

export default function Messages({ text, status }: Props) {
	const baseClass = 'text-2xl font-bold  mb-20';
	const statusClass = {
		success: 'bg-green-100 text-green-900',
		error: 'bg-red-100 text-red-800',
	}[status];

	return <div className={`${baseClass} ${statusClass}`}>{text}</div>;
}
