const plugin = require('tailwindcss/plugin')
const _merge = require('lodash/merge')
const variablesApi = require('@mertasan/tailwindcss-variables/api')

const config = require('./config')

// Components

module.exports = plugin.withOptions(
  function (options = { colors: [], cssBase: true }) {
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

      addComponents(
        variablesApi.variables(
          _merge({}, theme('variables', {})),
          pluginOptions
        )
      )

      addComponents(
        variablesApi.darkVariables(
          _merge({}, theme('darkVariables', {})),
          pluginOptions,
          config('darkMode')
        )
      )
    }
  },
  () => config
)
