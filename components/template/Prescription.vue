<template>
	<v-col cols="12" :class="template_style_class">
		<v-form
			style="border: 2px solid red"
			class="d-flex flex-column flex-start pa-0 prescriptionBg"
			autocomplete="off"
			aria-autocomplete="off"
         ref="prescription_form"
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
				:single-line="!labelType"
            :rules="[ val => val.trim().length > 0 ]"
				:class="{ 'mb-2 mt-2': !labelView }"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
			<v-select
				label="Is this plan part of the Specialty Manufacturer Copay Card Offset Program?"
            :menu-props="{
					top: false,
					offsetY: true,
					'allow-overflow': true,
				}"
				:items="['Yes', 'No', 'N/A']"
				dense
				filled
				outlined
				hide-details
				:single-line="!labelType"
				:class="{ 'mb-2': !labelView }"
            :rules="[ val => val.trim().length > 0 ]"
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
				:single-line="!labelType"
            :rules="[ val => val.trim().length > 0 ]"
				:class="{ 'mb-2': !labelView }"
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
				:single-line="!labelType"
            :rules="[ val => val.trim().length > 0 ]"
				:class="{ 'mb-2': !labelView }"
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
				:single-line="!labelType"
            :rules="[ val => val.trim().length > 0 ]"
				:class="{ 'mb-2': !labelView }"
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
				:single-line="!labelType"
            :rules="[ val => val.trim().length > 0 ]"
				:class="{ 'mb-2': !labelView }"
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
				:single-line="!labelType"
            :rules="[ val => val.trim().length > 0 ]"
				:class="{ 'mb-2': !labelView }"
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
				:single-line="!labelType"
            :rules="[ val => val.trim().length > 0 ]"
				:class="{ 'mb-2': !labelView }"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
			<v-select
				label="Dispense From"
				:items="pharmacy_list"
            :menu-props="{
					top: false,
					offsetY: true,
					'allow-overflow': true,
				}"
				dense
				filled
				outlined
				hide-details
				:single-line="!labelType"
            :rules="[ val => val.trim().length > 0 ]"
				:class="{ 'mb-2': !labelView }"
				v-model="dispense_from"
				:style="template_input_style"
				background-color="inputBg"
				color="inputLabel"
			></v-select>
			<v-select
				label="Paid/Rejected"
				:items="['Paid', 'Rejected']"
            :menu-props="{
					top: false,
					offsetY: true,
					'allow-overflow': true,
				}"
				dense
				filled
				outlined
				hide-details
				:single-line="!labelType"
            :rules="[ val => val.trim().length > 0 ]"
				:class="{ 'mb-2': !labelView }"
				v-model="paid_rejected"
				:style="template_input_style"
				background-color="inputBg"
				color="inputLabel"
			></v-select>
<!-- paid -->
         <v-text-field
				label="Total Cost"
            v-show="show_paid"
				dense
				filled
				outlined
				hide-details
				v-model="total_cost"
				:single-line="!labelType"
				:class="{ 'mb-2': !labelView }"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
         <v-text-field
				label="Amount of Copay"
            v-show="show_paid"
				dense
				filled
				outlined
				hide-details
				v-model="amount_of_copay"
				:single-line="!labelType"
				:class="{ 'mb-2': !labelView }"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
         <v-select
				label="Was PA Required"
				:items="['Yes', 'No']"
            :menu-props="{
					top: false,
					offsetY: true,
					'allow-overflow': true,
				}"
            v-show="show_paid"
				dense
				filled
				outlined
				hide-details
				:single-line="!labelType"
				:class="{ 'mb-2': !labelView }"
				v-model="was_pa_required"
				:style="template_input_style"
				background-color="inputBg"
				color="inputLabel"
			></v-select>
<!-- rejected -->
         <v-select
				label="Rejected"
				:items="['For PA', 'For Other']"
            v-show="paid_rejected === 'Rejected'"
            :menu-props="{
					top: false,
					offsetY: true,
					'allow-overflow': true,
				}"
				dense
				filled
				outlined
				hide-details
				:single-line="!labelType"
				:class="{ 'mb-2': !labelView }"
				v-model="rejected_for"
				:style="template_input_style"
				background-color="inputBg"
				color="inputLabel"
			></v-select>
         <v-text-field
				label="How PA was Initiated"
            v-show="paid_rejected === 'Rejected' && rejected_for === 'For PA'"
				dense
				filled
				outlined
				hide-details
				v-model="how_pa_was_initiated"
				:single-line="!labelType"
				:class="{ 'mb-2': !labelView }"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
         <v-text-field
				label="CoverMyMeds Key#"
            v-show="paid_rejected === 'Rejected' && rejected_for === 'For PA'"
				dense
				filled
				outlined
				hide-details
				v-model="covermymedsKey"
				:single-line="!labelType"
				:class="{ 'mb-2': !labelView }"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
         <v-text-field
				label="Reject Reason"
            v-show="paid_rejected === 'Rejected' && rejected_for === 'For Other'"
				dense
				filled
				outlined
				hide-details
				v-model="reject_reason"
				:single-line="!labelType"
				:class="{ 'mb-2': !labelView }"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>

