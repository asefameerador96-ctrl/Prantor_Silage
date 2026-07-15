import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import { useT } from '../i18n.jsx'

export default function Faq() {
  const t = useT()
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(0)

  const items = [
    [
      t('প্রান্তর সাইলেজ কী দিয়ে তৈরি?', 'What is Prantor Silage made of?'),
      t(
        'মিল্কিং স্টেজে কাটা পুরো ভুট্টা গাছ — দানাসহ — সঠিকভাবে ফার্মেন্ট করে তৈরি। এই পর্যায়ে কাটা ভুট্টায় পুষ্টি সবচেয়ে বেশি থাকে; দানার স্টার্চ গাভীর দুধ উৎপাদনে সরাসরি কাজ করে।',
        'Whole corn plants cut at milking stage — grain included — properly fermented. Corn harvested at this stage carries peak nutrition, and the grain starch works directly on a cow’s milk production.'
      ),
    ],
    [
      t('ভালো সাইলেজ চিনব কীভাবে?', 'How do I recognize good silage?'),
      t(
        'তিনটি সহজ লক্ষণ: (১) ঝরঝরে হবে, দলা পাকানো নয়; (২) গন্ধ হবে মিষ্টি-টক — সঠিক ফার্মেন্টেশনের চিহ্ন; (৩) গরু কিছু ফেলবে না, পাত্র সাফ করে খাবে। প্রান্তর সাইলেজে পাবেন সমস্ত গুণাগুণ।',
        'Three simple signs: (1) loose and crumbly, never clumped; (2) a sweet-sour aroma — the mark of proper fermentation; (3) cattle leave nothing behind. Prantor Silage carries all three.'
      ),
    ],
    [
      t('প্রান্তর সাইলেজ কোথায় পাওয়া যায়?', 'Where is Prantor Silage available?'),
      t(
        'পাওয়া যাচ্ছে দেশজুড়ে — ঢাকা, চট্টগ্রাম, রাজশাহী, খুলনা, সিলেট, রংপুর, ময়মনসিংহ, বরিশাল। কুরিয়ারে নিতে পারবেন; সরাসরি অর্ডার করতে ০১৯০১২৪৪২৪৮ নম্বরে কল করুন।',
        'Nationwide — Dhaka, Chattogram, Rajshahi, Khulna, Sylhet, Rangpur, Mymensingh and Barishal. Take delivery by courier; call 01901244248 to order directly.'
      ),
    ],
    [
      t('কত কেজির প্যাক পাওয়া যায়?', 'What pack sizes are available?'),
      t(
        '৫০ কেজি ফুড-গ্রেড ব্যাগে এয়ারটাইট প্যাকেজিং-এ পাওয়া যায় — মান ও পুষ্টি দীর্ঘদিন অটুট থাকে।',
        'It comes in 50 kg food-grade bags with airtight packaging — keeping quality and nutrition intact for a long time.'
      ),
    ],
    [
      t('গরু কি প্রান্তর সাইলেজ খেতে পছন্দ করে?', 'Do cattle actually like Prantor Silage?'),
      t(
        'হ্যাঁ। মিষ্টি-টক গন্ধ পেলে গরু নিজেই এগিয়ে আসে — রুচি নেই এমন গরুও খেয়ে শেষ করে ফেলে। গরু সহজে হজম করে, সুস্থ থাকে।',
        'Yes. The sweet-sour aroma draws them in on their own — even cows with poor appetite finish every bite. They digest it easily and stay healthy.'
      ),
    ],
  ]

  return (
    <section id="faq" className="scroll-mt-20 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal className="text-center">
          <p className="text-sm font-bold tracking-widest text-accent uppercase">
            {t('সাধারণ প্রশ্ন', 'FAQ')}
          </p>
          <h2 className="mt-2 font-display text-[clamp(2rem,4.5vw,3.2rem)] leading-snug font-bold text-brand-dark">
            {t('প্রশ্ন ও উত্তর', 'Questions & Answers')}
          </h2>
        </Reveal>

        <div className="mt-12 space-y-3.5">
          {items.map(([q, a], i) => {
            const isOpen = open === i
            return (
              <Reveal key={q} delay={i * 0.05}>
                <div className="overflow-hidden rounded-2xl border border-brand/12 bg-paper">
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-4.5 text-left"
                  >
                    <span className="font-display text-[17px] font-bold text-brand-dark">{q}</span>
                    <motion.svg
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: reduce ? 0 : 0.25 }}
                      className="h-5 w-5 shrink-0 text-accent"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </motion.svg>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduce ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-6 pb-5 text-[15px] leading-relaxed text-ink/70">{a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
