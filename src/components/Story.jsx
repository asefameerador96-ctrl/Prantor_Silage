import Reveal from './Reveal.jsx'
import { useT } from '../i18n.jsx'

export default function Story() {
  const t = useT()

  return (
    <section id="story" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="text-sm font-bold tracking-widest text-accent uppercase">
            {t('আমাদের কথা', 'Our story')}
          </p>
          <h2 className="mt-2 font-display text-[clamp(2rem,4.5vw,3.2rem)] leading-snug font-bold text-brand-dark">
            {t('গরু ভালো খেলে, খামারি ভালো থাকেন', 'When cattle eat well, farmers live well')}
          </h2>
          <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-ink/75">
            <p>
              {t(
                'প্রান্তর সাইলেজে আছে মিল্কিং স্টেজের পুরো ভুট্টা গাছের পুষ্টি। গরু সহজে খায়, হজম করে, সুস্থ থাকে।',
                'Prantor Silage carries the full nutrition of whole corn plants harvested at milking stage. Cattle eat it readily, digest it easily and stay healthy.'
              )}
            </p>
            <p>
              {t(
                'সকালের খাবার দেওয়ার সময় প্রান্তর সাইলেজের মিষ্টি-টক গন্ধ পেলে গরু নিজেই এগিয়ে আসে। রুচি নেই এমন গরুও খেয়ে শেষ করে ফেলে।',
                'At morning feeding, the sweet-sour aroma of Prantor Silage draws the cattle in on their own. Even cows with poor appetite finish every last bite.'
              )}
            </p>
            <p className="font-semibold text-brand-dark">
              {t(
                'রোজ ঘাস কাটার ঝামেলা, বাজার থেকে কেনার খরচ, বর্ষায় ঘাস না পাওয়ার চিন্তা — প্রান্তর সাইলেজ আপনার সব সমস্যার সমাধান।',
                'The daily grind of cutting grass, the cost of buying feed, the worry of monsoon shortages — Prantor Silage solves them all.'
              )}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative">
            <img
              src="/img/g-feeding.webp"
              alt={t('খামারি গরুকে প্রান্তর সাইলেজ খাওয়াচ্ছেন', 'A farmer feeding cattle with Prantor Silage')}
              className="w-full rounded-3xl object-cover shadow-2xl shadow-brand/25"
              loading="lazy"
            />
            <img
              src="/img/g-cow-rest.webp"
              alt=""
              aria-hidden="true"
              className="absolute -bottom-8 -left-6 hidden w-44 rounded-2xl border-4 border-paper shadow-xl md:block"
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
