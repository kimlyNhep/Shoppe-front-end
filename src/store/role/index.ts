import { Module } from 'vuex';
import { RootState } from '../types';
import { RoleState } from './types';
import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';

export const state: RoleState = {
	roles: [],
	roleDetail: undefined,
	users: [],
	userRoleDetail: [],
};

const namespaced = true;

export const role: Module<RoleState, RootState> = {
	namespaced,
	state,
	getters,
	actions,
	mutations,
};
