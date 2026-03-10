const WINDOW_MS = 5 * 60 * 1000;
const MAX_REQUESTS = 12;

type Bucket = {
  count: number;
  resetAt: number;
};

export type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  retryAfter: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

function getClientKey(request: Request): string {
  const cloudflareIp = request.headers.get("cf-connecting-ip")?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  return cloudflareIp || realIp || forwarded || "anonymous";
}

function cleanupBuckets(now: number) {
  if (buckets.size < 300) {
    return;
  }

  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

export function consumeChatRateLimit(request: Request): RateLimitResult {
  const now = Date.now();
  const key = getClientKey(request);

  cleanupBuckets(now);

  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    const freshBucket = {
      count: 1,
      resetAt: now + WINDOW_MS,
    };

    buckets.set(key, freshBucket);

    return {
      allowed: true,
      limit: MAX_REQUESTS,
      remaining: MAX_REQUESTS - 1,
      retryAfter: Math.ceil(WINDOW_MS / 1000),
      resetAt: freshBucket.resetAt,
    };
  }

  if (existing.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      limit: MAX_REQUESTS,
      remaining: 0,
      retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
      resetAt: existing.resetAt,
    };
  }

  existing.count += 1;

  return {
    allowed: true,
    limit: MAX_REQUESTS,
    remaining: Math.max(0, MAX_REQUESTS - existing.count),
    retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    resetAt: existing.resetAt,
  };
}
