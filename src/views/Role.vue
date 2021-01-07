<template>
	<div class="home">
		<Role />
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Role from '@/components/Role.vue';

	export default Vue.extend({
		components: {
			Role,
		},
	});
</script>
