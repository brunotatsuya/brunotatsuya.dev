'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import { Menu } from 'lucide-react'

import { LanguageToggle } from '@/components/languages/language-toggle'
import { ThemeToggle } from '@/components/themes/theme-toggle'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Navbar() {
  const { t, i18n } = useTranslation()
  const resumeHref =
    i18n.language === 'en'
      ? '/resumes/en/bruno-tatsuya.pdf'
      : '/resumes/pt-br/bruno-tatsuya.pdf'

  return (
    <header className="border-border/40 bg-background/70 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-8 md:px-12 lg:px-16">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/favicon.png"
            alt={t('navbar.title')}
            width={28}
            height={28}
            className="rounded-sm"
            priority
          />
          <span className="hidden text-base font-semibold tracking-wide md:inline">
            {t('navbar.title')}
          </span>
        </Link>
        <nav className="hidden items-center gap-2 text-base md:flex">
          <Button asChild variant="ghost" size="default">
            <Link href="#about">{t('navbar.about')}</Link>
          </Button>
          <Button asChild variant="ghost" size="default">
            <Link href="#contact">{t('navbar.contact')}</Link>
          </Button>
          <Button asChild variant="ghost" size="default">
            <Link href={resumeHref} target="_blank" rel="noopener noreferrer">
              {t('navbar.resume')}
            </Link>
          </Button>
          <div className="ml-2 flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" size="icon" className="rounded-full">
                <Menu className="size-5" />
                <span className="sr-only">{t('navbar.openMenu')}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem asChild>
                <Link href="#about">{t('navbar.about')}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="#contact">{t('navbar.contact')}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={resumeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('navbar.resume')}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
