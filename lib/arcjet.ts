import arcjet, {
  ArcjetRateLimitReason,
  detectBot,
  request,
  tokenBucket,
} from "@arcjet/next";

export interface IAJLibProps {
  tokenRefillRate?: number;
  tokenInterval?: string;
  tokenMaxCapacity?: number;
  requested?: number;
  config: {
    userId: string;
  };
}

function getAJ() {
  return arcjet({
    key: process.env.ARCJET_KEY as string,
    rules: [
      detectBot({
        mode: "LIVE",
        allow: ["CATEGORY:SEARCH_ENGINE", "CURL", "CATEGORY:PREVIEW"],
      }),
    ],
  });
}

export async function ajlib({
  tokenRefillRate = 1,
  tokenInterval = "30s",
  tokenMaxCapacity = 12,
  requested = 1,
  config,
}: IAJLibProps) {
  const req = await request();

  //TODO: do a ai token based rule
  const aj = getAJ().withRule(
    tokenBucket({
      mode: "LIVE",
      refillRate: tokenRefillRate,
      interval: tokenInterval,
      capacity: tokenMaxCapacity,
      characteristics: ["userId"],
    })
  );

  const decision = await aj.protect(req, { requested, userId: config.userId });

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      throw decision.reason;
    }
  }
  if (decision.isAllowed()) {
    const rateLimitReason = decision.results[0].reason as ArcjetRateLimitReason;

    return {
      maxToken: rateLimitReason.max,
      remaining: rateLimitReason.remaining,
    };
  }
}
