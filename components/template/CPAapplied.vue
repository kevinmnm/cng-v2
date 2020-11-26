<template>
	<v-col cols="12" :class="template_style_class">
		<v-alert prominent type="warning" elevation="12">
			<v-row align="center">
				<v-col class="grow applied-warning">
					Was CPA already applied upon claim processing?
				</v-col>
				<v-col class="shrink">
					<v-btn class="applied-warning" @click="open_cpa()">yes</v-btn>
				</v-col>
			</v-row>
		</v-alert>
	</v-col>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'CPAalreadyAppliedComp',
	data() {
		return {}
	},
	computed: mapState({
		template_input_style: (state) => state.info.template_input_style,
		template_style_class: (state) => state.info.template_style_class,
		labelView: (state) => state.settings.labelView,
		labelType: (state) => state.settings.labelType,
   }),
   methods: {
      open_cpa(){
         window.open('https://pronet.cvshealth.com/Gen2/Shared_Web_Apps/BV_Note_Creator_Copay_Template_V3.aspx');
      }
   }
}
</script>

<style scoped>

.applied-warning {
   font-size: 22px;
   font-weight: bold;
   color: white;
}

</style>