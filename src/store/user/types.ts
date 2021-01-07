export interface User {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
}

export interface UserState {
	user?: User;
	token: string;
}
