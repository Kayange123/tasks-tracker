"use client";

import { createList } from "@/actions/update-board/action";
import FormInput from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useActions";
import { useRouter } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import toast from "react-hot-toast";

interface BoardTitleFormProps {
  id: string;
  title: string;
}

const BoardTitleForm = ({ title, id }: BoardTitleFormProps) => {
  const router = useRouter();
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formTitle, setFormTitle] = useState(title);

  const { execute } = useAction(createList, {
    onSuccess(data) {
      toast.success(`Board "${title}" updated`);
      router.refresh();
      setFormTitle(title);
      disableEditing();
    },
    onError(error) {
      toast.error("Error updating board");
    },
  });
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef?.current?.focus();
      inputRef?.current?.select();
    });
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({
      title,
      id,
    });
  };
  const disableEditing = () => {
    setIsEditing(false);
  };

  const onBlur = () => {
    formRef?.current?.requestSubmit();
  };
  return isEditing ? (
    <form action={onSubmit} ref={formRef} className="flex items-center gap-x-2">
      <FormInput
        ref={inputRef}
        className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent"
        id="title"
        onBlur={onBlur}
        defaultValue={formTitle}
      />
    </form>
  ) : (
    <Button
      onClick={enableEditing}
      variant="transparent"
      className="font-bold h-auto w-auto text-lg p-1 px-2"
    >
      {formTitle}
    </Button>
  );
};

export default BoardTitleForm;
