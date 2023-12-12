"use client";

import { ListWithCards } from "@/types";
import ListForm from "./ListForm";
import { useEffect, useState } from "react";
import ListItem from "./ListItem";

interface ListContainerProps {
  boardId: string;
  list: ListWithCards[];
}
const ListContainer = ({ boardId, list }: ListContainerProps) => {
  const [orderedList, setOrderedList] = useState(list);

  useEffect(() => {
    setOrderedList(list);
  }, [list]);
  return (
    <div className="pt-24 w-full">
      <ListForm />
      <ol className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {list.map((list) => (
          <ListItem key={list.id} index={list.id} list={list} />
        ))}
        {/* <div className="w-1 flex-shrink-0" /> */}
      </ol>
    </div>
  );
};

export default ListContainer;
