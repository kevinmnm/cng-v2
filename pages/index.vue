<template>
	<v-row>
		<LoginComp v-if="showLoginComp"></LoginComp>
      <LoggedComp v-else></LoggedComp>
	</v-row>
</template>

<script>
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
	}
}
</script>

<style>

</style>