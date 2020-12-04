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
				<!-- <nuxt keep-alive :keep-alive-props="{ include: ['LoggedComp'] }" /> -->
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
import { mapState } from 'vuex'
import io from 'socket.io-client'

export default {
	name: 'DefaultVue',
	data() {
		return {
			show_content: false,
		}
	},
	computed: mapState({
	   fetch_url: state => state.store.fetch_url
   }),
   methods: {
      forceHttps(){
         if (location.protocol !== 'https:') {
         location.replace(`
            https:${location.href.substring(location.protocol.length)}
      `);
}
      }
   },
   beforeCreate(){
      process.env.NODE_ENV === 'production' && this.forceHttps();
   },
	created() {
		if (process.env.NODE_ENV === 'development') {
			this.$store.commit('store/FETCH_URL_MUTATION', 'http://localhost:5555')
		} else if (process.env.NODE_ENV === 'production') {
			this.$store.commit('store/FETCH_URL_MUTATION', 'https://bvcngserver.herokuapp.com')
		} else return console.error('UNABLE TO DETERMINE NODE_ENV')
	},
	mounted() {
		// DOES NOT COLLIDE WITH LOGIN FUNCTION!
		this.show_content = false

		;(async () => {
			// alert('logging in again');
			await fetch(this.$store.state.store.fetch_url + '/auth', {
				headers: { Authorization: localStorage.token },
			})
				.then((res) => res.json())
				.then((data) => {
					// console.warn(data)
					this.$store.commit('logged/SET_LOGGED', data.logged)
					// this.show_content = true;
				})

			if (this.$store.state.logged.logged === true) {
				let userInfo = await fetch(
					this.$store.state.store.fetch_url + '/user',
					{
						headers: {
							Authorization: localStorage.token,
							'Content-Type': 'application/json',
						},
						method: 'POST',
						body: JSON.stringify({
							_id: localStorage._id,
						}),
					}
				)
				await userInfo.json().then((data) => {
					this.$store.commit(
						'settings/LABEL_VIEW_MUTATION',
						data.userInfo.labelView
					)
					this.$store.commit(
						'settings/LABEL_TYPE_MUTATION',
						data.userInfo.labelType
					)
					this.$store.commit('settings/SETTINGS_MUTATION', [
						data.userInfo.confirmReset,
						'confirmReset',
					])
					this.$store.commit('settings/SETTINGS_MUTATION', [
						data.userInfo.buttonScroll,
						'buttonScroll',
					])
            })
            
				window.socket = io(this.fetch_url, {
					query: {
                  userId: localStorage._id
               }
            })

            // console.warn(window.socket);
            
            this.show_content = true
            
			} else {
				// console.warn('User not logged in..')
				this.show_content = true
			}
		})()
	},
}
// Upon mounted, show progress circle -> fetch auth to server to determine logged state -> wait for any response comes from server -> once server responses, commit (sync) to set 'logged' store state -> show content.
</script>

<style scoped>
.progress-circular-wrapper {
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
