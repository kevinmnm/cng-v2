<template>
	<v-sheet>
		<v-dialog
			persistent
			v-model="quick_welcome_dialog"
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
								color="welcomeCallHi"
                        style="border-radius:50%;"
								>mdi-alpha-w-circle</v-icon
							>
						</template>
						<span>Welcome Call</span>
					</v-tooltip>
				</v-btn>
			</template>
			<v-card outlined>
				<v-btn
					class="close-btn"
					@click="quick_welcome_dialog_close()"
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
				<WelcomeCall />
			</v-card>
		</v-dialog>
	</v-sheet>
</template>

<script>
import WelcomeCall from '@/components/template/WelcomeCall.vue'

export default {
	name: 'standaloneWelcomeCall',
	components: {
		WelcomeCall,
	},
	data() {
		return {
			quick_drugname: '',
			quick_welcome_dialog: false,
		}
	},
	methods: {
		quick_welcome_dialog_close() {
			this.quick_drugname = ''
			this.$store.commit('info/SET_DRUGNAME', this.quick_drugname)
			this.quick_welcome_dialog = false
		},
	},
}
</script>
