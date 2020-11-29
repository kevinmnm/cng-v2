<template>
	<v-col cols="12" :class="template_style_class">
		<v-form
			style="box-shadow: 0 0 5px black;"
			class="d-flex flex-column flex-start pa-0 priorAuthBg"
			autocomplete="off"
			aria-autocomplete="off"
         ref="pa_form"
		>
			<v-card flat tile class="priorAuthHi">
				<h3 class="text-center">PA Result</h3>
			</v-card>
         <v-divider></v-divider>
         <v-text-field
				label="PA #"
				dense
				filled
				outlined
				hide-details
				v-model="pa_number"
            :rules="[ val => val.trim().length > 0 ]"
				:single-line="!labelType"
				:class="{ 'mb-2 mt-2': !labelView }"
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
            :rules="[ val => val.trim().length > 0 ]"
				:single-line="!labelType"
				:class="{ 'mb-2': !labelView }"
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
            :rules="[ val => val.trim().length > 0 ]"
				:single-line="!labelType"
				:class="{ 'mb-2': !labelView }"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
         <v-btn
				width="100%"
				height="50px"
				small
				depressed
				outlined
            class="ma-0 pa-0"
				:style="template_input_style"
				@click="priorAuth_result()"
				>Generate & Copy</v-btn
			>
         <v-textarea
				outlined
				hide-details
				height="100px"
				no-resize
            class="mb-0"
				background-color="resultBg"
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
         this.$refs.pa_form.validate();

         if ( Object.values(this.$refs.pa_form.errorBag).includes(true) ) {
            return this.$vuetify.goTo(this.$refs.pa_form);
         }

         this.pa_result = (`
            PA BV Verification Results: Verifying: ${this.$store.state.info.drugName} | Spoke with: N/A | At: N/A | PA Approved: Yes | PA Type: Prior Authorization | Effective Date (From): ${this.effective_date_from} | Effective Date (To): ${this.effective_date_to} | PA#: ${this.pa_number} | NDC: ${this.$store.state.info.ndc} | Strength: ${this.$store.state.info.strength} | Max Day Supply Approved: ${this.$store.state.dos} | Quantity: ${this.$store.state.info.quantity} | Does the approved PA cover the ICD10 that is loaded in SPARCS?: Yes | Note entered by: ${localStorage.firstName} ${localStorage.lastName} | Department: BV AID | Phone Number/Ext: 866-249-1556/1037646 | ADDT'L COMMENTS:
         `).trim();

         this.$copyText(this.pa_result);
      }
   },
   computed: mapState({
      template_input_style: (state) => state.info.template_input_style,
      template_style_class: state => state.info.template_style_class,
      labelType: state => state.settings.labelType,
      labelView: state => state.settings.labelView
	}),
}
</script>
