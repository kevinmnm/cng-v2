<template>
	<v-col cols="12" :class="template_style_class">
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
            :menu-props="{
					top: false,
					offsetY: true,
					'allow-overflow': true,
				}"
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
            :menu-props="{
					top: false,
					offsetY: true,
					'allow-overflow': true,
				}"
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
            v-show="this.which_triage === 'External'"
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
            v-show="this.which_triage === 'External'"
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
            v-show="this.which_triage === 'External'"
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

         <v-card 
            flat 
            class="triageHi" 
            v-show="this.which_triage === 'External'"
         >
				<h3 class="text-center">Final disposition sent to MDO</h3>
			</v-card>

         <v-select
				label="Via"
            v-show="this.which_triage === 'External'"
            :items="['Phone', 'Fax', 'Letter', 'N/A']"
            :menu-props="{
					top: false,
					offsetY: true,
					'allow-overflow': true,
				}"
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
            v-show="this.which_triage === 'External'"
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
				label="Triage Reason"
				height="70px"
				class="mb-0"
				no-resize
				v-model="triage_reason"
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
				@click="triage_result()"
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
         internal_triage_to: '',
         competitor_fax: '',
         competitor_phone: '',
         conversation_voicemail_details: '',
         triage_reason: '',
         triage_outcome: ''
      }
   },
   methods: {
      triage_result(){
         this.triage_outcome = (`
            Denial/Triage BV Verification Details: Verifying: asdf | Template Type: Triage | Internal Triage to: ${this.internalTriageTo()} | AT: N/A | Final Follow-up With Patient of Triage: Yes | At phone#: ${this.triage_at_phone} | Spoke to: ${this.triage_spoke_to} | Conversation/VM Detailed: ${this.conversation_voicemail_details} | Final Disposition sent to: ${this.finalDispositionSentTo()}
         `).trim();
      },
      internalTriageTo(){
         if (this.which_triage === 'Internal') {
            return this.internal_triage_to;
         } else if (this.which_triage === 'External') {
            return 'N/A';
         } else {
            return alert('Something wrong1');
         }
      },
      finalDispositionSentTo() {
         if (this.which_triage === 'Internal') {
            return (`
               N/A | Via: N/A | AT: n/a | Notified HUB (if ref source): N/A | Via: N/A | AT: N/A | Out of Network: No | If OON triage, explained that: N/A | Is their network provider. Do they want their information sent to network provider?: N/A | Faxed pt. info to: N/A | At Fax#: N/A | Competitor Phone: N/A | Denial/Triage Reason: ${this.triage_reason} | Note entered by: ${localStorage.firstName} ${localStorage.lastName} | Department: BV AID | Phone Number/Ext: 866-249-1556/1037646 | Additional Comments: 
            `).trim();
         } else if (this.which_triage === 'External') {
            return (`
               MDO | Via: ${this.triage_via} | At: ${this.triage_at} | Notified HUB (if ref source): N/A | Via: N/A | AT: N/A | Out of Network: Yes | If OON triage, explained that: ${this.to_which_pharmacy} is their network provider. Do they want their information sent to network provider?: Yes | Faxed pt. info to: ${this.to_which_pharmacy} | At Fax#: ${this.competitor_fax} | Competitor Phone: ${this.competitor_phone} | Denial/Triage Reason: ${this.triage_reason} | Note entered by: ${localStorage.firstName} ${localStorage.lastName} | Department: BV AID | Phone Number/Ext: 866-249-1556/1037646 | Additional Comments: 
            `).trim();
         }
      }
   },
   computed: mapState({
      template_input_style: (state) => state.info.template_input_style,
      pharmacy_list: state => [...state.info.pharmacy_list, 'N/A'],
      template_style_class: state => state.info.template_style_class,
      labelType: state => state.settings.labelType,
      labelView: state => state.settings.labelView
   })
}
</script>
