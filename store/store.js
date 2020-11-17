export const state = () => ({
   // fetch_url: ''
})


export const mutations = {
   FETCH_URL_MUTATION(state, payload) {
      state.fetch_url = payload;
   }
}
