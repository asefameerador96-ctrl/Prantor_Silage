import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { DEFAULT_IMAGE, ORGANIZATION_JSONLD, ROUTE_META, SITE, SITE_NAME } from '../seo/routeMeta.js'
import { GUIDES, getGuide } from '../content/guides.js'

function setMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/** Trailing slashes and casing must not produce a second canonical URL. */
function normalise(pathname) {
  const p = pathname.replace(/\/+$/, '').toLowerCase()
  return p === '' ? '/' : p
}

function breadcrumb(path, title) {
  const items = [{ '@type': 'ListItem', position: 1, name: 'হোম', item: SITE }]
  if (path.startsWith('/guide')) {
    items.push({ '@type': 'ListItem', position: 2, name: 'খামারির গাইড', item: `${SITE}/guide` })
  }
  if (path !== '/' && path !== '/guide') {
    items.push({ '@type': 'ListItem', position: items.length + 1, name: title, item: `${SITE}${path}` })
  }
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items }
}

/**
 * Applies per-route metadata from one place.
 *
 * Guide pages also emit Article JSON-LD, and the guide index emits an ItemList, so
 * search engines can see the site as a set of answers rather than one brochure page.
 */
export default function RouteSeo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const path = normalise(pathname)
    const meta = ROUTE_META[path]
    const url = `${SITE}${path}`

    const title = meta ? (path === '/' ? meta.title : `${meta.title} | ${SITE_NAME}`) : `পাতাটি পাওয়া যায়নি | ${SITE_NAME}`
    const description = meta?.description ?? 'পাতাটি পাওয়া যায়নি।'

    document.title = title
    setMeta('name', 'description', description)
    setMeta('name', 'robots', meta ? 'index, follow, max-image-preview:large' : 'noindex, follow')
    setLink('canonical', url)

    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', DEFAULT_IMAGE)

    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', DEFAULT_IMAGE)

    document.head.querySelectorAll('script[data-seo="route"]').forEach((s) => s.remove())
    if (!meta) return

    const graph = [ORGANIZATION_JSONLD, breadcrumb(path, meta.title)]

    if (path === '/guide') {
      graph.push({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'খামারির গাইড',
        itemListElement: GUIDES.map((g, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE}/guide/${g.slug}`,
        })),
      })
    }

    const slug = path.startsWith('/guide/') ? path.slice('/guide/'.length) : null
    if (slug && getGuide(slug)) {
      graph.push({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: meta.title,
        description: meta.description,
        inLanguage: 'bn',
        mainEntityOfPage: url,
        image: DEFAULT_IMAGE,
        author: { '@type': 'Organization', name: 'Prantor Silage' },
        publisher: { '@type': 'Organization', name: 'Prantor Silage', url: SITE },
      })
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.seo = 'route'
    script.textContent = JSON.stringify(graph)
    document.head.appendChild(script)
  }, [pathname])

  return null
}
