'use client';

import { Menu, TerminalSquare, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

const ENABLE_SCROLL_NAV = true; 

export default function Header() {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(!ENABLE_SCROLL_NAV);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 10);

      if (ENABLE_SCROLL_NAV) {
        const threshold = window.innerHeight / 1;
        setIsVisible(scrollY > threshold);
      }
    };
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeSheet = () => setSheetOpen(false);

  return (
    <motion.header
      initial={ENABLE_SCROLL_NAV ? { y: -100 } : { y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 z-50 w-full border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${scrolled ? 'bg-background/95 shadow-lg' : 'bg-background/80'
        }`}
    >
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <TerminalSquare className="h-6 w-6 text-primary" onClick={() => window.open('https://calm.radhey.dev', '_blank')} />
            <span className="font-bold">
              Portfolio
            </span>
          </Link>
          <nav className="hidden gap-6 text-sm md:flex">
            {navLinks.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="transition-colors hover:text-primary"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
            <MapPin className="h-4 w-4" />
            <span>Jammu, India</span>
          </div>
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
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={closeSheet}
                    className="text-left transition-colors hover:text-primary"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
