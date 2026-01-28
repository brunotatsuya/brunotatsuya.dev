import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero/hero'

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  )
}
