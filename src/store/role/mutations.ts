import { MutationTree } from 'vuex';
import { RoleState, RoleType, UserType } from './types';

export const mutations: MutationTree<RoleState> = {
	SET_ROLES(state, payload: RoleType[]) {
		state.roles = payload;
	},
	SET_ROLE_DETAIL(state, payload: RoleType) {
		state.roleDetail = payload;
	},
	CLEAR_CATEGORY_DETAIL(state) {
		state.roleDetail = undefined;
	},
	SET_USERS(state, payload: UserType[]) {
		state.users = payload;
	},
	SET_USERS_ROLES_DETAIL(state, payload: RoleType[]) {
		state.userRoleDetail = payload;
	},
};
