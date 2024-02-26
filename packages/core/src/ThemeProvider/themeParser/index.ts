import Parser, { type Theme } from './Parser';

/**
 * a function that parse theme and return { css, vars }
 *
 * @param {Object} theme
 *
 * @returns {{ css: Object, vars: Object }} `css` is the stylesheet, `vars` is an object to get css variable (same structure as theme).
 *
 * @example
 * const { css, vars } = themeParser({
 *  theme: {
 *    fontSize: 12,
 *    lineHeight: 1.2,
 *    palette: { primary: { 500: 'var(--color)' }
 *  }
 * })
 *
 * console.log(css) // { '--foo-fontSize': '12px', '--foo-lineHeight': 1.2, '--foo-palette-primary-500': 'var(--color)' }
 * console.log(vars) // { fontSize: 'var(--foo-fontSize)', lineHeight: 'var(--foo-lineHeight)', palette: { primary: { 500: 'var(--foo-palette-primary-500)' } } }
 */
export default function themeParser(theme: Theme) {
  const parser = new Parser(theme);
  const css = parser.css;
  const vars = parser.vars;

  return { css, vars };
}
