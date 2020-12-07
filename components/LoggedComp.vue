<template>
	<v-col cols="12">
		<Navbar />
		<v-sheet class="d-flex justify-center flex-row" v-if="plan_type_button">
			<v-col cols="6" class="text-center">
				<v-btn
					class="prescriptionHi font-weight-bold"
					@click="set_plan_type('caremark')"
					width="100%"
					v-show="plan_type_button"
					style="font-size: 18px"
					large
					>caremark</v-btn
				>
			</v-col>
			<v-col cols="6" class="text-center">
				<v-btn
					class="nonCaremark font-weight-bold"
					@click="set_plan_type('non-caremark')"
					width="100%"
					v-show="plan_type_button"
					style="font-size: 18px"
					large
					>non-caremark</v-btn
				>
			</v-col>
		</v-sheet>
		<v-card
			outlined
			class="font-weight-bold text-center mb-6"
			:class="[
				{ prescriptionHi: plan_type === 'caremark' },
				{ nonCaremark: plan_type === 'non-caremark' },
			]"
		>
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
						:rules="[(val) => val.trim().length > 0]"
						validate-on-blur
						@blur="$store.commit('info/SET_DRUGNAME', drugName)"
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
						:rules="[(val) => val.trim().length > 0]"
						validate-on-blur
						@blur="$store.commit('info/SET_STRENGTH', strength)"
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
						:rules="[(val) => val.trim().length > 0]"
						validate-on-blur
						@blur="$store.commit('info/SET_QUANTITY', quantity)"
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
						:rules="[(val) => val.trim().length > 0]"
						validate-on-blur
						@blur="$store.commit('info/SET_DOS', dos)"
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
						:rules="[(val) => val.trim().length > 0]"
						validate-on-blur
						@blur="$store.commit('info/SET_NDC', ndc)"
					></v-text-field>
				</v-card>
			</v-card>
			<v-card class="mt-10" v-show="show_case_outcome">
				<h2 class="text-center mb-2">Case Outcome</h2>
				<v-select
					:menu-props="{
						top: false,
						offsetY: true,
						'allow-overflow': true,
						maxHeight: '100%',
					}"
					full-width
					outlined
					filled
					solo
					hide-details
					:items="select_items"
					label="Choose"
					v-model="case_outcome"
					@change="case_outcome_handler()"
				>
					<template
						#selection="{ item }"
						style="position: absolute; width: 100%"
					>
						<div class="selected-items">
							{{ item }}
						</div>
					</template>
					<template #item="{ item }">
						<div
							class="select-items"
							:class="[
								{ prescriptionBg: item.includes('PA initial') },
								{ welcomeCallBg: item.includes('Copay $25 or less') },
								{ welcomeCallBg: item.includes('CPA attempt #1') },
								{ welcomeCallBg: item.includes('CPA attempt #2') },
								{ welcomeCallBg: item.includes('Patient denies CPA') },
								{
									welcomeCallBg: item.includes(
										'Copay is over $25 for Medicare/Medicaid'
									),
								},
								{ triageBg: item.includes('External/Internal triage') },
								{ denialBg: item.includes('PA denial template') },
							]"
						>
							{{ item }}
						</div>
					</template>
				</v-select>
			</v-card>
		</v-sheet>
		<v-sheet
			class="d-flex justify-center flex-column"
			style="background-color: transparent"
			ref="template_wrapper"
			v-if="case_outcome"
		>
			<WelcomeCallTemplate
				v-show="templates.show_WelcomeCallTemplate && show_case_outcome"
				:key="'welcome' + updater"
			/>
			<PrescriptionTemplate
				v-show="
					plan_type === 'caremark' &&
					templates.show_PrescriptionTemplate &&
					show_case_outcome
				"
				:key="'prescription' + updater"
			/>
			<NonCaremarkTemplate
				v-show="
					plan_type === 'non-caremark' &&
					templates.show_NonCaremarkTemplate &&
					show_case_outcome
				"
				:key="'non-prescription' + updater"
			/>
			<PriorAuthTemplate
				v-show="templates.show_PriorAuthTemplate && show_case_outcome"
				:key="'pa' + updater"
			/>
			<CPATemplate
				v-show="templates.show_CPATemplate && show_case_outcome"
				:key="'cpa' + updater"
			/>
			<CopayQuoteTemplate
				v-show="templates.show_CopayQuoteTemplate && show_case_outcome"
				:key="'copayquote' + updater"
			/>
			<DenialTemplate
				v-show="templates.show_DenialTemplate && show_case_outcome"
				:key="'denial' + updater"
			/>
			<TriageTemplate
				v-show="templates.show_TriageTemplate && show_case_outcome"
				:key="'triage' + updater"
			/>

			<CPAapplied
				v-show="templates.show_CPAapplied"
				:key="'already' + updater"
			/>
		</v-sheet>

		<v-col
			cols="12"
			class="d-flex ma-auto justify-center col-sm-6"
			v-if="!confirmReset"
		>
			<v-btn
				class="pa-10 mt-6"
				width="100%"
				color="primary"
				style="font-size: 25px; word-wrap: break-word"
				v-show="plan_type"
				elevation="10"
				@click="reset_all_templates()"
				>reset all</v-btn
			>
		</v-col>

		<v-col cols="12" class="d-flex justify-center" v-if="confirmReset">
			<v-dialog v-model="confirm_dialog" persistent max-width="290">
				<template v-slot:activator="{ on, attrs }">
					<v-btn
						class="pa-10 mt-6"
						width="40%"
						color="primary"
						style="font-size: 25px; word-wrap: break-word"
						v-show="plan_type"
						v-bind="attrs"
						v-on="on"
						elevation="10"
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
		<ButtonScroll />
      <LeftBottom />
	</v-col>
