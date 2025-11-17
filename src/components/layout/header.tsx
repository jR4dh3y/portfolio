'use client';

import { Menu, TerminalSquare, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type SectionKey = 'projects' | 'skills';

const navLinks: { key: SectionKey; label: string }[] = [
  { key: 'projects', label: 'Projects' },
  { key: 'skills', label: 'Skills' },
];

interface HeaderProps {
  activeSection: SectionKey;
  onSectionChange: (section: SectionKey) => void;
}

export default function Header({ activeSection, onSectionChange }: HeaderProps) {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeSheet = () => setSheetOpen(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${
        scrolled ? 'bg-background/95 shadow-lg' : 'bg-background/80'
      }`}
    >
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <TerminalSquare className="h-6 w-6 text-primary" onClick={() => window.open('https://calm.radhey.dev', '_blank')} />
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="font-bold"
            >
              Portfolio
            </motion.span>
          </Link>
          <nav className="hidden gap-6 text-sm md:flex">
            {navLinks.map(({ key, label }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  type="button"
                  onClick={() => {
                    onSectionChange(key);
                    const workSection = document.querySelector('#work');
                    if (workSection) {
                      workSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className={`relative transition-colors group ${
                    activeSection === key ? 'text-primary' : 'hover:text-primary'
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                      activeSection === key ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              </motion.div>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex"
          >
            <MapPin className="h-4 w-4" />
            <span>Jammu, India</span>
          </motion.div>
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pr-0">
              <Link href="/" className="mr-6 flex items-center space-x-2 mb-6" onClick={closeSheet}>
                <TerminalSquare className="h-6 w-6 text-primary" />
                <span className="font-bold">Portfolio</span>
              </Link>
              <div className="flex flex-col space-y-3">
                {navLinks.map(({ key, label }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => {
                      onSectionChange(key);
                      const workSection = document.querySelector('#work');
                      if (workSection) {
                        workSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                      closeSheet();
                    }}
                    className={`text-left transition-colors ${
                      activeSection === key ? 'text-primary' : 'hover:text-primary'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
