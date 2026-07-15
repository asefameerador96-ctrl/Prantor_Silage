import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useT } from '../i18n.jsx'

export default function Hero() {
  const t = useT()
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const yBg = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 160])
  const scaleBg = useTransform(scrollY, [0, 700], [1, reduce ? 1 : 1.1])
  const yContent = useTransform(scrollY, [0, 550], [0, reduce ? 0 : -60])
  const fadeContent = useTransform(scrollY, [0, 500], [1, reduce ? 1 : 0.12])

  return (
    <section id="top" className="relative flex min-h-svh items-center overflow-hidden bg-brand-deep">
      <motion.div className="absolute inset-0" style={{ y: yBg, scale: scaleBg }}>
        <img
          src="/img/hero-clean.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-28 pb-16 sm:px-6"
        style={{ y: yContent, opacity: fadeContent }}
      >
        <motion.img
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          src="/img/logo-white.png"
          alt={t('প্রান্তর সাইলেজ', 'Prantor Silage')}
          className="h-24 w-auto sm:h-32"
        />

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-7 max-w-3xl font-display text-[clamp(2.2rem,6vw,4.6rem)] leading-[1.15] font-bold text-white"
        >
          {t('অবিরাম পুষ্টি,', 'Endless nutrition,')}
          <br />
          <span className="text-accent-light">{t('অফুরন্ত যোগান', 'abundant supply')}</span>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
        >
          {t(
            'মিল্কিং স্টেজে কাটা পুরো ভুট্টা গাছের পুষ্টিতে তৈরি সাইলেজ। গরু সহজে খায়, হজম করে, সুস্থ থাকে — আর খামারি থাকেন নিশ্চিন্তে।',
            'Silage made from whole corn plants cut at milking stage. Cattle eat it readily, digest it easily and stay healthy — while the farmer rests easy.'
          )}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-8 flex flex-wrap items-center gap-3.5"
        >
          <a
            href="tel:+8801901244248"
            className="rounded-full bg-accent px-8 py-4 text-base font-bold text-white shadow-xl shadow-black/30 transition-colors duration-200 hover:bg-accent-light"
          >
            {t('আজই অর্ডার করুন', 'Order Today')}
          </a>
          <a
            href="#story"
            className="rounded-full border-2 border-white/60 px-8 py-[14px] text-base font-bold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white hover:text-brand"
          >
            {t('আমাদের কথা', 'Our Story')}
          </a>
        </motion.div>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-10 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm"
        >
          <svg className="h-4 w-4 text-accent-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" />
          </svg>
          {t('পাওয়া যাচ্ছে দেশজুড়ে — সব বিভাগে কুরিয়ার ডেলিভারি', 'Available nationwide — courier delivery to every division')}
        </motion.p>
      </motion.div>

      <div className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 sm:block" aria-hidden="true">
        <svg className="animate-bounce-soft h-7 w-7 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  )
}
