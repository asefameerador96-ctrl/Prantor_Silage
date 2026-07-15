import { useEffect, useState } from 'react'
import { useLang, useT } from '../i18n.jsx'

export default function Navbar() {
  const t = useT()
  const { lang, toggle } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const dark = scrolled || open
  const links = [
    [t('আমাদের কথা', 'Our Story'), '#story'],
    [t('উপকারিতা', 'Benefits'), '#benefits'],
    [t('পণ্য', 'Product'), '#product'],
    [t('গ্যালারি', 'Gallery'), '#gallery'],
    [t('প্রাপ্তিস্থান', 'Availability'), '#availability'],
    [t('যোগাযোগ', 'Contact'), '#contact'],
  ]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        dark ? 'bg-paper/95 shadow-md shadow-brand/10 backdrop-blur' : 'bg-gradient-to-b from-black/40 to-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center" aria-label="Prantor Silage">
          <img
            src={dark ? '/img/logo-green.png' : '/img/logo-white.png'}
            alt={t('প্রান্তর সাইলেজ', 'Prantor Silage')}
            className="h-12 w-auto"
          />
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={`text-sm font-semibold transition-colors duration-200 ${
                dark ? 'text-ink/75 hover:text-brand' : 'text-white/90 hover:text-white'
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={toggle}
            className={`flex cursor-pointer items-center overflow-hidden rounded-full border text-xs font-bold ${
              dark ? 'border-brand/30' : 'border-white/40'
            }`}
            aria-label={lang === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}
          >
            <span className={`px-3 py-1.5 transition-colors duration-200 ${lang === 'bn' ? 'bg-brand text-white' : dark ? 'text-ink/60' : 'text-white/75'}`}>
              বাং
            </span>
            <span className={`px-3 py-1.5 transition-colors duration-200 ${lang === 'en' ? 'bg-brand text-white' : dark ? 'text-ink/60' : 'text-white/75'}`}>
              EN
            </span>
          </button>

          <a
            href="tel:+8801901244248"
            className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-accent-light sm:block"
          >
            {t('অর্ডার করুন', 'Order Now')}
          </a>

          <button
            onClick={() => setOpen(!open)}
            className={`cursor-pointer rounded-lg p-2 lg:hidden ${dark ? 'text-ink' : 'text-white'}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-brand/10 bg-paper px-6 py-4 lg:hidden">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-base font-semibold text-ink/80 hover:text-brand"
            >
              {label}
            </a>
          ))}
          <a
            href="tel:+8801901244248"
            className="mt-3 block rounded-full bg-accent px-5 py-3 text-center text-sm font-bold text-white"
          >
            {t('অর্ডার করুন — ০১৯০১২৪৪২৪৮', 'Order Now — 01901244248')}
          </a>
        </div>
      )}
    </header>
  )
}
