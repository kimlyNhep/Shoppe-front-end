<template>
	<div class="home">
		<User />
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import User from '@/components/User.vue';

	export default Vue.extend({
		components: {
			User,
		},
	});
</script>
