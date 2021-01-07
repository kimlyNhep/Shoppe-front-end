import { Module } from 'vuex';
import { RootState } from '../types';
import { UserState } from './types';
import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';

export const state: UserState = {
	user: undefined,
	token: '',
};

const namespaced = true;

export const user: Module<UserState, RootState> = {
	namespaced,
	state,
	getters,
	actions,
	mutations,
};
