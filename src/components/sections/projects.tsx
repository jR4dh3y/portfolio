import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const projects = [
  {
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce site with product listings, a shopping cart, and a secure checkout process.',
    image: 'https://picsum.photos/600/400?random=1',
    tags: ['Next.js', 'React', 'TailwindCSS', 'Stripe'],
    liveUrl: '#',
    githubUrl: '#',
    aiHint: 'website screenshot',
  },
  {
    title: 'Task Management App',
    description: 'A Kanban-style task manager with drag-and-drop functionality, user authentication, and real-time updates.',
    image: 'https://picsum.photos/600/400?random=2',
    tags: ['React', 'Firebase', 'Zustand', 'dnd-kit'],
    liveUrl: '#',
    githubUrl: '#',
    aiHint: 'app interface',
  },
  {
    title: 'Portfolio Website',
    description: 'A personal portfolio site to showcase my skills and projects, built with a focus on design and performance.',
    image: 'https://picsum.photos/600/400?random=3',
    tags: ['Next.js', 'TypeScript', 'Shadcn/UI'],
    liveUrl: '#',
    githubUrl: '#',
    aiHint: 'portfolio design',
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

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                <CardTitle className="mb-2 font-headline text-xl">{project.title}</CardTitle>
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
