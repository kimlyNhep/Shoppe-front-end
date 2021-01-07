import Vuex, { StoreOptions } from 'vuex';
import Vue from 'vue';
import { RootState } from './types';
import { category } from './category';
import { user } from './user';
import { product } from './product';
import { role } from './role';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
	state: {
		version: '1.0.0',
	},
	modules: {
		category,
		user,
		product,
		role,
	},
};

export default new Vuex.Store<RootState>(store);
