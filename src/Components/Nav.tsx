import React, { SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCat, faGear } from '@fortawesome/free-solid-svg-icons';

interface Props {
	setPage: React.Dispatch<SetStateAction<string>>;
}

export default function Nav(props: Props) {
	return (
		<div className="flex justify-around bg-gray-200 p-2 shadow-lg rounded-full mx-10 flex-none">
			<FontAwesomeIcon
				icon={faHouse}
				onClick={() => {
					props.setPage('map');
				}}
			/>
			<FontAwesomeIcon
				icon={faCat}
				onClick={() => {
					props.setPage('myClowed');
				}}
			/>
			<FontAwesomeIcon
				icon={faGear}
				onClick={() => {
					props.setPage('settings');
				}}
			/>
		</div>
	);
}
