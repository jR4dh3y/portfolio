'use client';

import { motion } from 'framer-motion';
import ExperienceList from './experience-list';

export default function Experience() {
    return (
        <section id="experience" className="py-20 sm:py-32 overflow-hidden">
            <div className="container">
                <div className="mb-12">
                    <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">
                        Experience
                    </h2>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <ExperienceList />
                </motion.div>
            </div>
        </section>
    );
}
