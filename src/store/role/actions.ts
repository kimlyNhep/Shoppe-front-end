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

      commit('SET_ROLES', data);
    } catch (error) {
      console.log(error);
      throw error?.response?.status;
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

      commit('SET_USERS', data);
    } catch (error) {
      console.log(error);
      throw error?.response?.status;
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
    } catch (error) {
      console.log(error);
      throw error?.response?.status;
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
      commit('SET_USERS_ROLES_DETAIL', data);
    } catch (error) {
      console.log(error);
      throw error?.response?.status;
    }
  },
  clearCategoryDetail({ commit }) {
    commit('CLEAR_CATEGORY_DETAIL');
  },
};
