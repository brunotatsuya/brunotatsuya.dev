import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  const handleToggle = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleToggle}
      className="rounded-full"
    >
      <Sun className="inline-flex in-[.dark]:hidden" />
      <Moon className="hidden in-[.dark]:inline-flex" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
