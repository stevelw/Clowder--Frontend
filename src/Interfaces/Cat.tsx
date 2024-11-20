import Coordinates from '../Types/Coordinates';

export default interface Cat {
	name: string;
	image: string;
	history: { lon: number; lat: number }[];
}
