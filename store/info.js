export const state = () => ({
   drugName: '',
   strength: '',
   quantity: '',
   dos: '',
   ndc: '',
   template_input_style: {
      'font-size': '20px',
      'font-weight': 'bold',
      'border-radius': '0',
   },
})

export const mutations = {
   SET_DRUGNAME(state, payload) {
      state.drugName = payload;
   },
   SET_STRENGTH(state, payload) {
      state.strength = payload;
   },
   SET_QUANTITY(state, payload) {
      state.quantity = payload;
   },
   SET_DOS(state, payload) {
      state.dos = payload;
   },
   SET_NDC(state, payload) {
      state.ndc = payload;
   }
}
