<template>
  <v-app>
    <v-app-bar app color="grey" dark flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>

      <!-- <v-btn v-if="!isLoggin" color="green mr-5" depressed link to="/login">
        Login</v-btn
      > -->
      <span class="mr-5" :style="{ color: 'black' }">{{
        this['user/getMe'].username
      }}</span>
      <v-btn color="green mr-5" depressed @click="onLogout"> LogOut</v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item link to="/category">
            <v-list-item-title>Category</v-list-item-title>
          </v-list-item>

          <v-list-item link to="/product">
            <v-list-item-title>Product</v-list-item-title>
          </v-list-item>

          <!-- <v-list-item link to="/role">
            <v-list-item-title>Role</v-list-item-title>
          </v-list-item> -->
          <v-list-group :value="value">
            <template v-slot:activator>
              <v-list-item-title>Authentication</v-list-item-title>
            </template>

            <!-- <v-list-group :value="true" no-action sub-group> -->
            <!-- <template v-slot:activator> -->
            <!-- <v-list-item-content>
							<v-list-item-title>Admin</v-list-item-title>
						</v-list-item-content> -->
            <!-- </template> -->

            <v-list-item link to="/user">
              <v-list-item-title>users</v-list-item-title>
            </v-list-item>
            <v-list-item link to="/role">
              <v-list-item-title>roles</v-list-item-title>
            </v-list-item>
            <!-- </v-list-group> -->
          </v-list-group>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { Getter } from 'vuex-class';

export default Vue.extend({
  name: 'App',
  data() {
    return {
      isLoggin: false,
      drawer: false,
      group: null,
      value: false,
      users: ['Roles', 'users'],
    };
  },
  watch: {
    // group() {
    // 	this.drawer = false;
    // },
  },
  computed: {
    ...mapGetters(['user/getMe']),
  },
  async mounted() {
    await this.$store.dispatch('user/me');
    const token = Vue.cookies.get('token');
    console.log(this['user/getMe'].username);
    if (token) this.isLoggin = true;
    else this.isLoggin = false;
  },
  methods: {
    async onLogout() {
      await this.$store.dispatch('user/logOutUser');
      this.$router.push('/login');
    },
  },
});
</script>
