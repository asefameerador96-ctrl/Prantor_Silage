import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { useT } from '../i18n.jsx'
import { GUIDES, getGuide, HOTLINE, HOTLINE_TEL } from '../content/guides.js'
import NotFound from './NotFound.jsx'

/** Renders one guide from src/content/guides.js. */
export default function GuidePage() {
  const t = useT()
  const { slug } = useParams()
  const guide = getGuide(slug)

  if (!guide) return <NotFound />

  const sections = guide.sections(t)
  const others = GUIDES.filter((g) => g.slug !== slug)

  return (
    <>
      <Navbar />
      <main className="bg-white pt-24 pb-20 sm:pt-28">
        <article className="mx-auto max-w-3xl px-4 sm:px-6">
          <nav aria-label={t('ব্রেডক্রাম্ব', 'Breadcrumb')} className="text-sm text-black/55">
            <Link to="/" className="hover:text-brand hover:underline">
              {t('হোম', 'Home')}
            </Link>
            <span className="px-1.5">/</span>
            <Link to="/guide" className="hover:text-brand hover:underline">
              {t('খামারির গাইড', 'Farmer’s guide')}
            </Link>
          </nav>

          <h1 className="mt-4 font-display text-[clamp(1.9rem,4.5vw,3rem)] leading-tight font-extrabold text-ink">
            {guide.title(t)}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-black/70">{guide.lede(t)}</p>

          <div className="mt-10 space-y-10">
            {sections.map((s, i) => (
              <section key={i}>
                <h2 className="font-display text-2xl font-bold text-ink">{s.h}</h2>

                {s.p && <p className="mt-3 leading-relaxed text-black/75">{s.p}</p>}

                {s.list && (
                  <ul className="mt-4 space-y-2">
                    {s.list.map((item, j) => (
                      <li key={j} className="flex gap-3 text-black/75">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {s.table && (
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[420px] border-collapse text-left text-sm">
                      <thead>
                        <tr>
                          {s.table[0].map((cell, j) => (
                            <th key={j} className="border-b-2 border-ink/15 pb-2 pr-4 font-display font-bold text-ink">
                              {cell}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {s.table.slice(1).map((row, j) => (
                          <tr key={j}>
                            {row.map((cell, k) => (
                              <td key={k} className="border-b border-black/10 py-2.5 pr-4 text-black/75">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}
          </div>

          <aside className="mt-12 rounded-2xl bg-brand/5 p-6 ring-1 ring-brand/15">
            <h2 className="font-display text-xl font-bold text-ink">
              {t('আপনার খামারের জন্য পরামর্শ দরকার?', 'Need advice for your own farm?')}
            </h2>
            <p className="mt-2 text-black/70">
              {t(
                'কত ব্যাগ লাগবে, দাম কত, ডেলিভারি কীভাবে — সরাসরি কল করে জেনে নিন।',
                'How many bags you need, what it costs, how delivery works — call and ask directly.'
              )}
            </p>
            <a
              href={`tel:${HOTLINE_TEL}`}
              data-lead="guide-call"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-display font-bold text-white transition hover:brightness-110"
            >
              {t('কল করুন', 'Call')} {HOTLINE}
            </a>
          </aside>

          <section className="mt-12 border-t border-black/10 pt-8">
            <h2 className="font-display text-xl font-bold text-ink">
              {t('আরও পড়ুন', 'Read next')}
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {others.map((g) => (
                <li key={g.slug}>
                  <Link
                    to={`/guide/${g.slug}`}
                    className="flex h-full gap-3 rounded-xl p-4 ring-1 ring-black/10 transition hover:bg-brand/5 hover:ring-brand/30"
                  >
                    <span aria-hidden="true" className="text-xl">{g.icon}</span>
                    <span className="font-display font-bold text-ink">{g.title(t)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </main>
      <Footer />
    </>
  )
}
