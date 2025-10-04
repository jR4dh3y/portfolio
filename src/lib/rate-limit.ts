const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

type RequestLog = Map<string, number[]>;

const requests: RequestLog = new Map();

export const ratelimit = {
  async limit(identifier: string) {
    const now = Date.now();
    const history = requests.get(identifier) ?? [];

    const recent = history.filter((timestamp) => now - timestamp < WINDOW_MS);
    const success = recent.length < MAX_REQUESTS;

    if (success) {
      recent.push(now);
    }

    if (recent.length > 0) {
      requests.set(identifier, recent);
    } else {
      requests.delete(identifier);
    }

    return {
      success,
      remaining: Math.max(0, MAX_REQUESTS - recent.length),
    };
  },
};
