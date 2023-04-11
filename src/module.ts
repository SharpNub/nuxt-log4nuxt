import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import { defu } from 'defu'

// Module options TypeScript interface definition
export interface ModuleOptions {
    /**
    * Setting to `false` disables the module.
    * @default true
    * @description Use this setting to disable the module.
    */
    isEnabled?: boolean
    /**
    * The global logging level
    * @default 'debug'
    * @description Set the global logging level.
    */
    logLevel?: string
}

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: 'nuxt-log4nuxt',
        configKey: 'log4nuxt',
        compatibility: {
            nuxt: "^3.1.1",
        },
    },
    // Default configuration options of the Nuxt module
    defaults: {
        isEnabled: true,
        logLevel: 'debug',
    },
    setup(options, nuxt) {
        console.log('[log4nuxt] Thank you for using log4nuxt!')

        nuxt.options.runtimeConfig.public.log4nuxt = defu(nuxt.options.runtimeConfig.public.log4nuxt, {
            isEnabled: options.isEnabled,
            logLevel: options.logLevel
        })

        if (!options.isEnabled) {
            console.warn("[log4nuxt] Module is disabled (`isEnabled` = `false`) so no logs will be displayed.")
        }
        const resolver = createResolver(import.meta.url)

        // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
        addPlugin(resolver.resolve('./runtime/plugin'))

    }
})
