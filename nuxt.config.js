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
   plugins: [],

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
      theme: {
         dark: false,
         themes: {
            light: {
               inputBg: 'white',
               // inputLabel: '#063f06',
               inputLabel: 'black',
               welcomeCallBg: '#d5ffd5',
               welcomeCallHi: '#90ee90',
               prescriptionBg: '#ffdbdb',
               prescriptionHi: '#f39a9a'
            },
            dark: {
               primary: colors.blue.darken2,
               accent: colors.grey.darken3,
               secondary: colors.amber.darken3,
               info: colors.teal.lighten1,
               warning: colors.amber.base,
               error: colors.deepOrange.accent4,
               success: colors.green.accent3,
               
               inputBg: '#404040',
               inputLabel: 'white',
               welcomeCallBg: '#489b48',
               welcomeCallHi: '#176217',
               prescriptionBg: '#9e4b4b',
               prescriptionHi: '#5a1515'
            },
         },
      },
   },

   // Build Configuration (https://go.nuxtjs.dev/config-build)
   build: {},
   loading: { color: '#39b982' },
}
