import { GetterTree } from 'vuex';
import { User, UserState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<UserState, RootState> = {
	getToken(state): string {
		const { token } = state;
		return token;
	},
	getMe(state): User | undefined {
		const { user } = state;
		return user;
	},
};
