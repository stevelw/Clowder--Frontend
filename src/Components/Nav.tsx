import React, { SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCat, faGear } from '@fortawesome/free-solid-svg-icons';

interface Props {
	setPage: React.Dispatch<SetStateAction<string>>;
}

export default function Nav({ setPage }: Props) {
	function buttonPressed(pageName: string) {
		setPage((currentPage) => {
			if (pageName === currentPage) return 'map';
			return pageName;
		});
	}

	return (
		<div className="flex justify-around bg-gray-200 p-2 shadow-lg rounded-full mx-10 flex-none">
			<FontAwesomeIcon
				icon={faHouse}
				onClick={() => {
					buttonPressed('map');
				}}
			/>
			<FontAwesomeIcon
				icon={faCat}
				onClick={() => {
					buttonPressed('myClowed');
				}}
			/>
			<FontAwesomeIcon
				icon={faGear}
				onClick={() => {
					buttonPressed('settings');
				}}
			/>
		</div>
	);
}
