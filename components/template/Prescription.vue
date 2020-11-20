<template>
	<v-col cols="12" class="col-sm-10 col-md-8 ma-auto">
		<v-form
			style="border: 2px solid red"
			class="d-flex flex-column flex-start pa-0 prescriptionBg"
			autocomplete="off"
			aria-autocomplete="off"
		>
			<v-card flat class="prescriptionHi">
				<h3 class="text-center">Prescription</h3>
			</v-card>
			<v-text-field
				label="ICD 10"
				dense
				filled
				outlined
				hide-details
				v-model="icd_10"
				class="mb-2 mt-2 pa-0"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
			<v-select
				label="Is this plan part of the Specialty Manufacturer Copay Card Offset Program?"
				:items="['Yes', 'No', 'N/A']"
				dense
				filled
				outlined
				hide-details
				class="mb-2"
				v-model="offset_program"
				:style="template_input_style"
				background-color="inputBg"
				color="inputLabel"
			></v-select>
			<v-text-field
				label="Client Name"
				dense
				filled
				outlined
				hide-details
				v-model="client_name"
				class="mb-2 mt-2 pa-0"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
			<v-text-field
				label="Bill Code"
				dense
				filled
				outlined
				hide-details
				v-model="bill_code"
				class="mb-2 mt-2 pa-0"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
			<v-text-field
				label="Policy #"
				dense
				filled
				outlined
				hide-details
				v-model="policy_number"
				class="mb-2 mt-2 pa-0"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
			<v-text-field
				label="Group #"
				dense
				filled
				outlined
				hide-details
				v-model="group_number"
				class="mb-2 mt-2 pa-0"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
			<v-text-field
				label="BIN #"
				dense
				filled
				outlined
				hide-details
				v-model="bin_number"
				class="mb-2 mt-2 pa-0"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
			<v-text-field
				label="PCN #"
				dense
				filled
				outlined
				hide-details
				v-model="pcn_number"
				class="mb-2 mt-2 pa-0"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
			<v-select
				label="Dispense From"
				:items="pharmacy_list"
				dense
				filled
				outlined
				hide-details
				class="mb-2"
				v-model="dispense_from"
				:style="template_input_style"
				background-color="inputBg"
				color="inputLabel"
			></v-select>
			<v-select
				label="Paid/Rejected"
				:items="['Paid', 'Rejected']"
				dense
				filled
				outlined
				hide-details
				class="mb-2"
				v-model="paid_rejected"
				:style="template_input_style"
				background-color="inputBg"
				color="inputLabel"
			></v-select>
			<v-select
				label="Patient Updated"
				:items="['Yes', 'No']"
				dense
				filled
				outlined
				hide-details
				class="mb-2"
				v-model="patient_updated"
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
				v-model="additional_comment_prescription"
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
				@click="prescription_temp_result()"
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
				v-model="prescription_result"
			></v-textarea>
		</v-form>
	</v-col>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'PrescriptionTemplate',
	data() {
		return {
			icd_10: '',
			offset_program: '',
			client_name: '',
			bill_code: '',
			policy_number: '',
			group_number: '',
			bin_number: '',
			pcn_number: '',
			dispense_from: '',
			offset_program: '',
			paid_rejected: '',
			patient_updated: '',
         additional_comment_prescription: '',
         prescription_result: ''
		}
	},
	computed: mapState({
		template_input_style: (state) => state.info.template_input_style,
	}),
	methods: {
		prescription_temp_result() {
         this.prescription_result = `
            Caremark RX verification Template: 
         `;
      },
	},
}
</script>

<style>
</style>