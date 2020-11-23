export const state = () => ({
   logged: false
})

export const mutations = {
   SET_LOGGED(state, payload) {
      state.logged = payload
   }
}

export const actions = {
   async fetchAuth({ commit }, payload) {
      let respond = await fetch(payload + '/auth', {
         headers: { Authorization: localStorage.token }
      });

      let data = await respond.json();

      return new Promise((res, rej) => {
         console.warn('From logged.js action logged value: ' + data.logged);
         commit('SET_LOGGED', data.logged);
         res();
      });
   }
}