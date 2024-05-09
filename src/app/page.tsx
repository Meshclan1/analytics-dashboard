import { Button } from "@tremor/react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Button>
        <Link href="/analytics" className="text-white">
          Click Here: Enter the Analytics Page
        </Link>
      </Button>
    </div>
  );
}
