const plugin = require('tailwindcss/plugin')
const _merge = require('lodash/merge')
const variablesApi = require('@mertasan/tailwindcss-variables/api')

const variables = require('./variables')
const config = require('./config')

module.exports = plugin.withOptions(
  function (options = {}) {
    return function ({
      addComponents,
      addVariant,
      addBase,
      variants,
      e,
      theme,
      config,
      addUtilities,
    }) {
      const pluginOptions = {
        variablePrefix: '--wui',
        // darkSelector: null, // default: .dark
        // darkToRoot: false, // default: true ( :root.dark or .dark )
      }
      // active({ addVariant, variants, e, theme, addUtilities });
      // selected({ addVariant, variants, e, theme, addUtilities });
      // disabled({ addVariant, variants, e, theme, addUtilities });
      const wuiVariables = variables(theme)

      addComponents(
        variablesApi.variables(
          _merge(wuiVariables.variables, theme('variables', {})),
          pluginOptions
        )
      )

      addComponents(
        variablesApi.darkVariables(
          _merge(wuiVariables.darkVariables, theme('darkVariables', {})),
          pluginOptions,
          config('darkMode')
        )
      )
    }
  },
  function (options) {
    return config
  }
)
