'use client'

import { useTranslation } from 'react-i18next'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <main className="relative mx-auto flex w-full max-w-6xl flex-1 items-center px-8 pt-24 pb-8 md:px-12 lg:px-16">
        <section className="w-full border border-border/60 px-6 py-10 md:px-12 md:py-14">
          <div>
            <p className="text-muted-foreground font-mono text-xs uppercase tracking-[0.3em]">
              {t('notFound.eyebrow')}
            </p>
            <h1 className="mt-6 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              {t('notFound.title')}
            </h1>
            <p className="text-muted-foreground mt-4 font-mono text-sm leading-relaxed md:text-base">
              {t('notFound.description')}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
