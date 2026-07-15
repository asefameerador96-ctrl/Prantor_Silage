import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Story from './components/Story.jsx'
import Benefits from './components/Benefits.jsx'
import Quality from './components/Quality.jsx'
import Product from './components/Product.jsx'
import Gallery from './components/Gallery.jsx'
import Availability from './components/Availability.jsx'
import QuoteBand from './components/QuoteBand.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Story />
        <Benefits />
        <Quality />
        <Product />
        <Gallery />
        <Availability />
        <QuoteBand />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
