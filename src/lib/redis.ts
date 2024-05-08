import { Redis } from "@upstash/redis";

// to access '.env' variables always use "process.env"
// the '!' tells typescript that we are sure that the token exists because we just defined it

export const redis = new Redis({
  url: "https://eu1-renewing-whippet-39855.upstash.io",
  token: process.env.REDIS_KEY!,
});
