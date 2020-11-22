<template>
	<v-col cols="12" class="col-sm-10 col-md-8 ma-auto">
		<v-form
			style="border: 2px solid blue"
			class="d-flex flex-column flex-start pa-0 priorAuthBg"
			autocomplete="off"
			aria-autocomplete="off"
		>
			<v-card flat class="priorAuthHi">
				<h3 class="text-center">PA Result</h3>
			</v-card>

         <v-text-field
				label="PA #"
				dense
				filled
				outlined
				hide-details
				v-model="pa_number"
				class="mb-2 mt-2 pa-0"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
         <v-text-field
				label="Effective Date From"
				dense
				filled
				outlined
				hide-details
				v-model="effective_date_from"
				class="mb-2 mt-2 pa-0"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
         <v-text-field
				label="Effective Date To"
				dense
				filled
				outlined
				hide-details
				v-model="effective_date_to"
				class="mt-2 mb-2 pa-0"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
         <v-btn
				width="100%"
				height="50px"
				class="ma-0 pa-0"
				small
				depressed
				outlined
				:style="template_input_style"
				@click="priorAuth_result()"
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
				v-model="pa_result"
			></v-textarea>
		</v-form>
	</v-col>
</template>

<script>
import { mapState } from 'vuex'

export default {
   name: 'PriorAuth',
   data(){
      return {
         pa_number: '',
         effective_date_from: '',
         effective_date_to: '',
         pa_result: ''
      }
   },
   methods: {
      priorAuth_result() {
         this.pa_result = (`
            PA BV Verification Results: Verifying: ${this.$store.state.info.drugName} | Spoke with: N/A | At: N/A | PA Approved: Yes | PA Type: Prior Authorization | Effective Date (From): ${this.effective_date_from} | Effective Date (To): ${this.effective_date_to} | PA#: ${this.pa_number} | NDC: ${this.$store.state.info.ndc} | Strength: ${this.$store.state.info.strength} | Max Day Supply Approved: ${this.$store.state.dos} | Quantity: ${this.$store.state.info.quantity} | Does the approved PA cover the ICD10 that is loaded in SPARCS?: Yes | Note entered by: ${localStorage.firstName} ${localStorage.lastName} | Department: BV AID | Phone Number/Ext: 866-249-1556/1037646 | ADDT'L COMMENTS:
         `).trim();
      }
   },
   computed: mapState({
		template_input_style: (state) => state.info.template_input_style,
	}),
}
</script>

<style>
</style>