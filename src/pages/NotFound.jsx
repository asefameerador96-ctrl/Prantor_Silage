import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { useT } from '../i18n.jsx'

export default function NotFound() {
  const t = useT()
  return (
    <>
      <Navbar />
      <main className="grid min-h-[60vh] place-items-center bg-white px-4 pt-24">
        <div className="text-center">
          <p className="font-display text-sm font-bold tracking-widest text-brand uppercase">404</p>
          <h1 className="mt-2 font-display text-3xl font-extrabold text-ink sm:text-4xl">
            {t('পাতাটি পাওয়া যায়নি', 'Page not found')}
          </h1>
          <p className="mt-3 text-black/70">
            {t('আপনি যে পাতাটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।', 'The page you are looking for does not exist or has moved.')}
          </p>
          <Link
            to="/"
            className="mt-6 inline-block rounded-full bg-brand px-6 py-3 font-display font-bold text-white transition hover:brightness-110"
          >
            {t('হোমে ফিরে যান', 'Back to home')}
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
