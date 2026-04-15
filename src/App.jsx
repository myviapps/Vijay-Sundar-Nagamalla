import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

import { profile, stats, skills, projects, experience } from './data/resume';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero profile={profile} />
        <StatsBar stats={stats} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Experience experience={experience} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </>
  );
}