</template>

<script>
import { mapState } from 'vuex'
// import io from 'socket.io-client'
import Navbar from './NavBar.vue'
import WelcomeCallTemplate from './template/WelcomeCall.vue'
import PrescriptionTemplate from './template/Prescription.vue'
import PriorAuthTemplate from './template/PriorAuth.vue'
import CPATemplate from './template/CPA.vue'
import CopayQuoteTemplate from './template/CopayQuote.vue'
import DenialTemplate from './template/DenialTemplate.vue'
import TriageTemplate from './template/TriageTemplate.vue'
import CPAapplied from './template/CPAapplied.vue'
import NonCaremarkTemplate from './template/NonCaremark.vue'
import ButtonScroll from './ButtonScroll.vue'
import LeftBottom from './LeftBottom.vue'

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
		CPAapplied,
		NonCaremarkTemplate,
      ButtonScroll,
      LeftBottom
	},
	data() {
		return {
			updater: 2,
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
				show_NonCaremarkTemplate: false,
				show_PriorAuthTemplate: false,
				show_CPATemplate: false,
				show_CopayQuoteTemplate: false,
				show_DenialTemplate: false,
				show_CPAapplied: false,
				show_TriageTemplate: false,
			},
			confirm_dialog: false,
			select_items: [
				'PA initial',
				'Copay $25 or less',
				'CPA attempt #1',
				'CPA attempt #2',
				'Patient denies CPA',
				'Copay is over $25 for Medicare/Medicaid',
				'External/Internal triage',
				'PA denial template',
			],
		}
	},
	computed: mapState({
		fetch_url(state) {
			return state.store.fetch_url
		},
		confirmReset(state) {
			return state.settings.confirmReset
		},
		// buttonScroll(state){
		//    return state.settings.buttonScroll
		// },
		show_case_outcome() {
			if (
				this.drugName &&
				this.ndc &&
				this.strength &&
				this.dos &&
				this.quantity
			) {
				return true
			}
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
					this.templates.show_NonCaremarkTemplate = true
					break

				case 'Copay $25 or less':
					for (let each in this.templates) {
						this.templates[each] = false
					}
					this.templates.show_WelcomeCallTemplate = true
					this.templates.show_PrescriptionTemplate = true
					this.templates.show_NonCaremarkTemplate = true
					this.templates.show_PriorAuthTemplate = true
					this.templates.show_CopayQuoteTemplate = true
					this.templates.show_CPAapplied = true
					break

				case 'CPA attempt #1':
					for (let each in this.templates) {
						this.templates[each] = false
					}
					this.templates.show_WelcomeCallTemplate = true
					this.templates.show_PrescriptionTemplate = true
					this.templates.show_NonCaremarkTemplate = true
					this.templates.show_PriorAuthTemplate = true
					break

				case 'CPA attempt #2':
					for (let each in this.templates) {
						this.templates[each] = false
					}
					this.templates.show_WelcomeCallTemplate = true
					this.templates.show_PrescriptionTemplate = true
					this.templates.show_NonCaremarkTemplate = true
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
					this.templates.show_NonCaremarkTemplate = true
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
					this.templates.show_NonCaremarkTemplate = true
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
         
         socket.emit('track-event', {
            page: 'home',
            action: 'chose',
            userId: localStorage._id,
            value: this.case_outcome
         });
		},
		set_plan_type(type) {
			this.plan_type = type
			this.plan_type_button = false
			socket.emit('track-event', {
				userId: localStorage._id,
				page: 'home',
				action: 'clicked',
				value: this.plan_type,
			})
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

			// this.$forceUpdate()
         this.updater++
         
         socket.emit('track-event', {
            userId: localStorage._id,
            page: 'home',
            action: 'clicked',
            value: 'reset all button'
         });
		},
	},
	mounted() {
		this.$store.dispatch('logged/fetchAuth', this.fetch_url).then((res) => {
			// window.socket = io(this.fetch_url, {
			// 	query: 'sss',
			// })
			// console.warn(window.socket)
			// window.socket.on('customEvent', (data) => {
			// 	console.warn(data)
			// })
		})

		if (localStorage.darkModeCng) {
			if (localStorage.darkModeCng === 'true') {
				this.$vuetify.theme.dark = true
			} else {
				this.$vuetify.theme.dark = false
			}
      }
      
      socket.emit('track-event', {
         userId: localStorage._id,
         action: 'entered',
         value: 'home',
         page: 'either dashboard or by default'
      });

		/** labelView & labelType **/
		// this.$store.commit('settings/LABEL_VIEW_MUTATION', localStorage.labelView)
		// this.$store.commit('settings/LABEL_TYPE_MUTATION', localStorage.labelType)

		/** Other Settings **/
		// this.$store.commit('settings/SETTINGS_MUTATION', [
		// 	localStorage.buttonScroll,
		// 	'buttonScroll',
		// ])

		// this.$store.commit('settings/SETTINGS_MUTATION', [
		// 	localStorage.confirmReset,
		// 	'confirmReset',
		// ])
	},
}
</script>

<style scoped>
.select-items {
	position: absolute;
	display: flex;
	align-items: center;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	font-weight: bold;
	text-indent: 10px;
	font-size: 18px;
	opacity: 0.8;
}

.select-items:hover {
	font-size: 20px;
	opacity: 1;
}

.selected-items {
	font-weight: bold;
	font-size: 18px;
}
</style>