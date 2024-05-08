import { redis } from "@/lib/redis";
import { getDate } from "@/utils/index";

type AnalyticsArgs = {
  retention?: number;
};

type TrackOptions = {
  persist?: boolean;
};

export class Analytics {
  private retention: number = 60 * 60 + 24 * 7;

  constructor(opts?: AnalyticsArgs) {
    if (opts?.retention) this.retention = opts.retention;
  }

  // namespace just denotes the name of the event name e.g. pageview, contact-me
  // hincrby = # increment by

  async track(namespace: string, event: object = {}, opts?: TrackOptions) {
    // db call to persist this event
    // key = tablename

    let key = `analytics::${namespace}`;

    if (!opts?.persist) {
      key += `::${getDate()}`;
    }

    await redis.hincrby(key, JSON.stringify(event), 1);
  }
}

export const analytics = new Analytics({ retention: 3600 });

// if auto import does not work then restart window using 'ctrl, shift, p'
