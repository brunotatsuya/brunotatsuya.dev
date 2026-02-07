'use client'

import { useTranslation } from 'react-i18next'

import { type LogoItem } from '@/components/ui/logo-loop'

import { SkillLabel } from './skill-label'
import { SkillsSection } from './skills-section'
import { infraSkills, programmingSkills, toolsSkills } from './skills'

const sections = [
  {
    id: 'programming',
    titleKey: 'index.about.tabs.programming',
    skills: programmingSkills,
  },
  {
    id: 'tools',
    titleKey: 'index.about.tabs.tools',
    skills: toolsSkills,
  },
  {
    id: 'infra',
    titleKey: 'index.about.tabs.infra',
    skills: infraSkills,
  },
] as const

const sectionItems = sections.map((section) => ({
  ...section,
  items: section.skills.map(
    (skill): LogoItem => ({
      ariaLabel: skill.name,
      title: skill.name,
      node: <SkillLabel skill={skill} />,
    })
  ),
}))

export function SkillsGrid() {
  const { t } = useTranslation()

  return (
    <div className="flex w-full flex-col gap-8">
      {sectionItems.map((section, index) => {
        const title = t(section.titleKey)
        return (
          <SkillsSection
            key={section.id}
            title={title}
            items={section.items}
            direction={index === 1 ? 'right' : 'left'}
          />
        )
      })}
    </div>
  )
}
