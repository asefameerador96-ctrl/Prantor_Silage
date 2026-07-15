import Reveal from './Reveal.jsx'
import { useT } from '../i18n.jsx'

export default function QuoteBand() {
  const t = useT()

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <img
        src="/img/g-bond-dusk.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-brand-deep/75" />

      <Reveal className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        <svg className="mx-auto h-10 w-10 text-accent-light" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M10 8v6a4 4 0 0 1-4 4H5a1 1 0 0 1 0-2h1a2 2 0 0 0 2-2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2zm11 0v6a4 4 0 0 1-4 4h-1a1 1 0 0 1 0-2h1a2 2 0 0 0 2-2h-3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2z" />
        </svg>
        <p className="mt-6 font-display text-[clamp(1.6rem,4vw,2.8rem)] leading-normal font-bold text-white">
          {t(
            'দিন শেষে খামারে গেলে গরুর চোখে তাকান। সুস্থ গরু শান্ত থাকে। ভালো খায়। ভালো দেয়।',
            'At the end of the day, look into your cattle’s eyes. Healthy cows stay calm. They eat well. They give well.'
          )}
        </p>
        <p className="mt-6 text-lg font-semibold text-white/75">
          {t('প্রান্তর সাইলেজ — সবুজ যত্ন, বিশ্বাসের বন্ধন', 'Prantor Silage — green care, a bond of trust')}
        </p>
      </Reveal>
    </section>
  )
}
