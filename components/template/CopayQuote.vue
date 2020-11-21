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
         copay_quote_outcome: ''
      }
   },
	computed: mapState({
		template_input_style: (state) => state.info.template_input_style,
	}),
}
</script>
