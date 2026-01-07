'use client';

import { motion } from 'framer-motion';
import { Server, Container, Shield, Database, Music, LayoutDashboard } from 'lucide-react';

const categories = [
    {
        icon: Server,
        title: 'Infrastructure',
        items: ['Ubuntu Server 24.04', 'SSH', 'systemd'],
    },
    {
        icon: Container,
        title: 'Containers',
        items: ['Docker', 'Docker Compose', 'Portainer'],
    },
    {
        icon: Shield,
        title: 'Networking',
        items: ['Cloudflare Tunnels', 'Nginx', 'Traefik'],
    },
    {
        icon: Database,
        title: 'Data',
        items: ['PostgreSQL', 'Redis', 'SQLite'],
    },
    {
        icon: Music,
        title: 'Media',
        items: ['Navidrome', 'Jellyfin', 'Immich'],
    },
    {
        icon: LayoutDashboard,
        title: 'Services',
        items: ['Vaultwarden', 'Homepage', 'Uptime Kuma'],
    },
];

export default function HomelabGrid() {
    return (
        <section className="py-20 sm:py-32 overflow-hidden bg-muted/30">
            <div className="container">
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
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Self-hosted infrastructure running 24/7. I manage the servers my applications depend on.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-4xl mx-auto">
                    {categories.map((category, i) => {
                        const Icon = category.icon;
                        return (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                className="group"
                            >
                                <div className="h-full p-5 rounded-lg border border-muted/60 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <h3 className="font-medium text-sm">{category.title}</h3>
                                    </div>
                                    <ul className="space-y-1">
                                        {category.items.map((item) => (
                                            <li key={item} className="text-xs text-muted-foreground">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
