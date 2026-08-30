import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { useT } from '../i18n.jsx'
import { GUIDES } from '../content/guides.js'

/** Listing page for /guide — also the hub that links every guide for crawlers. */
export default function GuideIndex() {
  const t = useT()

  return (
    <>
      <Navbar />
      <main className="bg-white pt-24 pb-20 sm:pt-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <nav aria-label={t('ব্রেডক্রাম্ব', 'Breadcrumb')} className="text-sm text-black/55">
            <Link to="/" className="hover:text-brand hover:underline">
              {t('হোম', 'Home')}
            </Link>
          </nav>

          <h1 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.2rem)] leading-tight font-extrabold text-ink">
            {t('খামারির গাইড', 'Farmer’s guide')}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-black/70">
            {t(
              'সাইলেজ নিয়ে খামারিরা আমাদের যে প্রশ্নগুলো সবচেয়ে বেশি করেন — কত খাওয়াবেন, কতদিন থাকে, ঘাসের সাথে পার্থক্য কী — সবগুলোর উত্তর সহজ ভাষায়।',
              'The questions farmers ask us most about silage — how much to feed, how long it keeps, how it compares with grass — answered in plain language.'
            )}
          </p>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {GUIDES.map((g) => (
              <li key={g.slug}>
                <Link
                  to={`/guide/${g.slug}`}
                  className="flex h-full flex-col rounded-2xl p-6 ring-1 ring-black/10 transition hover:bg-brand/5 hover:ring-brand/30"
                >
                  <span aria-hidden="true" className="text-2xl">{g.icon}</span>
                  <h2 className="mt-3 font-display text-lg font-bold text-ink">{g.title(t)}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-black/65">{g.lede(t)}</p>
                  <span className="mt-4 font-display text-sm font-bold text-brand">
                    {t('পড়ুন →', 'Read →')}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  )
}
