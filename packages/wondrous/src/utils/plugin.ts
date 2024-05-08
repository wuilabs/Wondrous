import corePlugin from "@wuilabs/core"

interface Content {
  /**
   * Path to `node_modules` where `@wuilabs/wondrous` is installed
   *
   * ===============================================
   *
   * @example
   * ```
   * // tailwind.config.(js|cjs|mjs) file
   *
   * // cjs
   * const { content, Plugin } = require("@wuilabs/wondrous/utils");
   * // esm
   * import { content, Plugin } from "@wuilabs/wondrous/utils";
   *
   * {
   *   content: [
   *     // ...
   *     content({ base: "../../" })
   *   ],
   *   plugins: [
   *     // ...
   *     plugin()
   *   ]
   * }
   * ```
   *
   * @default "./"
   */
  base?: string
}

export function content({ base = './' }: Content = {}) {
  const path = 'node_modules/@wuilabs/wondrous/**/*.{js,jsx}'

  return `${base}${path}`
}

export function plugin(options = {}) {
  return corePlugin(options)
}
