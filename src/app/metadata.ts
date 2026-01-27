import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bruno Tatsuya',
  description:
    "Bruno Tatsuya is a software engineer with 6+ years of experience. He believes technology should be used to make people's lives easier.",
  keywords: 'Bruno, Tatsuya, Masunaga, Santos, Software, Developer, Engineer', // add correct keywords here
  verification: {
    google: 'sL23D9PQlVxT_dObPJKM21_-P8hx7c-nCvIwf83Y3gw',
  },
  openGraph: {
    type: 'website',
    url: 'https://brunotatsuya.dev',
    title: 'Bruno Tatsuya',
    description:
      "Bruno Tatsuya is a software engineer with 6+ years of experience. He believes technology should be used to make people's lives easier.",
    images: [
      {
        url: 'https://brunotatsuya.dev/images/og.jpg',
      },
    ],
  },
  icons: {
    icon: '/favicon.png',
  },
}
