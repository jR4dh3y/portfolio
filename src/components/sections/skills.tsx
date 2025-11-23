'use client';

import { Code, Bot, Server, Database, PenTool, GitMerge, type LucideIcon, BrainCircuit, Shell, PcCase, GitBranch, GitGraph, GitGraphIcon, Github, Computer, Cloud } from 'lucide-react';
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
      { name: 'QML' },
    ],
  },
  {
    title: 'AI/ML',
    icon: BrainCircuit,
    skills: [
      { name: 'PyTorch' },
      { name: 'TensorFlow' },
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
    title: 'DevOps & Cloud Infrastructure',
    icon: Cloud,
    skills: [
      { name: 'Git' },
      { name: 'Docker' },
      { name: 'CI/CD' },
      { name: 'Vercel' },
      { name: 'AWS' },
      { name: 'GCP' },
      { name: 'Kubernetes' },
      { name: 'Terraform' },
    ],
  },
  {
    title: 'Systems & OS',
    icon: Computer,
    skills: [
      { name: 'Linux' },
      { name: 'Windows' },
      { name: 'Bash' },
      { name: 'systemd' },
      { name: 'Networking' },
    ],
  },
];

export default function Skills() {
  return (
    <div className="w-full">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="text-center mb-16"
      >
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
          A look at the technologies, languages, and tools I work with.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            variants={fadeInUp}
            whileHover={{
              y: -5,
              cursor: "none",
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
                      whileHover={{ scale: 1.05, cursor: "none" }}
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
  );
}
