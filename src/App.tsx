import React, { useContext, useState } from 'react';
import './App.css';
import MapContainer from './Components/MapContainer';
import Nav from './Components/Nav';
import Settings from './Components/Settings';
import Login from './Components/Login';
import { UserContext } from './Contexts/UserContext';

function App() {
	const [page, setPage] = useState<String>('map');
	const { username } = useContext(UserContext);

	return (
		<div className="h-screen">
			{!username ? (
				<Login />
			) : (
				<>
					<Nav setPage={setPage} />
					{page === 'map' && <MapContainer />}
					{page === 'myClowed' && <p>My Clowed</p>}
					{page === 'leaderboard' && <p>Leaderboard</p>}
					{page === 'chat' && <p>Chat</p>}
					{page === 'settings' && <Settings />}
				</>
			)}
		</div>
	);
}

export default App;
