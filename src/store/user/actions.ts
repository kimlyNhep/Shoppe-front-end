import Vue from 'vue';
import { ActionTree } from 'vuex';
import axios from 'axios';
import { User, UserState } from './types';
import { RootState } from '../types';

export const actions: ActionTree<UserState, RootState> = {
  async loginUser({ commit }, reqBody) {
    const { data } = await axios.post(
      'http://localhost:8080/api/users/login',
      reqBody
    );
    const token = data.token;

    commit('SET_ME', data.user);

    console.log(data);

    Vue.cookies.set('token', token);
  },
  async logOutUser({ commit }, reqBody) {
    Vue.cookies.remove('token');
  },
  async registerUser({ commit }, reqBody) {
    const { data } = await axios.post(
      'http://localhost:8080/api/users/register',
      reqBody
    );

    const token = data.token;

    commit('SET_ME', data.user);

    console.log(reqBody);

    Vue.cookies.set('token', token);
  },
  async me({ commit }, reqBody) {
    const token = Vue.cookies.get('token');

    const { data } = await axios.get('http://localhost:8080/api/users/me', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    commit('SET_ME', data.user);
  },
};
