<template>
	<v-card class="left-bottom-wrapper d-flex flex-row" flat >
		<v-dialog
			persistent
			v-model="quick_welcome_dialog"
			fullscreen
			style="border: 1px solid lightGrey"
		>
			<template v-slot:activator="{ on, attrs }">
				<v-btn icon v-bind="attrs" v-on="on" rounded text>
					<v-icon large color="welcomeCallHi">mdi-alpha-w-circle</v-icon>
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
            <br><br>
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

         <!-- <v-col
			cols="12"
			class="d-flex ma-auto justify-center col-sm-6"
			v-if="!confirmReset"
		>
			<v-btn
				class="pa-10 mt-6"
				width="100%"
				color="primary"
				style="font-size: 25px; word-wrap: break-word"
				elevation="10"
				@click="reset_all_templates()"
				>reset all</v-btn
			>
		</v-col> -->

		</v-dialog>

		<!-- <v-btn icon>
			<v-icon color="triageHi">mdi-alpha-t-circle</v-icon>
		</v-btn>

		<v-btn icon>
			<v-icon color="denialHi">mdi-alpha-d-circle</v-icon>
		</v-btn> -->
	</v-card>
</template>

<script>
import WelcomeCall from '@/components/template/WelcomeCall.vue'

export default {
	name: 'LeftBottomComp',
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
      quick_welcome_dialog_close(){
         this.quick_drugname = '';
         this.$store.commit('info/SET_DRUGNAME', this.quick_drugname);
         this.quick_welcome_dialog = false;
      }
   }
}
</script>

<style scoped>
/* .close-btn {
	display: block;
	position: absolute;
   right: 0;
} */
.left-bottom-wrapper {
	position: fixed;
	box-sizing: border-box;
	left: 0;
	bottom: 0;
}
</style>