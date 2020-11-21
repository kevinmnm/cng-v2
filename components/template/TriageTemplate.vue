<template>
	<v-col cols="12" class="col-sm-10 col-md-8 ma-auto">
		<v-form
			style="border: 2px solid blue"
			class="d-flex flex-column flex-start pa-0 triageBg"
			autocomplete="off"
			aria-autocomplete="off"
		>
			<v-card flat class="triageHi">
				<h3 class="text-center">Triage Template</h3>
			</v-card>

         <v-select
				label="Triage Type"
				:items="['Internal', 'External']"
				dense
				filled
				outlined
				hide-details
				class="mb-2 mt-2"
				v-model="which_triage"
				:style="template_input_style"
				background-color="inputBg"
				color="inputLabel"
			></v-select>
         <v-text-field
				label="At phone #"
				dense
				filled
				outlined
				hide-details
				v-model="triage_at_phone"
				class="mb-2 mt-2"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
			<v-text-field
				label="Spoke to"
				dense
				filled
				outlined
				hide-details
				v-model="triage_spoke_to"
				class="mb-2 mt-2"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>

<!-- Internal Triage -->

         <v-select
				label="Internal Triage to"
            v-show="which_triage === 'Internal'"
				:items="pharmacy_list"
				dense
				filled
				outlined
				hide-details
				class="mb-2 mt-2"
				v-model="internal_triage_to"
				:style="template_input_style"
				background-color="inputBg"
				color="inputLabel"
			></v-select>

<!-- External Triage -->

         <v-text-field
				label="To which Pharmacy?"
				dense
				filled
				outlined
				hide-details
				v-model="to_which_pharmacy"
				class="mb-2 mt-2"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
         <v-text-field
				label="Competitor Fax#"
				dense
				filled
				outlined
				hide-details
				v-model="competitor_fax"
				class="mb-2 mt-2"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
         <v-text-field
				label="Competitor Phone#"
				dense
				filled
				outlined
				hide-details
				v-model="competitor_phone"
				class="mb-2 mt-2"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>

         <v-card flat class="triageHi">
				<h3 class="text-center">Final disposition sent to MDO</h3>
			</v-card>

         <v-select
				label="Via"
            :items="['Phone', 'Fax', 'Letter', 'N/A']"
				dense
				filled
				outlined
				hide-details
				class="mb-2 mt-2"
				v-model="triage_via"
				:style="template_input_style"
				background-color="inputBg"
				color="inputLabel"
			></v-select>
         <v-text-field
				label="At"
				dense
				filled
				outlined
				hide-details
				v-model="triage_at"
				class="mb-2 mt-2"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>

         <v-textarea
				outlined
				hide-details
				label="Conversation/Voicemail Details"
				height="70px"
				class="mb-2"
				no-resize
				v-model="conversation_voicemail_details"
				:style="template_input_style"
				background-color="inputBg"
				color="inputLabel"
			></v-textarea>
			<v-textarea
				outlined
				hide-details
				label="Denial Reason"
				height="70px"
				class="mb-0"
				no-resize
				v-model="denial_reason"
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
				@click="triage_reason()"
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
				v-model="triage_outcome"
			></v-textarea>
         
		</v-form>
	</v-col>
</template>

<script>
import { mapState } from 'vuex';

export default {
   name: 'TriageComp',
   data() {
      return {
         which_triage: '',
         triage_via: '',
         triage_at: '',
         triage_at_phone: '',
         triage_spoke_to: '',
         to_which_pharmacy: '',
         competitor_fax: '',
         competitor_phone: ''
      }
   },
   computed: mapState({
      template_input_style: (state) => state.info.template_input_style,
      pharmacy_list: state => [...state.info.pharmacy_list, 'N/A']
   })
}
</script>
