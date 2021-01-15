<template>
  <Layout>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="getUsers || []"
        sort-by="calories"
        class="elevation-1"
        :loading="loading"
        hide-default-footer
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Users</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title class="grey lighten-1">
                  <span class="headline">Change Roles</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-form v-model="valid" lazy-validation ref="form">
                      <v-row>
                        <v-col cols="12">
                          <v-combobox
                            v-model="editedItem.roles"
                            :items="getRoleSelectBox"
                            label="Roles"
                            auto-select-first
                            outlined
                            multiple
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
          </v-toolbar>
        </template>
        <template v-slot:[`item.roles`]="{ item }">
          <v-chip v-for="role in item.roles" :key="role.id" small>
            {{ role.name }}
          </v-chip>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)" color="primary">
            mdi-pencil-outline
          </v-icon>
          Change Role
        </template>
      </v-data-table>
    </v-container>
  </Layout>
</template>

<script lang="ts">
import { role } from '@/store/role';
import { Vue, Component, Ref } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import Layout from '@/layout/default.vue';

const roleNamespace = namespace('role');

export type VForm = Vue & {
  validate: () => boolean;
  resetValidation: () => boolean;
  reset: () => void;
};

@Component({ components: { Layout } })
export default class User extends Vue {
  @roleNamespace.Action('fetchUsers')
  fetchUsers: typeof roleNamespace.Action.prototype;

  @roleNamespace.Action('fetchRoles')
  fetchRoles: typeof roleNamespace.Action.prototype;

  @roleNamespace.Action('changeRoles')
  changeRoles: typeof roleNamespace.Action.prototype;

  @roleNamespace.Action('fetchUserDetail')
  fetchUserDetail: typeof roleNamespace.Action.prototype;

  @roleNamespace.Getter('getUsers')
  getUsers: typeof roleNamespace.Getter.prototype;

  @roleNamespace.Getter('getRoleSelectBox')
  getRoleSelectBox: typeof roleNamespace.Getter.prototype;

  @roleNamespace.Getter('getUserDetail')
  getUserDetail: typeof roleNamespace.Getter.prototype;

  @Ref('form') readonly form!: VForm;

  dialog = false;
  dialogDelete = false;
  headers = [
    {
      text: 'First Name',
      align: 'start',
      sortable: false,
      value: 'firstName',
    },
    { text: 'Last Name', value: 'lastName', sortable: false },
    { text: 'Username', value: 'username' },
    { text: 'Roles', value: 'roles', sortable: false },
    { text: 'Actions', value: 'actions', sortable: false },
  ];
  categories = [];
  editedIndex = -1;
  editedItem = {
    roles: [],
  };
  defaultItem = {
    roles: [],
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
      await this.fetchRoles();
      await this.fetchUsers();
    } catch (error) {
      console.log(error);
      if (error === 403) {
        this.$router.push('/403');
      }
    }
  }

  async editItem(item: any) {
    this.editedIndex = item?.id;
    this.loading = true;
    try {
      await this.fetchUserDetail(this.editedIndex);
      // if (this.getProductDetail) {
      // 	this.editedItem = {
      // 		productName: this.getProductDetail.productName,
      // 		description: this.getProductDetail.description,
      // 		price: +this.getProductDetail.price,
      // 		category: {
      // 			text: this.getProductDetail.category.categoryName,
      // 			value: this.getProductDetail.category.id,
      // 		},
      // 	};
      // 	console.log(this.editedItem);
      // }
      this.editedItem.roles = this.getUserDetail.map((role: any) => ({
        text: role.name,
        value: +role.id,
      }));
    } catch (error) {
      console.log(error);
      if (error === 403) {
        this.$router.push('/403');
      }
    } finally {
      this.loading = false;
      this.dialog = true;
    }
  }

  async deleteItem(item: any) {
    this.editedIndex = item?.id;
    this.loading = true;
    // try {
    // 	await this.fetchProductDetail(this.editedIndex);
    // 	if (this.getProductDetail) {
    // 		this.editedItem = {
    // 			productName: this.getProductDetail.productName,
    // 			description: this.getProductDetail.description,
    // 			price: +this.getProductDetail.price,
    // 			category: {
    // 				text: this.getProductDetail.category.categoryName,
    // 				value: this.getProductDetail.category.id,
    // 			},
    // 		};
    // 		console.log(this.editedItem);
    // 	}
    // } catch (error) {
    // 	console.log(error);
    // } finally {
    // 	this.loading = false;
    // 	this.dialogDelete = true;
    // }
  }

  async deleteItemConfirm() {
    // this.loading = true;
    // try {
    // 	await this.deleteProduct(this.editedIndex);
    // 	await this.fetchProducts();
    // } catch (error) {
    // 	console.log(error);
    // } finally {
    // 	this.loading = false;
    // 	this.closeDelete();
    // 	this.editedIndex = -1;
    // }
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
        await this.changeRoles({
          index: this.editedIndex,
          roles: this.editedItem?.roles.map((role: any) => role?.value),
        });

        await this.fetchUsers();
      } catch (error) {
        console.log(error);
        if (error) {
          this.$router.push('/403');
        }
      } finally {
        this.loading = false;
        this.close();
        Object.assign(this.editedItem, this.defaultItem);
      }
    }
  }
}
</script>
