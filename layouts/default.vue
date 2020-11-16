<template>
	<v-app>
		<!-- <AppBar /> -->
		<v-main>
			<v-container>
				<nuxt />
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
// import AppBar from '@/components/NavBar.vue';

export default {
	name: 'DefaultVue',
	components: {
		// AppBar,
   },
   created() {
      console.warn(process.env.NODE_ENV);
      if (process.env.NODE_ENV === 'development') {
         this.$store.commit('store/FETCH_URL_MUTATION', 'http://localhost:5555');
      }
   }
}
</script>
