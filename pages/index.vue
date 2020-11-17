<template>
	<v-row>
      <LoggedComp v-if="logged"></LoggedComp>
		<LoginComp v-else></LoginComp>
	</v-row>
</template>

<script>
import { mapState } from 'vuex';
import LoginComp from '@/components/LoginComp.vue';
import LoggedComp from '@/components/LoggedComp.vue';

export default {
	name: 'HomePage',
	components: {
      LoginComp,
      LoggedComp
	},
	data() {
		return {
         showLoginComp: true
      }
   },
   computed: mapState({
      logged: state => state.logged.logged
   })
}
</script>

<style>

</style>