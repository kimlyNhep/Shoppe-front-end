<template>
  <Layout>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="getRoles || []"
        sort-by="calories"
        class="elevation-1"
        :loading="loading"
        hide-default-footer
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Role</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
      </v-data-table>
    </v-container>
  </Layout>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import Layout from '@/layout/default.vue';

const namespace = 'role';

export type VForm = Vue & {
  validate: () => boolean;
  resetValidation: () => boolean;
  reset: () => void;
};

@Component({ components: { Layout } })
export default class Role extends Vue {
  @Action('fetchRoles', { namespace })
  fetchRoles: typeof Action.prototype;

  @Getter('getRoles', { namespace })
  getRoles: typeof Getter.prototype;

  @Ref('form') readonly form!: VForm;

  dialog = false;
  dialogDelete = false;
  headers = [
    {
      text: 'Role Name',
      align: 'start',
      sortable: false,
      value: 'roleName',
    },
    {
      text: 'User',
      align: 'start',
      sortable: false,
      value: 'roleName',
    },
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
      await this.fetchRoles();
    } catch (error) {
      console.log(error);
      if (error === 403) {
        this.$router.push('/403');
      }
    }
  }

  // close() {
  //   this.dialog = false;
  //   this.$store.dispatch('clearCategoryDetail');
  //   this.$nextTick(() => {
  //     this.editedItem = Object.assign({}, this.defaultItem);
  //     this.editedIndex = -1;
  //   });
  // }

  // closeDelete() {
  //   this.dialogDelete = false;
  //   this.$store.dispatch('clearCategoryDetail');
  //   this.$nextTick(() => {
  //     this.editedItem = Object.assign({}, this.defaultItem);
  //     this.editedIndex = -1;
  //   });
  // }

  validate() {
    this.form.validate();
    this.$nextTick(() => {
      // this.save();
    });
  }
}
</script>
