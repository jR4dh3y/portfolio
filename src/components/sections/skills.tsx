'use client';

import { Code, Bot, Server, Database, PenTool, GitMerge,type LucideIcon, BrainCircuit, Shell, PcCase, GitBranch, GitGraph, GitGraphIcon, Github, Computer, Cloud } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { fadeInUp, scaleIn, staggerContainer } from '@/lib/motion-variants';

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
      { name: 'SQL' },
      { name: 'Bash' },
      { name: 'QML' },
    ],
  },
  {
    title: 'Frontend & Mobile',
    icon: PenTool,
    skills: [
      { name: 'React/Next.js' },
      { name: 'React Native' },
      { name: 'Expo' },
      { name: 'Svelte' },
      { name: 'Tailwind CSS' },
    ],
  },
  {
    title: 'AI/ML',
    icon: BrainCircuit,
    skills: [
      { name: 'Diffusion' },
      { name: 'U-Net' },
      { name: 'PyTorch' },
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
    icon: Github,
    skills: [
      { name: 'Git & GitHub' },
      { name: 'Docker' },
      { name: 'CI/CD' },
      { name: 'Vercel' },
    ],
  },
  {
    title: 'Systems & OS',
    icon: Computer,
    skills: [
      { name: 'Linux' },
      { name: 'Bash' },
      { name: 'systemd' },
      { name: 'Networking' },
    ],
  },
  {
    title: 'Cloud & Infrastructure',
    icon: Cloud,
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
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center"
        >
          <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">Technical Skills</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A look at the technologies, languages, and tools I work with.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={fadeInUp}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 30px -10px rgba(167, 139, 250, 0.3)",
                transition: { duration: 0.3 }
              }}
            >
              <Card className="hover:border-primary transition-colors h-full">
                <CardHeader className="flex flex-row items-center gap-4">
                  <motion.div
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <category.icon className="h-8 w-8 text-primary" />
                  </motion.div>
                  <CardTitle className="font-headline text-2xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.li
                        key={skill.name}
                        variants={scaleIn}
                        whileHover={{ scale: 1.05 }}
                        className="rounded-md bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground cursor-default"
                      >
                        {skill.name}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
