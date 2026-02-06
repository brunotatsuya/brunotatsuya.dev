'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  InnerCard,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import {
  frameworkSkills,
  infraSkills,
  languageSkills,
  toolsSkills,
} from './skills'

export function SkillsGrid() {
  const { t } = useTranslation()

  return (
    <Tabs defaultValue="programming">
      <TabsList className="justify-start">
        <TabsTrigger value="programming">
          {t('index.about.tabs.programming')}
        </TabsTrigger>
        <TabsTrigger value="tools">{t('index.about.tabs.tools')}</TabsTrigger>
        <TabsTrigger value="infra">{t('index.about.tabs.infra')}</TabsTrigger>
      </TabsList>

      <TabsContent value="programming">
        <Card className="p-6">
          <CardContent className="grid gap-3 p-0 md:grid-cols-2">
            <div className="flex flex-col gap-3">
              <ul className="grid gap-3">
                {languageSkills.map((skill) => (
                  <li key={skill.name}>
                    <InnerCard className="flex items-center gap-3">
                      <span className="bg-muted flex size-9 items-center justify-center rounded-md">
                        <Image
                          src={skill.logo}
                          alt={skill.alt}
                          width={20}
                          height={20}
                          className={`h-5 w-5 object-contain ${skill.imageClassName ?? ''}`}
                        />
                      </span>
                      <span className="text-foreground text-sm">
                        {skill.name}
                      </span>
                    </InnerCard>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <ul className="grid gap-3">
                {frameworkSkills.map((skill) => (
                  <li key={skill.name}>
                    <InnerCard className="flex items-center gap-3">
                      <span className="bg-muted flex size-9 items-center justify-center rounded-md">
                        <Image
                          src={skill.logo}
                          alt={skill.alt}
                          width={20}
                          height={20}
                          className={`h-5 w-5 object-contain ${skill.imageClassName ?? ''}`}
                        />
                      </span>
                      <span className="text-foreground text-sm">
                        {skill.name}
                      </span>
                    </InnerCard>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="tools">
        <Card className="p-6">
          <CardContent className="grid gap-3 p-0 md:grid-cols-2">
            {toolsSkills.map((skill) => (
              <InnerCard key={skill.name} className="flex items-center gap-3">
                <span className="bg-muted flex size-9 items-center justify-center rounded-md">
                  <Image
                    src={skill.logo}
                    alt={skill.alt}
                    width={20}
                    height={20}
                    className={`h-5 w-5 object-contain ${skill.imageClassName ?? ''}`}
                  />
                </span>
                <span className="text-foreground text-sm">{skill.name}</span>
              </InnerCard>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="infra">
        <Card className="p-6">
          <CardContent className="grid gap-3 p-0 md:grid-cols-2">
            {infraSkills.map((skill) => (
              <InnerCard key={skill.name} className="flex items-center gap-3">
                <span className="bg-muted flex size-9 items-center justify-center rounded-md">
                  <Image
                    src={skill.logo}
                    alt={skill.alt}
                    width={20}
                    height={20}
                    className={`h-5 w-5 object-contain ${skill.imageClassName ?? ''}`}
                  />
                </span>
                <span className="text-foreground text-sm">{skill.name}</span>
              </InnerCard>
            ))}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
