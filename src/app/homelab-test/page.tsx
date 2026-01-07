'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Variation imports
import HomelabCombined from '@/components/homelab-variants/combined';
import HomelabProse from '@/components/homelab-variants/prose';
import HomelabTerminal from '@/components/homelab-variants/terminal';
import HomelabGrid from '@/components/homelab-variants/grid';
import HomelabStats from '@/components/homelab-variants/stats';

const variants = [
    { id: 'combined', name: 'Prose + Terminal', component: HomelabCombined },
    { id: 'prose', name: 'Minimal Prose', component: HomelabProse },
    { id: 'terminal', name: 'Terminal Style', component: HomelabTerminal },
    { id: 'grid', name: 'Compact Grid', component: HomelabGrid },
    { id: 'stats', name: 'Stat Blocks', component: HomelabStats },
];

export default function HomelabTestPage() {
    const [activeVariant, setActiveVariant] = useState('combined');

    const ActiveComponent = variants.find((v) => v.id === activeVariant)?.component || HomelabProse;

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Navigation */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
                <div className="container py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            ← Back to Portfolio
                        </Link>
                        <h1 className="font-headline text-lg font-semibold">Homelab Section Variants</h1>
                        <div className="w-24" /> {/* Spacer */}
                    </div>
                </div>
            </div>

            {/* Variant Selector */}
            <div className="pt-24 pb-8">
                <div className="container">
                    <div className="flex flex-wrap justify-center gap-2">
                        {variants.map((variant) => (
                            <button
                                key={variant.id}
                                onClick={() => setActiveVariant(variant.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeVariant === variant.id
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                {variant.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Preview Area */}
            <motion.div
                key={activeVariant}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <ActiveComponent />
            </motion.div>

            {/* Info */}
            <div className="container py-12">
                <p className="text-center text-sm text-muted-foreground">
                    This is a preview page. Once you pick a variant, it will be integrated between Experience and Projects.
                </p>
            </div>
        </div>
    );
}
