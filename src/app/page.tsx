'use client';

import Header from '@/components/layout/header';
import Hero from '@/components/sections/hero';
import Projects from '@/components/sections/projects';
import Skills from '@/components/sections/skills';
import About from '@/components/sections/about';
import Contact from '@/components/sections/contact';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type SectionKey = 'projects' | 'skills';

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [showHeader, setShowHeader] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionKey>('projects');

  useEffect(() => {
    if (!heroRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setShowHeader(!entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(heroRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen flex-col"
    >
      {showHeader && <Header activeSection={activeSection} onSectionChange={setActiveSection} />}
      <main className="flex-1">
        <Hero ref={heroRef} />

        {/* Experiences placeholder (to be implemented as its own section later) */}
        <section
          id="experience"
          className="py-20 sm:py-32 border-b border-border/40 bg-background/80"
        >
          <div className="container text-center">
            <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">
              Experience
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Experience timeline coming soon.
            </p>
          </div>
        </section>

        {/* Grouped Projects / Skills controlled by navbar */}
        <section
          id="work"
          className="py-0 sm:py-8"
        >
          {activeSection === 'projects' ? <Projects /> : <Skills />}
        </section>

        <About />
        <Contact />
      </main>
      {/* <Footer /> */}
    </motion.div>
  );
}
