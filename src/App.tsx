import React, { useState } from 'react';
import './App.css';
import MapContainer from './Components/MapContainer';
import Nav from './Components/Nav';
import Settings from './Components/Settings';
import MyClowder from './Components/MyClowder';
import OverlayWrapper from './Components/Styling/OverlayWrapper';
import PageWrapper from './Components/Styling/PageWrapper';

const {
	REACT_APP_MAPBOX_ACCESS_TOKEN,
	REACT_APP_BACKEND_HOST,
	REACT_APP_LOGGED_IN_USER,
} = process.env;
if (
	!REACT_APP_BACKEND_HOST ||
	!REACT_APP_MAPBOX_ACCESS_TOKEN ||
	!REACT_APP_LOGGED_IN_USER
)
	throw new Error(`.env is not set up correctly. please read the README.`);

function App() {
	const [page, setPage] = useState<string>('map');
	return (
		<div className="h-screen">
			<OverlayWrapper>
				<Nav setPage={setPage} />
				{page !== 'map' && (
					<PageWrapper>
						{page === 'myClowed' && <MyClowder />}
						{page === 'settings' && <Settings />}
					</PageWrapper>
				)}
			</OverlayWrapper>
			<MapContainer />
		</div>
	);
}

export default App;
