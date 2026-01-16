"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Check } from "lucide-react";

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="bg-white/90 hover:bg-white"
      onClick={handleShare}
    >
      {copied ? (
        <>
          <Check className="mr-2 h-4 w-4 text-green-600" />
          <span className="text-green-600">복사됨!</span>
        </>
      ) : (
        <>
          <Share2 className="mr-2 h-4 w-4" />
          공유하기
        </>
      )}
    </Button>
  );
}
