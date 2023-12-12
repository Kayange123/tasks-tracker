"use client";

import { ListWithCards } from "@/types";
import ListHeader from "./ListHeader";
import { ElementRef, useRef, useState } from "react";
import { title } from "process";

interface ListItemProps {
  index: string;
  list: ListWithCards;
}

const ListItem = ({ index, list }: ListItemProps) => {
  const [listTitle, setListTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const enableEditng = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };
  return (
    <div className="shrink-0 h-full max-w-xs select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader title={list.title} />
      </div>
    </div>
  );
};

export default ListItem;
