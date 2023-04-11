# nuxt-log4nuxt

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

## Introduction
A small but helpful logging module for nuxt 3 projects based on [nuxt-logger](https://www.npmjs.com/package/nuxt-logger) created by [mahnuh](https://www.npmjs.com/~mahnuh)

## Setup

1. Add `nuxt-log4nuxt` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-log4nuxt

# Using yarn
yarn add --dev nuxt-log4nuxt

# Using npm
npm install --save-dev nuxt-log4nuxt
```

2. Add `nuxt-log4nuxt` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-log4nuxt'
  ],

  // OPTIONAL CONFIGURATION
  log4nuxt: {
    isEnabled: true, // true or false, defaults to true
    logLevel: 'trace', // trace, debug, info, warn or error, defaults to debug
  }
})
```

That's it! You can now use log4nuxt in your Nuxt app ✨

## Usage

There are 5 methods available, one for each log level (`trace`, `debug`, `info`, `warn`, `error`) which accept one or more arguments of any kind.

For example
```js
  this.$log4nuxt.trace('log a trace message')
  this.$log4nuxt.debug('log a debug message')
  this.$log4nuxt.info('log an info message')
  this.$log4nuxt.warn('log a warn message')
  this.$log4nuxt.error('log an error message')
```


Some more advanced examples of accessing the module methods are given below:

```.ts
import { useNuxtApp } from '#app'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    useNuxtApp().$log4nuxt.debug('logging on setup')
  },
  data() {
    this.$log4nuxt.debug('logging from the data method')
    return {
      hello: "Hello World!"
    }
  },
  mounted() {
    console.log("logging without log4nuxt")
    this.$log4nuxt.debug('logging from mounted')
    this.callLogger(this.$log4nuxt)
  },
  methods: {
    callLogger(logger : any) {
      logger.trace('logging trace from a method')
      logger.debug('logging debug from a method')
      logger.info('logging info from a method')
      logger.warn('logging warn from a method')
      logger.error('logging error from a method')
    }
  }
})
```

<p algin="center">
  <h4>Client Side</h4>
	<img src="https://raw.githubusercontent.com/SharpNub/nuxt-log4nuxt/main/documentation/assets/logs-client_side.png">
  <br/>
  <h4>Server Side</h4>
	<img src="https://raw.githubusercontent.com/SharpNub/nuxt-log4nuxt/main/documentation/assets/logs-server_side.png">
</p>

## Changelog 
[✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/nuxt-log4nuxt?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Contributing

[SUBMIT BUGS OR FEATURE REQUESTS](https://github.com/SharpNub/nuxt-log4nuxt/issues)

[CONTRIBUTING STEPS](https://github.com/SharpNub/nuxt-log4nuxt/blob/main/CONTRIBUTING.md)





<!-- Variables -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-log4nuxt/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-log4nuxt

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-log4nuxt.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-log4nuxt

[license-src]: https://img.shields.io/npm/l/nuxt-log4nuxt.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-log4nuxt

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com