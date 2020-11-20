<template>
	<v-col cols="12" class="d-flex flex-column">
		<v-sheet>
			<h2 class="text-center">Profile</h2>
			<v-col cols="12" class="col-md-6 ma-auto">
				<v-card>
					<v-text-field
						dense
						filled
						flat
						outlined
						disabled
						label="USERNAME"
						value="sadf"
						class="profile-input"
						style="font-weight: bold"
					></v-text-field>
				</v-card>
				<v-card>
					<v-text-field
						dense
						filled
						flat
						outlined
						disabled
						label="First Name"
						value="sadf"
						class="profile-input"
						style="font-weight: bold"
					></v-text-field>
				</v-card>
				<v-card>
					<v-text-field
						dense
						filled
						flat
						disabled
						outlined
						label="Last Name"
						value="sadf"
						class="profile-input"
						style="font-weight: bold"
					></v-text-field>
				</v-card>
			</v-col>
		</v-sheet>
		<v-sheet>
			<h2 class="text-center">Theme</h2>
			<v-col cols="12" class="ma-auto col-md-6">
				<v-card class="d-flex flex-row justify-space-around">
					<v-btn @click="triggerLightMode()">LIGHT</v-btn>
					<v-btn @click="triggerDarkMode()">DARK</v-btn>
				</v-card>
			</v-col>
		</v-sheet>
		<Autocomplete />
	</v-col>
</template>

<script>
import Autocomplete from './Autocomplete.vue';

export default {
   name: 'ProfileComp',
   components: {
      Autocomplete
   },
	methods: {
		triggerLightMode() {
			this.$vuetify.theme.dark = false
		},
		triggerDarkMode() {
			this.$vuetify.theme.dark = true
		},
	},
}
</script>