import React, { SetStateAction } from 'react';
import CatProfile from './CatProfile';
import H2 from './Styling/H2';
import ModalPopover from './Styling/ModalPopover';

export default function MyClowder() {
	return (
		<>
			<H2>My Clowder</H2>
			<ModalPopover>
				<CatProfile></CatProfile>
			</ModalPopover>
		</>
	);
}
