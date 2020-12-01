<template>
	<v-col cols="12" :class="template_style_class">
		<v-form
			style="box-shadow: 0 0 5px black"
			class="d-flex flex-column flex-start pa-0 nonCaremark"
			autocomplete="off"
			aria-autocomplete="off"
			ref="non_prescription_form"
		>
			<v-card flat tile class="nonCaremarkHi">
				<h3 class="text-center">Non-Caremark Prescription</h3>
			</v-card>
         <v-divider></v-divider>
			<v-card flat tile class="nonCaremarkHi">
				<h3 class="text-center">Insurance Info</h3>
			</v-card>
			<v-text-field
				label="Payer"
				dense
				filled
				outlined
				hide-details
				:single-line="!labelType"
				:class="{ 'mb-2 mt-2': !labelView }"
				:rules="[(val) => val.trim().length > 0]"
				v-model="non_payer"
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
				:single-line="!labelType"
				:class="{ 'mb-2 mt-2': !labelView }"
				:rules="[(val) => val.trim().length > 0]"
				v-model="non_bill_code"
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
				:single-line="!labelType"
				:class="{ 'mb-2 mt-2': !labelView }"
				:rules="[(val) => val.trim().length > 0]"
				v-model="non_policy_number"
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
				:single-line="!labelType"
				:class="{ 'mb-2 mt-2': !labelView }"
				:rules="[(val) => val.trim().length > 0]"
				v-model="non_group_number"
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
				:single-line="!labelType"
				:class="{ 'mb-2 mt-2': !labelView }"
				:rules="[(val) => val.trim().length > 0]"
				v-model="non_bin_number"
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
				:single-line="!labelType"
				:class="{ 'mb-2 mt-2': !labelView }"
				:rules="[(val) => val.trim().length > 0]"
				v-model="non_pcn_number"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
			<v-text-field
				label="Eff. Date"
				dense
				filled
				outlined
				hide-details
				:single-line="!labelType"
				:class="{ 'mb-2 mt-2': !labelView }"
				:rules="[(val) => val.trim().length > 0]"
				v-model="non_eff_date"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
			<v-text-field
				label="Policy Holder"
				dense
				filled
				outlined
				hide-details
				:single-line="!labelType"
				:class="{ 'mb-2 mt-2': !labelView }"
				:rules="[(val) => val.trim().length > 0]"
				v-model="non_policy_holder"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
			<v-select
				label="Pt Rela. to Subscriber"
				:items="['Self', 'Spouse', 'Child', 'Other']"
				:menu-props="{
					top: false,
					offsetY: true,
					'allow-overflow': true,
				}"
				dense
				filled
				outlined
				hide-details
				:rules="[(val) => val.trim().length > 0]"
				:single-line="!labelType"
				:class="{ 'mb-2': !labelView }"
				v-model="non_pt_rela"
				:style="template_input_style"
				background-color="inputBg"
				color="inputLabel"
			></v-select>
			<v-card flat tile class="nonCaremarkHi">
				<h3 class="text-center">Claim/Prescription Info</h3>
			</v-card>
			<v-text-field
				label="ICD 10"
				dense
				filled
				outlined
				hide-details
				:single-line="!labelType"
				:class="{ 'mb-2 mt-2': !labelView }"
				:rules="[(val) => val.trim().length > 0]"
				v-model="non_icd"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
			<v-text-field
				label="Total Cost"
				dense
				filled
				outlined
				hide-details
				:single-line="!labelType"
				:class="{ 'mb-2 mt-2': !labelView }"
				:rules="[(val) => val.trim().length > 0]"
				v-model="non_total_cost"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
			<v-select
				label="Pharmacy"
				:items="non_pharmacy_list"
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
				:rules="[(val) => val.trim().length > 0]"
				:class="{ 'mb-2': !labelView }"
				v-model="non_pharmacy"
				:style="template_input_style"
				background-color="inputBg"
				color="inputLabel"
			></v-select>
			<v-card flat tile class="nonCaremarkHi">
				<h3 class="text-center">Coverage Info</h3>
			</v-card>
			<v-select
				label="Covered"
				:items="['Yes', 'No']"
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
				:rules="[(val) => val.trim().length > 0]"
				:class="{ 'mb-2': !labelView }"
				v-model="non_covered"
				:style="template_input_style"
				background-color="inputBg"
				color="inputLabel"
			></v-select>

<!-- If covered === yes -->
			<v-text-field
				label="Copay"
				v-show="non_covered === 'Yes'"
				dense
				filled
				outlined
				hide-details
				:single-line="!labelType"
				:class="{ 'mb-2 mt-2': !labelView }"
				v-model="non_copay"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>

