import { MutationTree } from 'vuex';
import { CategoryState, CategoryType } from './types';

export const mutations: MutationTree<CategoryState> = {
	GET_CATEGORIES(state, payload: CategoryType[]) {
		state.categories = payload;
	},
	GET_CATEGORY_DETAIL(state, payload: CategoryType) {
		state.categoryDetail = payload;
	},
	CLEAR_CATEGORY_DETAIL(state) {
		state.categoryDetail = undefined;
	},
};
