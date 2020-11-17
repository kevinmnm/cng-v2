<template>
	<v-app>
		<v-main>
			<v-container v-if="!show_content" class="progress-circular-wrapper">
				<v-progress-circular
					:width="10"
               size="100"
					color="green"
					indeterminate
				></v-progress-circular>
			</v-container>
			<v-container v-else>
				<nuxt />
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
export default {
   name: 'DefaultVue',
   data() {
      return {
         show_content: false
      }
   },
	created() {
		console.warn(process.env.NODE_ENV)

		if (process.env.NODE_ENV === 'development') {
			this.$store.commit('store/FETCH_URL_MUTATION', 'http://localhost:5555')
		} else if (process.env.NODE_ENV === 'production') {
			this.$store.commit('store/FETCH_URL_MUTATION', 'needs to be declared')
		} else return console.error('UNABLE TO DETERMINE NODE_ENV')
	},
	mounted() {
      this.show_content = false;
		fetch(this.$store.state.store.fetch_url + '/auth', {
			headers: { Authorization: localStorage.token },
		})
			.then((res) => res.json())
			.then((data) => {
				console.warn(data);
            this.$store.dispatch('logged/fetchLogged', data.logged);
            this.show_content = true;
			})
	},
}
</script>

<style scoped>
.progress-circular-wrapper{
   position: absolute;
   left: 0;
   top: 0;
   width: 100%;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
}
</style>
