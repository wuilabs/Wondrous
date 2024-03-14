import it from 'ava';
import Parser from './Parser';

const group = it.macro({
  exec(expect, group: string, callbackFn: (expect: any) => void) {
    callbackFn(expect);
  },
  title(provided, group: string, callbackFn: (expect: any) => void) {
    return `[${group}]: It should ${provided}`.trim();
  },
});

// Helpers
it('return the value of the key', group, 'theme', (expect) => {
  let parser = new Parser({
    theme: {
      colors: {
        red: '#ff0000',
        blue: '#0000ff',
      },
    },
  });
  expect.deepEqual(parser.theme('colors'), {
    red: '#ff0000',
    blue: '#0000ff',
  });
});

it('proccess keys and return most deep key value', group, 'theme', (expect) => {
  let parser = new Parser({
    theme: {
      colors: {
        red: '#ff0000',
        blue: '#0000ff',
      },
    },
  });
  expect.deepEqual(parser.theme('colors.red'), '#ff0000');
});

// assingKeys
// it('not account for null, undefined, non-object', group, 'assignKeys', (expect) => {
//   let result;
//   assignKeys(result, ['a', 'b', 'c'], 'd');
//   expect.deepEqual(result, undefined, 'it should not account undefined');

//   result = null;
//   assignKeys(result, ['a', 'b', 'c'], 'd');
//   expect.deepEqual(result, null, 'it should not account null');

//   result = '';
//   assignKeys(result, ['a', 'b', 'c'], 'd');
//   expect.deepEqual(result, '', 'it should not account non-object');
// });

// it('build object with keys and value', group, 'assignKeys', (expect) => {
//   const result = {};
//   assignKeys(result, ['a', 'b', 'c'], 'd');
//   expect.deepEqual(result, {
//     a: {
//       b: {
//         c: 'd',
//       },
//     },
//   });
// });

// it('not override existing fields', group, 'assignKeys', (expect) => {
//   const result = {
//     a: {
//       b: {
//         existed: true,
//       },
//     },
//   };
//   assignKeys(result, ['a', 'b', 'c'], 'd');
//   expect.deepEqual(result, {
//     a: {
//       b: {
//         existed: true,
//         c: 'd',
//       },
//     },
//   });
// });

// walkObjectDeep
it('run callback at each key', group, 'walkObjectDeep', (expect) => {
  const result: Record<string, boolean> = {};
  const parser = new Parser({
    theme: {
      lv1: {
        lv2: {
          lv3: {
            yes: true,
            no: false,
          },
        },
      },
    },
  });
  parser.walkObjectDeep<boolean>((keys, value) => {
    result[keys.join('-')] = value;
  });
  expect.deepEqual(result, {
    'lv1-lv2-lv3-yes': true,
    'lv1-lv2-lv3-no': false,
  });
});

it('not throw if the value is null', group, 'walkObjectDeep', (expect) => {
  const result: Record<string, boolean> = {};
  const parser = new Parser({
    theme: {
      lv1: null
    }
  })
  parser.walkObjectDeep<boolean>(
    (keys, value) => {
      result[keys.join('-')] = value;
    },
  );
  expect.deepEqual(result, {});
});

it('proccess theme helper function', group, 'walkObjectDeep', expect => {
  const result: Record<string, boolean> = {};
  const parser = new Parser({
    theme: {
      colors: {
        red: '#ff0000',
        blue: '#0000ff'
      },
      accentColors: ({theme}) => theme('colors')
    },
  });
  parser.walkObjectDeep<boolean>((keys, value) => {
    result[keys.join('-')] = value;
  });
  expect.deepEqual(result, {
    'colors-red': '#ff0000',
    'colors-blue': '#0000ff',
    'accentColors-red': '#ff0000',
    'accentColors-blue': '#0000ff'
  });
})

// css
it('create css variables', group, 'css', (expect) => {
  const css = new Parser({
    theme: {
      palette: {
        primary: {
          100: '#ffffff',
          500: '#ff5252',
        },
      },
    },
  }).css;
  expect.deepEqual(css, {
    '--wui-palette-primary-100': '#ffffff',
    '--wui-palette-primary-500': '#ff5252',
  });
});

it('add prefix to variables', group, 'css', (expect) => {
  const css = new Parser({
    prefix: 'foo',
    theme: {
      palette: {
        primary: {
          100: '#ffffff',
          500: '#ff5252',
        },
      },
    },
  }).css;
  expect.deepEqual(css, {
    '--foo-palette-primary-100': '#ffffff',
    '--foo-palette-primary-500': '#ff5252',
  });
});