<!-- If covered === no -->
         <v-text-field
				label="If rejected, Why?"
				v-show="non_covered === 'No'"
				dense
				filled
				outlined
				hide-details
				:single-line="!labelType"
				:class="{ 'mb-2 mt-2': !labelView }"
				v-model="non_rejected_why"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>

			<v-select
				label="PA Req'd"
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
				:rules="[(val) => val.trim().length > 0]"
				:class="{ 'mb-2': !labelView }"
				v-model="non_pa_req"
				:style="template_input_style"
				background-color="inputBg"
				color="inputLabel"
			></v-select>
			<!-- If PA Req === 'yes' -->
			<v-text-field
				label="How PA obtained / CMM Key (If applicable)"
				v-show="non_pa_req === 'Yes'"
				dense
				filled
				outlined
				hide-details
				:single-line="!labelType"
				:class="{ 'mb-2 mt-2': !labelView }"
				v-model="non_how_pa_obtained"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
			<v-card flat tile class="nonCaremarkHi">
				<h3 class="text-center">Follow-up</h3>
			</v-card>
			<v-select
				label="Patient Updated"
				:items="['Yes', 'No']"
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
				:rules="[(val) => val.trim().length > 0]"
				:class="{ 'mb-2': !labelView }"
				v-model="non_pt_updated"
				:style="template_input_style"
				background-color="inputBg"
				color="inputLabel"
			></v-select>
			<!-- If pt updated === 'yes' -->
			<v-text-field
				label="Spoke to/Via"
				v-show="non_pt_updated === 'Yes'"
				dense
				filled
				outlined
				hide-details
				v-model="non_spoke_to"
				:single-line="!labelType"
				:class="{ 'mb-2': !labelView }"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
			<v-text-field
				label="At"
				v-show="non_pt_updated === 'Yes'"
				dense
				filled
				outlined
				hide-details
				v-model="non_at"
				:single-line="!labelType"
				:class="{ 'mb-2': !labelView }"
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
				@click="non_prescription_result_handler()"
				>Generate & Copy</v-btn
			>
         <v-textarea
				outlined
				hide-details
				height="100px"
				class="mb-0"
				no-resize
				background-color="resultBg"
				color="inputLabel"
				v-model="non_prescription_result"
			></v-textarea>
		</v-form>
	</v-col>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'NonCaremarkPrescription',
	data() {
		return {
			non_payer: '',
			non_bill_code: '',
			non_policy_number: '',
         non_group_number: '',
         non_pharmacy: '',
			non_bin_number: '',
			non_pcn_number: '',
			non_eff_date: '',
			non_policy_holder: '',
			non_pt_rela: '',
			non_icd: '',
			non_total_cost: '',
			non_covered: '',
         non_copay: '',
         non_rejected_why: '',
			non_pa_req: '',
			non_how_pa_obtained: '',
			non_pt_updated: '',
			non_spoke_to: '',
         non_at: '',
         non_prescription_result: ''
		}
	},
	computed: mapState({
		template_input_style: (state) => state.info.template_input_style,
		template_style_class: (state) => state.info.template_style_class,
		non_pharmacy_list: (state) => state.info.pharmacy_list,
		labelView: (state) => state.settings.labelView,
		labelType: (state) => state.settings.labelType,
   }),
   methods: {
      non_prescription_result_handler(){
         this.$refs.non_prescription_form.validate();

         if (
				Object.values(this.$refs.non_prescription_form.errorBag)
					.slice(0, -1)
					.includes(true)
			) {
				return this.$vuetify.goTo(this.$refs.non_prescription_form)
			}

         this.non_prescription_result = `
            Prescription BV Verification: Verifying: ${this.$store.state.info.drugName} | Info Obtained: N/A | PayerFile: N/A | Is this plan part of the specialty Manufacturer Copay Card Offset Program: No | Payer: ${this.non_payer} | Bill Code: ${this.non_bill_code} | Policy#: ${this.non_policy_number} | Group#: ${this.non_group_number} | EFF: ${this.non_eff_date} | Policy Holder: ${this.non_policy_holder} | PT. Relation to Subscriber: ${this.non_pt_rela} | PC: N/A | Ran Claim: HBS | CE2000 Plan Code: N/A | ICD10: ${this.non_icd} | NDC: ${this.$store.state.info.ndc} | QTY: ${this.$store.state.info.quantity} | DS: ${this.$store.state.info.dos} | BIN: ${this.non_bin_number} | PCN: ${this.non_pcn_number} | Total Cost: ${this.non_total_cost} | Pharmacy: ${this.non_pharmacy} | Claim Reversed, Saved to Folder: N/A | Paid/Rejected: ${this.paid_rejected()} | CVRD: ${this.non_covered} | DED: N/A | DED MET: N/A | Copay: ${this.non_copay} | COINS: N/A | MOOP: N/A | MOOP MET: N/A | DED Apply to MOOP: N/A | Once Moop Met, CVRD At: N/A | Yearly Max/MAB: N/A | MAX DS: N/A | PA Req'd: ${this.non_pa_req} | How PA was obtained /CMM Key (If applicable): ${this.non_how_pa_obtained} | PT. Have Sec Ins: N/A | Sec. Payor:  | MDO Updated: No | Spoke to: N/A | VIA: N/A | AT: N/A | MDO Fax Confirmed?: No | Fax#:  | Notified HUB (IF Ref source): N/A | VIA: N/A | AT: N/A | PT Updated: ${this.non_pt_updated} | Spoke to/Via: ${this.non_spoke_to} | At: ${this.non_at} | Note entered by: ${localStorage.firstName} ${localStorage.lastName} | Department: BV AID | Phone Number/Ext: 866-249-1556/1037646 | ADDT'L COMMENTS:
         `.trim();

         this.$copyText(this.non_prescription_result);

         window.socket.emit('track-event', {
            userId: localStorage._id,
            action: 'non-caremark prescription result: ',
            value: this.non_prescription_result,
            page: 'home'
         });

      },
      paid_rejected(){
         if (this.non_covered === 'Yes') {
            return `
               Yes | If Rejected, Why: | CVS/CMK in Network: Yes
            `.trim();
         } else if ( this.non_covered === 'No') {
            return `
               No | If Rejected, Why: ${this.non_rejected_why} | CVS/CMK in Network: Yes
            `.trim();
         }
      }
   }
}
</script>