<template>
	<v-col cols="12" :class="template_style_class">
		<v-form
			style="border: 2px solid green"
			class="d-flex flex-column flex-start pa-0 welcomeCallBg"
			autocomplete="off"
			aria-autocomplete="off"
			ref="welcome_form"
		>
			<v-card flat class="welcomeCallHi">
				<h3 class="text-center">Welcome Call</h3>
			</v-card>
			<v-text-field
				label="OB Call To"
				dense
				filled
				outlined
				hide-details
				:single-line="!labelType"
				:class="{ 'mb-2 mt-2': !labelView }"
            :rules="[ val => val.trim().length > 0 ]"
				v-model="ob_call_to"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
			<v-text-field
				label="Phone"
				dense
				filled
				outlined
				hide-details
            :rules="[ val => val.trim().length > 0 ]"
				:single-line="!labelType"
				:class="{ 'mb-2': !labelView }"
				v-model="phone"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
			<v-text-field
				label="Spoke To"
				dense
				filled
				outlined
				hide-details
				v-model="spoke_to"
				:single-line="!labelType"
            :rules="[ val => val.trim().length > 0 ]"
				:class="{ 'mb-2': !labelView }"
				:style="template_input_style"
				background-color="inputBg"
				color="inputLabel"
			></v-text-field>
			<v-select
				label="Confirmed Patient Info"
				:items="['Yes', 'No']"
				:menu-props="{
					top: false,
					offsetY: true,
					'allow-overflow': true,
				}"
				dense
				filled
				outlined
				hide-details
            :rules="[ val => val.trim().length > 0 ]"
				:single-line="!labelType"
				:class="{ 'mb-2': !labelView }"
				v-model="confirmed_patient_info"
				:style="template_input_style"
				background-color="inputBg"
				color="inputLabel"
			></v-select>
			<v-select
				label="Confirmed MD"
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
            :rules="[ val => val.trim().length > 0 ]"
				v-model="confirmed_md"
				:single-line="!labelType"
				:class="{ 'mb-2': !labelView }"
				:style="template_input_style"
				background-color="inputBg"
				color="inputLabel"
			></v-select>
			<v-text-field
				label="Needs By Date"
				placeholder="mm/dd/yyyy"
				dense
				filled
				outlined
				hide-details
				:single-line="!labelType"
            :rules="[ val => val.trim().length > 0 ]"
				:class="{ 'mb-2': !labelView }"
				v-model="needs_by_date"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
			<v-select
				label="Offered Digital"
				:menu-props="{
					top: false,
					offsetY: true,
					'allow-overflow': true,
				}"
				:items="['Yes', 'No', 'Already Enrolled']"
				dense
				filled
				outlined
				hide-details
				:single-line="!labelType"
            :rules="[ val => val.trim().length > 0 ]"
				:class="{ 'mb-2': !labelView }"
				v-model="offered_digital"
				:style="template_input_style"
				background-color="inputBg"
				color="inputLabel"
			></v-select>
			<v-textarea
				outlined
				hide-details
				label="Additional Comment"
				height="70px"
				:single-line="!labelType"
				:class="{ 'mb-2': !labelView }"
				no-resize
				v-model="additional_comment_welcome"
				:style="template_input_style"
				background-color="inputBg"
				color="inputLabel"
			></v-textarea>
			<v-btn
				width="100%"
				height="50px"
				class="ma-0 pa-0"
				small
				depressed
				outlined
				:style="template_input_style"
				@click="welcome_result()"
				>Generate & Copy</v-btn
			>
			<v-textarea
				outlined
				hide-details
				ref="additional_comment_ref"
				height="100px"
				class="mb-0"
				no-resize
				background-color="inputBg"
				color="inputLabel"
				v-model="welcome_call_result"
			></v-textarea>
		</v-form>
	</v-col>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'WelcomeCall',
	data() {
		return {
			ob_call_to: '',
			phone: '',
			spoke_to: '',
			confirmed_patient_info: '',
			confirmed_md: '',
			needs_by_date: '',
			offered_digital: '',
			addtional_comment: '',
			welcome_call_result: '',
			additional_comment_welcome: '',
			// template_input_style: {
			// 	'font-weight': 'bold',
			// 	'border-radius': '0',
			// },
		}
	},
	computed: mapState({
		template_input_style: (state) => state.info.template_input_style,
		template_style_class: (state) => state.info.template_style_class,
		labelView: (state) => state.settings.labelView,
		labelType: (state) => state.settings.labelType,
	}),

	methods: {
		welcome_result() {
			this.$refs.welcome_form.validate()
			console.dir(this.$refs.welcome_form)

			if (
				Object.values(this.$refs.welcome_form.errorBag)
					.slice(0, -1)
					.includes(true)
			) {
				return this.$vuetify.goTo(this.$refs.welcome_form)
			}

			this.welcome_call_result = `
            Welcome Call Details | Drug: ${this.$store.state.info.drugName} | OB Call To: ${this.ob_call_to} | Phone: ${this.phone} | Spoke To: ${this.spoke_to} | Confirmed Patient Info: ${this.confirmed_patient_info} | Confirmed MD: ${this.confirmed_md} | Needs By Date: ${this.needs_by_date} | Offered Digital: ${this.offered_digital} | Note Entered By: ${localStorage.firstName} ${localStorage.lastName} | Department: BV AID | Phone Number/Txt: 866-249-1556/1037646 | Addt'l Comments: ${this.additional_comment_welcome}
         `.trim()
		},
		// test() {
		//    window.socket.emit('customEvent2', {
		//       some: 'data'
		//    });
		// }
	},
}
</script>