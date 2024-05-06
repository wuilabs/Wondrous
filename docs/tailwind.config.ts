import type { Config } from 'tailwindcss'
import { content, plugin } from '@wuilabs/wondrous/utils'

const config: Config = {
  content: {
    relative: true,
    files: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      content()
    ],
  },
  theme: {},
  plugins: [plugin()],
}
export default config
