<template>
	<v-col cols="12">
		<Navbar />
		<v-sheet class="d-flex justify-center">
			<v-dialog v-model="dialog" persistent max-width="290">
				<template v-slot:activator="{ on, attrs }">
					<v-btn color="primary" dark v-bind="attrs" v-on="on">
						logout
					</v-btn>
				</template>
				<v-card>
					<v-card-title class="headline">
						Use Google's location service?
					</v-card-title>
					<v-card-text
						>Let Google help apps determine location. This means sending
						anonymous location data to Google, even when no apps are
						running.</v-card-text
					>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="error" width="100px" @click="dialog = false">
							no
						</v-btn>
						<v-btn color="primary" width="100px" @click="logout()">
							yes
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-sheet>
	</v-col>
</template>

<script>
import Navbar from '@/components/NavBar.vue'

export default {
   name: 'DashboardComp',
   data(){
      return {
         dialog: false
      }
   },
	components: {
		Navbar,
	},
	methods: {
		logout() {
			localStorage.token = null;
         this.$store.dispatch('logged/fetchLogged', false);
         this.dialog = false;
         this.$router.push('/');
		},
	},
}
</script>

<style>
</style>