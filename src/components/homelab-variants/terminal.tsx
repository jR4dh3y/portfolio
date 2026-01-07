'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const lines = [
    { prompt: true, text: 'ssh radhey@homelab' },
    { prompt: false, text: 'Welcome to Ubuntu 24.04 LTS' },
    { prompt: false, text: '' },
    { prompt: true, text: 'docker ps --format "table {{.Names}}"' },
    { prompt: false, text: 'NAMES' },
    { prompt: false, text: 'vaultwarden' },
    { prompt: false, text: 'navidrome' },
    { prompt: false, text: 'postgres' },
    { prompt: false, text: 'redis' },
    { prompt: false, text: 'nginx-proxy' },
    { prompt: false, text: 'homepage' },
    { prompt: false, text: 'cloudflared' },
    { prompt: false, text: '' },
    { prompt: true, text: 'uptime' },
    { prompt: false, text: 'up 47 days, 3:22' },
];

export default function HomelabTerminal() {
    const [visibleLines, setVisibleLines] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setVisibleLines((prev) => {
                if (prev >= lines.length) {
                    clearInterval(timer);
                    return prev;
                }
                return prev + 1;
            });
        }, 100);

        return () => clearInterval(timer);
    }, []);

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
                        Ubuntu servers, Docker stacks, Cloudflare Tunnels. I run the machines my software lives on.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="rounded-lg border border-border bg-[#0d0d0d] overflow-hidden shadow-2xl">
                        {/* Terminal Header */}
                        <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border-b border-border/50">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            <span className="ml-3 text-xs text-muted-foreground font-mono">radhey@homelab</span>
                        </div>

                        {/* Terminal Content */}
                        <div className="p-4 font-mono text-sm leading-relaxed min-h-[320px]">
                            {lines.slice(0, visibleLines).map((line, i) => (
                                <div key={i} className="flex">
                                    {line.prompt && (
                                        <span className="text-accent mr-2 select-none">$</span>
                                    )}
                                    <span className={line.prompt ? 'text-foreground' : 'text-muted-foreground'}>
                                        {line.text}
                                    </span>
                                </div>
                            ))}
                            {visibleLines < lines.length && (
                                <span className="inline-block w-2 h-4 bg-accent animate-pulse" />
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
