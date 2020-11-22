<template>
	<v-col cols="12" class="col-sm-10 col-md-8 ma-auto">
		<v-form
			style="border: 2px solid blue"
			class="d-flex flex-column flex-start pa-0 copayQuoteBg"
			autocomplete="off"
			aria-autocomplete="off"
		>
			<v-card flat class="copayQuoteHi">
				<h3 class="text-center">Copay Quote</h3>
			</v-card>

			<v-text-field
				label="Total AWP"
				dense
				filled
				outlined
				hide-details
				v-model="total_awp"
				class="mb-2 mt-2"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
         <v-text-field
				label="Activated to pharmacy location"
				dense
				filled
				outlined
				hide-details
				v-model="activated_pharmacy"
				class="mb-2 mt-2"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
         <v-select
				label="Insurance participting in the Specialty Manufacturer Copay Card Offset Program?"
				:items="['Yes', 'No', 'N/A']"
				dense
				filled
				outlined
				hide-details
				class="mb-2 mt-2"
				v-model="insurance_participating"
				:style="template_input_style"
				background-color="inputBg"
				color="inputLabel"
			></v-select>
         <v-btn
				width="100%"
				height="50px"
				class="ma-0 pa-0"
				small
				depressed
				outlined
				:style="template_input_style"
				@click="copay_quote_result()"
				>Generate & Copy</v-btn
			>
         <v-textarea
				v-show="was_cpa_offered !== 'Yes'"
				outlined
				hide-details
				height="100px"
				class="mb-0"
				no-resize
				background-color="inputBg"
				color="inputLabel"
				v-model="copay_quote_outcome"
			></v-textarea>
		</v-form>
	</v-col>
</template>

<script>
import { mapState } from 'vuex'

export default {
   name: 'CopayQuoteTemplate',
   data() {
      return {
         total_awp: '',
         activated_pharmacy: '',
         insurance_participating: '',
         copay_quote_outcome: ''
      }
   },
   methods: {
      copay_quote_result() {
         this.copay_quote_outcome = (`
            Copay Quote Details: Verifying: ${this.$store.state.info.drugName} | Who will quote copay: Pharmacy | CVG Type: Rx Plan | TC/REC'D Call from: N/A | Phone: N/A | Estimated Total Obligation for one shipment will be: $ | QTY: ${this.$store.state.info.quantity} | DS: ${this.$store.state.info.dos} | Total Cost AWP: $${this.total_awp} | DED: N/A | DED MET: N/A | Copay:  | COINS: N/A | MOOP: N/A | MOOP MET: N/A | Yearly Max/MAB: N/A | Bill Code:  | Pt Inquired about copay assist: N/A | If Yes: N/A | FOP REQ: N/A | Pt have sec ins: N/A | Sec Payer name: N/A | Sec DED: $N/A | SEC DED MET: $N/A | SEC COPAY: $N/A | SEC COINS: N/A | SEC MOOP: $N/A | SEC MOOP MET: $N/A | SEC Yearly Max/MAB: $N/A | SEC Bill Code: N/A  | Activated to pharmacy: ${this.activated_pharmacy} | Is the insurance plan that is processed prior to copay assistance participating in the Specialty Manufacturer Copay Card Offset Program?: ${this.insurance_participating} | Can MDO Order synagis on pt behalf for rest of season?: N/A | Final Follow-up With Patient: Yes | Spoke to: N/A | VIA: N/A | AT: N/A | Notified HUB (IF Ref source): N/A | Via: N/A | AT: N/A | Note entered by: ${localStorage.firstName} ${localStorage.lastName} | Department: BV AID | Phone Number/Ext: 866-249-1556/1037646 | ADDT'L COMMENTS:  | *PSR MUST READ THE FOLLOWING AFTER QUOTING BENEFITS: The benefits disclosed are based on information we received from your insurance. The benefits disclosed are not a guarantee of payment. If the claim processes with a different financial responsibility than what I have quoted, you will be responsible for any remaining balance. In addition, this is a non-returnable product once shipped. PSR MUST also document that the information above was disclosed and agreed to by the member.
         `).trim();
      }
   },
	computed: mapState({
		template_input_style: (state) => state.info.template_input_style,
	}),
}
</script>
