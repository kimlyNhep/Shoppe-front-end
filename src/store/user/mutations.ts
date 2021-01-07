import { MutationTree } from 'vuex';
import { UserState, User } from './types';

export const mutations: MutationTree<UserState> = {
	SET_TOKEN(state, payload) {
		state.token = payload;
	},
	SET_ME(state, payload) {
		state.user = payload;
	},
};
