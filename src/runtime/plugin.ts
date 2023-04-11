import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { reactive } from 'vue'

interface LogTypes {
  trace: LogTypeMeta,
  debug: LogTypeMeta,
  info: LogTypeMeta,
  warn: LogTypeMeta,
  error: LogTypeMeta
}
interface LogTypeMeta {
  name: string,
  color: string
}
interface Logger {
  [key: string]: Function
}

const logLevels = ['trace', 'debug', 'info', 'warn', 'error']

const logTypes: LogTypes = {
  trace: {
    name: 'Trace',
    color: '#881DD7',
  },
  debug: {
    name: 'Debug',
    color: '#128655',
  },
  info: {
    name: 'Info',
    color: '#18A7B4',
  },
  warn: {
    name: 'Warning',
    color: '#D7881D',
  },
  error: {
    name: 'Error',
    color: '#D72B1D',
  }
}

export default defineNuxtPlugin(() => {
  const { $config } = useNuxtApp()
  const options = $config.public.log4nuxt

  if (!options) {
    throw new Error('log4nuxt is misconfigured. There are no options set')
  }

  const configIsEnabled = options.isEnabled
  const configLogLevel = options.logLevel

  const loggers: Logger = {};
  logLevels.forEach(logLevel => {
    loggers[logLevel] = (() => { })
    if (logLevels.indexOf(logLevel) >= logLevels.indexOf(configLogLevel) && configIsEnabled) {

      loggers[logLevel] = ((...args: any[]) => {
        const methodName = getMethodName()
        output(logLevel, methodName, args)
      })
    }
  })

  return {
    provide: {
      log4nuxt: reactive(loggers)
    }
  }
})

function output(logLevel: any, methodName: string, args: any[]) {
  console.log(
    '%c' + logTypes[logLevel as keyof LogTypes].name + '%c' + methodName + '()',
    'background: ' + logTypes[logLevel as keyof LogTypes].color + ';padding: 2px 8px; border-radius: 6px 0 0 6px; color: #fff',
    'background: #D3D3D3; color:#000000; padding: 2px 8px; border-radius: 0 6px 6px 0;'
  )

  args.forEach((arg) => {
    console.log('%c>>', 'color: ' + logTypes[logLevel as keyof LogTypes].color + '; margin-left:5px;', arg)
  })
}

function getMethodName() {
  let error: any = {}

  try { throw new Error('') } catch (e) { error = e }

  // return if browser does not have .stack property
  if (error.stack === undefined) {
    return ''
  }

  let methodName = error.stack.split('\n')[3]

  if (/@/.test(methodName)) {
    methodName = error.stack.split('\n')[2]
    methodName = methodName.trim().split('@')[0]
  }

  if (/ /.test(methodName)) {
    methodName = methodName.trim().split(' ')[1]
  }

  if (methodName && methodName.includes('.')) {
    methodName = methodName.split('.')[1]
  }

  return methodName
}