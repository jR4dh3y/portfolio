import { Code, Bot, Server, Database, PenTool, GitMerge,type LucideIcon, BrainCircuit, Shell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Skill {
  name: string;
}

interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    icon: Code,
    skills: [
      { name: 'Python' },
      { name: 'TypeScript/JavaScript' },
      { name: 'C/C++' },
      { name: 'QML/Shell' },
      { name: 'SQL' },
      { name: 'Bash' },
    ],
  },
  {
    title: 'Frontend & Mobile',
    icon: Bot,
    skills: [
      { name: 'React/Next.js' },
      { name: 'React Native' },
      { name: 'Expo' },
      { name: 'Svelte' },
      { name: 'Tailwind CSS' },
      { name: 'Node/Express' },
    ],
  },
  {
    title: 'AI/ML',
    icon: BrainCircuit,
    skills: [
      { name: 'PyTorch' },
      { name: 'Diffusion' },
      { name: 'U-Net' },
      { name: 'Transformers' },
      { name: 'scikit-learn' },
      { name: 'NumPy' },
      { name: 'Pandas' },
    ],
  },
  {
    title: 'Backend & Databases',
    icon: Server,
    skills: [
      { name: 'Node.js' },
      { name: 'Express' },
      { name: 'REST' },
      { name: 'GraphQL' },
      { name: 'WebSockets' },
      { name: 'PostgreSQL' },
      { name: 'MySQL' },
    ],
  },
  {
    title: 'DevOps & Tooling',
    icon: GitMerge,
    skills: [
      { name: 'Git & GitHub' },
      { name: 'Docker' },
      { name: 'CI/CD' },
      { name: 'Vercel' },
    ],
  },
  {
    title: 'Systems & OS',
    icon: Shell,
    skills: [
      { name: 'Linux' },
      { name: 'Bash' },
      { name: 'systemd' },
      { name: 'Networking' },
    ],
  },
  {
    title: 'Cloud & Infrastructure',
    icon: Server,
    skills: [
      { name: 'AWS' },
      { name: 'GCP' },
      { name: 'Kubernetes' },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="bg-muted/40 py-20 sm:py-32">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">Technical Skills</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A look at the technologies, languages, and tools I work with.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <Card key={category.title} className="hover:border-primary transition-colors">
              <CardHeader className="flex flex-row items-center gap-4">
                <category.icon className="h-8 w-8 text-primary" />
                <CardTitle className="font-headline text-2xl">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li key={skill.name} className="rounded-md bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
