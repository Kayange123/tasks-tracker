import { AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import React from "react";

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
  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn("flex items-center gap-x-2 p-1.5 rounded-md text-start no-underline hover:no-underline text-neutral-700 hover:bg-neutral-500/10",isActive && !isExpanded && "bg-sky-500/10 text-sky-700")}
      >
        
      </AccordionTrigger>
    </AccordionItem>
  );
};

export default NavItem;
