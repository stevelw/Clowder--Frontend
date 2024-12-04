import React from 'react';
import CatFromAxios from '../Interfaces/CatFromAxios';
import Card from './Styling/Card';

interface Props {
	cat: CatFromAxios;
}

export default function CatCard({ cat }: Props) {
	return (
		<Card heading={cat.name}>
			<div className="flex justify-between">
				<img src={cat.picture_url ?? ''} alt={cat.name} className="w-20" />
				<p>{cat.description ?? 'A good kitty'}</p>
			</div>
		</Card>
	);
}
