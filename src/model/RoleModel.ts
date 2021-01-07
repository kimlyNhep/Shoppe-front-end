import { UserModel } from './UserModel';

export class RoleModel {
	private name: string;
	private users?: [UserModel];

	constructor(name: string) {
		this.name = name;
	}

	public getName(): string {
		return this.name;
	}

	public setName(name: string): void {
		this.name = name;
	}
}
