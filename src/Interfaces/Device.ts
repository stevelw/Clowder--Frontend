export default interface Device {
	id: string;
	name: string;
	uuid: string;
	owner_id: string;
	last_pulse_at: string | null;
	last_location: object;
	location_history: [number, number][];
	updated_at: string;
	created_at: string;
}
