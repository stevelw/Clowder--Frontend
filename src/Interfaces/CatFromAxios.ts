export default interface CatFromAxios {
	id: string;
	name: string;
	description: string | null;
	picture_url: string | null;
	device_id: string;
	owner_id: string;
	updated_at: string;
	created_at: string;
}
