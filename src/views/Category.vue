<template>
	<div class="home">
		<Category />
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Category from '@/components/Category.vue';

	export default Vue.extend({
		components: {
			Category,
		},
	});
</script>
