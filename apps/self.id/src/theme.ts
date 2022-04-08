import type { ThemeType } from 'grommet'

export type { ThemeType } from 'grommet'

// Copied from Grommet as not directly exported types
export type ColorType = string | { dark?: string; light?: string } | undefined
export type Colors = Record<string, ColorType>

export const colors: Colors = {
  brand: '#FC1591',
  focus: 'inherit',
  text: '#181817',
  placeholder: '#949494',
  'neutral-1': '#757575',
  'neutral-2': '#888888',
  'neutral-3': '#909090',
  'neutral-4': '#A8A8A8',
  'neutral-5': '#D8D8D8',
  'neutral-6': '#F7F7F7',
}

export const theme: ThemeType = {
  global: {
    colors,
    control: {
      border: {
        color: 'neutral-5',
      },
    },
    font: {
      family: 'sans-serif',
    },
  },
  anchor: {
    fontWeight: 400,
  },
  button: {
    border: {
      radius: '5px',
    },
  },
  text: {
    medium: {
      size: '18px',
    },
    large: {
      size: '22px',
      height: '26px',
    },
  },
}
