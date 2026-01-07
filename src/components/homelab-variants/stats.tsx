'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const stats = [
    { value: '3', label: 'Servers' },
    { value: '12+', label: 'Containers' },
    { value: '99.9%', label: 'Uptime' },
    { value: '2+', label: 'Years Running' },
];

const stack = [
    'Ubuntu',
    'Docker',
    'Cloudflare',
    'Nginx',
    'PostgreSQL',
    'Redis',
];

export default function HomelabStats() {
    return (
        <section className="py-20 sm:py-32 overflow-hidden bg-muted/30">
            <div className="container">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">
                            Homelab
                        </h2>
                    </motion.div>

                    {/* Stats Row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
                    >
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                                className="text-center p-6 rounded-lg border border-muted/60 bg-card/50 backdrop-blur-sm"
                            >
                                <div className="font-headline text-3xl font-bold text-primary mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-center"
                    >
                        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                            Password managers, music streaming, databases, dashboards—all self-hosted,
                            containerized, and tunneled through Cloudflare. I manage the infrastructure
                            my software runs on.
                        </p>

                        <div className="flex flex-wrap justify-center gap-2">
                            {stack.map((tech, i) => (
                                <motion.div
                                    key={tech}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                                >
                                    <Badge
                                        variant="outline"
                                        className="text-xs px-3 py-1.5 border-primary/30 text-muted-foreground hover:border-primary/60 transition-colors"
                                    >
                                        {tech}
                                    </Badge>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
