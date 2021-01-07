<template>
	<v-container>
		<v-data-table
			:headers="headers"
			:items="getProducts || []"
			sort-by="calories"
			class="elevation-1"
			:loading="loading"
			hide-default-footer
		>
			<template v-slot:top>
				<v-toolbar flat>
					<v-toolbar-title>Product</v-toolbar-title>
					<v-divider class="mx-4" inset vertical></v-divider>
					<v-spacer></v-spacer>
					<v-dialog v-model="dialog" max-width="500px">
						<template v-slot:activator="{ on, attrs }">
							<v-btn
								depressed
								color="primary"
								dark
								class="mb-2"
								v-bind="attrs"
								rounded
								v-on="on"
							>
								<v-icon class="mr-2"> mdi-plus-circle-outline</v-icon>
								New Product
							</v-btn>
						</template>
						<v-card>
							<v-card-title class="grey lighten-1">
								<span class="headline">{{ formTitle }}</span>
							</v-card-title>

							<v-card-text>
								<v-container>
									<v-form v-model="valid" lazy-validation ref="form">
										<v-row>
											<v-col cols="12">
												<v-text-field
													v-model="editedItem.productName"
													label="Product Name"
													:rules="[(v) => !!v || 'Product Name is required']"
													outlined
													required
													dense
												></v-text-field>
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="12">
												<v-text-field
													v-model="editedItem.description"
													label="Description"
													:rules="[(v) => !!v || 'Description is required']"
													required
													outlined
													dense
												></v-text-field>
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="12">
												<v-text-field
													v-model="editedItem.price"
													label="Price"
													type="number"
													:step="0.01"
													:rules="[
														(v) =>
															!!v || v > 0 || 'Price must be greater than zero',
													]"
													:min="0"
													autocomplete="off"
													outlined
													dense
												></v-text-field>
											</v-col>
										</v-row>
										<v-row>
											<v-col cols="12">
												<v-combobox
													v-model="editedItem.category"
													:items="getCategorySelectBox"
													label="Category"
													auto-select-first
													outlined
													dense
												></v-combobox>
											</v-col>
										</v-row>
									</v-form>
								</v-container>
							</v-card-text>

							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn
									color="grey lighten-1"
									dark
									min-width="108px"
									depressed
									@click="close"
								>
									Cancel
								</v-btn>
								<v-btn
									color="blue darken-1"
									dark
									depressed
									min-width="108px"
									@click="validate"
								>
									Save
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
					<v-dialog v-model="dialogDelete" max-width="500px">
						<v-card>
							<v-card-title class="headline"
								>Are you sure you want to delete this item?</v-card-title
							>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn
									color="grey lighten-1"
									dark
									depressed
									@click="closeDelete"
									min-width="108px"
									>Cancel</v-btn
								>
								<v-btn
									color="blue darken-1"
									depressed
									dark
									min-width="108px"
									@click="deleteItemConfirm"
									>Delete</v-btn
								>
								<v-spacer></v-spacer>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</v-toolbar>
			</template>
			<template v-slot:[`item.price`]="{ item }"> $ {{ item.price }} </template>
			<template v-slot:[`item.category`]="{ item }">
				{{ item.category.categoryName }}
			</template>
			<template v-slot:[`item.actions`]="{ item }">
				<v-icon small class="mr-2" @click="editItem(item)" color="primary">
					mdi-pencil-outline
				</v-icon>
				<v-icon small @click="deleteItem(item)" color="red">
					mdi-delete-outline
				</v-icon>
			</template>
		</v-data-table>
	</v-container>
</template>

