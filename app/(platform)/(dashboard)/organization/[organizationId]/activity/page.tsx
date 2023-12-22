import React, { Suspense } from "react";
import Info from "../_components/Info";
import { Separator } from "@/components/ui/separator";
import ActivityList from "./_components/ActivityList";

const ActivityPage = () => {
  return (
    <div className="w-full">
      <Info />
      <Separator className="mt-4" />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  );
};

export default ActivityPage;
