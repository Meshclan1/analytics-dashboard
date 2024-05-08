import React from "react";
import { analytics } from "@/utils/analytics";

const Page = async () => {
  const pageview = await analytics.retrieveDays("pageview", 2);

  return <pre>{JSON.stringify(pageview)}</pre>;
};

export default Page;
