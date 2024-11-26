import React, { SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHouse,
	faCat,
	faTableList,
	faComments,
	faGear,
} from '@fortawesome/free-solid-svg-icons';

interface Props {
	setPage: React.Dispatch<SetStateAction<String>>;
}

export default function Nav(props: Props) {
	return (
		<div className="flex justify-around bg-gray-200 p-2 shadow-lg rounded mx-10 flex-none">
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
				icon={faTableList}
				onClick={() => {
					props.setPage('leaderboard');
				}}
			/>
			<FontAwesomeIcon
				icon={faComments}
				onClick={() => {
					props.setPage('chat');
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
