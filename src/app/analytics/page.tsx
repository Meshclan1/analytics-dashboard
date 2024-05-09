import React from "react";
import { analytics } from "@/utils/analytics";
import AnalyticsDashboard from "../components/AnalyticsDashboard";
import { getDate } from "@/utils/index";

const Page = async () => {
  // all caps indicates that this is a fixed value
  const TRACKING_DAYS = 7;

  const pageviews = await analytics.retrieveDays("pageview", TRACKING_DAYS);

  // we go into each day, then go into each event
  const totalPageViews = pageviews.reduce((acc, curr) => {
    return (
      acc +
      curr.events.reduce((acc, curr) => {
        return acc + Object.values(curr)[0]!;
      }, 0)
    );
  }, 0);

  const avgVisitorsPerDay = (totalPageViews / TRACKING_DAYS).toFixed(1);

  const visitorAmountToday = pageviews
    .filter((ev) => ev.date === getDate())
    .reduce((acc, curr) => {
      return (
        acc +
        curr.events.reduce((acc, curr) => acc + Object.values(curr)[0]!, 0)
      );
    }, 0);

  return (
    <div className="min-h-screen w-full py-12 flex justify-center items-center">
      <div className="relative w-full max-w-6xl mx-auto text-white">
        <AnalyticsDashboard
          avgVisitorsPerDay={avgVisitorsPerDay}
          visitorAmountToday={visitorAmountToday}
        />
      </div>
    </div>
  );
};

export default Page;
