<template>
	<v-col cols="12" class="col-sm-10 col-md-8 ma-auto">
		<v-form
			style="border: 2px solid green"
			class="d-flex flex-column flex-start pa-0 welcomeCallBg"
			autocomplete="off"
			aria-autocomplete="off"
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
				v-model="ob_call_to"
				class="mb-2 mt-2 pa-0"
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
				class="mb-2"
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
				class="mb-2"
				:style="template_input_style"
				background-color="inputBg"
				color="inputLabel"
			></v-text-field>
			<v-select
				label="Confirmed Patient Info"
				:items="['Yes', 'No']"
				dense
				filled
				outlined
				hide-details
				class="mb-2"
				v-model="confirmed_patient_info"
				:style="template_input_style"
				background-color="inputBg"
				color="inputLabel"
			></v-select>
			<v-select
				label="Confirmed MD"
				:items="['Yes', 'No']"
				dense
				filled
				outlined
				hide-details
				v-model="confirmed_md"
				class="mb-2"
				:style="template_input_style"
				background-color="inputBg"
				color="inputLabel"
			></v-select>
			<v-text-field
				label="Needs By Date"
				type="date"
				dense
				filled
				outlined
				hide-details
				class="mb-2"
				v-model="needs_by_date"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
			<v-select
				label="Offered Digital"
				:items="['Yes', 'No', 'Already Enrolled']"
				dense
				filled
				outlined
				hide-details
				class="mb-2"
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
				class="mb-0"
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
				name="input-7-4"
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
			template_input_style: {
				'font-size': '20px',
				'font-weight': 'bold',
				'border-radius': '0',
			},
		}
	},
	computed: {
		inputLabel() {
			return this.$vuetify.theme.dark ? 'white' : '#063f06'
		},
	},
	methods: {
		welcome_result() {
			this.welcome_call_result = (`
            Welcome Call Details | Drug: ${this.$store.state.info.drugName} | OB Call To: ${this.ob_call_to} | Phone: ${this.phone} | Spoke To: ${this.spoke_to} | Confirmed Patient Info: ${this.confirmed_patient_info} | Confirmed MD: ${this.confirmed_md} | Needs By Date: ${this.needs_by_date} | Offered Digital: ${this.offered_digital} | Note Entered By: ${localStorage.firstName} ${localStorage.lastName} | Department: BV AID | Phone Number/Txt: 866-249-1556/1037646 | Addt'l Comments: ${this.additional_comment_welcome}
         `).trim();
		},
		// test() {
		//    window.socket.emit('customEvent2', {
		//       some: 'data'
		//    });
		// }
	},
}
</script>