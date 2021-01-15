<template>
  <v-app>
    <div class="home">
      <Login />
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Login from '@/components/Login.vue';

export default Vue.extend({
  components: {
    Login,
  },
});
</script>
