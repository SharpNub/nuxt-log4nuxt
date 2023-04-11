export default defineNuxtConfig({
  modules: ['../src/module'],
  log4nuxt: {
    isEnabled: true, // true or false, defaults to true
    logLevel: 'trace', // trace, debug, info, warn or error, defaults to debug
  }
})
