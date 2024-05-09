"use client";

import { analytics } from "@/utils/analytics";
import { BarChart, Card } from "@tremor/react";
import React from "react";
import ReactCountryFlag from "react-country-flag";

type AnalyticsDashboardProps = {
  avgVisitorsPerDay: string;
  visitorAmountToday: number;
  timeSeriesPageViews: Awaited<ReturnType<typeof analytics.retrieveDays>>;
  topCountries: [string, number][];
};

const AnalyticsDashboard = ({
  avgVisitorsPerDay,
  visitorAmountToday,
  timeSeriesPageViews,
  topCountries,
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

      <Card className="flex flex-col sm:grid grid-cols-4 gap-6">
        <h2 className="w-full text-dark-tremor-content-strong text-center sm:left-left font-semibold text-xl">
          This weeks top visitors:
        </h2>
        <div className="col-span-3 flex items-center justify-between flex-wrap gap-8">
          {topCountries?.map(([countryCode, number]) => {
            return (
              <div
                key=""
                className="text-dark-tremor-content-strong flex items-center gap-3"
              >
                <p className="hidden sm:block text-tremor-content">
                  {countryCode}
                </p>
                <ReactCountryFlag
                  className="text-5xl sm:text-3xl"
                  svg
                  countryCode={countryCode}
                />
                <p className="text-tremor-content sm:text-dark-tremor-content-strong">
                  {number}
                </p>
              </div>
            );
          })}
        </div>
      </Card>

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
