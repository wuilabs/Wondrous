import type { Config } from 'tailwindcss'
import { plugin } from '@wuilabs/wondrous/utils'

const config: Config = {
  content: {
    relative: true,
    files: ['../packages/wondrous/**/*.{js,ts,jsx,tsx,mdx}'],
  },
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [plugin],
}
export default config
