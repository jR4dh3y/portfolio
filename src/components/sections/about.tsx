'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import BinaryBackground from '@/components/common/binary-background';
import { fadeInLeft, fadeInRight, staggerContainer } from '@/lib/motion-variants';

export default function About() {
  return (
    <section id="about" className="relative py-20 sm:py-32 overflow-hidden bg-muted/40">
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
              I'm efficient at leading groups and getting work done, with experience gained through bootcamps, hackathons, and team projects. These opportunities have helped me improve my communication and leadership skills, manage responsibilities under pressure, and deliver results effectively.
            </motion.p>
            <motion.p variants={fadeInLeft} className="mt-4 text-lg text-muted-foreground">
              When I'm not coding, you'll usually find me listening to or creating music. I love breaking it down and sometimes make my own. I also enjoy exploring new tools, research, and open source projects, because for me, tech is all about sharing, learning, and building things that others can use too.
            </motion.p>
          </motion.div>
          <motion.div
            variants={fadeInRight}
            className="order-1 lg:order-2 flex justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.3 }}
              className="relative h-96 w-80"
            >
              <Image
                src="/assets/about.jpg"
                alt=""
                fill
                className="rounded-lg object-cover shadow-lg"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
