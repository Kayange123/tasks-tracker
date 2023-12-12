import { ListWithCards } from "@/types";
import ListForm from "./ListForm";

interface ListContainerProps {
  boardId: string;
  list: ListWithCards[];
}
const ListContainer = ({ boardId, list }: ListContainerProps) => {
  return (
    <div>
      <ol>
        <ListForm />
        <div className="w-1 flex-shrink-0" />
      </ol>
    </div>
  );
};

export default ListContainer;
