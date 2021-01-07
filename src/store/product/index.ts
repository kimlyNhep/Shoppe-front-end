import { Module } from 'vuex';
import { RootState } from '../types';
import { ProductState } from './types';
import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';

export const state: ProductState = {
	products: [],
	productDetail: undefined,
};

const namespaced = true;

export const product: Module<ProductState, RootState> = {
	namespaced,
	state,
	getters,
	actions,
	mutations,
};
