"use client";

import { stripeRedirect } from "@/actions/stripe-redirect/action";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useActions";
import { useProModal } from "@/hooks/useProModal";
import toast from "react-hot-toast";

interface SubscriptionButtonProps {
  isPro: boolean;
}

const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
  const proModal = useProModal();
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = () => {
    if (isPro) {
      execute({});
    } else {
      proModal.onOpen();
    }
  };
  return (
    <Button onClick={onClick} variant="primary">
      {isPro ? "Manage subscription" : "Upgrade to Pro"}
    </Button>
  );
};

export default SubscriptionButton;
