import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Skills } from '@/components/Skills'
import { Projects } from '@/components/Projects'
import { Contact } from '@/components/Contact'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#18181b] to-[#10151c]">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  )
}
