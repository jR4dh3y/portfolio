import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const projects = [
  {
    title: 'UNet Audio Filter',
    description: 'An end-to-end speech enhancement pipeline with a CLI and Streamlit app, using PyTorch for ML-heavy audio processing.',
    image: 'https://picsum.photos/600/400?random=1',
    tags: ['Python', 'PyTorch', 'Streamlit', 'Audio DSP'],
    liveUrl: '#',
    githubUrl: '#',
    aiHint: 'audio waveform',
  },
  {
    title: 'Hotel Booking',
    description: 'A full-stack college project with a Svelte frontend, Node/Express backend, and MySQL database, including a deployed demo.',
    image: 'https://picsum.photos/600/400?random=2',
    tags: ['Svelte', 'Node.js', 'Express', 'MySQL'],
    liveUrl: '#',
    githubUrl: '#',
    aiHint: 'hotel booking interface',
  },
  {
    title: 'tt - Sports Match Organizer',
    description: 'A React Native app using Expo and Tamagui to organize and join sports matches, with location search and social features.',
    image: 'https://picsum.photos/600/400?random=3',
    tags: ['React Native', 'Expo', 'Tamagui', 'TypeScript'],
    liveUrl: '#',
    githubUrl: '#',
    aiHint: 'mobile app screenshot',
  },
  {
    title: 'dots-niri',
    description: 'Polished Arch Linux dotfiles for the niri window manager, featuring an automated installer and package lists.',
    image: 'https://picsum.photos/600/400?random=4',
    tags: ['Arch Linux', 'Shell', 'niri', 'Dotfiles'],
    liveUrl: '#',
    githubUrl: '#',
    aiHint: 'linux desktop',
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
                    data-ai-hint={project.aiHint}
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
                <Button asChild className="mr-2 bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href={project.liveUrl}>Live Demo</Link>
                </Button>
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
