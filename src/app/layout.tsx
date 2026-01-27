import '@/styles/globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { alanSans, amethysta, firaCode } from './fonts'

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
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
