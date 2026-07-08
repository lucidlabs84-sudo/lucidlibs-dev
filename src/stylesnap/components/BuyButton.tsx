"use client";

import { useState } from "react";
import BuyModal from "@/stylesnap/components/BuyModal";

interface BuyButtonProps {
  className?: string;
  children: React.ReactNode;
}

export default function BuyButton({ className, children }: BuyButtonProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={className}
      >
        {children}
      </button>
      <BuyModal open={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
