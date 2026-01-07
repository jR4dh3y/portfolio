'use client';

import { useState, useCallback, useRef, useEffect, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { fadeInLeft, fadeInRight, staggerContainer } from '@/lib/motion-variants';

const technologies = [
    'Ubuntu',
    'Docker',
    'Cloudflare',
    'Nginx',
    'SSH',
];

// Command responses
const commands: Record<string, string[]> = {
    help: [
        'Commands: neofetch, docker ps, clear',
    ],
    'docker ps': [
        'STACK              CONTAINERS  STATUS',
        'homelab-filemgr    3           healthy',
        'vidown             2           healthy',
        'anyconverter       1           healthy',
        'cloudflared        1           running',
        'big-bear-open-webui 1          healthy',
        'convertx           1           running',
        'glance             2           running',
        'jellyfin           1           running',
        'portainer          1           running',
        'qbittorrent        1           running',
        'steam-headless     1           running',
        'swingmusic         1           running',
        'vaultwarden        1           running',
    ],
    neofetch: [
        '                                   pico@pico',
        '                                   ─────────────────────────────',
        '  ██████╗  ██╗ ██████╗  ██████╗    OS        Ubuntu 24.04.3 LTS x86_64',
        '  ██╔══██╗ ██║██╔════╝ ██╔═══██╗   Kernel    6.8.0-90-generic',
        '  ██████╔╝ ██║██║      ██║   ██║   Uptime    8 days, 20 hours',
        '  ██╔═══╝  ██║██║      ██║   ██║   Packages  906 (dpkg)',
        '  ██║      ██║╚██████╗ ╚██████╔╝   CPU       Intel i3-2310M @ 2.1GHz',
        '  ╚═╝      ╚═╝ ╚═════╝  ╚═════╝    Memory    3.87 GiB / 7.69 GiB (50%)',
        '                                   Disk      59G / 218G (29%)',
        '                                   ─────────────────────────────',
    ],
};

interface TerminalLine {
    type: 'input' | 'output';
    content: string;
}

function CustomTerminal() {
    // Initial state shows neofetch + help
    const initialLines: TerminalLine[] = [
        { type: 'input', content: '$ neofetch' },
        ...commands.neofetch.map(line => ({ type: 'output' as const, content: line })),
        { type: 'input', content: '$ help' },
        ...commands.help.map(line => ({ type: 'output' as const, content: line })),
    ];

    const [lines, setLines] = useState<TerminalLine[]>(initialLines);
    const [currentInput, setCurrentInput] = useState('');
    const [isClosed, setIsClosed] = useState(false);
    const [reopenCount, setReopenCount] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [lines]);


    const handleCommand = useCallback((input: string) => {
        const trimmed = input.trim().toLowerCase();

        if (trimmed === 'clear') {
            setLines([]);
            return;
        }

        const response = commands[trimmed];
        const newLines: TerminalLine[] = [
            { type: 'input', content: `$ ${input}` },
        ];

        if (response) {
            response.forEach((line) => {
                newLines.push({ type: 'output', content: line });
            });
        } else if (trimmed.startsWith('cat ')) {
            newLines.push({ type: 'output', content: `cat: ${trimmed.slice(4)}: not found` });
        } else if (trimmed !== '') {
            newLines.push({ type: 'output', content: `command not found: ${trimmed}` });
        }

        setLines((prev) => [...prev, ...newLines]);
    }, []);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCommand(currentInput);
            setCurrentInput('');
        }
    };

    const focusInput = () => {
        inputRef.current?.focus();
    };

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsClosed(true);
        setCurrentInput('');
    };

    const [passwordAttempt, setPasswordAttempt] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [failedAttempt, setFailedAttempt] = useState(false);

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // hey, looks like you know what you're doing here
        // since you made it this far, the password is: admin
        // enjoy the Easter egg :)
        const secretPassword = 'admin';
        if (passwordAttempt.toLowerCase() === secretPassword) {
            setShowSuccess(true);
            setFailedAttempt(false);
            setTimeout(() => {
                setIsClosed(false);
                setShowSuccess(false);
                setPasswordAttempt('');
                setReopenCount(c => c + 1);
            }, 2500);
        } else if (passwordAttempt.length > 0) {
            setFailedAttempt(true);
            setPasswordAttempt('');
        }
    };

    // Easter egg: closed terminal with password game
    if (isClosed) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl rounded-lg border border-border/60 bg-card/50 backdrop-blur-sm p-8 text-center"
                data-hint="hey, looks like you know what you're doing here. the password is: admin. enjoy the easter egg :)"
            >
                {showSuccess ? (
                    <>
                        <div className="text-4xl mb-4">😅</div>
                        <p className="text-muted-foreground">
                            huh looks like i never changed the default password, guess i should do that...
                        </p>
                    </>
                ) : (
                    <>
                        <div className="text-4xl mb-4">🥀</div>
                        <p className="text-muted-foreground mb-4">
                            oops you closed the terminal, erm only one small problem i forgot the password
                            and now you cant ssh into the system back again...
                        </p>
                        <p className="text-muted-foreground mb-6">
                            but if you want to try to guess my password, suit yourself. or maybe inspect things a bit more closely. or just reload the webpage
                        </p>
                        <form onSubmit={handlePasswordSubmit} className="flex gap-2 justify-center" autoComplete="off">
                            <input
                                type="text"
                                value={passwordAttempt}
                                onChange={(e) => { setPasswordAttempt(e.target.value); setFailedAttempt(false); }}
                                placeholder={failedAttempt ? "nope, try again" : ""}
                                autoComplete="off"
                                data-form-type="other"
                                className={`px-4 py-2 rounded-md bg-muted/50 border text-sm font-mono outline-none focus:border-primary/50 [-webkit-text-security:disc] ${failedAttempt ? 'border-red-400/50 placeholder:text-red-400' : 'border-border/60 text-foreground'}`}
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-md bg-primary/20 hover:bg-primary/30 text-primary text-sm transition-colors"
                            >
                                ssh
                            </button>
                        </form>
                    </>
                )}
            </motion.div>
        );
    }

    return (
        <motion.div
            key={`terminal-${reopenCount}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl rounded-lg border border-border/60 bg-black overflow-hidden shadow-xl"
            onClick={focusInput}
        >
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-muted/50 border-b border-border/40">
                <div className="flex gap-1.5">
                    <div
                        className="w-2.5 h-2.5 rounded-full bg-red-400/70 hover:bg-red-500 hover:scale-150 hover:shadow-[0_0_8px_rgba(239,68,68,0.6)] transition-all duration-200"
                        onClick={handleClose}
                    />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                </div>
                <span className="ml-2 text-xs text-muted-foreground font-mono">terminal</span>
            </div>

            {/* Terminal Body */}
            <div
                ref={terminalRef}
                className="p-4 h-96 overflow-y-auto font-mono text-sm custom-scrollbar"
            >
                {lines.map((line, i) => (
                    <div
                        key={i}
                        className={`whitespace-pre leading-relaxed ${line.type === 'input'
                            ? 'text-primary'
                            : 'text-muted-foreground'
                            }`}
                    >
                        {line.content}
                    </div>
                ))}

                {/* Input Line */}
                <div className="flex items-center mt-1">
                    <span className="text-accent mr-2">$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent outline-none text-foreground font-mono caret-accent"
                        spellCheck={false}
                        autoComplete="off"
                    />
                    <span className="w-2 h-4 bg-accent/80 animate-pulse ml-0.5" />
                </div>
            </div>
        </motion.div>
    );
}

export default function HomelabCombined() {
    return (
        <section id="homelab" className="py-20 sm:py-32 overflow-hidden bg-muted/30">
            <div className="container">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2"
                >
                    {/* Left: Prose */}
                    <motion.div variants={fadeInLeft} className="order-2 lg:order-1">
                        <motion.h2
                            variants={fadeInLeft}
                            className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl"
                        >
                            Homelab
                        </motion.h2>
                        <motion.p variants={fadeInLeft} className="mt-6 text-lg text-muted-foreground">
                            I enjoy building and maintaining infrastructure as much as writing applications.
                            I run and maintain my own home server for hosting applications, internal tools,
                            and experiments.
                        </motion.p>
                        <motion.p variants={fadeInLeft} className="mt-4 text-lg text-muted-foreground">
                            I deploy services using Docker, manage secure access through Cloudflare Tunnels,
                            and self-host the tools I use daily. This setup powers dashboards, APIs, databases,
                            and internal utilities, used daily for development and real-world testing.
                        </motion.p>
                        <motion.p variants={fadeInLeft} className="mt-4 text-muted-foreground">
                            Some of my own projects run here:{' '}
                            <a href="https://github.com/jR4dh3y/homelab-filemgr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">FileManager</a>,{' '}
                            <a href="https://github.com/jR4dh3y/vidown" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Vidown</a>, and{' '}
                            <a href="https://github.com/jR4dh3y/anyconverter" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">AnyConverter</a>.{' '}
                            Server configs and docker-compose files are in my{' '}
                            <a href="https://github.com/jR4dh3y/homelabs" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">homelabs</a> repo.
                        </motion.p>

                        <motion.div variants={fadeInLeft} className="flex flex-wrap gap-2 mt-8">
                            {technologies.map((tech, i) => (
                                <motion.div
                                    key={tech}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                                >
                                    <Badge
                                        variant="secondary"
                                        className="text-sm px-3 py-1.5 bg-muted/70 hover:bg-primary/20 transition-colors"
                                    >
                                        {tech}
                                    </Badge>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right: Custom Terminal */}
                    <motion.div
                        variants={fadeInRight}
                        className="order-1 lg:order-2 flex justify-center"
                    >
                        <CustomTerminal />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
