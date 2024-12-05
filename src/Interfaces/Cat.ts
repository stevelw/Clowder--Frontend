export default interface Cat {
	id: string;
	name: string;
	image: string;
	history: { lat: number; lon: number }[];
}
