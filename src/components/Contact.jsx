import Reveal from './Reveal.jsx'
import { useT } from '../i18n.jsx'

export default function Contact() {
  const t = useT()

  return (
    <section id="contact" className="scroll-mt-20 bg-gradient-to-br from-brand via-brand-dark to-brand-deep py-20 text-white sm:py-28">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <Reveal>
          <h2 className="font-display text-[clamp(2.2rem,5.5vw,3.8rem)] leading-snug font-bold">
            {t('আজই অর্ডার করুন', 'Order Today')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/85">
            {t(
              'প্রান্তর সাইলেজ প্রতিদিনের খাবারে রাখুন — গরুর পুষ্টির ঘাটতি থাকবে না। সরাসরি অর্ডার করতে কল করুন।',
              'Make Prantor Silage part of the daily feed — your cattle will never fall short on nutrition. Call us to order directly.'
            )}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <a
            href="tel:+8801901244248"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-accent px-9 py-4 font-display text-xl font-bold text-white shadow-2xl shadow-black/25 transition-colors duration-200 hover:bg-accent-light sm:px-12 sm:text-2xl"
          >
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {t('০১৯০১২৪৪২৪৮', '01901244248')}
          </a>
          <p className="mt-5 text-sm font-medium text-white/70">
            {t(
              'কল করুন অথবা ফেসবুক পেজে মেসেজ দিন — আজই আপনার অর্ডারটি প্রসেস করা হবে।',
              'Call us or message our Facebook page — your order will be processed the same day.'
            )}
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mx-auto mt-12 grid max-w-3xl gap-4 text-left sm:grid-cols-2">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
              <h3 className="font-display text-base font-bold">{t('প্রস্তুতকারক', 'Manufacturer')}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-white/80">
                {t('এ.কে. হেরিটেজ এন্ড কর্পোরেশন', 'A.K. Heritage & Corporation')}
                <br />
                {t('পলাশবাড়ী, রংপুর, বাংলাদেশ', 'Palashbari, Rangpur, Bangladesh')}
              </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
              <h3 className="font-display text-base font-bold">{t('অর্ডার ও ডেলিভারি', 'Orders & Delivery')}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-white/80">
                {t(
                  'সব বিভাগে কুরিয়ারে ডেলিভারি। পাইকারি অর্ডারে বিশেষ মূল্য।',
                  'Courier delivery to every division. Special pricing on wholesale orders.'
                )}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
