"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface LikeDislikeButtonProps {
  initialLikes: number;
  initialDislikes: number;
}

export function LikeDislikeButton({ initialLikes, initialDislikes }: LikeDislikeButtonProps) {
  const [likeState, setLikeState] = useState<'like' | 'dislike' | null>(null);
  const [currentLikes, setCurrentLikes] = useState(initialLikes);
  const [currentDislikes, setCurrentDislikes] = useState(initialDislikes);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (likeState === 'like') {
      // Unlike
      setLikeState(null);
      setCurrentLikes(currentLikes - 1);
    } else {
      // Like (and remove dislike if active)
      if (likeState === 'dislike') {
        setCurrentDislikes(currentDislikes - 1);
      }
      setLikeState('like');
      setCurrentLikes(likeState === 'dislike' ? currentLikes + 1 : currentLikes + 1);
    }
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (likeState === 'dislike') {
      // Un-dislike
      setLikeState(null);
      setCurrentDislikes(currentDislikes - 1);
    } else {
      // Dislike (and remove like if active)
      if (likeState === 'like') {
        setCurrentLikes(currentLikes - 1);
      }
      setLikeState('dislike');
      setCurrentDislikes(likeState === 'like' ? currentDislikes + 1 : currentDislikes + 1);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2 hover:bg-green-50"
        onClick={handleLike}
      >
        <ThumbsUp
          className={`h-5 w-5 ${likeState === 'like' ? 'fill-green-600 text-green-600' : 'text-muted-foreground'}`}
        />
        <span className={`text-xl font-semibold ${likeState === 'like' ? 'text-green-600' : 'text-muted-foreground'}`}>
          {currentLikes}
        </span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2 hover:bg-red-50"
        onClick={handleDislike}
      >
        <ThumbsDown
          className={`h-5 w-5 ${likeState === 'dislike' ? 'fill-red-600 text-red-600' : 'text-muted-foreground'}`}
        />
        <span className={`text-xl font-semibold ${likeState === 'dislike' ? 'text-red-600' : 'text-muted-foreground'}`}>
          {currentDislikes}
        </span>
      </Button>
    </div>
  );
}
