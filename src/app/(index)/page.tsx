import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { About } from './components/about/about'
import { Presentation } from './components/presentation/presentation'

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <main>
        <Presentation />
        <About />
      </main>
      <Footer />
    </div>
  )
}
