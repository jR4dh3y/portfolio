'use client';

import { Badge } from '@/components/ui/badge';
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
        period: 'July 2025 - Present',
        description: '',
        skills: ['GCP', 'TypeScript', 'Linux', 'Docker']
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
                                <TimelineDescription className="mb-4 text-base leading-relaxed">
                                    {exp.description}
                                </TimelineDescription>
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
