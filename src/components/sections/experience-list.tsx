'use client';

import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/motion-variants';
import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineHeader,
    TimelineTitle,
    TimelineIcon,
    TimelineDescription,
    TimelineContent,
    TimelineTime
} from '@/components/ui/timeline';

const experiences = [
    {
        company: 'GDGoC (Google Developer Groups on Campus) MIET Jammu',
        role: 'Cloud Lead',
        period: 'Aug 2025 - Present',
        description: `Led cloud learning initiatives by organizing hands-on workshops focused on Google Cloud technologies.
Built and maintained a tutorial website hosting video walkthroughs of Google Cloud Study Jam labs along with detailed notes to help students complete skill badges.`,
        skills: ['GCP', 'TypeScript', 'Linux', 'Docker', 'Terraform'],
        links: [
            { label: 'Tutorial Website', href: 'https://gcp-tutorial.vercel.app' },
            { label: 'Github Repository', href: 'https://github.com/gdgoc-miet/gcp-tutorial-ui' }
        ]
    }
];

export default function ExperienceList() {
    return (
        <div className="w-full pr-4 overflow-y-auto custom-scrollbar max-h-[600px]">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                <Timeline className="ml-2">
                    {experiences.map((exp, index) => (
                        <TimelineItem key={index}>
                            {index !== experiences.length - 1 && <TimelineConnector />}
                            <TimelineHeader>
                                <TimelineIcon />
                                <div className="flex flex-col gap-1">
                                    <TimelineTitle className="text-lg">{exp.role}</TimelineTitle>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span className="font-medium text-foreground">{exp.company}</span>
                                        <span>•</span>
                                        <span>{exp.period}</span>
                                    </div>
                                </div>
                            </TimelineHeader>
                            <TimelineContent>
                                <TimelineDescription className="mb-4 text-base leading-relaxed whitespace-pre-line">
                                    {exp.description}
                                </TimelineDescription>
                                {exp.links && exp.links.length > 0 && (
                                    <div className="flex flex-wrap gap-4 mb-4">
                                        {exp.links.map((link, i) => (
                                            <a
                                                key={i}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                {link.label}
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </a>
                                        ))}
                                    </div>
                                )}
                                <div className="flex flex-wrap gap-2">
                                    {exp.skills.map(skill => (
                                        <Badge key={skill} variant="secondary" className="text-xs font-normal">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </TimelineContent>
                        </TimelineItem>
                    ))}
                </Timeline>
            </motion.div>
        </div>
    );
}
