export const state = () => ({
   logged: false
})

export const mutations = {
   SET_LOGGED(state, payload) {
      state.logged = payload
   }
}

export const actions = {
   fetchLogged({ commit }, payload) {
      return commit('SET_LOGGED', payload);
   }
}