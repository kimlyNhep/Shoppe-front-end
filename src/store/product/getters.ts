import { GetterTree } from 'vuex';
import { ProductState, ProductType } from './types';
import { RootState } from '../types';

export const getters: GetterTree<ProductState, RootState> = {
	getProducts(state): ProductType[] {
		const { products } = state;
		return products!;
	},
	getProductDetail(state): ProductType | undefined {
		const { productDetail } = state;
		return productDetail;
	},
};
