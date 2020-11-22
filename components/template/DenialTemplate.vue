<template>
	<v-col cols="12" class="col-sm-10 col-md-8 ma-auto">
		<v-form
			style="border: 2px solid blue"
			class="d-flex flex-column flex-start pa-0 denialBg"
			autocomplete="off"
			aria-autocomplete="off"
		>
			<v-card flat class="denialHi">
				<h3 class="text-center">Denial Template</h3>
			</v-card>
			<v-text-field
				label="At phone #"
				dense
				filled
				outlined
				hide-details
				v-model="denial_at_phone"
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
				v-model="denial_spoke_to"
				class="mb-2 mt-2"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
			<v-select
				label="Via"
				:items="['Phone', 'Fax', 'Letter', 'N/A']"
				dense
				filled
				outlined
				hide-details
				class="mb-2 mt-2"
				v-model="denial_via"
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
				v-model="denial_at"
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
				@click="denial_result()"
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
				v-model="denial_outcome"
			></v-textarea>
		</v-form>
	</v-col>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'DenialTemplate',
	data() {
		return {
			denial_outcome: '',
			denial_at_phone: '',
			denial_spoke_to: '',
			denial_via: '',
			denial_at: '',
			conversation_voicemail_details: '',
			denial_reason: '',
		}
   },
   methods: {
      denial_result() {
         this.denial_outcome = (`
            Denial/Triage BV Verification Details: Verifying: ${this.$store.state.info.drugName} | Template Type: Denial | Final Follow-up With Patient: Yes | At phone#: ${this.denial_at_phone} | Spoke to: ${this.denial_spoke_to} | Conversation/VM Detailed: ${this.conversation_voicemail_details} | Final Disposition sent to: MDO | Via: ${this.denial_via} | AT: ${this.denial_at} | Notified HUB (if ref source): N/A | Via: N/A | AT: N/A | Out of Network: No | If OON triage, explained that: N/A Is their network provider. Do they want their information sent to network provider?: N/A | Faxed pt. info to: N/A | At Fax#: N/A | Competitor Phone: N/A | Denial/Triage Reason: ${this.denial_reason} | Note entered by: ${localStorage.firstName} ${localStorage.lastName} | Department: BV AID | Phone Number/Ext: 866-249-1556/1037646 | Additional Comments: 
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