'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send, Github, Linkedin, Mail, MapPin, Clock, Download, ArrowUp } from 'lucide-react';
import { contactSchema, ContactFormData } from '@/lib/schemas/contact';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer, fadeInLeft } from '@/lib/motion-variants';
import SocialButtons from '@/components/ui/dinamic-buttons';

const XIcon = ({ className }: { className?: string }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className={className}
  >
    <title>X</title>
    <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
  </svg>
);

const socialLinks = [
  { icon: Github, href: 'https://github.com/jr4dh3y', label: 'Github' },
  { icon: Linkedin, href: 'https://linkedin.com/in/radheykalra', label: 'LinkedIn' },
  { icon: XIcon as any, href: 'https://x.com/jr4dh3y', label: 'X' },
  { icon: Mail, href: 'mailto:radheykalra901@gmail.com', label: 'Email' },
  { icon: Download, href: 'assets/Radhey_cv.pdf', label: 'Download CV' },
];

const formSchema = contactSchema;

export default function Contact() {
  const { toast } = useToast();
  const [isClosed, setIsClosed] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      hp: '', // honeypot
    },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isClosed && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (isClosed && countdown === 0) {
      const resetTimer = setTimeout(() => {
        setIsClosed(false);
        setCountdown(5);
      }, 500); // Small delay to show "0" or just for smoothness
      return () => clearTimeout(resetTimer);
    }
    return () => clearInterval(timer);
  }, [isClosed, countdown]);

  async function onSubmit(values: ContactFormData) {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Failed to send message');
      }
      toast({
        title: 'Message Sent!',
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      form.reset();
    } catch (err: any) {
      toast({
        title: 'Something went wrong',
        description: err?.message || 'Please try again later.',
        variant: 'destructive',
      });
    }
  }

  return (
    <section id="contact" className="py-20 sm:py-32">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24"
        >
          {/* Left Column: Info & Socials */}
          <motion.div variants={fadeInLeft} className="flex flex-col gap-8 h-full">
            <div>
              <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">
                Get In Touch
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Have a project in mind or just want to say hi? I'm always open to discussing new ideas, tech, or just chatting about the latest in tech.
              </p>
            </div>

            <div className="flex flex-col gap-4 font-mono text-sm text-muted-foreground/80">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Jammu, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-primary" />
                <span>IST (UTC+05:30)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-4 w-4 items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-accent animate-pulse relative">
                    <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75"></div>
                  </div>
                </div>
                <span className="text-accent">System Online / Open to Work or Intern</span>
              </div>
            </div>

            <div className="flex gap-4">
              <SocialButtons links={socialLinks} />
            </div>

            <div className="mt-auto pt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-fit"
              >
                <Button
                  variant="ghost"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="rounded-full hover:bg-primary/10 hover:text-primary pl-4 pr-2 h-10 gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="text-sm font-mono">move to top</span>
                  <ArrowUp className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Terminal Form */}
          <motion.div variants={fadeInUp} className="lg:mt-0 min-h-[500px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {!isClosed ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <div className="overflow-hidden rounded-lg border border-border/60 bg-black shadow-xl w-full">
                    {/* Terminal Header */}
                    <div className="flex items-center gap-2 border-b border-border/40 bg-muted/50 px-4 py-2.5">
                      <div className="flex gap-1.5">
                        <div
                          className="w-2.5 h-2.5 rounded-full bg-red-400/70 cursor-none hover:bg-red-500 hover:scale-150 hover:shadow-[0_0_8px_rgba(239,68,68,0.6)] transition-all duration-200"
                          onClick={() => setIsClosed(true)}
                        />
                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                        <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                      </div>
                      <div className="ml-2 text-xs font-mono text-muted-foreground/50 select-none">
                        user@portfolio: ~/contact
                      </div>
                    </div>

                    {/* Terminal Body */}
                    <div className="p-6">
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                          {/* Honeypot field */}
                          <FormField
                            control={form.control}
                            name="hp"
                            render={({ field }) => (
                              <input
                                {...field}
                                type="text"
                                className="hidden"
                                tabIndex={-1}
                                autoComplete="off"
                                aria-hidden="true"
                              />
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <div className="flex items-center gap-2 font-mono text-sm">
                                  <span className="text-primary">$</span>
                                  <FormLabel className="text-muted-foreground">name:</FormLabel>
                                </div>
                                <FormControl>
                                  <div className="relative flex items-center">
                                    <Input
                                      placeholder="John Doe"
                                      className="border-0 border-b border-muted-foreground/30 bg-transparent py-1 px-0 font-mono text-sm text-foreground shadow-none placeholder:text-muted-foreground/50 focus-visible:border-primary/50 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none rounded-none h-auto transition-colors"
                                      {...field}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage className="font-mono text-xs text-red-400" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <div className="flex items-center gap-2 font-mono text-sm">
                                  <span className="text-primary">$</span>
                                  <FormLabel className="text-muted-foreground">email:</FormLabel>
                                </div>
                                <FormControl>
                                  <div className="relative flex items-center">
                                    <Input
                                      placeholder="john@example.com"
                                      className="border-0 border-b border-muted-foreground/30 bg-transparent py-1 px-0 font-mono text-sm text-foreground shadow-none placeholder:text-muted-foreground/50 focus-visible:border-primary/50 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none rounded-none h-auto transition-colors"
                                      {...field}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage className="font-mono text-xs text-red-400" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <div className="flex items-center gap-2 font-mono text-sm">
                                  <span className="text-primary">$</span>
                                  <FormLabel className="text-muted-foreground">message:</FormLabel>
                                </div>
                                <FormControl>
                                  <div className="relative">
                                    <Textarea
                                      placeholder="Hello world..."
                                      className="min-h-[120px] border-0 border-b border-muted-foreground/30 bg-transparent py-0 px-0 font-mono text-sm text-foreground shadow-none placeholder:text-muted-foreground/50 focus-visible:border-primary/50 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none rounded-none resize-none transition-colors"
                                      {...field}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage className="font-mono text-xs text-red-400" />
                              </FormItem>
                            )}
                          />

                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            <Button
                              type="submit"
                              className="w-full bg-white/5 hover:bg-white/10 text-primary border border-primary/20 hover:text-accent hover:border-accent transition-all duration-300 font-mono text-sm tracking-wide"
                              disabled={form.formState.isSubmitting}
                            >
                              {form.formState.isSubmitting ? (
                                <span className="flex items-center gap-2">
                                  <span className="animate-spin">/</span> sending...
                                </span>
                              ) : (
                                <span className="flex items-center gap-2">
                                  ./send.sh <Send className="ml-1 h-3 w-3" />
                                </span>
                              )}
                            </Button>
                          </motion.div>
                        </form>
                      </Form>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="closed"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full flex flex-col items-center justify-center p-8 text-center rounded-lg border border-border/60 bg-card/50 backdrop-blur-sm min-h-[400px]"
                >
                  <div className="font-mono space-y-4">
                    <div className="text-4xl mb-4">😅</div>
                    <p className="text-muted-foreground text-lg">no easter egg here xD</p>
                    <p className="text-muted-foreground/70">
                      ill open the terminal back again in <span className="text-primary font-bold">{countdown}</span>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div >


      </div >
    </section >
  );
}
