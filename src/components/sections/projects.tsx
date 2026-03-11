"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useRef, useEffect } from "react";
import { ArrowUpRight, GithubIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion-variants";

const projects = [
  // ── Page 1: Flagship Projects (first 4) ──
  {
    title: "UNet Audio Filter",
    desc: "Research project on audio enhancement using a custom U-Net-inspired architecture with an end-to-end training pipeline for denoising and source separation.",
    image:
      "https://raw.githubusercontent.com/jR4dh3y/unet-audiofilter/refs/heads/master/presentation/audio_comparison.png",
    tags: ["Python", "PyTorch", "U-Net", "Streamlit", "Audio DSP", "ML"],
    githubUrl: "https://github.com/jR4dh3y/unet-audiofilter",
    buttonTheme: "dark" as const,
  },
  {
    title: "Homelab File Manager",
    desc: "Fast, lightweight file manager for Linux servers with multi-mount browsing, chunked transfers, and real-time updates. Supports live media preview, streaming, downloads, and Monaco Editor integration for in-browser file editing.",
    image: "/assets/files.png",
    tags: ["SvelteKit", "Go", "Docker", "WebSocket", "Monaco Editor"],
    githubUrl: "https://github.com/jR4dh3y/homelab-filemgr",
    liveUrl: "https://files.jr4.in/test",
  },
  {
    title: "Pico32",
    desc: "Custom ESP32 wireless security firmware built around a serial TUI interface. Implements WiFi reconnaissance, packet capture, protocol-level attacks, and BLE device enumeration; all optimized to run on bare ESP32 dev boards.",
    image: "https://raw.githubusercontent.com/jR4dh3y/Pico32/master/assets/ss.png",
    tags: ["ESP32", "C++", "PlatformIO", "IoT", "Firmware", "WiFi", "BLE"],
    liveUrl: "https://pico32.radhey.dev",
    githubUrl: "https://github.com/jR4dh3y/Pico32",
  },
  {
    title: "Niri Dotfiles",
    desc: "Reproducible NiriWM rice with automation setup; a single-command bootstrapper that provisions packages, symlinks configs, copies assets, and enables desktop services on Arch Linux.",
    image: "/assets/dots-niri.png",
    tags: ["Niri", "Wayland", "Arch Linux", "Shell", "Ricing", "Unix-Porn"],
    githubUrl: "https://github.com/jR4dh3y/dots-niri",
  },

  // ── Page 2+: Other Projects (9 per page) ──
  {
    title: "WallpyGui",
    desc: "Wallpaper manager for Wayland compositors with support for Video as Wallpaper.",
    image: "/assets/wall.png",
    tags: ["Linux", "GTK", "Wayland", "Python"],
    githubUrl: "https://github.com/jR4dh3y/wallpygui",
  },
  {
    title: "iwd-applet",
    desc: "Lightweight system tray applet for iwd (iNet wireless daemon) with a menu-driven UX.",
    image: "/assets/iwd-applet.png",
    tags: ["Python", "GTK", "Linux", "iwd"],
    githubUrl: "https://github.com/jR4dh3y/iwd-applet",
  },
  {
    title: "Terminal Doom",
    desc: "Doom styled game that runs in terminal using ncurses library.",
    image: "/assets/doom.png",
    tags: ["C++", "ncurses", "cmake", "Game Dev"],
    githubUrl: "https://github.com/jR4dh3y/doom-in-terminal",
  },
  {
    title: "Community Leaderboard",
    desc: "Community management dashboard with user profiles, event tracking, points system, leaderboards, and admin controls",
    image: "/assets/dash.png",
    tags: ["React", "Node.js", "Express", "ConvexDB", "Clerk Auth"],
    liveUrl: "https://dash.radhey.dev/",
    githubUrl: "https://github.com/jR4dh3y/unidash",
  },
  {
    title: "Hotel Booking",
    desc: "Full-stack booking app with auth & admin panel written in Svelte & Node.js, uses MySQL database.",
    image:
      "https://raw.githubusercontent.com/jR4dh3y/hotel-booking/refs/heads/main/ss/landing.png",
    tags: ["Svelte", "Node.js", "Express", "MySQL"],
    githubUrl: "https://github.com/jR4dh3y/hotel-booking",
  },
  {
    title: "vidown",
    desc: "Self-hosted video downloader supporting 1000+ sites with a beautiful SvelteKit UI.",
    image: "/assets/vidown.png",
    tags: ["SvelteKit", "Docker", "Python", "shadcn-svelte"],
    githubUrl: "https://github.com/jR4dh3y/vidown",
  },
  {
    title: "TL;DR AI",
    desc: "Summarize WhatsApp Groups Chats using AI. Uses your openrouter API key to process data(you can you free models).",
    image: "https://github.com/jR4dh3y/tldr-desktop/raw/master/img/ss.png",
    tags: ["React", "Electron", "TypeScript", "OpenRouter"],
    githubUrl: "https://github.com/jR4dh3y/tldr-desktop",
  },
  {
    title: "Tenant Manager",
    desc: "A mobile app to manage tenant and log their electricity usages.",
    image: "https://github.com/jR4dh3y/tennet-manager/raw/master/photo.png",
    tags: ["React Native", "Expo", "TypeScript"],
    githubUrl: "https://github.com/jR4dh3y/tennet-manager",
  },
  {
    title: "HowTo",
    desc: "Minimal technical tutorials and guides site built with Astro and Tailwind CSS.",
    image: "/assets/howto.png",
    tags: ["Astro", "Tailwind CSS", "TypeScript", "Guides"],
    githubUrl: "https://github.com/jR4dh3y/howTo",
    liveUrl: "https://howto.jr4.in",
  },
  // {
  //   title: "Sean Market",
  //   desc: "CS2 skin price tracker and marketplace platform with real-time data fetching.",
  //   image: "/assets/seanmarket.png",
  //   tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  //   githubUrl: "https://github.com/jR4dh3y/seanmarket",
  //   liveUrl: "https://skins.radhey.dev",
  // },
];

// ── Pagination logic ──
const FLAGSHIP_COUNT = 4;
const PER_PAGE = 9;

interface ProjectType {
  title: string;
  desc: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  buttonTheme?: "dark" | "light";
}

function paginateProjects(allProjects: ProjectType[]) {
  const pages: { projects: ProjectType[]; isFlagship: boolean }[] = [];

  // Page 0: flagship (first 4)
  pages.push({
    projects: allProjects.slice(0, FLAGSHIP_COUNT),
    isFlagship: true,
  });

  // Remaining projects chunked into pages of 9
  const remaining = allProjects.slice(FLAGSHIP_COUNT);
  for (let i = 0; i < remaining.length; i += PER_PAGE) {
    pages.push({
      projects: remaining.slice(i, i + PER_PAGE),
      isFlagship: false,
    });
  }

  return pages;
}

// ── Slide direction variants ──
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

// ── Flagship Project Card (premium layout) ──
function FlagshipCard({ project }: { project: ProjectType }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative"
    >
      <div
        className="relative rounded-xl border border-muted/60 bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/40 flex flex-col"
        style={{ height: "calc((11rem * 3 + 0.75rem) / 2)" }}
      >
        {/* Image preview — always visible */}
        <div className="relative w-full flex-[3] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
          {/* Gradient fade to content area */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

          {/* Floating action buttons */}
          {(() => {
            const isDark = project.buttonTheme === "dark";
            return (
              <div className="absolute top-3 right-3 flex gap-2 z-20">
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium backdrop-blur-sm hover:bg-primary transition-colors shadow-lg"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    Live
                  </Link>
                )}
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm transition-colors shadow-lg ${
                    isDark
                      ? "bg-black/20 text-black hover:bg-black/30"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  Source
                </Link>
              </div>
            );
          })()}
        </div>

        {/* Content area */}
        <div className="relative flex-[2] p-4 flex flex-col justify-between z-10">
          <div>
            <h3 className="font-headline text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-200">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-3">
              {project.desc}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-[11px] px-2 py-0.5 h-5 bg-muted/70 group-hover:bg-primary/10 group-hover:text-primary transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Accent glow on hover */}
        <motion.div
          className="absolute -bottom-px left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{
            opacity: hovered ? 1 : 0,
            scaleX: hovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

// ── Regular Project Card ──
function ProjectCard({ project }: { project: ProjectType }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative"
    >
      <div
        className="relative h-44 rounded-lg border border-muted/60 bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/40"
      >
        {/* Background image on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="relative h-full p-5 flex flex-col justify-between z-10">
          {/* Top: Title + Links */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-headline text-lg font-semibold leading-tight group-hover:text-primary transition-colors duration-200">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1.5">
                {project.desc}
              </p>
            </div>
            <div className="flex gap-1 shrink-0">
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  className="p-2 rounded-md hover:bg-accent/20 text-muted-foreground hover:text-accent transition-colors"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              )}
              <Link
                href={project.githubUrl}
                target="_blank"
                className="p-2 rounded-md hover:bg-accent/20 text-muted-foreground hover:text-accent transition-colors"
              >
                <GithubIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Bottom: Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs px-2.5 py-1 h-6 bg-muted/70 group-hover:bg-white/10 transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Accent glow on hover */}
        <motion.div
          className="absolute -bottom-px left-3 right-3 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{
            opacity: hovered ? 1 : 0,
            scaleX: hovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

