"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/useCardModal";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/types";
import { useQuery } from "@tanstack/react-query";
import ModalHeader from "./ModalHeader";
import Description from "./Description";
import Actions from "./Actions";
import { AuditLog } from "@prisma/client";
import Activity from "./Activity";

const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });
  const { data: cardLogs } = useQuery<AuditLog[]>({
    queryKey: ["card-log", id],
    queryFn: () => fetcher(`/api/cards/${id}/logs`),
  });
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {!cardData ? <ModalHeader.Skeleton /> : <ModalHeader data={cardData} />}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {!cardData ? (
                <Description.Skeleton />
              ) : (
                <Description data={cardData} />
              )}
              {!cardLogs ? <Activity.Skeleton /> : <Activity logs={cardLogs} />}
            </div>
          </div>
          {!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
