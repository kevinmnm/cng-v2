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
					@change="case_outcome_handler()"
				></v-select>
			</v-card>
		</v-sheet>
		<v-sheet
			class="d-flex justify-center flex-column"
			style="background-color: transparent"
			ref="template_wrapper"
			v-if="case_outcome"
		>
			<WelcomeCallTemplate
				v-show="templates.show_WelcomeCallTemplate"
				:key="'welcome' + Math.random()"
			/>
			<PrescriptionTemplate
				v-show="
					plan_type === 'caremark' && templates.show_PrescriptionTemplate
				"
				:key="'prescription' + Math.random()"
			/>
			<PriorAuthTemplate
				v-show="templates.show_PriorAuthTemplate"
				:key="'pa' + Math.random()"
			/>
			<CPATemplate
				v-show="templates.show_CPATemplate"
				:key="'cpa' + Math.random()"
			/>
			<CopayQuoteTemplate
				v-show="templates.show_CopayQuoteTemplate"
				:key="'copayquote' + Math.random()"
			/>
			<DenialTemplate
				v-show="templates.show_DenialTemplate"
				:key="'denial' + Math.random()"
			/>
			<TriageTemplate
				v-show="templates.show_TriageTemplate"
				:key="'triage' + Math.random()"
			/>
			<!-- <WelcomeCallTemplate />
			<PrescriptionTemplate />
			<PriorAuthTemplate />
			<CPATemplate/>
			<CopayQuoteTemplate />
			<DenialTemplate />
			<TriageTemplate /> -->
		</v-sheet>
		<v-col cols="12" class="d-flex justify-center" v-if="!confirmReset">
			<v-btn
				class="pa-10"
				width="40%"
				color="primary"
				style="font-size: 30px"
				v-show="plan_type"
				@click="reset_all_templates()"
				>reset all</v-btn
			>
		</v-col>

		<v-col cols="12" class="d-flex justify-center" v-if="confirmReset">
			<v-dialog v-model="confirm_dialog" persistent max-width="290">
				<template v-slot:activator="{ on, attrs }">
					<v-btn
						class="pa-10"
						width="40%"
						color="primary"
						style="font-size: 30px"
						v-show="plan_type"
						v-bind="attrs"
						v-on="on"
						>reset all</v-btn
					>
				</template>
				<v-card outlined>
					<v-card-title class="headline text-center">
						Are you sure you want to reset all?
					</v-card-title>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							color="shades"
							width="100px"
							@click="confirm_dialog = false"
						>
							no
						</v-btn>
						<v-btn
							color="deep-orange"
							dark
							width="100px"
							@click="reset_all_templates(), (confirm_dialog = false)"
						>
							yes
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-col>
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
			templates: {
				show_WelcomeCallTemplate: false,
				show_PrescriptionTemplate: false,
				show_PriorAuthTemplate: false,
				show_CPATemplate: false,
				show_CopayQuoteTemplate: false,
				show_DenialTemplate: false,
				show_TriageTemplate: false,
			},
			confirm_dialog: false,
		}
	},
	computed: mapState({
		fetch_url(state) {
			return state.store.fetch_url
		},
		confirmReset(state) {
			return state.settings.confirmReset
		},
	}),
	methods: {
		case_outcome_handler() {
			switch (this.case_outcome) {
				case 'PA initial':
					for (let each in this.templates) {
						this.templates[each] = false
					}
					this.templates.show_WelcomeCallTemplate = true
					this.templates.show_PrescriptionTemplate = true
					break

				case 'Copay $25 or less':
					for (let each in this.templates) {
						this.templates[each] = false
					}
					this.templates.show_WelcomeCallTemplate = true
					this.templates.show_PrescriptionTemplate = true
					this.templates.show_PriorAuthTemplate = true
					this.templates.show_CopayQuoteTemplate = true
					// cpa already applied template needed.
					break

				case 'CPA attempt #1':
					for (let each in this.templates) {
						this.templates[each] = false
					}
					this.templates.show_WelcomeCallTemplate = true
					this.templates.show_PrescriptionTemplate = true
					this.templates.show_PriorAuthTemplate = true
					break

				case 'CPA attempt #2':
					for (let each in this.templates) {
						this.templates[each] = false
					}
					this.templates.show_WelcomeCallTemplate = true
					this.templates.show_PrescriptionTemplate = true
					this.templates.show_PriorAuthTemplate = true
					this.templates.show_CPATemplate = true
					this.templates.show_CopayQuoteTemplate = true
					break

				case 'Patient denies CPA':
					for (let each in this.templates) {
						this.templates[each] = false
					}
					this.templates.show_WelcomeCallTemplate = true
					this.templates.show_PrescriptionTemplate = true
               this.templates.show_PriorAuthTemplate = true
               this.templates.show_CPATemplate = true
					this.templates.show_CopayQuoteTemplate = true
					break

				case 'Copay is over $25 for Medicare/Medicaid':
					for (let each in this.templates) {
						this.templates[each] = false
					}
					this.templates.show_WelcomeCallTemplate = true
					this.templates.show_PrescriptionTemplate = true
					this.templates.show_PriorAuthTemplate = true
					this.templates.show_CopayQuoteTemplate = true
					break

				case 'External/Internal triage':
					for (let each in this.templates) {
						this.templates[each] = false
					}
					this.templates.show_TriageTemplate = true
					break

				case 'PA denial template':
					for (let each in this.templates) {
						this.templates[each] = false
					}
					this.templates.show_DenialTemplate = true
					break
			}
		},
		set_plan_type(type) {
			this.plan_type = type
			this.plan_type_button = false
		},
		reset_all_templates() {
			this.drugName = ''
			this.$store.commit('info/SET_DRUGNAME', this.drugName)

			this.strength = ''
			this.$store.commit('info/SET_STRENGTH', this.strength)

			this.quantity = ''
			this.$store.commit('info/SET_QUANTITY', this.quantity)

			this.dos = ''
			this.$store.commit('info/SET_DOS', this.dos)

			this.ndc = ''
			this.$store.commit('info/SET_NDC', this.ndc)

			this.case_outcome = ''
			this.plan_type = false
			this.plan_type_button = true

			this.$forceUpdate()
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