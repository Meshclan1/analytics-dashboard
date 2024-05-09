"use client";

import { analytics } from "@/utils/analytics";
import { BarChart, Card } from "@tremor/react";
import React from "react";

type AnalyticsDashboardProps = {
  avgVisitorsPerDay: string;
  visitorAmountToday: number;
  timeSeriesPageViews: Awaited<ReturnType<typeof analytics.retrieveDays>>;
};

const AnalyticsDashboard = ({
  avgVisitorsPerDay,
  visitorAmountToday,
  timeSeriesPageViews,
}: AnalyticsDashboardProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid w-full mx-auto grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="w-full mx-auto max-w-xs">
          <p className="text-tremor-default text-dark-tremor-content">
            Avg. visitors/day
          </p>
          <p className="text-3xl text-dark-tremor-content-strong font-semibold">
            {avgVisitorsPerDay}
          </p>
        </Card>
        <Card className="w-full mx-auto max-w-xs">
          <p className="text-tremor-default text-dark-tremor-content">
            Visitors Today
          </p>
          <p className="text-3xl text-dark-tremor-content-strong font-semibold">
            {visitorAmountToday}
          </p>
        </Card>
      </div>
      <Card>
        {timeSeriesPageViews ? (
          <BarChart
            allowDecimals={false}
            showAnimation
            data={timeSeriesPageViews.map((day) => ({
              name: day.date,
              Visitors: day.events.reduce((acc, curr) => {
                return acc + Object.values(curr)[0]!;
              }, 0),
            }))}
            index="name"
            categories={["Visitors"]}
          />
        ) : null}
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