it('use prefix if provided', group, 'css', (expect) => {
  const css = new Parser({
    prefix: 'foo-bar',
    theme: {
      bg: 'var(--palette-neutral-50)',
      text: {
        heading: 'var(--palette-primary-500, var(--palette-neutral-500))',
      },
    },
  }).css;
  expect.deepEqual(css, {
    '--foo-bar-bg': 'var(--palette-neutral-50)',
    '--foo-bar-text-heading': 'var(--palette-primary-500, var(--palette-neutral-500))',
  });
});

it('attach px to number value', group, 'css', (expect) => {
  const css = new Parser({
    theme: {
      fontSize: {
        xs: 10,
        sm: 12,
        md: 16,
      },
    },
  }).css;
  expect.deepEqual(css, {
    '--wui-fontSize-xs': '10px',
    '--wui-fontSize-sm': '12px',
    '--wui-fontSize-md': '16px',
  });
});

it('not attach px to color channel values', group, 'css', (expect) => {
  const css = new Parser({
    theme: {
      primary: {
        mainChannel: '144 202 249',
        darkChannel: '66 165 245',
        lightChannel: '0 100% 50%',
      },
    },
  }).css;
  expect.deepEqual(css, {
    '--wui-primary-mainChannel': '144 202 249',
    '--wui-primary-darkChannel': '66 165 245',
    '--wui-primary-lightChannel': '0 100% 50%',
  });
});

it('not attach px to opacity values', group, 'css', (expect) => {
  const css = new Parser({
    theme: {
      primary: {
        hoverOpacity: 0.02,
        disabledOpacity: 0.5,
        opacity: 1,
      },
    },
  }).css;
  expect.deepEqual(css, {
    '--wui-primary-hoverOpacity': 0.02,
    '--wui-primary-opacity': 1,
    '--wui-primary-disabledOpacity': 0.5,
  });
});

it('not add px to unitless properties', group, 'css', (expect) => {
  const css = new Parser({
    theme: {
      lineHeight: {
        xs: 1,
        sm: 1.2,
        md: 1.43,
      },
      fontWeight: {
        semiBold: 600,
        bold: 700,
      },
      opacity: {
        active: 0.5,
        hover: 0.2,
      },
      zIndex: {
        tooltip: 1200,
      },
    },
  }).css;
  expect.deepEqual(css, {
    '--wui-lineHeight-xs': 1,
    '--wui-lineHeight-sm': 1.2,
    '--wui-lineHeight-md': 1.43,
    '--wui-fontWeight-semiBold': 600,
    '--wui-fontWeight-bold': 700,
    '--wui-opacity-active': 0.5,
    '--wui-opacity-hover': 0.2,
    '--wui-zIndex-tooltip': 1200,
  });
});

it(' be produced from array', group, 'css', (expect) => {
  const css = new Parser({
    theme: { shadows: ['sm', 'md', 'lg'] },
  }).css;
  expect.deepEqual(css, {
    '--wui-shadows-0': 'sm',
    '--wui-shadows-1': 'md',
    '--wui-shadows-2': 'lg',
  });
});

// vars
it('create same structure and attach variables', group, 'vars', (expect) => {
  const vars = new Parser({
    theme: {
      palette: {
        primary: {
          100: '#ffffff',
          500: '#ff5252',
        },
      },
      lineHeight: {
        xs: 1,
        sm: 1.2,
        md: 1.43,
      },
    },
  }).vars;
  expect.deepEqual(vars, {
    palette: {
      primary: {
        100: 'var(--wui-palette-primary-100)',
        500: 'var(--wui-palette-primary-500)',
      },
    },
    lineHeight: {
      xs: 'var(--wui-lineHeight-xs)',
      sm: 'var(--wui-lineHeight-sm)',
      md: 'var(--wui-lineHeight-md)',
    },
  });
});

it('apply prefix to variables', group, 'vars', (expect) => {
  const vars = new Parser({
    prefix: 'foo',
    theme: {
      palette: {
        primary: {
          100: '#ffffff',
          500: '#ff5252',
        },
      },
    },
  }).vars;
  expect.deepEqual(vars, {
    palette: {
      primary: {
        100: 'var(--foo-palette-primary-100)',
        500: 'var(--foo-palette-primary-500)',
      },
    },
  });
});

// it('be produced from array', group, 'vars', (expect) => {
//   const { vars } = cssVarsParser({
//     shadows: ['sm', 'md', 'lg'],
//   });
//   expect.deepEqual(vars, {
//     shadows: ['var(--shadows-0)', 'var(--shadows-1)', 'var(--shadows-2)'],
//   });
// });

// themeParser
it('do nothing if deep value is not string or number', group, 'Parser', (expect) => {
  const parser = new Parser({
    theme: {
      fooBar: () => '',
      foo: undefined,
      bar: null,
    },
  });
  expect.deepEqual(parser.css, {});
  expect.deepEqual(parser.vars, {});
});
