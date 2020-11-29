<template>
	<v-col cols="12" :class="template_style_class">
		<v-form
			style="box-shadow: 0 0 5px black;"
			class="d-flex flex-column flex-start pa-0 cpaBg"
			autocomplete="off"
			aria-autocomplete="off"
         ref="cpa_form"
		>
			<v-card flat tile class="cpaHi">
				<h3 class="text-center">Copay Assistance</h3>
			</v-card>
         <v-divider></v-divider>
			<v-select
				label="Was CPA successfully offered to patient?"
				:items="['Yes', 'No', 'N/A']"
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
				:class="{ 'mb-2 mt-2': !labelView }"
            :rules="[ val => val.trim().length > 0 ]"
				v-model="was_cpa_offered"
				:style="template_input_style"
				:error="cpa_error"
				background-color="inputBg"
				color="inputLabel"
			></v-select>
			<v-text-field
				label="How many attempts has been made?"
				v-show="was_cpa_offered === 'No' || was_cpa_offered === 'N/A'"
				dense
				filled
				outlined
				hide-details
				v-model="how_many_attempts"
				:error="how_many_attempts_error"
				:single-line="!labelType"
				:class="{ 'mb-2': !labelView }"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
			<v-btn
				width="100%"
				height="50px"
				:single-line="!labelType"
				:class="{ 'mb-2': !labelView }"
				x-small
				depressed
				outlined
				@click="openCpa()"
				v-show="was_cpa_offered === 'Yes'"
			>
				<h2>Click here to complete CPA</h2>
			</v-btn>
			<v-btn
				v-show="was_cpa_offered !== 'Yes'"
				width="100%"
				height="50px"
            class="ma-0 pa-0"
				small
				depressed
				outlined
				:style="template_input_style"
				@click="cpa_result()"
				>Generate & Copy</v-btn
			>
			<v-textarea
				v-show="was_cpa_offered !== 'Yes'"
				outlined
				hide-details
				height="100px"
				no-resize
				background-color="resultBg"
				color="inputLabel"
				v-model="cpa_outcome"
			></v-textarea>
		</v-form>
	</v-col>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'CopayAssistance',
	data() {
		return {
			cpa_error: false,
			was_cpa_offered: '',
			how_many_attempts: '',
			how_many_attempts_error: false,
			cpa_outcome: '',
		}
	},
	methods: {
		openCpa() {
			window.open(
				'https://pronet.cvshealth.com/Gen2/Shared_Web_Apps/BV_Note_Creator_Copay_Template_V3.aspx'
			)
		},
		cpa_result() {
			if (!this.was_cpa_offered) return (this.cpa_error = true)
			// else if (this.was_cpa_offered && !this.how_many_attempts) return (this.cpa_error = false this.how_many_attempts_error = true );
			else this.cpa_error = false
			this.cpa_outcome = `
            Copay Assistance Verification for: Drug | Has digital messaging offered to the patient: N/A | Drug Name/Strength: ${this.$store.state.info.drugName} / ${this.$store.state.info.strength} | Note Entered By: ${localStorage.firstName} | Phone Ext: 866-249-1556/1037646 | Was BV Team Copay Assistance offering to patient successful: No | MAXIMUM NUMBER OF ATTEMPTS MADE BY BV TEAM TO OFFER COPAY ASSISTANCE WITH NO PATIENT RESPONSE.  PHARMACY NEEDS TO OFFER COPAY ASSIST AT THE POINT OF SCHEDULING. Number of Attempts made: ${this.how_many_attempts} ---- If a Manufacturer Copay Card is being applied to the patient's claim and the BV notes or Payer files indicate the client/insurance plan is participating in the Specialty Manufacturer Copay Card Offset program, review the following: 1)Only what the member truly pays will go towards their deductible and OOP accumulator (not what is paid by copay assistance program)2)Ask the patient when they would like to apply their Manufacturer Copay Card and notate the system 3)Advise the patient to contact CVS Specialty if they change their mind as to when they want their copay assistance to be applied.
         `.trim()

         this.$copyText(this.cpa_outcome);
		},
	},
	computed: mapState({
		template_input_style: (state) => state.info.template_input_style,
      template_style_class: (state) => state.info.template_style_class,
      labelType: state => state.settings.labelType,
      labelView: state => state.settings.labelView
	}),
}
</script>
