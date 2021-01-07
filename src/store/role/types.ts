export interface RoleType {
	roleId: number;
	roleName: string;
}

export interface UserType {
	id: number;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	roles: RoleType[];
}

export interface RoleState {
	roles: RoleType[];
	roleDetail?: RoleType;
	users: UserType[];
	userRoleDetail: RoleType[];
}
