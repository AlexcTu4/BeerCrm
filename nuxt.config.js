import {store} from "core-js/internals/reflect-metadata";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'beer_crm',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/style/global.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/CRM.ts',
    '@/plugins/contact.ts',
    '@/plugins/directives/myValidation.ts',
    '@/plugins/directives/clickOutside.ts'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  styleResources: {
    scss: [
      '@/assets/style/global.scss',
    ]
  },
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/fontawesome',
  ],
  fontawesome: {
    component: 'fa',
    icons:{
      solid:true,
      regular: true
    },
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/auth-next',
    '@nuxtjs/style-resources',
    'nuxt-route-meta',
  ],
  transpileDependencies: [
    'vuex-module-decorators'
  ],

  auth:{

  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true
  },
  proxy: {
    '/api/crms': { target: 'http://localhost:8000/api/crms', pathRewrite: {'^/api/crms': ''} },
    '/api/contacts': { target: 'http://localhost:8000/api/contacts', pathRewrite: {'^/api/contacts': ''} }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {

  },

}
