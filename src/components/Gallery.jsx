import { useRef } from 'react'
import Reveal from './Reveal.jsx'
import { useT } from '../i18n.jsx'

export default function Gallery() {
  const t = useT()
  const track = useRef(null)

  const shots = [
    ['g-cow-rest.webp', t('প্রশান্তির খামার', 'A farm at peace')],
    ['g-grazing.webp', t('উন্নত পুষ্টি, সুস্থ গরু', 'Better nutrition, healthier cattle')],
    ['g-farmer-cow.webp', t('প্রতিদিনের সঠিক খাদ্য', 'The right feed, every day')],
    ['g-milk.webp', t('দুধে ভরা সকাল', 'Mornings full of milk')],
    ['g-calf.webp', t('যত্নে বেড়ে ওঠা', 'Raised with care')],
    ['g-dark-green.webp', t('খামারির বিশ্বাস', "A farmer's trust")],
    ['g-bond-dusk.webp', t('দিন শেষের বন্ধন', 'The bond at dusk')],
    ['g-feeding.webp', t('মিষ্টি-টক গন্ধের টান', 'Drawn by the sweet-sour aroma')],
  ]

  const scroll = (dir) => {
    track.current?.scrollBy({ left: dir * 340, behavior: 'smooth' })
  }

  return (
    <section id="gallery" className="scroll-mt-20 bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <p className="text-sm font-bold tracking-widest text-accent uppercase">
              {t('গ্যালারি', 'Gallery')}
            </p>
            <h2 className="mt-2 font-display text-[clamp(2rem,4.5vw,3.2rem)] leading-snug font-bold text-brand-dark">
              {t('প্রান্তরের গল্প', 'Stories of the Pasture')}
            </h2>
          </Reveal>
          <div className="flex gap-2">
            <button
              onClick={() => scroll(-1)}
              aria-label={t('আগের ছবি', 'Previous images')}
              className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-brand/20 text-brand transition-colors duration-200 hover:bg-brand hover:text-white"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label={t('পরের ছবি', 'Next images')}
              className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-brand/20 text-brand transition-colors duration-200 hover:bg-brand hover:text-white"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
            </button>
          </div>
        </div>

        <div
          ref={track}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
        >
          {shots.map(([img, caption]) => (
            <figure key={img} className="w-72 shrink-0 snap-start sm:w-80">
              <img
                src={`/img/${img}`}
                alt={caption}
                className="h-96 w-full rounded-2xl object-cover shadow-md"
                loading="lazy"
              />
              <figcaption className="mt-2.5 text-sm font-semibold text-ink/55">{caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
