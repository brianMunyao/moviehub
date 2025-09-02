"use client";

import { Heart, HeartOff, Star, StarOff } from "lucide-react";
import Button from "../global/button";
import { useFavoritesStore } from "@/store/use-favorites-store";
import { useRemoveFavorite } from "@/hooks/favorites/use-remove-favorite";
import { useAddFavorite } from "@/hooks/favorites/use-add-favorite";
import { IMediaItem } from "@/types/IMediaItem";

type Props = {
  mediaItem: IMediaItem;
  size?: "icon" | "default";
};

const FavoriteButton = ({ mediaItem, size = "default" }: Props) => {
  const isFavorite = useFavoritesStore((s) => s.isFavorite(mediaItem.id, mediaItem.media_type));

  const { removeFavorite, isLoading: isRemoveLoading } = useRemoveFavorite();
  const { addFavorite, isLoading: isAddLoading } = useAddFavorite();

  const toggleFavorite = async () => {
    if (isFavorite) {
      await removeFavorite(mediaItem.id, mediaItem.media_type);
    } else {
      await addFavorite(mediaItem);
    }
  };

  return (
    <Button
      onClick={toggleFavorite}
      variant="outline"
      loading={isRemoveLoading || isAddLoading}
      size={size}
    >
      <div className="flex items-center gap-3">
        {!(isRemoveLoading || isAddLoading) &&
          (isFavorite ? (
            <Star className="size-4 fill-amber-500 text-amber-500" />
          ) : (
            <Star className="size-4" />
          ))}

        {size !== "icon" && (isFavorite ? "Remove Favorite" : "Add Favorite")}
      </div>
    </Button>
  );
};

export default FavoriteButton;
