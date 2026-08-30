import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'
import { useT } from '../i18n.jsx'
import { GUIDES } from '../content/guides.js'

/**
 * Links the guide pages from the homepage.
 *
 * This is the internal-linking path that lets a crawler reach the guides at all —
 * without it they would exist only in the sitemap, which is a much weaker signal.
 */
export default function GuideTeaser() {
  const t = useT()

  return (
    <section id="guide" className="scroll-mt-20 bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal className="text-center">
          <p className="font-display text-sm font-bold tracking-widest text-brand uppercase">
            {t('খামারির গাইড', 'Farmer’s guide')}
          </p>
          <h2 className="mt-2 font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-tight font-extrabold text-ink">
            {t('সাইলেজ নিয়ে যা জানা দরকার', 'What you need to know about silage')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-black/70">
            {t(
              'কত খাওয়াবেন, কতদিন রাখা যায়, কাঁচা ঘাসের সাথে পার্থক্য কী — খামারিদের সবচেয়ে বেশি করা প্রশ্নগুলোর বিস্তারিত উত্তর।',
              'How much to feed, how long it keeps, how it compares with green grass — detailed answers to the questions farmers ask us most.'
            )}
          </p>
        </Reveal>

        {/* Reveal renders a div, so it wraps the list rather than each item —
            a div directly inside <ul> would be invalid markup. */}
        <Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GUIDES.map((g) => (
              <li key={g.slug}>
                <Link
                  to={`/guide/${g.slug}`}
                  className="flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-black/5 transition hover:ring-brand/30"
                >
                  <span aria-hidden="true" className="text-2xl">{g.icon}</span>
                  <h3 className="mt-3 font-display text-base font-bold text-ink">{g.title(t)}</h3>
                  <span className="mt-3 font-display text-sm font-bold text-brand">
                    {t('পড়ুন →', 'Read →')}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-8 text-center">
          <Link
            to="/guide"
            className="inline-block rounded-full bg-ink px-7 py-3 font-display font-bold text-white transition hover:brightness-125"
          >
            {t('সব গাইড দেখুন', 'See all guides')}
          </Link>
        </div>
      </div>
    </section>
  )
}
