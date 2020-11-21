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
   pharmacy_list: [
      'FAIRFIELD, NJ #01701',
      'LENEXA, KS #01702',
      'RALEIGH, NC #48045',
      'REDLANDS, CA #01703',
      'TAMPA, FL #48023',
      'MT. PROSPECT, IL #48031',
      'MILFORD, MA #48036',
      'TROY, MI #48040',
      'MONROEVILLE, PA #02921',
      'PHILADELPHIA, PA #02553',
      'PHOENIX, AZ #03129',
      'HUSTON, TX #03159'
   ]
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
