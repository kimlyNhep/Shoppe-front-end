import { UserModel } from './UserModel';

export class CategoryModel {
	private id?: number;
	private categoryName: string;

	constructor(categoryId: number | undefined, categoryName: string) {
		this.id = categoryId;
		this.categoryName = categoryName;
	}

	public getId(): number | undefined {
		return this.id;
	}

	public getCategoryName(): string {
		return this.categoryName;
	}

	public setCategoryName(categoryName: string): void {
		this.categoryName = categoryName;
	}
}
