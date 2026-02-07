'use client'

import Image from 'next/image'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import LogoLoop, { type LogoItem } from '@/components/LogoLoop'

import {
  programmingSkills,
  infraSkills,
  toolsSkills,
  type Skill,
} from './skills'

export function SkillsGrid() {
  const { t } = useTranslation()

  const makeLogoItems = useCallback(
    (skills: Skill[]): LogoItem[] =>
      skills.map((skill) => ({
        ariaLabel: skill.name,
        title: skill.name,
        node: (
          <span className="text-foreground inline-flex items-center gap-0 text-sm font-normal tracking-[0.05em] md:text-base">
            <span className="flex size-10 items-center justify-center">
              <Image
                src={skill.logo}
                alt={skill.alt}
                width={22}
                height={22}
                className={`h-5 w-5 object-contain ${skill.imageClassName ?? ''}`}
              />
            </span>
            <span className="tracking-normal">{skill.name}</span>
          </span>
        ),
      })),
    []
  )

  const sections = useMemo(
    () => [
      {
        id: 'programming',
        title: t('index.about.tabs.programming'),
        items: makeLogoItems(programmingSkills),
      },
      {
        id: 'tools',
        title: t('index.about.tabs.tools'),
        items: makeLogoItems(toolsSkills),
      },
      {
        id: 'infra',
        title: t('index.about.tabs.infra'),
        items: makeLogoItems(infraSkills),
      },
    ],
    [makeLogoItems, t]
  )

  return (
    <div className="flex w-full flex-col gap-8">
      {sections.map((section, index) => (
        <div key={section.id} className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-muted-foreground text-xs tracking-[0.3em] uppercase">
              {section.title}
            </h3>
            <span className="bg-border/70 h-px flex-1" />
          </div>
          <LogoLoop
            logos={section.items}
            speed={32}
            direction={index === 1 ? 'right' : 'left'}
            gap={44}
            logoHeight={32}
            fadeOut
            fadeOutColor="var(--background)"
            ariaLabel={`${section.title} logos`}
            className="bg-background overflow-hidden rounded-2xl px-0.5 py-2"
          />
        </div>
      ))}
    </div>
  )
}
