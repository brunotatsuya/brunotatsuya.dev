import '@/styles/globals.css'
import '@/styles/animations.css'
import { ThemeProvider } from '@/components/themes/theme-provider'
import { alanSans, amethysta, firaCode } from '@/styles/fonts'

export { metadata } from './metadata'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${alanSans.variable} ${amethysta.variable} ${firaCode.variable}`}
    >
      <body>
        <ThemeProvider attribute="class" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
