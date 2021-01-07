<template>
	<v-card width="500px" class="mx-auto pa-5 mt-5" flat outlined>
		<v-card-title> Register </v-card-title>
		<v-form ref="form" v-model="valid" lazy-validation>
			<v-row>
				<v-col cols="6">
					<v-text-field
						v-model="firstName"
						:rules="nameRules"
						label="First Name"
						required
						outlined
						hide-details
						dense
					></v-text-field>
				</v-col>
				<v-col cols="6">
					<v-text-field
						v-model="lastName"
						:rules="nameRules"
						label="First Name"
						required
						outlined
						hide-details
						dense
					></v-text-field>
				</v-col>
			</v-row>

			<v-text-field
				v-model="username"
				:rules="nameRules"
				label="Username"
				required
				outlined
				hide-details
				dense
				class="mb-2"
			></v-text-field>

			<v-text-field
				v-model="email"
				:rules="emailRules"
				label="E-mail"
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
				Sign Up
			</v-btn>
		</v-form>
	</v-card>
</template>

<script lang="ts">
	import { Component, Ref, Vue } from 'vue-property-decorator';
	import { RegisterModel } from '@/model/RegisterModel';
	import { Action } from 'vuex-class';

	export type VForm = Vue & {
		validate: () => boolean;
		resetValidation: () => boolean;
		reset: () => void;
	};

	const namespace = 'user';

	@Component
	export default class RegisterForm extends Vue {
		@Action('registerUser', { namespace })
		registerUser: typeof Action.prototype;

		valid = true;
		firstName = '';
		lastName = '';
		username = '';
		email = '';
		password = '';

		name = '';
		nameRules = [
			(v: string) => !!v,
			(v: string) =>
				(v && v.length <= 10) || 'Name must be less than 10 characters',
		];
		emailRules = [
			(v: string) => !!v || 'E-mail is required',
			(v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
		];
		passwordRules = [
			(v: string) => !!v || 'Password is required',
			(v: string) =>
				(v && v.length >= 4) || 'Password must be greater than or equal 4',
		];
		select = null;
		items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
		checkbox = false;

		@Ref('form') readonly form!: VForm;

		async validate() {
			this.form.validate();
			this.$nextTick(() => {
				this.save();
			});
		}

		async save() {
			if (this.valid) {
				const registerModel = new RegisterModel(
					this.firstName,
					this.lastName,
					this.username,
					this.email,
					this.password
				);
				try {
					await this.registerUser(registerModel);
				} catch (error) {
					console.log(error);
				}
			}
		}

		reset(): void {
			this.form.reset();
		}

		resetValidation(): void {
			this.form.resetValidation();
		}

		// constructor() {
		// 	super();
		// 	this.register();
		// 	this.firstName = '';
		// 	this.lastName = '';
		// 	this.username = '';
		// 	this.email = '';
		// 	this.password = '';
		// }
	}
</script>
