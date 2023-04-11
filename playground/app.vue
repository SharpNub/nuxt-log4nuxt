<template>
  <div>
    Nuxt is running!
    {{ hello }} 
  </div>
</template>


<script lang="ts">
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
</script>


