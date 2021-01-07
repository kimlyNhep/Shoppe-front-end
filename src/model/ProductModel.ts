export class ProductModel {
	private productName: string;
	private description: string;
	private price: number;
	private categoryId: number;

	constructor(args: any) {
		this.productName = args?.productName;
		this.description = args?.description;
		this.price = args?.price;
		this.categoryId = args?.categoryId;
	}

	public getProductName(): string {
		return this.productName;
	}

	public setProductName(productName: string): void {
		this.productName = productName;
	}

	public getDescription(): string {
		return this.description;
	}

	public setDescription(description: string): void {
		this.description = description;
	}

	public getPrice(): number {
		return this.price;
	}

	public setPrice(price: number): void {
		this.price = price;
	}

	public getCategoryId(): number {
		return this.categoryId;
	}

	public setCategoryId(categoryId: number): void {
		this.categoryId = categoryId;
	}
}
