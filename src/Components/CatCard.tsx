import React from 'react';
import CatFromAxios from '../Interfaces/CatFromAxios';
import Card from './Styling/Card';

interface Props {
	cat: CatFromAxios;
	setSelectedCat: React.Dispatch<React.SetStateAction<CatFromAxios | null>>;
}

export default function CatCard({ cat }: Props) {
	return (
		<Card heading={cat.name}>
			<div className="flex justify-between">
				<img src={cat.picture_url ?? ''} alt={cat.name} className="w-20" />
				<div>
					<p>Level: {cat.battle_profile.level.toString()}</p>
					<p>XP: {cat.battle_profile.xp.toString()}</p>
				</div>
				<p>{cat.description ?? 'A good kitty'}</p>
			</div>
		</Card>
	);
}