<!-- patient updated -->
			<v-select
				label="Patient Updated"
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
            :rules="[ val => val.trim().length > 0 ]"
				v-model="patient_updated"
				:style="template_input_style"
				background-color="inputBg"
				color="inputLabel"
			></v-select>
         <v-text-field
				label="Spoke to/Via"
            v-show="patient_updated === 'Yes'"
				dense
				filled
				outlined
				hide-details
				v-model="spoke_to"
				:single-line="!labelType"
				:class="{ 'mb-2': !labelView }"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
         <v-text-field
				label="At"
            v-show="patient_updated === 'Yes'"
				dense
				filled
				outlined
				hide-details
				v-model="at"
				:single-line="!labelType"
				:class="{ 'mb-2': !labelView }"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>

			<!-- <v-textarea
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
			></v-textarea> -->
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
         // additional_comment_prescription: '',
         prescription_result: '',
         total_cost: '',
         amount_of_copay: '',
         was_pa_required: '',
         rejected_for: '',
         how_pa_was_initiated: '',
         covermymedsKey: '',
         reject_reason: '',
         spoke_to: '',
         at: '',
         show_paid: false
		}
	},
	computed: mapState({
      template_input_style: (state) => state.info.template_input_style,
      template_style_class: state => state.info.template_style_class,
      pharmacy_list: state => state.info.pharmacy_list,
      labelType: state => state.settings.labelType,
      labelView: state => state.settings.labelView
	}),
	methods: {
		prescription_temp_result() {
         this.$refs.prescription_form.validate();
         if ( Object.keys(this.$refs.prescription_form.errorBag).includes(true) ) {
            return this.$vuetify.goTo(this.$refs.prescription_form);
         }


         this.prescription_result = (`
            Caremark RX verification Template: Verifying for Therapy: | ICD10: ${this.icd_10} | Has digital messaging offered to the patient: N/A | Is this plan part of the specialty Manufacturer Copay Card Offset Program: ${this.offset_program_outcome()} | Client Name: ${this.client_name} | Bill Code: ${this.bill_code} | Policy Number: ${this.policy_number} | Person Code: N/A | Group Number: ${this.group_number} | BIN: ${this.bin_number} | PCN: ${this.pcn_number} | Secondary Insurance?: N/A | Ran Claim: HBS | NDC: ${this.$store.state.info.ndc} | Strength: ${this.$store.state.info.strength} | QTY: ${this.$store.state.info.quantity} | Day Supply: ${this.$store.state.info.dos} | Paid/Rejected: ${this.paid_rejected_outcome()} | Patient Updated: ${this.patient_updated_outcome()} | Notified HUB: N/A | Additional Information: | Note Entered By: ${localStorage.firstName} ${localStorage.lastName}
         `).trim();
      },
      offset_program_outcome(){
         if (this.offset_program === 'Yes') {
            return `Yes - (If a Manufacturer copay card is being applied to the patient's claim, only what the member truly pays will go towards their deductible and OOP accumulator (not what is paid by copay assistance program))`;
         } else if (this.offset_program === 'No') {
            return `No`;
         } else if (this.offset_program === 'N/A'){
            return `N/A`;
         }
      },
      patient_updated_outcome(){
         if (this.patient_updated === 'Yes') {
            return `Yes | Spoke to/Via: ${this.spoke_to} | At: ${this.at}`;
         } else if (this.patient_updated === 'No') {
            return `No`;
         }
      },
      paid_rejected_outcome() {
         if (this.paid_rejected === 'Paid') {
            return `Paid | Dispensed From: ${this.dispense_from} | Paid: ${this.total_cost} | Amount attributed to the Deductible: N/A | Amount of Copay: ${this.amount_of_copay} | Amount of Coinsurance: N/A | PA Required: ${this.was_pa_required} | MDO Updated: No`;

         } else if (this.paid_rejected === 'Rejected') {
            if (this.rejected_for === 'For PA') {
               return `Rejected | Rejected For: PA | How PA was initiated: ${this.how_pa_was_initiated} | CoverMyMeds Key#: ${this.covermymedsKey} | MDO Updated: No`;
            } else if (this.rejected_for === 'For Other') {
               return `Rejected | Rejected For: Other | Reject Other Reason: ${this.reject_reason} | MDO Updated: No`;
            }
         }
      }
   },
   watch: {
      paid_rejected(newVal, oldVal){
         (newVal === 'Paid') ? 
            this.show_paid = true :
            this.show_paid = false;

      }
   }
}
</script>

<style>
</style>