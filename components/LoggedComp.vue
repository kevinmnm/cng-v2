<template>
	<v-col cols="12">
		<Navbar />
		<v-sheet class="d-flex justify-center flex-row">
			<v-col cols="6" class="text-center">
				<v-btn
					class="prescriptionHi"
					@click="set_plan_type('caremark')"
					width="100%"
               v-show="plan_type_button"
					>caremark</v-btn
				>
			</v-col>
			<v-col cols="6" class="text-center">
				<v-btn
					class="nonCaremark"
					@click="set_plan_type('non-caremark')"
					width="100%"
               v-show="plan_type_button"
					>non-caremark</v-btn
				>
			</v-col>
		</v-sheet>
		<v-card outlined class="font-weight-bold text-center mb-6">
			<h2>{{ plan_type ? plan_type.toUpperCase() : null }}</h2>
		</v-card>
		<v-sheet class="mb-4" elevation="2" v-show="plan_type">
			<h2 class="text-center mb-2">Drug Info</h2>
			<v-card
				flat
				class="d-flex justify-center"
				:class="
					$vuetify.breakpoint.name === 'xs' ? 'flex-column' : 'flex-row'
				"
			>
				<!-- @change="$store.dispatch('info/fetch_drugname', drugName)" -->
				<!-- @change="$store.commit('info/SET_DRUGNAME', drugName)" -->
				<v-card flat>
					<v-text-field
						label="Drug Name"
						color="inputLabel"
						autocomplete="off"
						hide-details
						outlined
						dense
						v-model="drugName"
						@change="$store.commit('info/SET_DRUGNAME', drugName)"
					></v-text-field>
				</v-card>
				<v-card flat>
					<v-text-field
						label="Strength"
						color="inputLabel"
						autocomplete="off"
						hide-details
						outlined
						dense
						v-model="strength"
						@change="$store.commit('info/SET_STRENGTH', strength)"
					></v-text-field>
				</v-card>
				<v-card flat>
					<v-text-field
						label="Quantity"
						color="inputLabel"
						autocomplete="off"
						hide-details
						outlined
						dense
						v-model="quantity"
						@change="$store.commit('info/SET_QUANTITY', quantity)"
					></v-text-field>
				</v-card>
				<v-card flat>
					<v-text-field
						label="Days of Supply"
						color="inputLabel"
						autocomplete="off"
						hide-details
						outlined
						dense
						v-model="dos"
						@change="$store.commit('info/SET_DOS', dos)"
					></v-text-field>
				</v-card>
				<v-card flat>
					<v-text-field
						label="NDC"
						color="inputLabel"
						autocomplete="off"
						hide-details
						outlined
						dense
						v-model="ndc"
						@change="$store.commit('info/SET_NDC', ndc)"
					></v-text-field>
				</v-card>
			</v-card>
			<v-card class="mt-10">
				<h2 class="text-center mb-2">Case Outcome</h2>
				<v-select
					:menu-props="{
						top: false,
						offsetY: true,
						'allow-overflow': true,
					}"
					outlined
					solo
					filled
					hide-details
					:items="[
						'PA initial',
						'Copay $25 or less',
						'CPA attempt #1',
						'CPA attempt #2',
						'Ptient denies CPA',
						'Copay is over $25 for Medicare/Medicaid',
						'External/Internal triage',
						'PA denial template',
					]"
					label="Choose"
					v-model="case_outcome"
				></v-select>
			</v-card>
		</v-sheet>
		<v-sheet
			class="d-flex justify-center flex-column"
			style="background-color: transparent"
			ref="template_wrapper"
			v-if="case_outcome"
		>
			<!-- <WelcomeCallTemplate :key="'welcome' + Math.random()" />
			<PrescriptionTemplate :key="'prescription' + Math.random()" />
			<PriorAuthTemplate :key="'pa' + Math.random()" />
			<CPATemplate :key="'cpa' + Math.random()" />
			<CopayQuoteTemplate :key="'copayquote' + Math.random()" />
			<DenialTemplate :key="'denial' + Math.random()" />
			<TriageTemplate :key="'triage' + Math.random()" /> -->
         <WelcomeCallTemplate />
			<PrescriptionTemplate />
			<PriorAuthTemplate />
			<CPATemplate/>
			<CopayQuoteTemplate />
			<DenialTemplate />
			<TriageTemplate />
		</v-sheet>
		<v-btn v-show="plan_type" @click="reset_all_templates()">reset</v-btn>
	</v-col>
</template>

<script>
import { mapState } from 'vuex'
import io from 'socket.io-client'
import Navbar from './NavBar.vue'
import WelcomeCallTemplate from './template/WelcomeCall.vue'
import PrescriptionTemplate from './template/Prescription.vue'
import PriorAuthTemplate from './template/PriorAuth.vue'
import CPATemplate from './template/CPA.vue'
import CopayQuoteTemplate from './template/CopayQuote.vue'
import DenialTemplate from './template/DenialTemplate.vue'
import TriageTemplate from './template/TriageTemplate.vue'

export default {
	name: 'LoggedComp',
	components: {
		Navbar,
		WelcomeCallTemplate,
		PrescriptionTemplate,
		PriorAuthTemplate,
		CPATemplate,
		CopayQuoteTemplate,
		DenialTemplate,
		TriageTemplate,
	},
	data() {
		return {
         plan_type: false,
         plan_type_button: true,
			case_outcome: '',
			drugName: '',
			ndc: '',
			strength: '',
			dos: '',
			quantity: '',
		}
	},
	computed: mapState({
		fetch_url(state) {
			return state.store.fetch_url
      }
	}),
	methods: {
		set_plan_type(type) {
         this.plan_type = type;
         this.plan_type_button = false;
		},
		reset_all_templates() {
			// this.$refs.template_wrapper.$children[0].$children.reset();
         // console.dir(this.$refs.template_wrapper.$children[0].$children)
         // this.$forceUpdate();
         // this.$store.commit('store/FORCE_UPDATE', Math.random());
         this.$forceUpdate();
		},
	},
	mounted() {
		this.$store.dispatch('logged/fetchAuth', this.fetch_url).then((res) => {
			window.socket = io(this.fetch_url, {
				query: 'sss',
			})
			console.warn(window.socket)
			window.socket.on('customEvent', (data) => {
				console.warn(data)
			})
		})

		if (localStorage.darkModeCng) {
			if (localStorage.darkModeCng === 'true') {
				this.$vuetify.theme.dark = true
			} else {
				this.$vuetify.theme.dark = false
			}
		}
	},
}
</script>

<style>
</style>