<script lang="ts">
	import { ProductModel } from '@/model/ProductModel';
	import { Vue, Component, Ref } from 'vue-property-decorator';
	// import { Action, Getter } from 'vuex-class';
	import { namespace } from 'vuex-class';

	const categoryNamespace = namespace('category');
	const productNamespace = namespace('product');

	export type VForm = Vue & {
		validate: () => boolean;
		resetValidation: () => boolean;
		reset: () => void;
	};

	@Component
	export default class Product extends Vue {
		@categoryNamespace.Action('fetchCategories')
		fetchCategories: typeof categoryNamespace.Action.prototype;

		@productNamespace.Action('fetchProducts')
		fetchProducts: typeof productNamespace.Action.prototype;

		@productNamespace.Action('createProduct')
		createProduct: typeof productNamespace.Action.prototype;

		@productNamespace.Action('editProduct')
		editProduct: typeof productNamespace.Action.prototype;

		@productNamespace.Action('fetchProductDetail')
		fetchProductDetail: typeof productNamespace.Action.prototype;

		@productNamespace.Action('deleteProduct')
		deleteProduct: typeof productNamespace.Action.prototype;

		@productNamespace.Getter('getProducts')
		getProducts: typeof productNamespace.Getter.prototype;

		@productNamespace.Getter('getProductDetail')
		getProductDetail: typeof productNamespace.Getter.prototype;

		@categoryNamespace.Getter('getCategorySelectBox')
		getCategorySelectBox?: () => { text: string; value: number }[] | undefined;

		@Ref('form') readonly form!: VForm;

		dialog = false;
		dialogDelete = false;
		headers = [
			{
				text: 'Product Name',
				align: 'start',
				sortable: false,
				value: 'productName',
			},
			{ text: 'Description', value: 'description', sortable: false },
			{ text: 'Price', value: 'price' },
			{ text: 'Category', value: 'category' },
			{ text: 'Actions', value: 'actions', sortable: false },
		];
		categories = [];
		editedIndex = -1;
		editedItem = {
			productName: '',
			description: '',
			price: 0,
			category: { text: '', value: -1 },
		};
		defaultItem = {
			productName: '',
			description: '',
			price: 0,
			category: { text: '', value: -1 },
		};
		loading = false;
		getCategoryDetail?: {};
		valid = true;

		// computed
		get formTitle(): string {
			return this.editedIndex === -1 ? 'New Product' : 'Edit Product';
		}

		// mounted
		async mounted() {
			try {
				await this.fetchCategories();
				await this.fetchProducts();
			} catch (error) {
				console.log(error);
			}
		}

		async editItem(item: any) {
			this.editedIndex = item?.id;
			this.loading = true;
			try {
				await this.fetchProductDetail(this.editedIndex);

				if (this.getProductDetail) {
					this.editedItem = {
						productName: this.getProductDetail.productName,
						description: this.getProductDetail.description,
						price: +this.getProductDetail.price,
						category: {
							text: this.getProductDetail.category.categoryName,
							value: this.getProductDetail.category.id,
						},
					};
					console.log(this.editedItem);
				}
			} catch (error) {
				console.log(error);
			} finally {
				this.loading = false;
				this.dialog = true;
			}
		}

		async deleteItem(item: any) {
			this.editedIndex = item?.id;
			this.loading = true;
			try {
				await this.fetchProductDetail(this.editedIndex);

				if (this.getProductDetail) {
					this.editedItem = {
						productName: this.getProductDetail.productName,
						description: this.getProductDetail.description,
						price: +this.getProductDetail.price,
						category: {
							text: this.getProductDetail.category.categoryName,
							value: this.getProductDetail.category.id,
						},
					};
					console.log(this.editedItem);
				}
			} catch (error) {
				console.log(error);
			} finally {
				this.loading = false;
				this.dialogDelete = true;
			}
		}

		async deleteItemConfirm() {
			this.loading = true;
			try {
				await this.deleteProduct(this.editedIndex);

				await this.fetchProducts();
			} catch (error) {
				console.log(error);
			} finally {
				this.loading = false;
				this.closeDelete();
				this.editedIndex = -1;
			}
		}

		close() {
			this.dialog = false;
			this.$store.dispatch('clearCategoryDetail');
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		}

		closeDelete() {
			this.dialogDelete = false;
			this.$store.dispatch('clearCategoryDetail');
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		}

		validate() {
			this.form.validate();
			this.$nextTick(() => {
				this.save();
			});
		}

		async save() {
			console.log(this.editedItem);
			if (this.valid) {
				this.loading = true;
				try {
					if (this.editedIndex === -1) {
						await this.createProduct(
							new ProductModel({
								productName: this.editedItem.productName,
								description: this.editedItem.description,
								price: +this.editedItem.price,
								categoryId: +this.editedItem.category?.value,
							})
						);
					} else {
						await this.editProduct({
							index: this.editedIndex,
							product: new ProductModel({
								productName: this.editedItem.productName,
								description: this.editedItem.description,
								price: this.editedItem.price,
								categoryId: this.editedItem.category.value,
							}),
						});
					}
					await this.fetchProducts();
				} catch (error) {
					console.log(error);
				} finally {
					this.loading = false;
					this.close();
					Object.assign(this.editedItem, this.defaultItem);
				}
			}
		}
	}
</script>
