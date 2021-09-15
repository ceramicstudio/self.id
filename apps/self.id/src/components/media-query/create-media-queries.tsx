import * as CSS from 'csstype'

export type MediaQueryCssArrayType = {
  [K in keyof CSS.PropertiesHyphen]: Array<string | number | null>
}

const CSS_UNITS = ['em', 'ex', 'ch', 'rem', 'vw', 'vh', 'vmin', 'vmax', '%']
const checkBreakpointUnits = (bp: string | number) =>
  CSS_UNITS.every((unit) => bp.toString().endsWith(unit)) ? bp : `${bp}px`

/**
 * Generates responsive media queries based on responsive array
 */
export const createMediaQueriesArray = (
  mediaQuery: MediaQueryCssArrayType,
  breakpoints: Array<string | number>
): Array<string> | undefined => {
  if (!mediaQuery) {
    return undefined
  }

  // assume the largest breakpoint is blank
  const sortedBreakpoints = [
    ...breakpoints
      .filter((item) => item !== '')
      .sort((a, b) => Number(a) - Number(b))
      .map((bp) => checkBreakpointUnits(bp)),
    '',
  ]

  // styled-components can handle an array of styles in
  // the style function, so we'll return an array.
  const queries = sortedBreakpoints.reduce<Array<string>>((arr, _item, index) => {
    const css = Object.entries(mediaQuery).reduce<string>((acc, [cssProp, cssArray]) => {
      if (cssArray) {
        const element = cssArray[index]
        if (element) {
          return `${acc} ${cssProp}: ${element};`
        } else {
          return acc
        }
      } else {
        return acc
      }
    }, '')

    return css
      ? index === 0
        ? [...arr, css]
        : // ? [...arr, `@media only screen and (max-width: ${sortedBreakpoints[index]}){${css}}`]
          [...arr, `@media only screen and (min-width: ${sortedBreakpoints[index - 1]}){${css}}`]
      : arr
  }, [])
  return queries
}
