"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Activity, CreditCard, Layout, Settings } from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

export type TOrganization = {
  id: string;
  name: string;
  imageUrl: string;
  slug: string;
};

interface NavItemProps {
  isExpanded: boolean;
  isActive: boolean;
  organization: TOrganization;
  onExpand: (id: string) => void;
}
const NavItem = ({
  isActive,
  isExpanded,
  onExpand,
  organization,
}: NavItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const routes = [
    {
      label: "Boards",
      icon: <Layout className="w-4 h-4" />,
      href: `/organization/${organization.id}`,
    },
    {
      label: "Activity",
      icon: <Activity className="w-4 h-4" />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: "Settings",
      icon: <Settings className="w-4 h-4" />,
      href: `/organization/${organization.id}/settings`,
    },
    {
      label: "Billing",
      icon: <CreditCard className="w-4 h-4" />,
      href: `/organization/${organization.id}/billing`,
    },
  ];
  const onClick = (link: string) => {
    router.push(link);
  };

  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          "flex items-center gap-x-2 p-1.5 rounded-md text-start no-underline hover:no-underline text-neutral-700 hover:bg-neutral-500/10",
          isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="w-7 h-7 relative">
            <Image
              src={organization.imageUrl}
              alt="organization image"
              fill
              className="rounded-sm object-cover"
            />
          </div>
          <span className="text-sm font-medium">{organization?.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-neutral-700">
        {routes.map(({ href, label, icon }) => (
          <Button
            key={label}
            size="sm"
            onClick={() => onClick(href)}
            className={cn(
              "w-full font-normal justify-start pl-10 mb-1",
              pathname === href && "bg-sky-500/10 text-sky-700"
            )}
            variant="ghost"
          >
            <p className="w-4 h-4">{icon}</p>
            <span className="ml-2">{label}</span>
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default NavItem;

NavItem.Skeleton = function NavItemSkeleton() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="relative shrink-0 w-10 h-10">
        <Skeleton className="w-full h-full absolute" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
};
