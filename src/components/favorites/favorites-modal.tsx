"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";
import { Star, X } from "lucide-react";
import MovieCard from "../movies/movie-card";
import { useFavorites } from "@/hooks/favorites/use-favorites";
import NotFoundSection from "../global/not-found-section";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onClose: () => void;
};

const FavoritesModal = ({ open, onClose }: Props) => {
  const { favorites } = useFavorites();

  return (
    <Drawer direction="right" open={open} onOpenChange={onClose}>
      <DrawerContent className="w-full min-w-full md:min-w-[450px] bg-background shadow-2xl flex flex-col">
        <DrawerHeader className="flex flex-row items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-400" />
            <DrawerTitle className="text-xl font-bold">Your Favorites</DrawerTitle>
            {favorites.length > 0 && (
              <span className="text-sm text-muted-foreground">({favorites.length})</span>
            )}
          </div>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon" aria-label="Close">
              <X className="w-5 h-5" />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-4">
          {favorites.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <NotFoundSection
                Icon={Star}
                title="No Favorites Yet"
                description="Save movies or shows to your favorites and find them here anytime."
              />
            </div>
          ) : (
            <div
              className="grid gap-4
                         grid-cols-2"
            >
              {favorites.map((item) => (
                <div key={`${item.media_type}-${item.id}`} className="h-72">
                  <MovieCard item={item} flex />
                </div>
              ))}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FavoritesModal;
