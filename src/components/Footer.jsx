import { useT } from '../i18n.jsx'

export default function Footer() {
  const t = useT()

  const links = [
    [t('আমাদের কথা', 'Our Story'), '#story'],
    [t('উপকারিতা', 'Benefits'), '#benefits'],
    [t('পণ্য', 'Product'), '#product'],
    [t('গ্যালারি', 'Gallery'), '#gallery'],
    [t('প্রাপ্তিস্থান', 'Availability'), '#availability'],
    [t('যোগাযোগ', 'Contact'), '#contact'],
  ]

  return (
    <footer className="bg-brand-deep py-14 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-3">
        <div>
          <img src="/img/logo-white.png" alt={t('প্রান্তর সাইলেজ', 'Prantor Silage')} className="h-14 w-auto" />
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-white/60">
            {t(
              'অবিরাম পুষ্টি, অফুরন্ত যোগান — প্রতিটি গরুর জন্য সঠিক পুষ্টি নিশ্চিত করাই আমাদের অঙ্গীকার।',
              'Endless nutrition, abundant supply — our promise is the right nutrition for every single cow.'
            )}
          </p>
        </div>

        <nav aria-label={t('ফুটার লিংক', 'Footer links')}>
          <h3 className="font-display text-sm font-bold tracking-widest text-white/50 uppercase">
            {t('লিংক', 'Links')}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {links.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="text-[15px] font-medium text-white/75 transition-colors duration-200 hover:text-white">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-display text-sm font-bold tracking-widest text-white/50 uppercase">
            {t('যোগাযোগ', 'Contact')}
          </h3>
          <p className="mt-4 text-[15px] leading-relaxed text-white/75">
            {t('হটলাইন:', 'Hotline:')}{' '}
            <a href="tel:+8801901244248" className="font-bold text-white hover:text-accent-light">
              {t('০১৯০১২৪৪২৪৮', '01901244248')}
            </a>
            <br />
            {t('এ.কে. হেরিটেজ এন্ড কর্পোরেশন', 'A.K. Heritage & Corporation')}
            <br />
            {t('পলাশবাড়ী, রংপুর', 'Palashbari, Rangpur')}
          </p>
          <p className="mt-4 text-[15px] text-white/60">
            {t('আমাদের আরেকটি ব্র্যান্ড —', 'Also from our family —')}{' '}
            <a href="https://www.aksilage.com" className="font-semibold text-white/85 underline-offset-4 hover:text-white hover:underline">
              {t('এ কে সাইলেজ', 'AK Silage')}
            </a>
          </p>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 px-4 pt-6 text-sm text-white/45 sm:px-6">
        © {new Date().getFullYear()} {t('এ.কে. হেরিটেজ এন্ড কর্পোরেশন। সর্বস্বত্ব সংরক্ষিত।', 'A.K. Heritage & Corporation. All rights reserved.')}
      </div>
    </footer>
  )
}
