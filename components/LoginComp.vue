<template>
	<v-row class="d-flex flex-column text-center">
		<v-sheet class="mb-3">
			<h1 class="login-title ma-auto">CNG</h1>
		</v-sheet>
		<v-col cols="12" class="col-lg-6 ma-auto mb-5">
			<v-card class="ma-auto pa-1" style="border: 2px solid lightGrey">
				<v-card-title>
					<h3>LOGIN</h3>
				</v-card-title>
				<v-card-text>
					<v-form autocomplete="off">
						<v-text-field
							filled
							dense
							outlined
							label="Username"
							prepend-icon="mdi-account-circle"
							v-model="login_username"
							:error="login_username_error"
							@change="login_username_error = false"
						></v-text-field>
						<v-text-field
							filled
							outlined
							dense
							label="Password"
							type="password"
							prepend-icon="mdi-lock"
							v-model="login_password"
							:error="login_password_error"
							@change="login_password_error = false"
						></v-text-field>
					</v-form>
					<v-checkbox dense label="Remember Username"></v-checkbox>
				</v-card-text>
				<v-card-actions>
					<v-btn
						color="primary"
						width="100px"
						@click="loginFunction()"
						:loading="login_loading"
						>Login</v-btn
					>
				</v-card-actions>
			</v-card>
		</v-col>

		<v-btn
			text
			x-large
			class="ma-auto"
			color="accent"
			width="200px"
			@click="showSignup()"
			>new?</v-btn
		>

		<v-col
			cols="12"
			class="col-lg-6 ma-auto mt-5"
			v-show="show_signup"
			id="signup"
		>
			<v-card class="ma-auto" style="border: 2px solid lightGrey">
				<v-card-title>
					<h3>SIGNUP</h3>
					<v-icon
						right
						color="info"
						@click="dialog = 'true'"
						class="info-icon"
						size="30"
						>mdi-information</v-icon
					>
				</v-card-title>
				<v-card-text>
					<v-form autocomplete="off">
						<v-text-field
							filled
							dense
							outlined
							label="Continuum Email"
							type="email"
							prepend-icon="mdi-email"
							v-model="validator_list[0].signup_email.text"
							:error="validator_list[0].signup_email.error"
						></v-text-field>
						<v-sheet class="d-flex flex-row justify-space-between">
							<v-col cols="6" class="pa-0 ma-0">
								<v-text-field
									filled
									outlined
									dense
									label="First Name"
									prepend-icon="mdi-account-question"
									v-model="validator_list[0].signup_first_name.text"
									:error="validator_list[0].signup_first_name.error"
								></v-text-field>
							</v-col>
							<v-col cols="6" class="pa-0 ma-0">
								<v-text-field
									filled
									dense
									outlined
									label="Last Name"
									v-model="validator_list[0].signup_last_name.text"
									:error="validator_list[0].signup_last_name.error"
								></v-text-field>
							</v-col>
						</v-sheet>
						<v-text-field
							filled
							dense
							outlined
							label="Username"
							prepend-icon="mdi-account-circle"
							v-model="validator_list[0].signup_username.text"
							:error="validator_list[0].signup_username.error"
						></v-text-field>
						<v-text-field
							filled
							dense
							outlined
							type="password"
							label="Password"
							prepend-icon="mdi-lock"
							v-model="validator_list[0].signup_password.text"
							:error="validator_list[0].signup_password.error"
						></v-text-field>
						<v-text-field
							filled
							outlined
							dense
							type="password"
							label="Verify Password"
							prepend-icon="mdi-lock-check"
							v-model="validator_list[0].signup_password_verify.text"
							:error="validator_list[0].signup_password_verify.error"
						></v-text-field>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-btn @click="signupFunc()" color="success" width="100px" right
						>Signup</v-btn
					>
				</v-card-actions>
			</v-card>
		</v-col>
		<v-dialog v-model="dialog" presistent>
         <v-btn fab icon absolute small right color="primary" class="ma-3" @click="dialog = false">
            <v-icon dense>mdi-close-thick</v-icon>
         </v-btn>
			<v-card tile>
				<v-card-title class="headline">Signup Guide</v-card-title>
				<v-list class="pa-0 ma-0" dense>
					<v-list-item
						v-for="all in signup_guide"
						:key="all.title"
						class="text-center d-flex flex-column pa-0 ma-0"
					>
						<v-card-title
							class="pa-0 ma-0"
							v-html="'<u>' + all.title + '</u>'"
						></v-card-title>
						<v-card-text class="pa-0 ma-0">{{ all.des }}</v-card-text>
						<v-card-subtitle class="pa-0 ma-0">{{
							'Example: ' + all.example
						}}</v-card-subtitle>
					</v-list-item>
				</v-list>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
