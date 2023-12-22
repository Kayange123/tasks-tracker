import { AuditLog } from "@prisma/client";
import { Avatar, AvatarImage } from "./ui/avatar";
import { generateLogMessage } from "@/lib/generateLogMessage";
import { format } from "date-fns";

interface ActivityItemProps {
  log: AuditLog;
}

const ActivityItem = ({ log }: ActivityItemProps) => {
  return (
    <li className="flex items-center gap-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={log?.userImage} />
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold lowercase text-neutral-700">
            {log?.userName}
          </span>
          {generateLogMessage(log)}
        </p>
        <p className="text-xs text-muted-foreground">
          {format(new Date(log.createdAt), "MMM dd, yyyy 'at' H:mm")}
        </p>
      </div>
    </li>
  );
};

export default ActivityItem;
