export default interface Cat {
	id: string;
	name: string;
	image: string | null;
	history: { lat: number; lon: number }[];
	owned: boolean;
}
