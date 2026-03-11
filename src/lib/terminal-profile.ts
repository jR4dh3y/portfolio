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
const WIDTH = 120; // total outer frame width
const INNER = WIDTH - 4; // usable content between  │_  and  _│
const BOX_W = 55; // width of each info box
const GAP = 4; // gap between left and right columns
const INDENT = " "; // left indent for box grid inside frame

// ── Styling helpers ─────────────────────────────
const color = (value: string, ...styles: string[]) =>
  `${styles.join("")}${value}${ANSI.reset}`;

const dim = (value: string) => color(value, ANSI.brightBlack);
const white = (value: string) => color(value, ANSI.brightWhite, ANSI.bold);
const green = (value: string) => color(value, ANSI.brightGreen, ANSI.bold);

const stripAnsi = (value: string) => value.replace(/\x1b\[[0-9;]*m/g, "");
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

// ── Outer frame primitives ──────────────────────
const F = ANSI.cyan; // frame accent color

const wrap = (content: string): string =>
  `${color("│", F)} ${padRight(content, INNER)} ${color("│", F)}`;

const empty = (): string => wrap("");

const separator = (): string =>
  color(`├${"─".repeat(WIDTH - 2)}┤`, F);

const buildTitleBar = (): string => {
  const dots =
    `${color("●", ANSI.red)} ${color("●", ANSI.yellow)} ${color("●", ANSI.green)}`;
  const title = color("radhey@portfolio: ~", ANSI.brightWhite, ANSI.bold);
  // visible widths: ╭───(4) + space(1) + ●_●_●(5) + space(1) + ───(3) + space(1)
  //               + radhey@portfolio:_~(20) + space(1) + fill + ╮(1) = 37 fixed
  const fill = WIDTH - 37;
  return (
    color("╭─── ", F) +
    dots +
    color(" ─── ", F) +
    title +
    " " +
    color("─".repeat(fill) + "╮", F)
  );
};

const bottomBar = (): string =>
  color(`╰${"─".repeat(WIDTH - 2)}╯`, F);

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

const createBox = (
  title: string,
  contentLines: string[],
  width: number = BOX_W,
  borderColor = ANSI.brightBlack,
) => {
  const bs = [borderColor];
  const ts = [borderColor, ANSI.bold];

  const topFill = width - visibleLength(title) - 5;
  const top = color(
    `╭─ ${color(title, ...ts)} ${"─".repeat(Math.max(0, topFill))}╮`,
    ...bs,
  );
  const bottom = color(`╰${"─".repeat(width - 2)}╯`, ...bs);

  const body = ["", ...contentLines, ""].map((line) => {
    const padded = padRight(line, width - 4);
    return `${color("│", ...bs)} ${padded} ${color("│", ...bs)}`;
  });

  return [top, ...body, bottom];
};

const bullet = (text: string, accent = ANSI.cyan) =>
  `  ${color("●", accent, ANSI.bold)} ${text}`;

const kv = (key: string, value: string, keyColor = ANSI.cyan) =>
  `  ${color(key.padEnd(12, " "), keyColor, ANSI.bold)} ${value}`;

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
const whatIDo = createBox(
  "WHAT I DO",
  [
    bullet(
      "Build full-stack apps with React, Next.js, Svelte",
      ANSI.brightGreen,
    ),
    bullet(
      "Work on ML, audio processing with Python, PyTorch",
      ANSI.brightGreen,
    ),
    bullet(
      "Run Linux servers, self-host, and homelab infra",
      ANSI.brightGreen,
    ),
    bullet(
      "Use Docker, AWS, GCP, CI/CD, K8s, Terraform",
      ANSI.brightGreen,
    ),
  ],
  BOX_W,
  ANSI.brightBlack,
);

const stack = createBox(
  "STACK",
  [
    kv("Langs", "Python · TS · C/C++ · SQL · Go · Lua"),
    kv("Front", "React · Next.js · Svelte · Tailwind"),
    kv("Back", "Node · Express · GraphQL · Postgres"),
    kv("AI/ML", "PyTorch · TensorFlow · Transformers"),
    kv("Ops", "Linux · Docker · AWS · GCP · CI/CD"),
  ],
  BOX_W,
  ANSI.brightBlack,
);

const highlights = createBox(
  "HIGHLIGHTS & SIDE QUESTS",
  [
    bullet(
      `${green("Cloud Lead")} @ GDGoC MIET Jammu`,
      ANSI.brightYellow,
    ),
    bullet(
      `${green("Cloud & DevOps Lead")} @ AWS Cloud Club`,
      ANSI.brightYellow,
    ),
    "",
    bullet("Music, audio breakdowns, sound design", ANSI.brightMagenta),
    bullet(
      "Open source rabbit holes & tool hoarding",
      ANSI.brightMagenta,
    ),
    bullet("Breaking things, rebuilding them better", ANSI.brightMagenta),
  ],
  BOX_W,
  ANSI.brightBlack,
);

const findMe = createBox(
  "FIND ME",
  [
    kv("GitHub", color("github.com/jr4dh3y", ANSI.brightBlue)),
    kv("LinkedIn", color("linkedin.com/in/radheykalra", ANSI.brightBlue)),
    kv("X", color("x.com/jr4dh3y", ANSI.brightBlue)),
    kv("Email", color("radheykalra901@gmail.com", ANSI.brightBlue)),
  ],
  BOX_W,
  ANSI.brightBlack,
);

// ── Compose two-column grid ─────────────────────
const topRow = combineBlocks(whatIDo, highlights);
const bottomRow = combineBlocks(stack, findMe);

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
  ...topRow.map((line) => wrap(INDENT + line)),
  empty(),
  ...bottomRow.map((line) => wrap(INDENT + line)),
  empty(),
  separator(),
  wrap(
    centerText(
      `${dim("curl radhey.dev")} ${color("│", ANSI.brightBlack)} ${dim("Made with")} ${color("♥", ANSI.red)} ${dim("and too much caffeine")}`,
      INNER,
    ),
  ),
  bottomBar(),
];

export const terminalProfile = [CLEAR_SCREEN, ...dashboard].join("\n");
