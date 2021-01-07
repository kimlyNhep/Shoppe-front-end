import { GetterTree } from 'vuex';
import { RoleState, RoleType, UserType } from './types';
import { RootState } from '../types';

export const getters: GetterTree<RoleState, RootState> = {
	getRoles(state): RoleType[] {
		const { roles } = state;
		return roles!;
	},
	getRoleDetail(state): RoleType | undefined {
		const { roleDetail } = state;
		return roleDetail;
	},
	getUsers(state): UserType[] {
		const { users } = state;
		return users;
	},
	getRoleSelectBox(state): { text: string; value: number }[] | undefined {
		const { roles } = state;
		console.log(roles);
		return roles?.map((role) => ({
			text: role.roleName,
			value: +role.roleId,
		}));
	},
	getUserDetail(state): RoleType[] {
		const { userRoleDetail } = state;
		return userRoleDetail;
	},
};
