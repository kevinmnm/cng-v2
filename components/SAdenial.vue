<template>
	<v-sheet>
		<v-dialog
			persistent
			v-model="quick_denial_dialog"
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
								color="denialHi"
                        style="border-radius:50%;"
								>mdi-alpha-d-circle</v-icon
							>
						</template>
						<span>Denial</span>
					</v-tooltip>
				</v-btn>
			</template>
			<v-card outlined>
				<v-btn
					class="close-btn"
					@click="quick_denial_dialog_close()"
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
				<DenialTemplate />
			</v-card>
		</v-dialog>
	</v-sheet>
</template>

<script>
import DenialTemplate from './template/DenialTemplate.vue'

export default {
   name: 'standaloneDenialComp',
   components: {
      DenialTemplate
   },
   data(){
      return {
         quick_drugname: '',
         quick_denial_dialog: false
      }
   },
   methods: {
		quick_denial_dialog_close() {
			this.quick_drugname = ''
			this.$store.commit('info/SET_DRUGNAME', this.quick_drugname)
			this.quick_denial_dialog = false
		},
	},
}
</script>

<style>
</style>