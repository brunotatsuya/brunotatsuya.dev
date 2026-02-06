'use client'

import { Trans, useTranslation } from 'react-i18next'

import { SkillsGrid } from './skills-grid'

export function About() {
  const { t } = useTranslation()

  return (
    <section
      id="about"
      className="bg-background relative min-h-dvh scroll-mt-4 font-mono"
    >
      <div className="relative mx-auto flex min-h-dvh w-full max-w-6xl flex-col gap-12 px-8 pt-24 pb-20 md:flex-row md:items-start md:gap-16 md:px-12 lg:px-16">
        <div className="flex flex-col gap-6 md:w-5/12">
          <span className="text-muted-foreground text-xs tracking-[0.3em] uppercase">
            {t('index.about.eyebrow')}
          </span>
          <h2 className="font-sans text-4xl font-semibold tracking-tight md:text-5xl">
            {t('index.about.title')}
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
            <Trans
              i18nKey="index.about.description"
              components={{
                strong: <strong className="text-foreground font-semibold" />,
                qonto: (
                  <a
                    href="https://qonto.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary relative inline-block no-underline after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-[width] after:duration-300 hover:after:w-full"
                  />
                ),
              }}
            />
          </p>
        </div>
        <div className="flex w-full flex-col gap-6 md:flex-1">
          <SkillsGrid />
        </div>
      </div>
    </section>
  )
}
