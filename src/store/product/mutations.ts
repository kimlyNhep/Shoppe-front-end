import { MutationTree } from 'vuex';
import { ProductState, ProductType } from './types';

export const mutations: MutationTree<ProductState> = {
	SET_PRODUCTS(state, payload: ProductType[]) {
		state.products = payload;
	},
	SET_PRODUCT_DETAIL(state, payload: ProductType) {
		state.productDetail = payload;
	},
	CLEAR_CATEGORY_DETAIL(state) {
		state.productDetail = undefined;
	},
};
