import React, { useState } from 'react';
import './App.css';
import MapContainer from './Components/MapContainer';
import Nav from './Components/Nav';
import Settings from './Components/Settings';

function App() {
	const [page, setPage] = useState<String>('map');
	return (
		<div className="h-screen">
			<Nav setPage={setPage} />
			{page === 'map' && <MapContainer />}
			{page === 'myClowed' && <p>My Clowed</p>}
			{page === 'leaderboard' && <p>Leaderboard</p>}
			{page === 'chat' && <p>Chat</p>}
			{page === 'settings' && <Settings />}
		</div>
	);
}

export default App;
