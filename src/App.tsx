import React, { useState } from 'react';
import './App.css';
import Map from './Components/Map';
import Cat from './Interfaces/Cat';

function App() {
	const [cats, setCats] = useState<Cat[]>([
		{
			name: 'Whiskers',
			image:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWGpMwXI5hOZhVNL9Z1YZfhSgjjY1qEBRJgQ&s',
			history: [
				[-1.445, 53.8075],
				[-1.446, 53.807],
				[-1.447, 53.8065],
				[-1.4485, 53.806],
				[-1.4495, 53.8055],
			],
		},
		{
			name: 'Fluffy',
			image:
				'https://c8.alamy.com/comp/DBTJAD/a-closeup-picture-of-a-cats-face-on-a-white-background-DBTJAD.jpg',
			history: [
				[-1.447, 53.8035],
				[-1.4485, 53.804],
				[-1.449, 53.8045],
				[-1.45, 53.805],
				[-1.451106, 53.806201],
			],
		},
	]);

	return (
		<>
			<Map cats={cats} />
		</>
	);
}

export default App;
