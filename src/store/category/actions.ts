import Vue from 'vue';
import axios from 'axios';
import { ActionTree } from 'vuex';
import { CategoryState, CategoryType } from './types';
import { RootState } from '../types';

export const actions: ActionTree<CategoryState, RootState> = {
	async fetchCategories({ commit, state }, reqBody) {
		try {
			const token = Vue.cookies.get('token');

			const { data } = await axios.get('http://localhost:8080/api/categories', {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			});

			commit('GET_CATEGORIES', data?.categories);
		} catch (error) {
			console.log(error);
		}
	},
	async fetchCategoryDetail({ commit, state }, reqBody) {
		try {
			const token = Vue.cookies.get('token');
			const { data } = await axios.get(
				`http://localhost:8080/api/categories/${reqBody}`,
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				}
			);
			commit('GET_CATEGORY_DETAIL', data.category);
		} catch (error) {
			console.log(error);
		}
	},
	clearCategoryDetail({ commit }) {
		commit('CLEAR_CATEGORY_DETAIL');
	},
	async createCategory({ commit, state }, reqBody) {
		try {
			const token = Vue.cookies.get('token');

			const res = await axios.post(
				'http://localhost:8080/api/categories',
				{ categoryName: reqBody },
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
	async editCategory({ commit, state }, reqBody) {
		try {
			const token = Vue.cookies.get('token');
			const { data } = await axios.put(
				`http://localhost:8080/api/categories/${reqBody.id}`,
				{
					categoryName: reqBody.categoryName,
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
	},
	async deleteCategory({ commit, state }, reqBody) {
		try {
			const token = Vue.cookies.get('token');

			const { data } = await axios.delete(
				`http://localhost:8080/api/categories/${reqBody}`,
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
