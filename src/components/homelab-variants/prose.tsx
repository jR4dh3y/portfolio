'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const technologies = [
    'Ubuntu Server',
    'Docker',
    'Docker Compose',
    'Cloudflare Tunnels',
    'Nginx',
    'SSH',
    'Traefik',
];

export default function HomelabProse() {
    return (
        <section className="py-20 sm:py-32 overflow-hidden bg-muted/30">
            <div className="container">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-8"
                    >
                        <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">
                            Homelab
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="space-y-6"
                    >
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            I run the servers my software lives on. Multiple Ubuntu machines handle
                            everything from media streaming and password management to databases and
                            internal dashboards—all containerized with Docker Compose, exposed through
                            Cloudflare Tunnels, and proxied via Nginx. SSH is my daily driver.
                            Infrastructure isn't a side interest; it's part of how I ship.
                        </p>

                        <div className="flex flex-wrap justify-center gap-2 pt-4">
                            {technologies.map((tech, i) => (
                                <motion.div
                                    key={tech}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                                >
                                    <Badge
                                        variant="secondary"
                                        className="text-sm px-3 py-1.5 bg-muted/70 hover:bg-primary/20 transition-colors"
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
