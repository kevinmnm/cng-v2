<template>
	<v-app-bar app dense>
		<v-toolbar-title class="font-weight-bold" style="height: 100%">
			<v-tooltip bottom>
				<template v-slot:activator="{ on, attrs }">
					<v-btn
						large
						to="/"
						v-bind="attrs"
						v-on="on"
						:ripple="false"
						tile
						text
						height="100%"
					>
						<h2 class="hidden-md-and-down">cng</h2>
						<v-icon class="hidden-lg-and-up">mdi-home</v-icon>
					</v-btn>
				</template>
				<span>HOME</span>
			</v-tooltip>
		</v-toolbar-title>

		<v-spacer></v-spacer>

		<v-tooltip v-if="new_update" bottom>
			<template v-slot:activator="{ on, attrs }">
				<v-badge
					dot
					offset-y="15"
					offset-x="25"
					class="d-flex justify-center pa-0 ma-0"
				>
					<v-btn large v-bind="attrs" v-on="on" text>
						<v-icon>mdi-bell</v-icon>
					</v-btn>
				</v-badge>
			</template>
			<span>UPDATES</span>
		</v-tooltip>

      <v-tooltip v-if="!new_update" bottom>
			<template v-slot:activator="{ on, attrs }">
            <v-btn large v-bind="attrs" v-on="on" text>
               <v-icon>mdi-bell</v-icon>
            </v-btn>
			</template>
			<span>UPDATES</span>
		</v-tooltip>

		<v-tooltip bottom>
			<template v-slot:activator="{ on, attrs }">
				<v-btn
					large
					v-bind="attrs"
					v-on="on"
					text
					@click="triggerDarkMode()"
				>
					<v-icon>mdi-brightness-6</v-icon>
				</v-btn>
			</template>
			<span>THEME</span>
		</v-tooltip>

		<v-tooltip bottom>
			<template v-slot:activator="{ on, attrs }">
				<v-btn large v-bind="attrs" v-on="on" text to="/dashboard">
					<v-icon>mdi-account-circle</v-icon>
				</v-btn>
			</template>
			<span>DASHBOARD</span>
		</v-tooltip>
      <!-- <v-dialog v-model="udpate_dialog" presistent class="ma-auto" tile width="50%">
         <h1>asldkfjsdf</h1>
      </v-dialog> -->
	</v-app-bar>
</template>

<script>
import { mapState } from 'vuex'

export default {
   name: 'NavBarComp',
   data(){
      return{
         new_update: false,
         update_dialog: true
      }
   },
	computed: mapState({
		labelView: (state) => state.settings.labelView,
		labelType: (state) => state.settings.labelType,
		fetch_url: (state) => state.store.fetch_url,
	}),
	methods: {
		triggerDarkMode() {
			this.$vuetify.theme.dark = !this.$vuetify.theme.dark
         localStorage.darkModeCng = this.$vuetify.theme.dark

			fetch(this.fetch_url + '/settings', {
				headers: {
					'Content-Type': 'application/json',
					Authorization: localStorage.token,
				},
				method: 'POST',
				body: JSON.stringify({
					_id: localStorage._id,
					settingType: 'darkModeCng',
					newValue: localStorage.darkModeCng,
				}),
			})

			window.socket.emit('track-event', {
				userId: localStorage._id,
				action: 'changed theme to',
				page: 'navbar',
				value: (() => {
					return localStorage.darkModeCng === 'true' ? 'dark' : 'light'
				})(),
			})
		},
	},
}
</script>
