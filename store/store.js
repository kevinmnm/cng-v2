export const state = () => ({
   // fetch_url: ''
})

export const mutations = {
   FETCH_URL_MUTATION(state, payload) {
      state.fetch_url = payload;
   }
}

// export const actions = {
//    async fetchAuth({ commit, state }, payload) {
//       let respond = await fetch(state.fetch_url + '/auth', {
//          headers: { Authorization: localStorage.token }
//       });

//       let data = await respond.json();
//    }
// }