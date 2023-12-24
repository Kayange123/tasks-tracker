"use client";

import ProModal from "@/components/modals/ProModal";
import CardModal from "@/components/modals/cardModals";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <>
      <CardModal />
      <ProModal />
    </>
  );
};
