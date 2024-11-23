export enum Privacy {
	PUBLIC = 'PUBLIC',
	FRIENDS = 'FRIENDS',
	PRIVATE = 'PRIVATE',
}

export interface User {
	requested_privacy: Privacy;
}
