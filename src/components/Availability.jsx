import Reveal from './Reveal.jsx'
import { useT } from '../i18n.jsx'

export default function Availability() {
  const t = useT()

  const divisions = [
    t('ঢাকা', 'Dhaka'), t('চট্টগ্রাম', 'Chattogram'), t('রাজশাহী', 'Rajshahi'),
    t('খুলনা', 'Khulna'), t('সিলেট', 'Sylhet'), t('রংপুর', 'Rangpur'),
    t('ময়মনসিংহ', 'Mymensingh'), t('বরিশাল', 'Barishal'),
  ]

  return (
    <section id="availability" className="scroll-mt-20 overflow-hidden bg-gradient-to-br from-accent via-[#D9731F] to-[#B45309] py-20 text-white sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="text-sm font-bold tracking-widest text-white/80 uppercase">
              {t('প্রাপ্তিস্থান', 'Availability')}
            </p>
            <h2 className="mt-2 font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-snug font-bold">
              {t('পাওয়া যাচ্ছে দেশজুড়ে', 'Available Nationwide')}
            </h2>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-white/90">
              {t(
                'ঢাকা, চট্টগ্রাম, রাজশাহী, সিলেট — যেখানেই থাকুন, প্রান্তর সাইলেজ পৌঁছে যাবে। কুরিয়ারে নিতে পারবেন; সরাসরি অর্ডার করতে কল করুন বা ফেসবুক পেজে ইনবক্স করুন।',
                'Dhaka, Chattogram, Rajshahi, Sylhet — wherever you are, Prantor Silage will reach you. Take delivery by courier; call us or message our Facebook page to order directly.'
              )}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="mt-7 flex max-w-lg flex-wrap gap-2.5">
              {divisions.map((d) => (
                <li key={d} className="rounded-full border border-white/35 bg-white/12 px-4 py-1.5 text-sm font-semibold backdrop-blur-sm">
                  {d}
                </li>
              ))}
            </ul>
            <a
              href="tel:+8801901244248"
              className="mt-8 inline-block rounded-full bg-white px-8 py-4 text-base font-bold text-accent shadow-xl shadow-black/20 transition-colors duration-200 hover:bg-paper"
            >
              {t('অর্ডার করুন — ০১৯০১২৪৪২৪৮', 'Order — 01901244248')}
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <img
            src="/img/avail-map.webp"
            alt={t('সবুজে আঁকা বাংলাদেশের মানচিত্র — দেশজুড়ে প্রান্তর সাইলেজ', 'A map of Bangladesh drawn in green — Prantor Silage nationwide')}
            className="mx-auto w-full max-w-md rounded-3xl shadow-2xl shadow-black/30"
            loading="lazy"
          />
        </Reveal>
      </div>
    </section>
  )
}
