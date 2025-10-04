import Image from 'next/image';
import { Github, Linkedin, Twitter, ArrowDown, Download } from 'lucide-react';
import Link from 'next/link';
import ParticleSystem from '@/components/common/particle-system';
import SocialButtons from '@/components/ui/dinamic-buttons';

const socialLinks = [
  { icon: Github, href: 'https://github.com/jr4dh3y', label: 'Github' },
  { icon: Linkedin, href: 'https://linkedin.com/in/radheykalra', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/jr4dh3y', label: 'Twitter' },
  { icon: Download, href: 'https://www.linkedin.com/ambry/?x-li-ambry-ep=AQIFKal93nDs3AAAAZmvCjchOeyXDMt7aLDU6kVByRywcH1IuHQUFgd6bY4Q0gOitNHk77WRrs_OR7BZYjQZz_66Rt_Uf-iUaPPJ4eYJzH4p6uIdbKSntvZJBgHYMURbBCu5II2Yyf5s_SYx3xd5wz-FrOERML7Ba-tahTGB1oYNkbiz8KM6gaUEaijQJr54_1VS_nH7jhBYN9mv7BqVE9TOpPSAX_UOGqxhA7D3NLNfqea8aGFq6UmLWgq6EXDmS35WvUKYVIvrG8PL4kcrz5P9vLB6FnZhYMCkoSj9ppPwcpchBlT9XlKbnS_D24O7Q2IQbLmjC69duphNZOT1_c81hYJZDwRLwr8p2V3YwW629EIf37kNx_msMDytPBgPt3Rssr8W09z3VOIdgJGqZ5Uv_h_nnNJlal1NBKUW4rDoufjXxJwFcB_5p4ptr5WYiKy-dDkKB5-LfIQNUjQ8xm5r2UbOJ0DjFkx74pcQP3HduWIL2CpIxDheV1xV19EhxU7N318MqKiG64fC-fvHBGO-BmveJEwslb6wqUBx-wfbig9elHqa-aDNWinA1wTRA8cTzKk', label: 'Download CV' },
];

async function getGithubProfile(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 3600 }
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
    <section id="home" className="relative h-[calc(100vh-3.5rem)] min-h-[600px] overflow-hidden bg-gradient-to-br from-background via-background/95 to-background/90">
      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)] pointer-events-none z-0" />
      
      {/* Accent gradient spots */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none z-0" />
      
      <ParticleSystem />
      <div className="container relative z-10 flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:text-left rounded-2xl p-8 bg-background/50 backdrop-blur-2xl backdrop-saturate-200 border border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] ring-1 ring-white/20">
          <div className="relative h-48 w-48 md:h-64 md:w-64">
            <Image
              src={profilePictureUrl}
              alt="Profile Picture"
              width={256}
              height={256}
              className="rounded-full border-4 border-primary/20 object-cover shadow-lg ring-2 ring-primary/20"
              priority
              data-ai-hint="professional portrait"
            />
          </div>
          <div className="max-w-xl">
            <p className="mb-2 text-lg font-medium text-primary">Hello, I&apos;m</p>
            <h1 className="mb-4 font-headline text-5xl font-extrabold tracking-tight md:text-7xl bg-gradient-to-br from-primary via-primary/80 bg-clip-text text-transparent drop-shadow">
              Radhey Kalra
            </h1>
            <p className="mb-6 text-lg text-foreground/80">
              I build full-stack apps, mobile solutions, and work on ML/audio processing. I&apos;m fluent in DevOps and love ricing my setup.
            </p>
            <div className="mb-8 flex justify-center gap-4 md:justify-start">
              <SocialButtons links={socialLinks} />
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
