<template>
	<v-sheet>
		<v-card class="left-bottom-wrapper d-flex flex-row" flat>
			<v-dialog
				persistent
				v-model="quick_triage_dialog"
				fullscreen
				style="border: 1px solid lightGrey"
			>
				<template v-slot:activator="{ on, attrs }">
					<v-btn icon v-bind="attrs" v-on="on" rounded text>
						<v-tooltip top>
							<template v-slot:activator="{ on, attrs }">
								<v-icon
									v-bind="attrs"
									v-on="on"
									large
									color="triageHi"
                           style="border-radius:50%;"
									>mdi-alpha-t-circle</v-icon
								>
							</template>
							<span>Triage</span>
						</v-tooltip>
					</v-btn>
				</template>
				<v-card outlined>
					<v-btn
						class="close-btn"
						@click="quick_triage_dialog_close()"
						absolute
						right
					>
						<v-icon>mdi-close-thick</v-icon>
					</v-btn>
					<br /><br />
					<v-card flat>
						<v-text-field
							label="Drug Name"
							color="inputLabel"
							autocomplete="off"
							style="width: 50%"
							class="ma-auto"
							autofocus
							hide-details
							outlined
							dense
							v-model="quick_drugname"
							:rules="[(val) => val.trim().length > 0]"
							validate-on-blur
							@blur="$store.commit('info/SET_DRUGNAME', quick_drugname)"
						></v-text-field>
					</v-card>
					<TriageTemplate />
				</v-card>
			</v-dialog>
		</v-card>
	</v-sheet>
</template>

<script>
import TriageTemplate from './template/TriageTemplate.vue'

export default {
	name: 'SAtriage',
	components: {
		TriageTemplate,
	},
	data() {
		return {
			quick_drugname: '',
			quick_triage_dialog: false,
		}
	},
	methods: {
		quick_triage_dialog_close() {
			this.quick_drugname = ''
			this.$store.commit('info/SET_DRUGNAME', this.quick_drugname)
			this.quick_triage_dialog = false
		},
	},
}
</script>
