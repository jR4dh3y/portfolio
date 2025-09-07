import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const projects = [
  {
    title: 'UNet Audio Filter',
    description: 'U-Net based speech enhancement and noise reduction pipeline for audio with a CLI and Streamlit app, using PyTorch for ML-heavy audio processing.',
    image: 'https://raw.githubusercontent.com/jR4dh3y/unet-audiofilter/refs/heads/master/presentation/audio_comparison.png',
    tags: ['Python','U-Net', 'PyTorch', 'Streamlit', 'Audio DSP'],
    liveUrl: 'https://aiclearvoice.streamlit.app/',
    githubUrl: 'https://github.com/jR4dh3y/unet-audiofilter',
  },
  {
    title: 'Hotel Booking',
    description: 'A full-stack web application with a Svelte frontend, Node/Express backend, and MySQL database, including a deployed demo.',
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
    // liveUrl: '',
    githubUrl: 'https://github.com/jR4dh3y/unidash',
  },
  {
    title: 'Terminal Doom',
    description: 'This project is a terminal-based first-person shooter inspired by Doom, implemented in C++ and rendered directly within the terminal using the ncurses library',
    image: '/assets/doom.png',
    tags: ['C++', 'ncurses','cmake', 'Game Development'],
    githubUrl: 'https://github.com/jR4dh3y/doom-in-terminal',
  },
  {
    title: 'WallpyGui',
    description: 'GTK4-based wallpaper manager tailored for Wayland environments—specifically designed to work with Niri and Hyprland window managers. It offers a responsive, visually appealing interface for both image and video wallpapers',
    image: '/assets/wall.png',
    tags: ['Linux', 'GTK4', 'Wayland'],
    githubUrl: 'https://github.com/jR4dh3y/wallpygui',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 sm:py-32">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">My Projects</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Here are some of the projects I've worked on.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.title} className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2">
              <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-6">
                <CardTitle className="font-headline text-xl">{project.title}</CardTitle>
                <CardDescription className="mb-4">{project.description}</CardDescription>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                {project.liveUrl && project.liveUrl.trim() !== '' && project.liveUrl !== '#' && (
                  <Button asChild className="mr-2 bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href={project.liveUrl}>Live Demo</Link>
                  </Button>
                )}
                <Button variant="outline" asChild>
                  <Link href={project.githubUrl}>GitHub</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
