import { Code, Bot, Server, Database, PenTool, GitMerge,type LucideIcon } from 'lucide-react';
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
    skills: [{ name: 'JavaScript' }, { name: 'TypeScript' }, { name: 'HTML5' }, { name: 'CSS3/SCSS' }, { name: 'Python' }],
  },
  {
    title: 'Frontend',
    icon: Bot,
    skills: [{ name: 'React' }, { name: 'Next.js' }, { name: 'Tailwind CSS' }, { name: 'Redux' }, { name: 'Framer Motion' }],
  },
  {
    title: 'Backend',
    icon: Server,
    skills: [{ name: 'Node.js' }, { name: 'Express' }, { name: 'REST APIs' }, { name: 'GraphQL' }],
  },
  {
    title: 'Databases',
    icon: Database,
    skills: [{ name: 'MongoDB' }, { name: 'PostgreSQL' }, { name: 'Firebase' }],
  },
  {
    title: 'Tools & DevOps',
    icon: GitMerge,
    skills: [{ name: 'Git & GitHub' }, { name: 'Docker' }, { name: 'Vercel' }, { name: 'Webpack' }],
  },
  {
    title: 'Design',
    icon: PenTool,
    skills: [{ name: 'Figma' }, { name: 'Adobe XD' }, { name: 'Canva' }],
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
