<template>
  <v-app>
    <div class="home">
      <Register />
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Register from '@/components/Register.vue';

export default Vue.extend({
  components: {
    Register,
  },
});
</script>
