<template>
	<v-card v-if="buttonScroll" flat class="button-scroll-wrapper d-flex justify-space-around align-center flex-column">
		<v-btn fab x-small bottom right @click="scroll_top()">
			<v-icon small>mdi-arrow-up</v-icon>
		</v-btn>
		<v-btn fab x-small bottom right @click="scroll_bottom()">
			<v-icon small>mdi-arrow-down</v-icon>
		</v-btn>
	</v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'ButtonScrollComp',
   data(){
      return {
         scroll_height: null
      }
   },
   computed: mapState({
		buttonScroll: state => state.settings.buttonScroll
	}),
   methods: {
      scroll_top(){
         this.$vuetify.goTo(0);
      },
      scroll_bottom(){
         this.scroll_height = document.body.scrollHeight;
         this.$vuetify.goTo(this.scroll_height);
      }
   }
}
</script>

<style scoped>

.button-scroll-wrapper {
   position: fixed;
   right: 0;
   bottom: 0;
   background: transparent;
   width: 70px;
   height: 90px;
}

</style>
