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
   computed: mapState({
      logged: state => state.logged.logged // Initially false in store.
   }),
}
</script>

<style>

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: black;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
  width: 20px;
}

</style>