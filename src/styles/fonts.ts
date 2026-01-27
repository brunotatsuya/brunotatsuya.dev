import localFont from 'next/font/local'

// Alan Sans - using Fontsource
export const alanSans = localFont({
  src: [
    {
      path: '../../node_modules/@fontsource/alan-sans/files/alan-sans-latin-300-normal.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../node_modules/@fontsource/alan-sans/files/alan-sans-latin-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../node_modules/@fontsource/alan-sans/files/alan-sans-latin-500-normal.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../node_modules/@fontsource/alan-sans/files/alan-sans-latin-600-normal.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../node_modules/@fontsource/alan-sans/files/alan-sans-latin-700-normal.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-sans',
  display: 'swap',
})

// Amethysta - serif font
export const amethysta = localFont({
  src: '../../node_modules/@fontsource/amethysta/files/amethysta-latin-400-normal.woff2',
  variable: '--font-serif',
  display: 'swap',
})

// Fira Code - monospace font (variable font)
export const firaCode = localFont({
  src: '../../node_modules/@fontsource-variable/fira-code/files/fira-code-latin-wght-normal.woff2',
  variable: '--font-mono',
  display: 'swap',
})
