interface ActivityProps {
  logs: AuditLog[];
}

import ActivityItem from "@/components/ActivityItem";
import { Skeleton } from "@/components/ui/skeleton";
import { AuditLog } from "@prisma/client";
import { ActivityIcon } from "lucide-react";

const Activity = ({ logs }: ActivityProps) => {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <ActivityIcon className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold mb-2 text-neutral-700">Activity</p>
        <ol className="mt-2 space-y-4">
          {logs.map((log) => (
            <ActivityItem key={log.id} log={log} />
          ))}
        </ol>
      </div>
    </div>
  );
};

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="w-6 h-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-10 bg-neutral-200" />
      </div>
    </div>
  );
};

export default Activity;
