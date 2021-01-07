import { GetterTree } from 'vuex';
import { CategoryType, CategoryState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<CategoryState, RootState> = {
	getCategories(state): CategoryType[] {
		const { categories } = state;
		return categories!;
	},
	getCategoryDetail(state): CategoryType | undefined {
		const { categoryDetail } = state;
		return categoryDetail;
	},
	getCategorySelectBox(state): { text: string; value: number }[] | undefined {
		const { categories } = state;
		return categories?.map((category) => ({
			text: category.categoryName,
			value: +category.id,
		}));
	},
};
