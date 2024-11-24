export default interface Device {
	id: string;
	name: string;
	uuid: string;
	owner_id: string;
	last_pulse_at: string | null;
	location_history: { lat: number; lon: number }[];
	updated_at: string;
	created_at: string;
}
