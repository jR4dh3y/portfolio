'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Award } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/motion-variants';

const certificates = [
    {
        title: 'Google Cloud Digital Leader',
        issuer: 'Google Cloud',
        date: '2025',
        description: 'Foundational knowledge of cloud concepts and Google Cloud products.',
        url: '#',
        tags: ['Cloud', 'GCP']
    },
    {
        title: 'Meta Frontend Developer',
        issuer: 'Coursera',
        date: '2023',
        description: 'Professional certificate covering React, JavaScript, and UI/UX principles.',
        url: '#',
        tags: ['React', 'Frontend']
    },
    {
        title: 'AWS Certified Practitioner',
        issuer: 'Amazon Web Services',
        date: '2022',
        description: 'Overall understanding of the AWS Cloud platform.',
        url: '#',
        tags: ['AWS', 'Cloud']
    },
];

export default function Certificates() {
    return (
        <div className="h-full w-full pr-4 overflow-y-auto custom-scrollbar">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 gap-4"
            >
                {certificates.map((cert, index) => (
                    <motion.div key={index} variants={fadeInUp}>
                        <Card className="group hover:border-primary/50 transition-colors duration-300">
                            <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-full bg-primary/10 text-primary mt-1">
                                        <Award className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                            {cert.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-1">
                                            {cert.issuer} • {cert.date}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {cert.tags?.map((tag) => (
                                                <Badge key={tag} variant="secondary" className="text-xs font-normal">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" asChild className="shrink-0">
                                    <Link href={cert.url} target="_blank">
                                        <ExternalLink className="h-5 w-5" />
                                        <span className="sr-only">View Certificate</span>
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
