export interface CategoryType {
	id: number;
	categoryName: string;
}

export interface CategoryState {
	categories?: CategoryType[];
	categoryDetail?: CategoryType;
}
