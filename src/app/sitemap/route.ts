const baseUrl = 'https://brunotatsuya.dev'

const urlEntries = [
  {
    loc: `${baseUrl}/`,
    changefreq: 'monthly',
    priority: '1.0',
  },
]

function buildSitemapXml() {
  const lastmod = new Date().toISOString()
  const urls = urlEntries
    .map((entry) => {
      return [
        '<url>',
        `<loc>${entry.loc}</loc>`,
        `<lastmod>${lastmod}</lastmod>`,
        `<changefreq>${entry.changefreq}</changefreq>`,
        `<priority>${entry.priority}</priority>`,
        '</url>',
      ].join('')
    })
    .join('')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
  ].join('')
}

export async function GET() {
  const xml = buildSitemapXml()

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}