// ── Main Projects Component ──
export default function Projects() {
  const pages = paginateProjects(projects);
  const [[currentPage, direction], setPage] = useState([0, 0]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Swipe handling
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const paginate = useCallback(
    (newDirection: number) => {
      const nextPage = currentPage + newDirection;
      if (nextPage >= 0 && nextPage < pages.length) {
        setPage([nextPage, newDirection]);
      }
    },
    [currentPage, pages.length]
  );

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        paginate(1); // swipe left → next page
      } else {
        paginate(-1); // swipe right → prev page
      }
    }
  }, [paginate]);

  const currentPageData = pages[currentPage];

  // Fixed height so pagination never shifts:
  // 3 rows × h-44 (11rem) + 2 gaps (0.75rem each) + pagination area (3.5rem) = ~38rem

  return (
    <div className="w-full">
      {/* Fixed-height wrapper — pagination is pinned at the bottom */}
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{ height: "calc(11rem * 3 + 0.75rem * 2 + 3.5rem)" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Grid content — top-aligned */}
        <div>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <motion.div
                className={`grid gap-3 ${
                  currentPageData.isFlagship
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                }`}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {currentPageData.projects.map((project, i) =>
                  currentPageData.isFlagship ? (
                    <FlagshipCard
                      key={project.title}
                      project={project}
                    />
                  ) : (
                    <ProjectCard
                      key={project.title}
                      project={project}
                    />
                  )
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation absolutely pinned at bottom */}
        {pages.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-4 pb-1">
            {/* Left arrow */}
            <button
              onClick={() => paginate(-1)}
              disabled={currentPage === 0}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {pages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage([i, i > currentPage ? 1 : -1])}
                  className="relative p-1"
                  aria-label={`Go to page ${i + 1}`}
                >
                  <motion.div
                    className="rounded-full"
                    animate={{
                      width: currentPage === i ? 24 : 8,
                      height: 8,
                      backgroundColor:
                        currentPage === i
                          ? "hsl(var(--primary))"
                          : "hsl(var(--muted-foreground) / 0.3)",
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </button>
              ))}
            </div>

            {/* Right arrow */}
            <button
              onClick={() => paginate(1)}
              disabled={currentPage === pages.length - 1}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
