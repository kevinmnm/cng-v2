<template>
	<v-col cols="12">
		<Navbar />
		<v-sheet class="d-flex justify-center flex-row">
			<v-col cols="6" class="text-center">
				<v-btn>caremark</v-btn>
			</v-col>
			<v-col cols="6" class="text-center">
				<v-btn>non-caremark</v-btn>
			</v-col>
		</v-sheet>
		<v-sheet>
			<h3 class="text-center">Drug Info</h3>
			<v-card class="d-flex justify-center">
				<v-card flat>
					<v-text-field
						label="Drug Name"
						width="20%"
						autocomplete="off"
						outlined
						dense
					></v-text-field>
				</v-card>
				<v-card flat>
					<v-text-field
						label="Strength"
						width="20%"
						autocomplete="off"
						outlined
						dense
					></v-text-field>
				</v-card>
				<v-card flat>
					<v-text-field
						label="Quantity"
						width="20%"
						autocomplete="off"
						outlined
						dense
					></v-text-field>
				</v-card>
				<v-card flat>
					<v-text-field
						label="Days of Supply"
						width="20%"
						autocomplete="off"
						outlined
						dense
					></v-text-field>
				</v-card>
				<v-card flat>
					<v-text-field
						label="NDC"
						width="20%"
						autocomplete="off"
						outlined
						dense
					></v-text-field>
				</v-card>
			</v-card>
			<v-card>
				<h2 class="text-center">Case Outcome</h2>
				<v-select
					outlined
					solo
					filled
					:items="[
						'PA initial',
						'Copay $25 or less',
						'CPA attempt #1',
						'CPA attempt #2',
						'Ptient denies CPA',
						'Copay is over $25 for Medicare/Medicaid',
						'External/Internal triage',
						'PA denial template',
					]"
					label="Choose"
				></v-select>
			</v-card>
		</v-sheet>
		<v-sheet class="d-flex justify-center flex-column" color="primary">
			<WelcomeCallTemplate />
		</v-sheet>
	</v-col>
</template>

<script>
import { mapState } from 'vuex'
import io from 'socket.io-client'
import Navbar from './NavBar.vue'
import WelcomeCallTemplate from './template/WelcomeCall.vue'

export default {
	name: 'LoggedComp',
	components: {
		Navbar,
		WelcomeCallTemplate,
	},
	computed: mapState({
		fetch_url(state) {
			return state.store.fetch_url
		},
	}),
	mounted() {
      this.$store.dispatch('logged/fetchAuth', this.fetch_url)
         .then( res => {
            window.socket = io(this.fetch_url);
            console.warn(window.socket);
            window.socket.on('customEvent', data => {
               console.warn(data);
            });
         });
	},
}
</script>

<style scoped>
#asdf {
	color: #131313;
}
</style>
