export const state = () => ({
   labelView: true, // dense
   labelType: true // show label
})

export const mutations = {
   LABEL_VIEW_MUTATION(state, payload){
      (payload === 'Dense') ?  state.labelView = true : state.labelView = false;
   },
   LABEL_TYPE_MUTATION(state, payload){
      (payload === 'Show') ? state.labelType = true : state.labelType = false;
   }
}

export const actions = {
   async fetchLabelType({commit}, payload) {
      const resp = await fetch(payload[1] + '/settings', {
         headers: { 
            'Content-Type': 'application/json',
            Authorization: localStorage.token 
         },
         method: 'POST',
         body: JSON.stringify({
            _id: localStorage._id,
            labelType: payload[0]
         })
      })

      resp.json().then( res => {
         commit('LABEL_TYPE_MUTATION', res._doc.labelType);
         console.log(res._doc.labelType);
      });
   },
   async fetchLabelView({commit}, payload) {
      const resp = await fetch(payload[1] + '/settings', {
         headers: { 
            'Content-Type': 'application/json',
            Authorization: localStorage.token
         },
         method: 'POST',
         body: JSON.stringify({
            _id: localStorage._id,
            labelView: payload[0]
         })
      })

      resp.json().then (res => {
         commit('LABEL_VIEW_MUTATION', res._doc.labelView);
      });
   }
}