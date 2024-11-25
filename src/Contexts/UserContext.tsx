import React, {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react';
import Coordinates from '../Types/Coordinates';

interface UserContextType {
	userId: string | null;
	username: string | null;
	home: Coordinates | null;
	setUserId: Dispatch<SetStateAction<string | null>>;
	setUsername: Dispatch<SetStateAction<string | null>>;
	setHome: Dispatch<SetStateAction<Coordinates | null>>; // What is says when mousing over the variable
}

const defaultContext = {
	userId: null,
	username: null,
	home: null,
	setUserId: () => {},
	setUsername: () => {},
	setHome: () => {}, // Needed so UserContext isn't null since that breaks the login
};

export const UserContext = createContext<UserContextType>(defaultContext);

export function UserProvider({ children }: { children: ReactNode }) {
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