import openSocket from 'socket.io-client';

export default {
	name: 'LoginComp',
	data() {
		return {
			show_signup: false,
			dialog: false,
			login_username: '',
			login_password: '',
			login_username_error: false,
			login_password_error: false,
			login_loading: false,
			validator_list: [
				{
					signup_email: {
						text: '',
						error: false,
					},
					signup_first_name: {
						text: '',
						error: false,
					},
					signup_last_name: {
						text: '',
						error: false,
					},
					signup_username: {
						text: '',
						error: false,
					},
					signup_password: {
						text: '',
						error: false,
					},
					signup_password_verify: {
						text: '',
						error: false,
					},
				},
			],
			validator_keys_array: null,
			validator_values_array: null,
			signup_guide: [
				{
					title: 'Continuum Email',
					des: 'Will be used to identify user',
					example: 'first.last@continuumgbl.com',
					col: true,
				},
				{
					title: 'Name',
					des: 'Will be auto imported when creating notes',
					example: 'John Doe',
					col: false,
				},
				{
					title: 'Username',
					des: 'Will be a primary login ID',
					example: 'myid123',
					col: true,
				},
				{
					title: 'Password',
					des:
						'Credential that will be encoded securely upon signup. Must be at least 6 characters long.',
					example: 'hello5',
					col: false,
				},
			],
		}
	},
	methods: {
		async loginFunction() {
			this.login_loading = true
			if (!this.login_username || !this.login_password) {
				if (!this.login_username) this.login_username_error = true
				if (!this.login_password) this.login_password_error = true
				return (this.login_loading = false)
				// return alert('err - empthy');
			}

			let response = await fetch(
				this.$store.state.store.fetch_url + '/login',
				{
					headers: { 'Content-Type': 'application/json' },
					method: 'POST',
					body: JSON.stringify({
						login_username: this.login_username,
						login_password: this.login_password,
					}),
				}
			)

			response.json().then((data) => {
				if (data.logged) {
               localStorage.token = 'Bearer ' + data.token
               openSocket(this.$store.state.store.fetch_url);
					location.reload() // Consider changeing it to non-reloading method.
				} else {
               this.login_loading = false;
               if (data.msg === 'Invalid Username') this.login_username_error = true;
               if (data.msg === 'Invalid Password') this.login_password_error = true;
               alert(data.msg);
            }
			})
		},
		async showSignup() {
			await (() => (this.show_signup = true))()
			this.$vuetify.goTo('#signup')
		},
		async signupFunc() {
			this.validator_keys_array = Object.keys(this.validator_list[0])
			this.validator_values_array = Object.values(this.validator_list[0])

			for (let i = 0; i < this.validator_values_array.length; i++) {
				// console.dir( this.validator_list[0][this.validator_keys_array[i]].error );
				if (!this.validator_list[0][this.validator_keys_array[i]].text) {
					this.validator_list[0][this.validator_keys_array[i]].error = true
				}
			}

			let response = await fetch(
				this.$store.state.store.fetch_url + '/signup',
				{
					headers: { 'Content-Type': 'application/json' },
					method: 'POST',
					body: JSON.stringify({
						email: this.validator_list[0].signup_email.text,
						first_name: this.validator_list[0].signup_first_name.text,
						last_name: this.validator_list[0].signup_last_name.text,
						username: this.validator_list[0].signup_username.text,
						password: this.validator_list[0].signup_password.text,
						password_verify: this.validator_list[0].signup_password_verify.text,
					})
				}
			)

			response.json().then((res) => {
				if (response.status === 200 && res.signedUp) {
               alert(res.msg);
					location.reload();
				}
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.login-title {
	font-family: 'Nunito', sans-serif;
	cursor: pointer;
	width: 200px;
	user-select: none;

	&:hover {
		text-shadow: 0 0 3px yellowGreen;
	}
}

.info-icon {
	cursor: pointer;

	&:hover {
		color: yellow;
	}
}
</style>