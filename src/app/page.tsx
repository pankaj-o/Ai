import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Skills } from '@/components/Skills'
import { Projects } from '@/components/Projects'
import { SideProjects } from '@/components/SideProjects'
import { Contact } from '@/components/Contact'
import WeatherWidget from '@/components/WeatherWidget'
import JokeWidget from '@/components/JokeWidget'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#18181b] to-[#10151c]">
      <WeatherWidget />
      <JokeWidget />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <SideProjects />
      <Contact />
    </main>
  )
}
