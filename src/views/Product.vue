<template>
	<div class="home">
		<Product />
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Product from '@/components/Product.vue';

	export default Vue.extend({
		components: {
			Product,
		},
	});
</script>
