import Reveal from './Reveal.jsx'
import { useT } from '../i18n.jsx'

export default function Quality() {
  const t = useT()

  const checks = [
    [t('ঝরঝরে হবে', 'Loose and crumbly'), t('ভালো সাইলেজ দলা পাকানো নয় — হাতে নিলেই ঝরঝরে।', 'Good silage never clumps — it falls loose in your hand.')],
    [t('গন্ধ হবে মিষ্টি-টক', 'Smells sweet and sour'), t('সঠিক ফার্মেন্টেশনের চিহ্ন — গরু খুশি হয়ে খাবে।', 'The sign of proper fermentation — cattle eat it happily.')],
    [t('কিছু ফেলবে না', 'Nothing left behind'), t('পাত্র একেবারে সাফ — অপচয় নেই, খরচও কম।', 'The trough is licked clean — no waste, lower cost.')],
  ]

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <img
            src="/img/g-green-feed.webp"
            alt={t('তাজা সবুজ সাইলেজ', 'Fresh green silage')}
            className="w-full rounded-3xl object-cover shadow-2xl shadow-brand/20"
            loading="lazy"
          />
        </Reveal>

        <div>
          <Reveal>
            <p className="text-sm font-bold tracking-widest text-accent uppercase">
              {t('মান যাচাই', 'Quality check')}
            </p>
            <h2 className="mt-2 font-display text-[clamp(2rem,4.5vw,3.2rem)] leading-snug font-bold text-brand-dark">
              {t('ভালো সাইলেজ চেনার ৩টি সহজ উপায়', '3 simple signs of good silage')}
            </h2>
          </Reveal>

          <div className="mt-8 space-y-5">
            {checks.map(([title, body], i) => (
              <Reveal key={title} delay={i * 0.1}>
                <div className="flex items-start gap-4 rounded-2xl border border-brand/10 bg-white p-5 shadow-sm">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand font-display text-lg font-bold text-white">
                    {t(['১', '২', '৩'][i], String(i + 1))}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-brand-dark">{title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-ink/70">{body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.35}>
            <p className="mt-7 rounded-2xl bg-accent/10 px-6 py-4 font-display text-lg font-bold text-brand-dark">
              {t('প্রান্তর সাইলেজে পাবেন সমস্ত গুণাগুণ।', 'You will find every one of these in Prantor Silage.')}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
