import React, { createContext, useState } from 'react';
import Coordinates from '../Types/Coordinates';

interface UserContextType {
	userId: string | null;
	setUserId: React.Dispatch<React.SetStateAction<string | null>>;
	username: string | null;
	setUsername: React.Dispatch<React.SetStateAction<string | null>>;
	home: Coordinates | null;
	setHome: React.Dispatch<React.SetStateAction<Coordinates | null>>;
}

const defaultContext = {
	userId: null,
	username: null,
	home: null,
	setUserId: () => {},
	setUsername: () => {},
	setHome: () => {},
};

export const UserContext = createContext<UserContextType>(defaultContext);

export function UserProvider({ children }: { children: React.ReactNode }) {
	const [userId, setUserId] = useState<string | null>(
		localStorage.getItem('userId')
	);
	const [username, setUsername] = useState<string | null>(
		localStorage.getItem('username')
	);
	const [home, setHome] = useState<Coordinates | null>(
		JSON.parse(localStorage.getItem('home') || 'null')
	);

	return (
		<UserContext.Provider
			value={{ userId, username, home, setUserId, setUsername, setHome }}
		>
			{children}
		</UserContext.Provider>
	);
}
