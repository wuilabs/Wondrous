import plugin from 'tailwindcss/plugin'
import colors from '../colors'

export default plugin.withOptions(
  function (options = {}) {
    return function ({ addComponents }) {
      //   addComponents({});
    }
  },
  function (options) {
    return {
      prefix: "wui-",
      theme: {
        colors: colors
      }
    }
  }
)
