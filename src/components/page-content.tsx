'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Header from '@/components/layout/header';
import Hero from '@/components/sections/hero';
import WorkSection from '@/components/sections/work';
import Experience from '@/components/sections/experience';
import HomelabCombined from '@/components/homelab-variants/combined';
import About from '@/components/sections/about';
import Contact from '@/components/sections/contact';

export default function PageContent() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    if (!heroRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setShowHeader(!entry.isIntersecting);
      },
      { threshold: 0.1 }
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
      {showHeader && <Header />}
      <main className="flex-1">
        <Hero ref={heroRef} />
        <Experience />
        <HomelabCombined />
        <WorkSection />
        <About />
        <Contact />
      </main>
    </motion.div>
  );
}
