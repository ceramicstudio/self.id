import { ThemeType } from 'grommet'

export const BRAND_COLOR = '#F66537'
export const PLACEHOLDER_COLOR = '#949494'

export const theme: ThemeType = {
  global: {
    colors: {
      brand: BRAND_COLOR,
      focus: BRAND_COLOR,
      text: '#181817',
      'accent-1': 'rgba(246, 101, 55, 0.25)',
      'neutral-1': '#757575',
      'neutral-2': '#8B8B8B',
      'neutral-3': '#949494',
      'neutral-4': '#A8A8A8',
      'neutral-5': '#D8D8D8',
    },
    control: {
      border: {
        color: 'neutral-5',
      },
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
  },
}
