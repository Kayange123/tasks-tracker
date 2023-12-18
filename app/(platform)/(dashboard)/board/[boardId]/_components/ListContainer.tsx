"use client";

import { ListWithCards } from "@/types";
import ListForm from "./ListForm";
import { useEffect, useState } from "react";
import ListItem from "./ListItem";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

interface ListContainerProps {
  boardId: string;
  list: ListWithCards[];
}
const ListContainer = ({ boardId, list }: ListContainerProps) => {
  const [orderedList, setOrderedList] = useState(list);

  useEffect(() => {
    setOrderedList(list);
  }, [list]);

  //Reorder the items
  function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      source.index === destination.index
    )
      return;

    //When dragging a list
    if (type === "list") {
      const items = reorder(orderedList, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );

      setOrderedList(items);
    }

    if (type === "card") {
      let newOrderedData = [...orderedList];

      //Get source index
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );
      const destinationList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destinationList) return;

      if (!destinationList.cards) {
        destinationList.cards = [];
      }
      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );

        reorderedCards.forEach((card, index) => {
          card.order = index;
        });

        sourceList.cards = reorderedCards;
        setOrderedList(newOrderedData);
      }
    }
  };
  return (
    <div className="pt-24 w-full">
      <ListForm />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="lists" type="list" direction="horizontal">
          {(provided) => (
            <ol
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {list.map((list, index) => (
                <ListItem key={list.id} index={index} list={list} />
              ))}
              {provided.placeholder}
            </ol>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ListContainer;
