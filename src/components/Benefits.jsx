import Reveal from './Reveal.jsx'
import { useT } from '../i18n.jsx'

const icons = {
  corn: <path d="M12 2c-3 3-4 6-4 10s1 7 4 10c3-3 4-6 4-10s-1-7-4-10zM8 12h8" />,
  aroma: <path d="M12 21C7 17 4 13.5 4 10a8 8 0 0 1 16 0c0 3.5-3 7-8 11z" />,
  milk: <path d="M8 2h8v3l2 4v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9l2-4V2zm-2 11h12" />,
  ease: <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14l-3-3" />,
  calm: <path d="M12 22s8-3 8-10V5l-8-3-8 3v7c0 7 8 10 8 10z" />,
  care: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.3l7.8-7.8 1-1.1a5.5 5.5 0 0 0 0-7.8z" />,
}

export default function Benefits() {
  const t = useT()

  const items = [
    ['corn', t('মিল্কিং স্টেজের পুষ্টি', 'Milking-stage nutrition'), t('সঠিক সময়ে কাটা পুরো ভুট্টা গাছ — দানার স্টার্চসহ সর্বোচ্চ পুষ্টি।', 'Whole corn plants cut at the right moment — maximum nutrition with grain starch.')],
    ['aroma', t('মিষ্টি-টক গন্ধ', 'Sweet-sour aroma'), t('গন্ধ পেলে গরু নিজেই এগিয়ে আসে; রুচি নেই এমন গরুও খেয়ে শেষ করে।', 'The aroma draws cattle in on their own; even picky eaters finish everything.')],
    ['milk', t('দুধ উৎপাদনে সরাসরি কাজ', 'Works directly on milk yield'), t('ভুট্টার দানার স্টার্চ ও ফার্মেন্টেড পুষ্টি গাভীর দুধ উৎপাদনে সরাসরি কাজ করে।', 'Grain starch and fermented nutrients act directly on a cow’s milk production.')],
    ['ease', t('সব সমস্যার সমাধান', 'One solution for all'), t('রোজ ঘাস কাটা, বাজারের খরচ, বর্ষার চিন্তা — সব ঝামেলার একটাই উত্তর।', 'Daily grass cutting, market costs, monsoon worries — one answer to every hassle.')],
    ['calm', t('সুস্থ গরু, শান্ত খামার', 'Healthy cattle, calm farms'), t('সুস্থ গরু শান্ত থাকে। ভালো খায়, ভালো দেয় — পার্থক্যটা নিজেই টের পাবেন।', 'Healthy cows stay calm. They eat well and give well — you will feel the difference.')],
    ['care', t('দায়িত্বের যত্ন', 'Care as a duty'), t('এটি কেবল ব্যবসার হিসাব নয় — প্রাণীর প্রতি সঠিক দায়িত্ব পালন।', 'This is not just business arithmetic — it is our duty of care to the animal.')],
  ]

  return (
    <section id="benefits" className="scroll-mt-20 bg-brand py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold tracking-widest text-accent-light uppercase">
            {t('কেন প্রান্তর', 'Why Prantor')}
          </p>
          <h2 className="mt-2 font-display text-[clamp(2rem,4.5vw,3.2rem)] leading-snug font-bold">
            {t('সুস্থ গরু সাইলেজ খায়, লাভের পথে খামার যায়', 'Healthy cattle eat silage — farms walk the path of profit')}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([icon, title, body], i) => (
            <Reveal key={title} delay={(i % 3) * 0.08}>
              <div className="h-full rounded-2xl border border-white/12 bg-white/8 p-7 backdrop-blur-sm transition-colors duration-200 hover:bg-white/14">
                <span className="inline-grid h-12 w-12 place-items-center rounded-full bg-accent text-white">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {icons[icon]}
                  </svg>
                </span>
                <h3 className="mt-4 font-display text-xl font-bold">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/75">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
