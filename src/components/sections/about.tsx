'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import BinaryBackground from '@/components/common/binary-background';
import { fadeInLeft, fadeInRight, staggerContainer } from '@/lib/motion-variants';

export default function About() {
  const [isInteracting, setIsInteracting] = useState(false);

  return (
    <section id="about" className="relative py-20 sm:py-32 bg-muted/40">
      {/* <div className="absolute inset-0 -z-10 opacity-40">
        <BinaryBackground />
      </div> */}
      <div className="container relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2"
        >
          <motion.div variants={fadeInLeft} className="order-2 lg:order-1">
            <motion.h2
              variants={fadeInLeft}
              className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl"
            >
              About Me
            </motion.h2>
            <motion.p variants={fadeInLeft} className="mt-6 text-lg text-muted-foreground">
              I'm a Computer Science Engineering student who loves messing around with tech, open source, and building cool stuff. I'm always curious about how things work and end up learning best by experimenting and trying new projects.
            </motion.p>
            <motion.p variants={fadeInLeft} className="mt-4 text-lg text-muted-foreground">
              I'm efficient at leading groups, with experience gained through bootcamps, hackathons, and team projects. These opportunities have helped me improve my communication and leadership skills, manage responsibilities under pressure, and deliver results.
            </motion.p>
            <motion.p variants={fadeInLeft} className="mt-4 text-lg text-muted-foreground">
              When I'm not coding, you'll usually find me listening to or creating music. I love breaking it down and sometimes make my own. I also enjoy exploring new tools, research, and open source projects.
            </motion.p>
          </motion.div>
          <motion.div
            variants={fadeInRight}
            className="order-1 lg:order-2 flex justify-center"
          >
            <motion.div
              initial="idle"
              whileHover="hover"
              onHoverEnd={() => setIsInteracting(false)}
              className="relative h-96 w-80"
            >
              <motion.div
                variants={{
                  idle: { x: 0, opacity: 0 },
                  hover: { x: '110%', opacity: 1 }
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 z-0 flex items-center justify-center rounded-lg bg-background shadow-xl"
              >
                <iframe
                  style={{ borderRadius: '12px' }}
                  src="https://open.spotify.com/embed/playlist/7d8zl8UGKsGmGLzzOm7t1r?utm_source=generator&theme=0"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="h-full w-full"
                ></iframe>
                {!isInteracting && (
                  <div
                    className="absolute inset-0 z-10 cursor-pointer"
                    onClick={() => setIsInteracting(true)}
                  />
                )}
              </motion.div>
              <motion.div
                variants={{
                  idle: { scale: 1 },
                  hover: { scale: 1.05 }
                }}
                transition={{ duration: 0.3 }}
                className="relative h-full w-full"
              >
                <Image
                  src="/assets/about.jpg"
                  alt=""
                  fill
                  className="rounded-lg object-cover shadow-lg z-10"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
