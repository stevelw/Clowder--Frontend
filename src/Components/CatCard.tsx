import React from 'react';
import CatFromAxios from '../Interfaces/CatFromAxios';
import Card from './Styling/Card';

interface Props {
	cat: CatFromAxios;
}

export default function CatCard({ cat }: Props) {
	return <Card heading={cat.name}></Card>;
}
