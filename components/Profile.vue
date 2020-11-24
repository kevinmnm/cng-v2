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
		<!-- <v-sheet>
			<h2 class="text-center">Theme</h2>
			<v-col cols="12" class="ma-auto col-md-6">
				<v-card class="d-flex flex-row justify-space-around">
					<v-btn @click="triggerLightMode()">LIGHT</v-btn>
					<v-btn @click="triggerDarkMode()">DARK</v-btn>
				</v-card>
			</v-col>
		</v-sheet> -->
		<!-- <Autocomplete /> -->
		<v-sheet>
			<h2 class="text-center">Label</h2>
			<v-col cols="12" class="col-md-6 ma-auto">
				<v-select
					label="Label"
					:menu-props="{
						top: false,
						offsetY: true,
						'allow-overflow': true,
					}"
					:items="['Show', 'Hide']"
					dense
					filled
					outlined
					hide-details
					:single-line="!labelType"
					:class="{ 'mb-2': !labelView }"
					v-model="type"
					:style="template_input_style"
					background-color="inputBg"
					color="inputLabel"
					@change="
						$store.dispatch('settings/fetchLabelType', [type, fetch_url])
					"
				>
				</v-select>
				<v-select
					label="View"
					:menu-props="{
						top: false,
						offsetY: true,
						'allow-overflow': true,
					}"
					:items="['Dense', 'Gap']"
					dense
					filled
					outlined
					hide-details
					:single-line="!labelType"
					:class="{ 'mb-2': !labelView }"
					v-model="view"
					:style="template_input_style"
					background-color="inputBg"
					color="inputLabel"
					@change="
						$store.dispatch('settings/fetchLabelView', [view, fetch_url])
					"
				>
				</v-select>
			</v-col>
		</v-sheet>
		<v-sheet>
			<v-col cols="12" class="col-md-6 ma-auto">
				<h2 class="text-center">Reset</h2>
				<v-select
					label="Confirm Upon Reset"
					:menu-props="{
						top: false,
						offsetY: true,
						'allow-overflow': true,
					}"
					:items="['Yes', 'No']"
					dense
					filled
					outlined
					hide-details
					:single-line="!labelType"
					:class="{ 'mb-2': !labelView }"
					v-model="reset"
					:style="template_input_style"
					background-color="inputBg"
					color="inputLabel"
					@change="
						fetch_settings_handler(reset, fetch_url, 'confirmReset')
					"
				>
				</v-select>
			</v-col>
		</v-sheet>
	</v-col>
</template>

<script>
import Autocomplete from './Autocomplete.vue'
import { mapState } from 'vuex'

export default {
	name: 'ProfileComp',
	data() {
		return {
			type: '',
         view: '',
         reset: ''
		}
	},
	components: {
		Autocomplete,
	},
	computed: mapState({
		template_input_style: (state) => state.info.template_input_style,
		labelType: (state) => state.settings.labelType,
		labelView: (state) => state.settings.labelView,
      fetch_url: (state) => state.store.fetch_url,
      confirmReset: state => state.settings.confirmReset
	}),
	methods: {
		fetch_settings_handler(newValue, fetchUrl, settingType){
         let transformValue;

         if (settingType === 'confirmReset') {
            if (newValue === 'Yes') transformValue = true;
            if (newValue === 'No') transformValue = false;
         }

         this.$store.dispatch('settings/fetchSettings', [transformValue, fetchUrl, settingType]);
      }
	},
	mounted() {
		this.labelType === true
			? (this.type = 'Show')
			: this.labelType === false
			? (this.type = 'Hide')
			: (this.type = 'Show')

		this.labelView === true
			? (this.view = 'Dense')
			: this.labelView === false
			? (this.view = 'Gap')
         : (this.view = 'Dense');

      if (this.confirmReset) {
         this.reset = 'Yes';
      } else {
         this.reset = 'No';
      }
	},
}
</script>