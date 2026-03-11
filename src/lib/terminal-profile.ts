const ANSI = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  italic: "\x1b[3m",

  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",

  brightBlack: "\x1b[90m",
  brightRed: "\x1b[91m",
  brightGreen: "\x1b[92m",
  brightYellow: "\x1b[93m",
  brightBlue: "\x1b[94m",
  brightMagenta: "\x1b[95m",
  brightCyan: "\x1b[96m",
  brightWhite: "\x1b[97m",
};

const ESC = "\x1b";
const CLEAR_SCREEN = `${ESC}[2J${ESC}[H`;

// ── Layout constants ────────────────────────────
const WIDTH = 120;
const INNER = WIDTH - 4; // usable space between │_ and _│
const BOX_W = 55;
const GAP = 4;
const FULL_BOX_W = BOX_W + GAP + BOX_W; // 114 – same as the two-column row
const INDENT = " ";

// ── Styling helpers ─────────────────────────────
const color = (value: string, ...styles: string[]) =>
  `${styles.join("")}${value}${ANSI.reset}`;

const dim = (value: string) => color(value, ANSI.brightBlack);
const white = (value: string) => color(value, ANSI.brightWhite, ANSI.bold);
const green = (value: string) => color(value, ANSI.brightGreen, ANSI.bold);

