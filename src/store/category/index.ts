import { Module } from 'vuex';
import { RootState } from '../types';
import { CategoryState } from './types';
import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';

export const state: CategoryState = {
	categories: [],
	categoryDetail: undefined,
};

const namespaced = true;

export const category: Module<CategoryState, RootState> = {
	namespaced,
	state,
	getters,
	actions,
	mutations,
};
