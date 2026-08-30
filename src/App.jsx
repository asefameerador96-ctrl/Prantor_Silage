import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollProgress from './components/ScrollProgress.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import RouteSeo from './components/RouteSeo.jsx'
import Home from './pages/Home.jsx'
import GuideIndex from './pages/GuideIndex.jsx'
import GuidePage from './pages/GuidePage.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollProgress />
      <ScrollToTop />
      <RouteSeo />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guide" element={<GuideIndex />} />
        <Route path="/guide/:slug" element={<GuidePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
