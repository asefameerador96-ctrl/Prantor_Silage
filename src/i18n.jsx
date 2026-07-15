import { createContext, useContext, useEffect, useState } from 'react'

const LangContext = createContext({ lang: 'bn', toggle: () => {} })

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('lang') || 'bn' } catch { return 'bn' }
  })

  useEffect(() => {
    try { localStorage.setItem('lang', lang) } catch { /* private mode */ }
    document.documentElement.lang = lang
  }, [lang])

  const toggle = () => setLang((l) => (l === 'bn' ? 'en' : 'bn'))

  return (
    <LangContext.Provider value={{ lang, toggle }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}

/** t('বাংলা', 'English') — returns copy for the active language */
export function useT() {
  const { lang } = useLang()
  return (bn, en) => (lang === 'bn' ? bn : en)
}
