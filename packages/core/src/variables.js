const colors = require('./colors')

module.exports = theme => ({
  variables: {
    DEFAULT: {
      palette: {
        primary: { ...colors.blue },
        neutral: { ...colors.gray },
        success: { ...colors.green },
        danger: { ...colors.red },
        warning: { ...colors.amber },
        info: { ...colors.indigo },
      },
    },
  },
  darkVariables: {
    body: {
      color: 'var(--delight-palette-secondary-100)',
      background: 'var(--delight-palette-secondary-900)',
    },
  },
})

