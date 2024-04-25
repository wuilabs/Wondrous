# WUI Core

WUI Core is a set of CSS utilities to help you build custom designs more efficiently. It makes it possible to rapidly lay out custom designs.

## Installation

Install the package in your project directory with:

<!-- #default-branch-switch -->

```bash
# using npm
npm i @wuilabs/core
npm i tailwind postcss autoprefixer -D

# using yarn
yarn add @wuilabs/core
yarn add tailwind postcss autoprefixer -D

# using pnpm
pnpm add @wuilabs/core
pnpm i tailwind postcss autoprefixer -D
```

## Getting Starting

Add the plugin to your `tailwind.config.js` file:

```javascript
import plugin from '@wuilabs/core'

const config: Config = {
  content: [
    // ...
  ],
  plugins: {
    require("@wuilabs/core")()
  ],
}
export default config
```