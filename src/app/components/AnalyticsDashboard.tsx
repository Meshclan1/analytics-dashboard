"use client";

import { analytics } from "@/utils/analytics";
import { BarChart, Card } from "@tremor/react";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import React from "react";
import ReactCountryFlag from "react-country-flag";

type AnalyticsDashboardProps = {
  avgVisitorsPerDay: string;
  visitorAmountToday: number;
  timeSeriesPageViews: Awaited<ReturnType<typeof analytics.retrieveDays>>;
  topCountries: [string, number][];
};

const Badge = ({ percentage }: { percentage: number }) => {
  const isPositive = percentage > 0;
  const isNeutral = percentage === 0;
  const isNegative = percentage < 0;

  if (isNaN(percentage)) return null;

  const positiveClassname = "bg-green-900/25 text-green-400 ring-green-400/25";
  const neutralClassname = "bg-zinc-900/25 text-zinc-400 ring-zinc-400/25";
  const NegativeClassname = "bg-red-900/25 text-red-400 ring-red-400/25";

  return (
    <span
      className={`inline-flex gap-1 items-center rounded-md px-2 py-1 text-sx font-medium ring-1 ring-inset ${
        isPositive
          ? positiveClassname
          : isNeutral
          ? neutralClassname
          : NegativeClassname
      }`}
    >
      {isPositive ? <ArrowUpRight className="h-3 w-3" /> : null}
      {isNeutral ? <ArrowRight className="h-3 w-3" /> : null}
      {isNegative ? <ArrowDownRight className="h-3 w-3" /> : null}
      {percentage.toFixed(0)}%
    </span>
  );
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
          <p className="flex gap-2.5 items-center text-tremor-default text-dark-tremor-content">
            Visitors Today
            <Badge
              percentage={
                (visitorAmountToday / Number(avgVisitorsPerDay) - 1) * 100
              }
            />
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
