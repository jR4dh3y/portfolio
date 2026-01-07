'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ArrowUpRight, GithubIcon } from 'lucide-react';
import { title } from 'process';
import { imageConfigDefault } from 'next/dist/shared/lib/image-config';
import { fadeInUp, staggerContainer } from '@/lib/motion-variants';
import { url } from 'inspector';

const projects = [
  {
    title: 'UNet Audio Filter',
    desc: 'Made a Complex U-Net model that can remove noise and do source separation on audio files.',
    image: 'https://raw.githubusercontent.com/jR4dh3y/unet-audiofilter/refs/heads/master/presentation/audio_comparison.png',
    tags: ['Python', 'U-Net', 'PyTorch', 'Streamlit', 'Audio DSP'],
    githubUrl: 'https://github.com/jR4dh3y/unet-audiofilter',
  },
  {
    title: 'WallpyGui',
    desc: 'Wallpaper manager for Wayland compositors written in Python GTK4.',
    image: '/assets/wall.png',
    tags: ['Linux', 'GTK4', 'Wayland', 'Python'],
    githubUrl: 'https://github.com/jR4dh3y/wallpygui',
  },
  {
    title: 'Hotel Booking',
    desc: 'Full-stack booking app with auth & admin panel written in Svelte & Node.js, uses MySQL database.',
    image: 'https://raw.githubusercontent.com/jR4dh3y/hotel-booking/refs/heads/main/ss/landing.png',
    tags: ['Svelte', 'Node.js', 'Express', 'MySQL'],
    githubUrl: 'https://github.com/jR4dh3y/hotel-booking',
  },
  {
    title: 'Community Leaderboard',
    desc: 'Community management dashboard with user profiles, event tracking, points system, leaderboards, and admin controls',
    image: '/assets/dash.png',
    tags: ['React', 'Node.js', 'Express', 'ConvexDB', 'Clerk Auth'],
    liveUrl: 'https://dash.radhey.dev/',
    githubUrl: 'https://github.com/jR4dh3y/unidash',
  },
  {
    title: 'Terminal Doom',
    desc: 'Doom styled game that runs in terminal using ncurses library.',
    image: '/assets/doom.png',
    tags: ['C++', 'ncurses', 'cmake', 'Game Dev'],
    githubUrl: 'https://github.com/jR4dh3y/doom-in-terminal',
  },
  {
    title: 'CS2 Skin Market Tracker',
    desc: 'CS2 skin market tracker with 7d price history charts and live price updates.',
    image: '/assets/cs2.png',
    tags: ['React', 'Shadcn', 'Next.js', 'Vercel-Blob', 'Steam-API'],
    liveUrl: 'https://skins.radhey.dev',
    githubUrl: 'https://github.com/jR4dh3y/seanmarket',
  },
  {
    title: 'File Manager',
    desc: 'File manager for Linux servers with multi-mount browsing, file transfer, real time updates, and more. Written in Svelte & Go',
    image: '/assets/files.png',
    tags: ['Svelte', 'Go', 'Docker', 'Nginx'],
    githubUrl: 'https://github.com/jR4dh3y/homelab-filemgr',
    liveUrl: 'https://files.jr4.in/test'
  },
  {
    title: 'TL;DR AI',
    desc: 'Summarize WhatsApp Groups Chats using AI. Uses your openrouter API key to process data(you can you free models).',
    image: 'https://github.com/jR4dh3y/tldr-desktop/raw/master/img/ss.png',
    tags: ['React', 'Electron', 'TypeScript', 'OpenRouter',],
    githubUrl: 'https://github.com/jR4dh3y/tldr-desktop'
  },
  {
    title: 'Tenant Manager',
    desc: 'A mobile app to manage tenant and log their electricity usages.',
    image: 'https://github.com/jR4dh3y/tennet-manager/raw/master/photo.png',
    tags: ['React Native', 'Expo', 'React-Native-Paper', 'TypeScript'],
    githubUrl: 'https://github.com/jR4dh3y/tennet-manager',
  },
];


export default function Projects() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="w-full">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            variants={fadeInUp}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="group relative"
          >
            {/* Card */}
            <div className="relative h-44 rounded-lg border border-muted/60 bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/40">

              {/* Background image on hover */}
              <AnimatePresence>
                {hovered === i && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Content */}
              <div className="relative h-full p-5 flex flex-col justify-between z-10">
                {/* Top: Title + Links */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-headline text-lg font-semibold leading-tight group-hover:text-primary transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1.5">
                      {project.desc}
                    </p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        className="p-2 rounded-md hover:bg-accent/20 text-muted-foreground hover:text-accent transition-colors"
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </Link>
                    )}
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      className="p-2 rounded-md hover:bg-accent/20 text-muted-foreground hover:text-accent transition-colors"
                    >
                      <GithubIcon className="w-5 h-5" />
                    </Link>
                  </div>
                </div>

                {/* Bottom: Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs px-2.5 py-1 h-6 bg-muted/70 group-hover:bg-white/10 transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Accent glow on hover */}
              <motion.div
                className="absolute -bottom-px left-3 right-3 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{
                  opacity: hovered === i ? 1 : 0,
                  scaleX: hovered === i ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div >
  );
}
