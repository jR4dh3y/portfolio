'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/motion-variants';

const projects = [
  {
    title: 'UNet Audio Filter',
    description: 'U-Net based speech enhancement and noise reduction pipeline for audio with a CLI and Streamlit app.',
    image: 'https://raw.githubusercontent.com/jR4dh3y/unet-audiofilter/refs/heads/master/presentation/audio_comparison.png',
    tags: ['Python', 'U-Net', 'PyTorch', 'Streamlit', 'Audio DSP'],
    liveUrl: 'https://aiclearvoice.streamlit.app/',
    githubUrl: 'https://github.com/jR4dh3y/unet-audiofilter',
  },
  {
    title: 'Hotel Booking',
    description: 'A full-stack web application for hotel booking, featuring user authentication, room browsing, booking management, and an admin panel.',
    image: 'https://raw.githubusercontent.com/jR4dh3y/hotel-booking/refs/heads/main/ss/landing.png',
    tags: ['Svelte', 'Node.js', 'Express', 'MySQL'],
    liveUrl: 'https://hotel-booking-amber-nine.vercel.app/',
    githubUrl: 'https://github.com/jR4dh3y/hotel-booking',
  },
  {
    title: 'Student Dashboard',
    description: 'Dashboard for managing students, events, and points in a developer community, with a ranked leaderboard, student detail pages, and owner/admin-guarded profile updates with points history.',
    image: '/assets/dash.png',
    tags: ['React', 'Node.js', 'Express', 'Firebase'],
    liveUrl: 'https://dash.radhey.dev/',
    githubUrl: 'https://github.com/jR4dh3y/unidash',
  },
  {
    title: 'Terminal Doom',
    description: 'Terminal-based first-person shooter inspired by Doom, implemented in C++ and rendered directly within the terminal using the ncurses library',
    image: '/assets/doom.png',
    tags: ['C++', 'ncurses', 'cmake', 'Game Development'],
    githubUrl: 'https://github.com/jR4dh3y/doom-in-terminal',
  },
  {
    title: 'WallpyGui',
    description: 'Wallpaper manager designed to work with Niri and Hyprland window managers for applying both image and video wallpapers',
    image: '/assets/wall.png',
    tags: ['Linux', 'GTK4', 'Wayland'],
    githubUrl: 'https://github.com/jR4dh3y/wallpygui',
  },
];

export default function Projects() {
  return (
    <div className="w-full">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            variants={fadeInUp}
            whileHover={{
              y: -5,
              transition: { duration: 0.2 }
            }}
          >
            <Card className="flex flex-col h-full overflow-hidden group hover:shadow-lg transition-shadow duration-300 border-muted/50">
              <CardHeader className="p-0">
                <motion.div
                  className="relative h-40 w-full overflow-hidden"
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </motion.div>
              </CardHeader>
              <CardContent className="flex-1 p-4">
                <CardTitle className="font-headline text-lg mb-2">{project.title}</CardTitle>
                <CardDescription className="mb-3 text-sm line-clamp-3">{project.description}</CardDescription>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 4).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">{tag}</Badge>
                  ))}
                  {project.tags.length > 4 && (
                    <Badge variant="secondary" className="text-xs px-2 py-0.5">+{project.tags.length - 4}</Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex gap-2">
                {project.liveUrl && project.liveUrl.trim() !== '' && project.liveUrl !== '#' && (
                  <Button asChild size="sm" className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 h-8 text-xs">
                    <Link href={project.liveUrl}>Live Demo</Link>
                  </Button>
                )}
                <Button variant="outline" size="sm" asChild className="flex-1 h-8 text-xs">
                  <Link href={project.githubUrl}>GitHub</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
