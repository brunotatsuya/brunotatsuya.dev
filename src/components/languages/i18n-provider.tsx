'use client'

import { useSyncExternalStore } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18next from '@/i18n'

const emptySubscribe = () => () => {}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )

  return (
    <I18nextProvider i18n={i18next}>
      {mounted ? children : null}
    </I18nextProvider>
  )
}
