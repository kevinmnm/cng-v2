<template>
	<v-col cols="12">
		<Navbar />
		<v-sheet class="d-flex justify-center flex-row">
			<v-col cols="6" class="text-center">
				<v-btn>caremark</v-btn>
			</v-col>
			<v-col cols="6" class="text-center">
				<v-btn>non-caremark</v-btn>
			</v-col>
		</v-sheet>
		<v-sheet class="mb-4" elevation="2">
			<h2 class="text-center mb-2">Drug Info</h2>
			<v-card
				flat
				class="d-flex justify-center"
				:class="
					$vuetify.breakpoint.name === 'xs' ? 'flex-column' : 'flex-row'
				"
			>
				<!-- <v-card flat>
					<v-menu bottom nudge-bottom internal-activator open-on-focus>
						<template v-slot:activator="{ on, attrs }">
							<v-text-field
								label="Drug Name"
								color="inputLabel"
								autocomplete="off"
								v-bind="attrs"
								v-on="on"
								hide-details
								outlined
								dense
								v-model="drugName"
								@change="$store.commit('info/SET_DRUGNAME', drugName)"
							></v-text-field>
						</template>
						<v-list>
                     <v-list-item>asdfasdf</v-list-item>
                     <v-list-item>ssss</v-list-item>
                  </v-list>
					</v-menu>
				</v-card> -->
				<v-card flat>
					<v-text-field
						label="Drug Name"
						color="inputLabel"
						autocomplete="off"
						v-bind="attrs"
						v-on="on"
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
                  'allow-overflow': true 
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
				></v-select>
			</v-card>
		</v-sheet>
		<v-sheet
			class="d-flex justify-center flex-column"
			style="background-color: transparent"
		>
			<WelcomeCallTemplate />
			<PrescriptionTemplate />
			<PriorAuthTemplate />
			<CPATemplate />
			<CopayQuoteTemplate />
			<DenialTemplate />
			<TriageTemplate />
		</v-sheet>
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
		},
	}),
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