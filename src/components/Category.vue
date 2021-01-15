<template>
  <Layout>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="getCategories || []"
        sort-by="calories"
        class="elevation-1"
        :loading="loading"
        hide-default-footer
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>CATEGORIES</v-toolbar-title>
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
                  New Category
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="grey lighten-1">
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-form v-model="valid" ref="form" lazy-validation>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.categoryName"
                            label="Category Name"
                            :rules="[(v) => !!v || 'Category Name is required']"
                            required
                            outlined
                            dense
                          ></v-text-field>
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
                    >Save</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.user`]="{ item }">
          {{ item.user.username }}
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
  </Layout>
</template>

<script lang="ts">
import { CategoryModel } from '@/model/CategoryModel';
import { CategoryType } from '@/store/category/types';
import { Vue, Component, Ref } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import Layout from '@/layout/default.vue';

const namespace = 'category';

export type VForm = Vue & {
  validate: () => boolean;
  resetValidation: () => boolean;
  reset: () => void;
};

@Component({ name: 'Category', components: { Layout } })
export default class Category extends Vue {
  @Action('fetchCategories', { namespace })
  fetchCategories!: () => Promise<void>;

  @Action('createCategory', { namespace })
  createCategory!: (categoryName: string) => Promise<void>;

  @Action('deleteCategory', { namespace })
  deleteCategory!: (categoryId: number) => Promise<void>;

  @Action('editCategory', { namespace })
  editCategory!: (category: CategoryModel) => Promise<void>;

  @Action('fetchCategoryDetail', { namespace })
  fetchCategoryDetail!: (categoryId: number) => Promise<void>;
  @Action('clearCategoryDetail', { namespace })
  clearCategoryDetail!: () => void;

  @Getter('getCategories', { namespace })
  getCategories?: CategoryType[];

  @Getter('getCategoryDetail', { namespace })
  getCategoryDetail: CategoryType | undefined;
  @Ref('form')
  readonly form!: VForm;

  dialog = false;
  dialogDelete = false;
  headers = [
    {
      text: 'Category Name',
      align: 'start',
      sortable: false,
      value: 'categoryName',
    },
    { text: 'Creator', value: 'user', sortable: false },
    { text: 'Actions', value: 'actions', sortable: false },
  ];
  categories = [];
  editedIndex = -1;
  editedItem = {
    categoryId: -1,
    categoryName: '',
  };
  defaultItem = {
    categoryId: -1,
    categoryName: '',
  };
  loading = false;
  valid = true;

  // computed
  get formTitle(): string {
    return this.editedIndex === -1 ? 'New Catogory' : 'Edit Category';
  }

  // mounted
  async mounted() {
    try {
      await this.fetchCategories();
    } catch (error) {
      console.log(error);
    }
  }

  async editItem(item: any) {
    this.editedIndex = item?.id;
    this.loading = true;
    try {
      await this.fetchCategoryDetail(this.editedIndex);
      if (this.getCategoryDetail) {
        this.editedItem = {
          categoryId: this.getCategoryDetail.id,
          categoryName: this.getCategoryDetail.categoryName,
        };
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
      this.dialog = true;
      Object.assign(this.editedItem, {});
    }
  }

  async deleteItem(item: any) {
    this.editedIndex = item?.id;
    this.loading = true;
    try {
      await this.fetchCategoryDetail(this.editedIndex);
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
      this.dialogDelete = true;
      Object.assign(this.editedItem, {});
    }
  }

  async deleteItemConfirm() {
    this.loading = true;
    try {
      await this.deleteCategory(this.editedIndex);

      await this.fetchCategories();
    } catch (error) {
      console.log(error);
      if (error === 403) {
        this.$router.push('/403');
      }
    } finally {
      this.loading = false;
      this.closeDelete();
      this.editedIndex = -1;
    }
  }

  close() {
    this.dialog = false;
    this.clearCategoryDetail;
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    });
  }

  closeDelete() {
    this.dialogDelete = false;
    this.clearCategoryDetail;
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
    this.loading = true;
    if (this.valid) {
      try {
        if (this.editedIndex === -1) {
          await this.createCategory(this.editedItem.categoryName);
        } else {
          await this.editCategory(
            new CategoryModel(
              this.editedItem.categoryId,
              this.editedItem.categoryName
            )
          );
        }

        await this.fetchCategories();
      } catch (error) {
        if (error === 403) {
          this.$router.push('/403');
        }
      } finally {
        this.loading = false;
        this.close();
        Object.assign(this.editedItem, this.defaultItem);
      }
    }
    this.loading = false;
  }
}
</script>
