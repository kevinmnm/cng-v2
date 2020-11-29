import colors from 'vuetify/es5/util/colors'

export default {
   // Global page headers (https://go.nuxtjs.dev/config-head)
   head: {
      titleTemplate: '%s - cng-v2',
      title: 'cng-v2',
      meta: [
         { charset: 'utf-8' },
         { name: 'viewport', content: 'width=device-width, initial-scale=1' },
         { hid: 'description', name: 'description', content: '' },
      ],
      link: [
         { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
         { ref: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Balsamiq+Sans:wght@400;700&family=Indie+Flower&family=Nunito+Sans:wght@400;600;700;800;900&display=swap' }
      ],
   },

   // Global CSS (https://go.nuxtjs.dev/config-css)
   css: [],

   // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
   plugins: ['~/plugins/vue-clipboard.js'],

   // Auto import components (https://go.nuxtjs.dev/config-components)
   components: true,

   // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
   buildModules: [
      // https://go.nuxtjs.dev/eslint
      '@nuxtjs/eslint-module',
      // https://go.nuxtjs.dev/vuetify
      '@nuxtjs/vuetify',
   ],

   // Modules (https://go.nuxtjs.dev/config-modules)
   modules: [],

   // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
   vuetify: {
      customVariables: ['~/assets/variables.scss'],
      treeShake: true,
      theme: {
         dark: false,
         themes: {
            light: {
               defaultText: '#000000',
               reverseText: '#ffffff',
               nonCaremark: '#f0d39e',
               nonCaremarkHi: '#ffd485',
               inputBg: '#FFFFFF',
               // inputLabel: '#063f06',
               resultBg: '#f5f5f5',
               inputLabel: '#000000',
               welcomeCallBg: '#d5ffd5',
               welcomeCallHi: '#90ee90',
               prescriptionBg: '#ffdbdb',
               prescriptionHi: '#f39a9a',
               priorAuthBg: '#e3e3ff',
               priorAuthHi: '#add8e6',
               cpaBg: '#fdcdb9',
               cpaHi: '#ffa07a',
               copayQuoteHi: '#d3d3d3',
               copayQuoteBg: '#eeeded',
               denialBg: '#fdd1fd',
               denialHi: '#e290e2',
               triageBg: '#ffffaa',
               triageHi: '#ffff65'               
            },
            dark: {
               accent: colors.grey.darken3,
               secondary: colors.amber.darken3,
               info: colors.teal.lighten1,
               // warning: colors.amber.base,
               error: colors.deepOrange.accent4,
               success: colors.green.accent3,
               
               defaultText: '#ffffff',
               reverseText: '#000000',
               nonCaremark: '#614615',
               nonCaremarkHi: '#614513',
               inputBg: '#404040',
               resultBg: '#000000',
               inputLabel: '#FFFFFF',
               welcomeCallBg: '#489b48',
               welcomeCallHi: '#176217',
               prescriptionBg: '#9e4b4b',
               prescriptionHi: '#5a1515',
               priorAuthBg: '#4f4fa0',
               priorAuthHi: '#17175a',
               cpaBg: '#ad7058',
               cpaHi: '#582814',
               copayQuoteBg: '#9c9c9c',
               copayQuoteHi: '#585858',
               denialBg: '#8a4a8a',
               denialHi: '#501350',
               triageBg: '#909030',
               triageHi: '#36360a'
            },
         },
      },
   },

   // Build Configuration (https://go.nuxtjs.dev/config-build)
   build: {},
   loading: { color: '#39b982' },
}
