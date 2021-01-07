export interface ProductType {
	id: number;
	productName: string;
	description: string;
	price: number;
	categoryId: number;
}

export interface ProductState {
	products: ProductType[];
	productDetail?: ProductType;
}
