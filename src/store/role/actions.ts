import Vue from 'vue';
import axios from 'axios';
import { ActionTree } from 'vuex';
import { RoleState, RoleType } from './types';
import { RootState } from '../types';
import { ProductModel } from '@/model/ProductModel';

export const actions: ActionTree<RoleState, RootState> = {
	async fetchRoles({ commit, state }, reqBody) {
		try {
			const token = Vue.cookies.get('token');

			const { data } = await axios.get('http://localhost:8080/api/roles', {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			});

			commit('SET_ROLES', data?.roles);
		} catch (error) {
			console.log(error);
		}
	},
	async fetchUsers({ commit, state }, reqBody) {
		try {
			const token = Vue.cookies.get('token');

			const { data } = await axios.get(
				'http://localhost:8080/api/roles/users',
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				}
			);

			commit('SET_USERS', data?.users);
		} catch (error) {
			console.log(error);
		}
	},
	async changeRoles({ commit, state }, reqBody) {
		try {
			const token = Vue.cookies.get('token');

			const { data } = await axios.post(
				`http://localhost:8080/api/roles/${reqBody.index}`,
				{
					roles: reqBody.roles,
				},
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				}
			);

			// commit('SET_USERS', data?.users);
			console.log(reqBody.roles);
		} catch (error) {
			console.log(error);
		}
	},
	async fetchUserDetail({ commit, state }, reqBody) {
		try {
			const token = Vue.cookies.get('token');
			const { data } = await axios.get(
				`http://localhost:8080/api/roles/users/${reqBody}`,
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				}
			);
			console.log(data);
			commit('SET_USERS_ROLES_DETAIL', data?.roles);
		} catch (error) {
			console.log(error);
		}
		console.log(reqBody);
	},
	clearCategoryDetail({ commit }) {
		commit('CLEAR_CATEGORY_DETAIL');
	},
	async createProduct({ commit, state }, reqBody) {
		try {
			const token = Vue.cookies.get('token');
			const res = await axios.post(
				'http://localhost:8080/api/products',
				{
					productName: reqBody.productName,
					description: reqBody.description,
					price: +reqBody.price.toFixed(2),
					categoryId: +reqBody.categoryId,
				},
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				}
			);
		} catch (error) {
			console.log(error);
		}
		console.log(reqBody);
	},
	async editProduct({ commit, state }, reqBody) {
		try {
			const token = Vue.cookies.get('token');
			const { data } = await axios.put(
				`http://localhost:8080/api/products/${reqBody.index}`,
				{
					productName: reqBody.product.productName,
					description: reqBody.product.description,
					price: +reqBody.product.price,
					categoryId: reqBody.product.categoryId,
				},
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				}
			);
		} catch (error) {
			console.log(error);
		}
		console.log(reqBody);
	},
	async deleteProduct({ commit, state }, reqBody) {
		try {
			const token = Vue.cookies.get('token');

			const { data } = await axios.delete(
				`http://localhost:8080/api/products/${reqBody}`,
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				}
			);
		} catch (error) {
			console.log(error);
		}
	},
};
