import Image from 'next/image'

import { type Skill } from './skills'

export function SkillLabel({ skill }: { skill: Skill }) {
  return (
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
  )
}
