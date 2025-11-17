'use client';

import Image from 'next/image';
import { Github, Linkedin, Twitter, ArrowDown, Download } from 'lucide-react';
import Link from 'next/link';
import ParticleSystem from '@/components/common/particle-system';
import SocialButtons from '@/components/ui/dinamic-buttons';
import { motion } from 'framer-motion';
import { forwardRef, useEffect, useState } from 'react';
import { fadeInUp, scaleIn, staggerContainer } from '@/lib/motion-variants';

const socialLinks = [
  { icon: Github, href: 'https://github.com/jr4dh3y', label: 'Github' },
  { icon: Linkedin, href: 'https://linkedin.com/in/radheykalra', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/jr4dh3y', label: 'Twitter' },
  { icon: Download, href: 'assets/Radhey_cv.pdf', label: 'Download CV' },
];

function HeroContent({ profilePictureUrl }: { profilePictureUrl: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="container relative z-10 flex h-full items-center justify-center px-4">
      <motion.div
        initial="hidden"
        animate={mounted ? "visible" : "hidden"}
        variants={staggerContainer}
        className="flex items-center justify-center w-full max-w-4xl"
      >
        {/* Profile info - Centered */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center gap-8 text-center lg:flex-row lg:text-left rounded-2xl p-8 bg-background/50 backdrop-blur-2xl backdrop-saturate-200 border border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] ring-1 ring-white/20"
        >
          <motion.div
            variants={scaleIn}
            className="relative h-48 w-48 md:h-56 md:w-56 flex-shrink-0"
          >
            <Image
              src={profilePictureUrl}
              alt="Profile Picture"
              width={224}
              height={224}
              className="rounded-full border-4 border-primary/20 object-cover shadow-lg ring-2 ring-primary/20"
              priority
              data-ai-hint="professional portrait"
            />
          </motion.div>
          
          <div className="max-w-xl">
            <motion.p
              variants={fadeInUp}
              className="mb-2 text-lg font-medium text-primary"
            >
              Hello, I&apos;m
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="mb-4 font-headline text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl bg-gradient-to-br from-primary via-primary/80 bg-clip-text text-transparent drop-shadow"
            >
              Radhey Kalra
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="mb-6 text-lg text-foreground/80"
            >
              I build full-stack apps, mobile solutions, and work on ML/audio processing. I&apos;m fluent in DevOps and love ricing my setup.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="mb-4 flex justify-center gap-4 lg:justify-start"
            >
              <SocialButtons links={socialLinks} />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <Link href="#projects" aria-label="Scroll to projects">
          <ArrowDown className="h-8 w-8 text-primary" />
        </Link>
      </motion.div>
    </div>
  );
}
const Hero = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(function Hero(props, ref) {
  const defaultUsername = 'jr4dh3y';
  const defaultAvatar = `https://avatars.githubusercontent.com/${defaultUsername}`;
  const [profilePictureUrl, setProfilePictureUrl] = useState(defaultAvatar);

  useEffect(() => {
    const fetchProfile = async () => {
      const username = defaultUsername;
      const fallbackAvatar = `https://avatars.githubusercontent.com/${username}`;
      try {
        const response = await fetch(`https://api.github.com/users/${username}`, {
          headers: {
            Accept: 'application/vnd.github+json',
          },
          cache: 'no-store',
        });
        if (response.ok) {
          const data = await response.json();
          setProfilePictureUrl(data.avatar_url ?? fallbackAvatar);
        } else {
          setProfilePictureUrl(fallbackAvatar);
        }
      } catch (error) {
        console.error('Error fetching GitHub profile:', error);
        setProfilePictureUrl(fallbackAvatar);
      }
    };
    
    fetchProfile();
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="relative h-[calc(100vh-3.5rem)] min-h-[600px] overflow-hidden bg-gradient-to-br from-background via-background/95 to-background/90"
      {...props}
    >
      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)] pointer-events-none z-0" />

      {/* Particle System */}
      <ParticleSystem />
      
      <HeroContent profilePictureUrl={profilePictureUrl} />
    </section>
  );
});

export default Hero;
