import { createTheme } from '@mantine/core'

export const theme = createTheme({
  fontFamily:
    'Geist, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',

  headings: {
    fontFamily:
      'Geist, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
    fontWeight: '650',
  },

  primaryColor: 'green',

  colors: {
    green: [
      '#f3faf5',
      '#e6f4ec',
      '#c9e7d4',
      '#9fd5b5',
      '#6ec193',
      '#3dad70',
      '#2a965e',
      '#1f7b4d',
      '#17613c',
      '#0e472b',
    ],
  },

  radius: {
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
  },

  shadows: {
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
  },

  defaultRadius: 'md',

  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
    Card: {
      defaultProps: {
        radius: 'lg',
        shadow: 'md',
      },
    },
    Modal: {
      defaultProps: {
        radius: 'lg',
        shadow: 'lg',
      },
    },
  },
})
