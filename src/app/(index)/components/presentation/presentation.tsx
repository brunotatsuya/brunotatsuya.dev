'use client'

import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import GraphAnimation from './graph-animation'

export function Presentation() {
  const { t } = useTranslation()
  const [graphReady, setGraphReady] = useState(false)

  return (
    <section className="relative min-h-dvh">
      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-6xl flex-col justify-start px-8 md:h-auto md:flex-row md:items-center md:justify-start md:gap-16 md:px-12 lg:px-16">
        {/* Animation - first on mobile, cropped height, capped at 50% of viewport on non-mobile */}
        <div className="relative order-1 mt-14 flex h-48 w-full shrink-0 items-center justify-center overflow-hidden md:order-2 md:mt-10 md:h-auto md:max-h-95 md:w-auto md:flex-1 md:justify-end md:overflow-visible">
          <GraphAnimation
            className="w-full md:w-full md:max-w-95"
            onPulsesStart={() => setGraphReady(true)}
          />
          {/* Fade overlay for mobile crop - using mask so bg-color can transition */}
          <div className="bg-background pointer-events-none absolute inset-x-0 top-0 h-[30%] mask-[linear-gradient(to_bottom,black,transparent)] transition-colors duration-300 md:hidden" />
          <div className="bg-background pointer-events-none absolute inset-x-0 bottom-0 h-[30%] mask-[linear-gradient(to_top,black,transparent)] transition-colors duration-300 md:hidden" />
        </div>
        {/* Text - second on mobile, centered in global viewport */}
        <div className="relative order-2 mt-8 flex w-full items-start justify-start md:relative md:inset-auto md:order-1 md:mt-10 md:flex-1 md:items-start md:justify-start">
          <div className="w-full text-left transition-opacity duration-700 md:mr-auto md:ml-0 md:w-auto">
            <h1 className="text-5xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
              {t('index.presentation.name')}
            </h1>
            <p className="font-mono text-xl md:text-2xl">
              {t('index.presentation.role')}
            </p>
            <p className="text-muted-foreground mt-8 max-w-md font-mono text-sm leading-relaxed md:mt-10 md:text-base">
              <Trans
                i18nKey="index.presentation.description"
                components={{
                  underline: (
                    <span
                      className={
                        graphReady ? 'hand-underline hand-underline--draw' : 'hand-underline'
                      }
                    />
                  ),
                }}
              />
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
