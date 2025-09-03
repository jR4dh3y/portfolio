import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter, ArrowDown } from 'lucide-react';
import Link from 'next/link';
import { GithubSummaryForm } from '../github-summary-form';

const socialLinks = [
  { icon: Github, href: '#', label: 'Github' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

export default function Hero() {
  return (
    <section id="home" className="relative h-[calc(100vh-3.5rem)] min-h-[600px]">
      <div className="container relative z-10 flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
          <div className="relative h-48 w-48 md:h-64 md:w-64">
            <Image
              src="https://picsum.photos/400/400"
              alt="Radhey's Profile Picture"
              width={256}
              height={256}
              className="rounded-full border-4 border-primary/20 object-cover shadow-lg"
              priority
              data-ai-hint="professional portrait"
            />
          </div>
          <div className="max-w-xl">
            <p className="mb-2 text-lg font-medium text-primary">Hello, I'm</p>
            <h1 className="mb-4 font-headline text-5xl font-extrabold tracking-tight md:text-7xl">
              Radhey
            </h1>
            <p className="mb-6 text-lg text-muted-foreground">
              A passionate developer creating modern and responsive web applications. I turn ideas into reality with code.
            </p>
            <div className="mb-8 flex justify-center gap-4 md:justify-start">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Button key={label} variant="outline" size="icon" asChild>
                  <Link href={href}>
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{label}</span>
                  </Link>
                </Button>
              ))}
            </div>
            
            <GithubSummaryForm />

          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <Link href="#projects" aria-label="Scroll to projects">
          <ArrowDown className="h-8 w-8 animate-bounce text-primary" />
        </Link>
      </div>
    </section>
  );
}
