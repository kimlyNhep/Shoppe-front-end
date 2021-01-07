<template>
	<div class="home">
		<Register />
	</div>
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
