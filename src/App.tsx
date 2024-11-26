import React, { useState } from 'react';
import './App.css';
import MapContainer from './Components/MapContainer';
import Nav from './Components/Nav';
import Settings from './Components/Settings';
import MyClowder from './Components/MyClowder';
import OverlayWrapper from './Components/Styling/OverlayWrapper';

function App() {
	const [page, setPage] = useState<String>('map');
	return (
		<div className="h-screen">
			<OverlayWrapper>
				<Nav setPage={setPage} />
				{page === 'myClowed' && <MyClowder />}
				{page === 'leaderboard' && <p>Leaderboard</p>}
				{page === 'chat' && <p>Chat</p>}
				{page === 'settings' && <Settings />}
			</OverlayWrapper>
			{page === 'map' && <MapContainer />}
		</div>
	);
}

export default App;
