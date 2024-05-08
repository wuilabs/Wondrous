const colors = require('./colors')

// Safelist
const colourList = ['primary', 'neutral', 'danger', 'warning', 'success', 'info']
const colorSafeList = []

for (const colorName of colourList) {
  const shades = [
    50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
  ]

  shades.map((shade) => {
    colorSafeList.push(`text-${colorName}-${shade}`)
    colorSafeList.push(`bg-${colorName}-${shade}`)
    colorSafeList.push(`border-${colorName}-${shade}`)
  })
}

module.exports = {
  safelist: colorSafeList,
  theme: {
    colors: colors,
  }
}
