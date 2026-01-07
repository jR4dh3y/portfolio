'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Projects from './projects';
import Skills from './skills';

export default function WorkSection() {
    const [activeTab, setActiveTab] = useState<'projects' | 'skills'>('projects');

    return (
        <section id="work" className="py-20 sm:py-32 overflow-hidden">
            <div className="container">
                <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">
                        My Work & Skills
                    </h2>

                    <div className="relative flex w-fit items-center rounded-full bg-muted p-1.5">
                        <button
                            onClick={() => setActiveTab('projects')}
                            className={`relative z-10 rounded-full px-6 py-2 text-sm font-medium transition-colors duration-300 ${activeTab === 'projects' ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            Projects
                            {activeTab === 'projects' && (
                                <div
                                    className="absolute inset-0 -z-10 rounded-full bg-primary"
                                />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('skills')}
                            className={`relative z-10 rounded-full px-6 py-2 text-sm font-medium transition-colors duration-300 ${activeTab === 'skills' ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            Skills
                            {activeTab === 'skills' && (
                                <div
                                    className="absolute inset-0 -z-10 rounded-full bg-primary"
                                />
                            )}
                        </button>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === 'projects' ? <Projects /> : <Skills />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
