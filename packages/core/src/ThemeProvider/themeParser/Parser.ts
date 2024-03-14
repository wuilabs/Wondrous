export type Theme<V = any> = {
  [k: string | number]: Theme<V> | V;
};

class Parser<T extends Record<string, any>> {
  private __css: Record<string, string | number> = {};
  private __vars = {} as T;
  constructor(private __theme: T) {
    this.parse();
  }

  // Getters && Setters
  get css() {
    return this.__css;
  }
  get vars() {
    return this.__vars;
  }

  // Helper function

  /**
   * A helper function to return a value of a key in config excluding theme.
   *
   * @param {string} key
   * @returns value
   */
  config = (configKey: string) => {
    const keys = configKey.split('.');
    let value = this.__theme.theme;
    for (let key of keys) {
      if (!value[key]) throw new Error(`${key} doesn't exist in theme object.`);
      value = value[key];
    }
    return value;
  };

  /**
   * A helper function to return a value of a key in theme.
   *
   * @param {string} key
   * @returns value
   */
  theme = (themeKey: string) => {
    const keys = themeKey.split('.');
    let value = this.__theme.theme;
    for (let key of keys) {
      if (!value[key]) throw new Error(`${key} doesn't exist in theme object.`);
      value = value[key];
    }
    return value;
  };

  // Methods
  /**
   * This function create an object from keys, value and then assign to target
   *
   * @param {Object} obj : the target object to be assigned
   * @param {string[]} keys
   * @param {string | number} value
   *
   * @example
   * const source = {}
   * assignNestedKeys(source, ['palette', 'primary'], 'var(--palette-primary)')
   * console.log(source) // { palette: { primary: 'var(--palette-primary)' } }
   *
   * @example
   * const source = { palette: { primary: 'var(--palette-primary)' } }
   * assignNestedKeys(source, ['palette', 'secondary'], 'var(--palette-secondary)')
   * console.log(source) // { palette: { primary: 'var(--palette-primary)', secondary: 'var(--palette-secondary)' } }
   */
  assignKeys = <T extends Record<string, any> | null | undefined = Theme, Value = any>(
    object: T,
    keys: Array<string>,
    value: Value,
  ) => {
    let temp: T = object;
    keys.forEach((key, index) => {
      if (temp && typeof temp === 'object') {
        if (index === keys.length - 1) {
          temp[key] = value;
        } else {
          if (!temp[key]) {
            temp[key] = {};
          }
          temp = temp[key];
        }
      }
    });
  };

  /**
   *
   * @param {Function} callback : a function that will be called when
   *                   - the deepest key in source object is reached
   *                   - the value of the deepest key is NOT `undefined` | `null`
   *
   * @example
   * walkObjectDeep(console.log) // ['palette', 'primary', 'main'] '#000000'
   */
  walkObjectDeep = <Value>(callback: (keys: Array<string>, value: Value) => void) => {
    const helperFns = {
      config: this.config,
      theme: this.theme
    };
    function recurse(object: any, keys: Array<string> = []) {
      Object.entries(object).forEach(([key, value]: [string, any]) => {
        if (value !== undefined && value !== null) {
          if (typeof value === 'function' && value.length === 1) {
            value = value(helperFns);
          }
          if (typeof value === 'object' && Object.keys(value).length > 0) {
            recurse(value, [...keys, key]);
          } else {
            callback([...keys, key], value);
          }
        }
      });
    }
    recurse(this.__theme.theme);
  };

  addPx = (keys: string[], value: string | number) => {
    if (typeof value === 'number') {
      if (['lineHeight', 'fontWeight', 'opacity', 'zIndex'].some((prop) => keys.includes(prop))) {
        // CSS property that are unitless
        return value;
      }
      const lastKey = keys[keys.length - 1];
      if (lastKey.toLowerCase().indexOf('opacity') >= 0) {
        // opacity values are unitless
        return value;
      }
      return `${value}px`;
    }
    return value;
  };

  /**
   * a function that parse theme.
   *
   * @example
   * const [ css, vars ] = new Parser({
   *   prefix: 'foo',
   *   fontSize: 12,
   *   lineHeight: 1.2,
   *   palette: { primary: { 500: 'var(--color)' } }
   * }).parse()
   *
   * console.log(css) // { '--foo-fontSize': '12px', '--foo-lineHeight': 1.2, '--foo-palette-primary-500': 'var(--color)' }
   * console.log(vars) // { fontSize: 'var(--foo-fontSize)', lineHeight: 'var(--foo-lineHeight)', palette: { primary: { 500: 'var(--foo-palette-primary-500)' } } }
   */
  parse() {
    const prefix: string = this.__theme.prefix || 'wui';

    this.walkObjectDeep((keys: string[], value: string | number) => {
      if (typeof value === 'string' || typeof value === 'number') {
        let cssVar = `--${prefix}-${keys.join('-')}`;
        this.__css[cssVar] = this.addPx(keys, value);

        this.assignKeys(this.__vars, keys, `var(${cssVar})`);
      }
    });
  }
}

export default Parser;
