'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  const Icon = mounted && theme === 'dark' ? Moon : Sun

  const handleToggle = () => {
    if (!mounted || isTransitioning) return

    setIsTransitioning(true)
    setTheme(theme === 'dark' ? 'light' : 'dark')

    setTimeout(() => {
      setIsTransitioning(false)
    }, 200) // Match with --theme-transition-duration
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleToggle}
      className={`rounded-full ${isTransitioning ? 'pointer-events-none' : 'cursor-pointer'}`}
    >
      <Icon className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