// Strip both SGR (colors) and OSC 8 (hyperlinks) for width math
const stripAnsi = (value: string) =>
  value.replace(/\x1b\][^\x07]*\x07/g, "").replace(/\x1b\[[0-9;]*m/g, "");

const visibleLength = (value: string) => stripAnsi(value).length;

const padRight = (value: string, width: number) => {
  const diff = width - visibleLength(value);
  return diff > 0 ? value + " ".repeat(diff) : value;
};

const centerText = (value: string, width: number) => {
  const diff = width - visibleLength(value);
  if (diff <= 0) return value;
  const left = Math.floor(diff / 2);
  return " ".repeat(left) + value + " ".repeat(diff - left);
};

// OSC 8 clickable hyperlink (supported by most modern terminals)
const link = (url: string, label: string, ...styles: string[]) =>
  `\x1b]8;;${url}\x07${styles.join("")}${label}${ANSI.reset}\x1b]8;;\x07`;

// ── Outer frame primitives ──────────────────────
const F = ANSI.cyan;

const wrap = (content: string): string =>
  `${color("│", F)} ${padRight(content, INNER)} ${color("│", F)}`;

const empty = (): string => wrap("");

const separator = (): string => color(`├${"─".repeat(WIDTH - 2)}┤`, F);

const buildTitleBar = (): string => {
  const dots = `${color("●", ANSI.red)} ${color("●", ANSI.yellow)} ${color("●", ANSI.green)}`;
  const titleText = "radhey@portfolio: ~";
  const title = color(titleText, ANSI.brightWhite, ANSI.bold);
  // ╭─── (5) + ● ● ● (5) + ─── (5) + title + ─…─╮ (fill+1) = WIDTH
  // fixed = 5 + 5 + 5 + titleText.length + 1(space) + 1(╮) = 17 + titleText.length
  const fill = WIDTH - 17 - titleText.length;
  return (
    color("╭─── ", F) +
    dots +
    color(" ─── ", F) +
    title +
    " " +
    color("─".repeat(fill) + "╮", F)
  );
};

const bottomBar = (): string => color(`╰${"─".repeat(WIDTH - 2)}╯`, F);

// ── Content builders ────────────────────────────
const combineBlocks = (
  leftBlock: string[],
  rightBlock: string[],
  gap: number = GAP,
) => {
  const maxHeight = Math.max(leftBlock.length, rightBlock.length);
  const leftWidth = Math.max(...leftBlock.map(visibleLength), 0);
  const rightWidth = Math.max(...rightBlock.map(visibleLength), 0);
  const output: string[] = [];

  for (let i = 0; i < maxHeight; i++) {
    const left = padRight(leftBlock[i] || "", leftWidth);
    const right = padRight(rightBlock[i] || "", rightWidth);
    output.push(`${left}${" ".repeat(gap)}${right}`);
  }
  return output;
};

// Fixed: builds the top border without nesting color() so ANSI reset
// from the title doesn't eat the trailing border characters.
const createBox = (
  title: string,
  contentLines: string[],
  width: number = BOX_W,
  borderColor = ANSI.brightBlack,
) => {
  const topFill = width - visibleLength(title) - 5;
  const top =
    `${borderColor}╭─ ${borderColor}${ANSI.bold}${title}${ANSI.reset}` +
    `${borderColor} ${"─".repeat(Math.max(0, topFill))}╮${ANSI.reset}`;
  const bottom = color(`╰${"─".repeat(width - 2)}╯`, borderColor);

  const body = ["", ...contentLines, ""].map((line) => {
    const padded = padRight(line, width - 4);
    return `${color("│", borderColor)} ${padded} ${color("│", borderColor)}`;
  });

  return [top, ...body, bottom];
};

const bullet = (text: string, accent = ANSI.cyan) =>
  `  ${color("●", accent, ANSI.bold)} ${text}`;

const kv = (key: string, value: string, keyColor = ANSI.cyan) =>
  `  ${color(key.padEnd(10, " "), keyColor, ANSI.bold)} ${value}`;

// ── ASCII art hero ──────────────────────────────
const hero = [
  "  ____           _ _                  _  __     _           ",
  " |  _ \\ __ _  __| | |__   ___ _   _  | |/ /__ _| |_ __ __ _ ",
  " | |_) / _` |/ _` | '_ \\ / _ \\ | | | | ' // _` | | '__/ _` |",
  " |  _ < (_| | (_| | | | |  __/ |_| | | . \\ (_| | | | | (_| |",
  " |_| \\_\\__,_|\\__,_|_| |_|\\___|\\__, | |_|\\_\\__,_|_|_|  \\__,_|",
  "                              |___/                         ",
].map((line) => color(line, ANSI.cyan, ANSI.bold));

// ── Section boxes ───────────────────────────────

// Left column: STACK (mirrors skills.tsx categories, minus Systems & OS)
const stack = createBox(
  "STACK",
  [
    kv("Langs", "Python · TS · C/C++ · Go · Rust · SQL"),
    kv("Ui", "Next.js · Svelte · Astro, Tailwind"),
    kv("DB", "Postgres · MySQL · ConvexDB"),
    kv("AI/ML", "PyTorch · TF · Transformers · sklearn"),
    kv("DevOps", "Git · Docker · CMake · CI/CD"),
    kv("Cloud", "AWS · GCP · K8s · Terraform"),
    kv("More", "Bun · Vercel · Cloudflare · LaTeX "),
  ],
  BOX_W,
  ANSI.brightBlack,
);

// Right column: HIGHLIGHTS & SIDE QUESTS
const highlights = createBox(
  "HIGHLIGHTS & SIDE QUESTS",
  [
    bullet(`${green("Cloud Lead")} @ GDGoC MIET Jammu`, ANSI.brightYellow),
    bullet(
      `${green("Cloud & DevOps Lead")} @ AWS Cloud Club`,
      ANSI.brightYellow,
    ),
    "",
    bullet("Music, audio breakdowns, sound design", ANSI.brightMagenta),
    bullet("Open source rabbit holes & tool hoarding", ANSI.brightMagenta),
    bullet("Breaking things, rebuilding them better", ANSI.brightMagenta),
  ],
  BOX_W,
  ANSI.brightBlack,
);

// Full-width row: FIND ME — with clickable OSC 8 hyperlinks
const findMe = createBox(
  "FIND ME",
  [
    kv(
      "GitHub",
      link(
        "https://github.com/jr4dh3y",
        "https://github.com/jr4dh3y",
        ANSI.brightBlue,
      ),
    ),
    kv(
      "LinkedIn",
      link(
        "https://linkedin.com/in/radheykalra",
        "https://linkedin.com/in/radheykalra",
        ANSI.brightBlue,
      ),
    ),
    kv(
      "X",
      link("https://x.com/jr4dh3y", "https://x.com/jr4dh3y", ANSI.brightBlue),
    ),
    kv(
      "Email",
      link(
        "mailto:radheykalra901@gmail.com",
        "radheykalra901@gmail.com",
        ANSI.brightBlue,
      ),
    ),
  ],
  FULL_BOX_W,
  ANSI.brightBlack,
);

// ── Compose grid ────────────────────────────────
const row = combineBlocks(stack, highlights);

// ── Assemble dashboard ──────────────────────────
const dashboard: string[] = [
  buildTitleBar(),
  empty(),
  ...hero.map((line) => wrap(centerText(line, INNER))),
  empty(),
  wrap(
    centerText(
      `${color(">", ANSI.brightGreen, ANSI.bold)} ${white("whoami")}`,
      INNER,
    ),
  ),
  wrap(
    centerText(
      `CS Undergrad ${dim("·")} Full-stack builder ${dim("·")} ML/audio tinkerer ${dim("·")} Linux/homelab enjoyer`,
      INNER,
    ),
  ),
  empty(),
  separator(),
  empty(),
  ...row.map((line) => wrap(INDENT + line)),
  empty(),
  ...findMe.map((line) => wrap(INDENT + line)),
  empty(),
  bottomBar(),

  // wrap(
  //   centerText(
  //     `${dim("curl radhey.dev")} ${color("│", ANSI.brightBlack)} ${dim("Made with")} ${color("♥", ANSI.red)} ${dim("and too much caffeine")}`,
  //     INNER,
  //   ),
  // ),
];

export const terminalProfile = [CLEAR_SCREEN, ...dashboard].join("\n");
