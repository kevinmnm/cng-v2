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
import { mapState } from 'vuex';

export default {
   name: 'DefaultVue',
   data() {
      return {
         show_content: false
      }
   },
   // computed: mapState({
   //    show_content: state => state.logged.logged
   // }),
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
            this.$store.commit('logged/SET_LOGGED', data.logged);
            this.show_content = true;
         })
	},
}
// Upon mounted, show progress circle -> fetch auth to server to determine logged state -> wait for any response comes from server -> once server responses, commit (sync) to set 'logged' store state -> show content.
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
