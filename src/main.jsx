import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LangProvider } from './i18n.jsx'


// scripts/prerender.mjs bakes the rendered markup into dist/index.html for crawlers
// that do not run JavaScript. The page animates on mount and on scroll, so that
// snapshot is a state React's first render cannot reproduce and hydration would
// fail; clearing the container first makes the replacement explicit.
const container = document.getElementById('root')
container.replaceChildren()
createRoot(container).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>,
)
