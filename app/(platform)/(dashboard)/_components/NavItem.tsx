import { AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Layout } from "lucide-react";
import Image from "next/image";

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
  const routes = [
    {
      label: "Boards",
      icon: <Layout className="w-4 h-4" />,
      href: `/organization/${organization.id}`,
    },
  ];
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
    </AccordionItem>
  );
};

export default NavItem;
