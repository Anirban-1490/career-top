import arcjet, { detectBot, request, shield, tokenBucket } from "@arcjet/next";

const aj = arcjet({
  key: process.env.ARCJET_KEY as string,
  rules: [
    tokenBucket({
      mode: "LIVE",
      refillRate: 1,
      interval: 30,
      capacity: 12,
    }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE", "CURL", "CATEGORY:PREVIEW"],
    }),
  ],
});

export async function ajlib() {
  const req = await request();

  const decision = await aj.protect(req, { requested: 1 });
  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      throw new Error("Too many requests");
    }
  }
}
