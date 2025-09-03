import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter, ArrowDown } from 'lucide-react';
import Link from 'next/link';
import ParticleSystem from '@/components/common/particle-system';

const socialLinks = [
  { icon: Github, href: 'https://github.com/jr4dh3y', label: 'Github' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
];

async function getGithubProfile(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    if (!response.ok) {
      console.error('Failed to fetch GitHub profile');
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    return null;
  }
}


export default async function Hero() {
  const githubProfile = await getGithubProfile('jr4dh3y');
  const profilePictureUrl = githubProfile?.avatar_url || "https://picsum.photos/400/400";

  return (
    <section id="home" className="relative h-[calc(100vh-3.5rem)] min-h-[600px] overflow-hidden">
      <ParticleSystem />
      <div className="container relative z-10 flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:text-left bg-background/60 backdrop-blur-sm p-8 rounded-lg">
          <div className="relative h-48 w-48 md:h-64 md:w-64">
            <Image
              src={profilePictureUrl}
              alt="Profile Picture"
              width={256}
              height={256}
              className="rounded-full border-4 border-primary/20 object-cover shadow-lg"
              priority
              data-ai-hint="professional portrait"
            />
          </div>
          <div className="max-w-xl">
            <p className="mb-2 text-lg font-medium text-primary">Hello, I'm a</p>
            <h1 className="mb-4 font-headline text-5xl font-extrabold tracking-tight md:text-7xl">
              Full-Stack Developer
            </h1>
            <p className="mb-6 text-lg text-muted-foreground">
              I build full-stack apps, mobile solutions, and work on ML/audio processing. I'm fluent in DevOps and love creating reproducible systems.
            </p>
            <div className="mb-8 flex justify-center gap-4 md:justify-start">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Button key={label} variant="outline" size="icon" asChild>
                  <Link href={href} target="_blank" rel="noopener noreferrer">
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{label}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <Link href="#projects" aria-label="Scroll to projects">
          <ArrowDown className="h-8 w-8 animate-bounce text-primary" />
        </Link>
      </div>
    </section>
  );
}
