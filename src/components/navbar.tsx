'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import { FileText } from 'lucide-react'

import { LanguageToggle } from '@/components/languages/language-toggle'
import { ThemeToggle } from '@/components/themes/theme-toggle'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const { t, i18n } = useTranslation()
  const resumeHref =
    i18n.language === 'en'
      ? '/resumes/en/bruno-tatsuya.pdf'
      : '/resumes/pt-br/bruno-tatsuya.pdf'

  const resumeButton = (
    <Button asChild variant="outline" size="icon" className="rounded-md">
      <Link href={resumeHref} target="_blank" rel="noopener noreferrer">
        <FileText className="size-4" />
        <span className="sr-only">{t('navbar.resume')}</span>
      </Link>
    </Button>
  )

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
          <LanguageToggle />
          <ThemeToggle />
          {resumeButton}
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <ThemeToggle />
          {resumeButton}
        </div>
      </div>
    </header>
  )
}
