import type { Metadata } from 'next'

const siteUrl = 'https://brunotatsuya.dev'
const title = 'Bruno Tatsuya'
const description =
  'Backend engineer and computer scientist with 7+ years building cloud-native platforms in fintech and B2B. Focused on reliability foundations, clear domain boundaries, and measurable impact.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s · ${title}`,
  },
  description,
  keywords: [
    'Bruno Tatsuya',
    'Bruno Masunaga',
    'Backend Engineer',
    'Software Engineer',
    'Reliability Engineering',
    'Cloud Native',
    'Fintech',
    'B2B',
    'Ruby',
    'Go',
    'TypeScript',
  ],
  alternates: {
    canonical: '/',
  },
  authors: [{ name: 'Bruno Tatsuya', url: siteUrl }],
  creator: 'Bruno Tatsuya',
  verification: {
    google: 'sL23D9PQlVxT_dObPJKM21_-P8hx7c-nCvIwf83Y3gw',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title,
    siteName: title,
    description,
    locale: 'en_US',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og.png'],
  },
  icons: {
    icon: '/favicon.png',
  },
}
