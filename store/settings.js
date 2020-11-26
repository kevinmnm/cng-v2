export const state = () => ({
   labelView: true, // dense
   labelType: true, // show label
   confirmReset: false, // do not confirm 
   buttonScroll: true // show scroll button
})

export const mutations = {
   SETTINGS_MUTATION(state, payload) {
      let newValue = payload[0];
      if (typeof newValue !== 'boolean') {
         newValue = Boolean(newValue);
      }
      let settingType = payload[1];
      state[settingType] = newValue;
   },
   LABEL_VIEW_MUTATION(state, payload){
      (payload === 'Dense') ?  state.labelView = true : state.labelView = false;
      localStorage.labelView = payload;
   },
   LABEL_TYPE_MUTATION(state, payload){
      (payload === 'Show') ? state.labelType = true : state.labelType = false;
      localStorage.labelType = payload;
   }
}

export const actions = {
   async fetchSettings({commit}, payload) {
      let settingType = payload[2];
      let newValue = payload[0];
      let fetchUrl = payload[1];

      const resp = await fetch(fetchUrl + '/settings', {
         headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.token 
         },
         method: 'POST',
         body: JSON.stringify({
            _id: localStorage._id,
            settingType: settingType,
            newValue: newValue
         })
      });

      resp.json().then( data => {
         commit('SETTINGS_MUTATION', [data._doc.confirmReset, 'confirmReset']);
      });
   },
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