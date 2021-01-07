import { RoleModel } from './RoleModel';

export class UserModel {
	private firstName: string;
	private lastName: string;
	private username: string;
	private email: string;
	private password: string;
	private roles: RoleModel;

	constructor(
		firstName: string,
		lastName: string,
		username: string,
		email: string,
		password: string,
		roles: RoleModel
	) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.email = email;
		this.password = password;
		this.roles = roles;
	}

	public getFirstName(): string {
		return this.firstName;
	}

	public setFirstName(firstName: string): void {
		this.firstName = firstName;
	}

	public getLastName(): string {
		return this.lastName;
	}

	public setLastName(lastName: string): void {
		this.lastName = lastName;
	}

	public getUsername(): string {
		return this.username;
	}

	public setUsername(username: string): void {
		this.username = username;
	}

	public getEmail(): string {
		return this.email;
	}

	public setEmail(email: string): void {
		this.email = email;
	}

	public getPassword(): string {
		return this.password;
	}

	public setPassword(password: string): void {
		this.password = password;
	}

	public getRoles(): RoleModel {
		return this.roles;
	}

	public setRoles(roles: RoleModel): void {
		this.roles = roles;
	}
}
