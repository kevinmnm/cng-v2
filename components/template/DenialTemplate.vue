<template>
	<v-col cols="12" :class="template_style_class">
		<v-form
			style="box-shadow: 0 0 5px black;"
			class="d-flex flex-column flex-start pa-0 denialBg"
			autocomplete="off"
			aria-autocomplete="off"
         ref="denial_form"
		>
			<v-card flat tile class="denialHi">
				<h3 class="text-center">Denial Template</h3>
			</v-card>
         <v-divider></v-divider>
			<v-text-field
				label="At phone #"
				dense
				filled
				outlined
				hide-details
            :rules="[ val => val.trim().length > 0 ]"
				v-model="denial_at_phone"
				:single-line="!labelType"
				:class="{ 'mb-2 mt-2': !labelView }"
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
            :rules="[ val => val.trim().length > 0 ]"
				v-model="denial_spoke_to"
				:single-line="!labelType"
				:class="{ 'mb-2': !labelView }"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
			<v-select
				label="Via"
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
            :rules="[ val => val.trim().length > 0 ]"
				:single-line="!labelType"
				:class="{ 'mb-2': !labelView }"
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
            :rules="[ val => val.trim().length > 0 ]"
				v-model="denial_at"
				:single-line="!labelType"
				:class="{ 'mb-2': !labelView }"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
			<v-textarea
				outlined
				hide-details
				label="Conversation/Voicemail Details"
				height="70px"
				:single-line="!labelType"
				:class="{ 'mb-2': !labelView }"
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
				:single-line="!labelType"
            :class="{ 'mb-2': !labelView }"
				no-resize
				v-model="denial_reason"
				:style="template_input_style"
				background-color="inputBg"
				color="inputLabel"
			></v-textarea>
			<v-btn
				width="100%"
				height="50px"
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
				no-resize
				background-color="resultBg"
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
         this.$refs.denial_form.validate();

         if ( Object.values(this.$refs.denial_form.errorBag).includes(true) ) {
            return this.$vuetify.goTo(this.$refs.denial_form);
         }

         this.denial_outcome = (`
            Denial/Triage BV Verification Details: Verifying: ${this.$store.state.info.drugName} | Template Type: Denial | Final Follow-up With Patient: Yes | At phone#: ${this.denial_at_phone} | Spoke to: ${this.denial_spoke_to} | Conversation/VM Detailed: ${this.conversation_voicemail_details} | Final Disposition sent to: MDO | Via: ${this.denial_via} | AT: ${this.denial_at} | Notified HUB (if ref source): N/A | Via: N/A | AT: N/A | Out of Network: No | If OON triage, explained that: N/A Is their network provider. Do they want their information sent to network provider?: N/A | Faxed pt. info to: N/A | At Fax#: N/A | Competitor Phone: N/A | Denial/Triage Reason: ${this.denial_reason} | Note entered by: ${localStorage.firstName} ${localStorage.lastName} | Department: BV AID | Phone Number/Ext: 866-249-1556/1037646 | Additional Comments: 
         `).trim();

         this.$copyText(this.denial_outcome);

         window.socket.emit('track-event', {
            userId: localStorage._id,
            action: 'denial template: ',
            value: this.denial_outcome,
            page: 'home'
         });

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

