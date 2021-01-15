<template>
  <v-row :style="{ height: '100vh' }" class="align-center">
    <v-col cols="6" md="3">
      <v-img
        :src="require('../assets/authentication.svg')"
        contain
        height="200"
        class="ml-10"
      />
    </v-col>
    <v-col cols="6" md="9">
      <v-snackbar
        v-model="snackbar"
        :timeout="1500"
        absolute
        top
        right
        color="error"
      >
        {{ textError }}

        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
      <v-card width="500px" class="mx-auto pa-5 mt-5" flat outlined>
        <v-card-title> Login </v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="username"
            :rules="usernameRules"
            label="Username"
            required
            outlined
            hide-details
            dense
            class="mb-2"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            type="password"
            required
            outlined
            hide-details
            dense
            class="mb-5"
          ></v-text-field>

          <v-btn
            depressed
            color="primary"
            :disabled="!valid"
            class="mr-4"
            @click="validate"
          >
            Sign In
          </v-btn>
          Don't have any account?
          <a @click="onRegister" :style="{ color: 'red' }">Register</a>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';

export type VForm = Vue & {
  validate: () => boolean;
  resetValidation: () => boolean;
  reset: () => void;
};

const namespace = 'user';

@Component
export default class LoginForm extends Vue {
  @Action('loginUser', { namespace }) loginUser: any;
  valid = true;
  username = '';
  password = '';
  snackbar = false;
  textError = '';

  usernameRules = [(v: string) => !!v || 'Username is required'];
  passwordRules = [
    (v: string) => !!v || 'Password is required',
    (v: string) =>
      (v && v.length >= 4) || 'Password must be greater than or equal 4',
  ];

  @Ref('form') readonly form!: VForm;

  async validate() {
    this.form.validate();
    this.$nextTick(() => {
      this.loginUserForm();
    });
  }

  async loginUserForm() {
    if (this.valid) {
      try {
        await this.loginUser({
          username: this.username,
          password: this.password,
        });
        this.$router.push('/category');
      } catch (error) {
        console.log(error?.response);
        this.snackbar = true;
        this.textError = error?.response?.data?.message;
      }
    }
  }

  onRegister() {
    this.$router.push('/register');
  }

  reset(): void {
    this.form.reset();
  }

  resetValidation(): void {
    this.form.resetValidation();
  }
}
</script>
