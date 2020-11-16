export const state = () => ({
   // fetch_url: ''
})

// export const getters = {
//    fetch_url: state => {
//       return process.env.NODE_ENV === 'development'
//          ? state.fetch_url = 'http://localhost:5555'
//          : state.fetch_url = 'not determined yet';
//    }
// }

export const mutations = {
   FETCH_URL_MUTATION(state, payload) {
      state.fetch_url = payload;
   }
}

// console.warn('singup store created!');