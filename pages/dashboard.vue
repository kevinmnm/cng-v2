<template>
	<v-col cols="12" class="pb-16">
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
      <ButtonScroll />
	</v-col>
</template>

<script>
import Navbar from '@/components/NavBar.vue'
import Profile from '@/components/Profile.vue'
import ButtonScroll from '@/components/ButtonScroll.vue'
// import io from 'socket.io-client'

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
      ButtonScroll
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

<style scoped>

.dashboard-page {
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
}

</style>