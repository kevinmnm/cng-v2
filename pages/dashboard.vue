<template>
	<v-col cols="12">
		<Navbar />
		<v-sheet class="d-flex justify-center" style="background-color: transparent;">
			<v-dialog v-model="dialog" persistent max-width="290">
				<template v-slot:activator="{ on, attrs }">
					<v-btn
						color="deep-orange"
						dark
						v-bind="attrs"
						v-on="on"
						small
						depressed
					>
						logout
					</v-btn>
				</template>
				<v-card>
					<v-card-title class="headline text-center">
						Are you sure you want to log out?
					</v-card-title>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="shades" width="100px" @click="dialog = false">
							no
						</v-btn>
						<v-btn
							color="deep-orange"
							dark
							width="100px"
							@click="logout()"
						>
							yes
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-sheet>
		<Profile />
	</v-col>
</template>

<script>
import Navbar from '@/components/NavBar.vue'
import Profile from '@/components/Profile.vue'

export default {
	name: 'DashboardComp',
	data() {
		return {
			dialog: false,
		}
	},
	components: {
		Navbar,
		Profile,
	},
	methods: {
		logout() {
			localStorage.token = null
			this.$store.commit('logged/SET_LOGGED', false)
			this.dialog = false
			this.$router.push('/')
			window.socket.disconnect()
		},
   },
   mounted(){
      if (localStorage.darkModeCng) {
			if (localStorage.darkModeCng === 'true') {
				this.$vuetify.theme.dark = true
			} else {
				this.$vuetify.theme.dark = false
			}
		}
   }
}
</script>

<style>
</style>