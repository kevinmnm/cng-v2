<template>
	<v-col cols="12" class="col-sm-10 col-md-8 ma-auto">
		<v-form
			style="border: 2px solid blue"
			class="d-flex flex-column flex-start pa-0 cpaBg"
			autocomplete="off"
			aria-autocomplete="off"
		>
			<v-card flat class="cpaHi">
				<h3 class="text-center">Copay Assistance</h3>
			</v-card>

			<v-select
				label="Was CPA successfully offered to patient?"
				:items="['Yes', 'No', 'N/A']"
				dense
				filled
				outlined
				hide-details
				class="mb-2 mt-2"
				v-model="was_cpa_offered"
				:style="template_input_style"
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
				class="mb-2"
				background-color="inputBg"
				color="inputLabel"
				:style="template_input_style"
			></v-text-field>
			<v-btn
				width="100%"
				height="50px"
				class="ma-0 pa-0"
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
				name="input-7-4"
				height="100px"
				class="mb-0"
				no-resize
				background-color="inputBg"
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
			was_cpa_offered: '',
			how_many_attempts: '',
		}
	},
	methods: {
		openCpa() {
			window.open(
				'https://pronet.cvshealth.com/Gen2/Shared_Web_Apps/BV_Note_Creator_Copay_Template_V3.aspx'
			)
		},
	},
	computed: mapState({
		template_input_style: (state) => state.info.template_input_style,
	}),
}
</script>

<style>
</style>