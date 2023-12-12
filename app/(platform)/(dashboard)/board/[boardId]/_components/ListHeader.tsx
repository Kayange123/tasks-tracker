import { List } from "@prisma/client";

interface ListHeaderProps {
  title: string;
}

const ListHeader = ({ title }: ListHeaderProps) => {
  return (
    <div className="flex px-3 gap-x-2 pt-2 justify-between items-start text-sm font-semibold">
      <p className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent">
        {title}
      </p>
    </div>
  );
};

export default ListHeader;
