import { redis } from "@/lib/redis";
import { getDate } from "@/utils/index";
import { parse } from "date-fns";

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
    if (!opts?.persist) await redis.expire(key, this.retention);
  }

  async retrieveDays(namespace: string, nDays: number) {
    // ReturnType allows us to infer what another function returns!

    type AnalyticsPromise = ReturnType<typeof analytics.retrieve>;
    const promises: AnalyticsPromise[] = [];

    for (let i = 0; i < nDays; i++) {
      const formattedDate = getDate(i);
      const promise = analytics.retrieve(namespace, formattedDate);
      promises.push(promise);
    }

    const fetched = await Promise.all(promises);

    // Sort is an iterator for the current and next element that we have
    const data = fetched.sort((a, b) => {
      if (
        parse(a.date, "dd/MM/yyyy", new Date()) >
        parse(b.date, "dd/MM/yyyy", new Date())
      ) {
        return 1;
      } else {
        return -1;
      }
    });
    return data;
  }

  async retrieve(namespace: string, date: string) {
    const res = await redis.hgetall<Record<string, string>>(
      `analytics::${namespace}::${date}`
    );

    // returning data from out retrieve function

    return {
      date,
      events: Object.entries(res ?? []).map(([key, value]) => ({
        [key]: Number(value),
      })),
    };
  }
}

export const analytics = new Analytics();

// if auto import does not work then restart window using 'ctrl, shift, p'
