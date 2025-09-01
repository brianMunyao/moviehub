"use client";

import React, { useEffect, useState } from "react";
import { useUser, SignOutButton, useAuth } from "@clerk/nextjs";
import { Bookmark, Star, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getInitials } from "@/utils/global/get-initials";

const NavUser = () => {
  const { userId } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    const syncProfile = async (): Promise<void> => {
      if (!user) return;

      try {
        const email = user.primaryEmailAddress?.emailAddress ?? "";
        const avatar_url = user.imageUrl ?? null;

        await fetch("/api/profiles", {
          method: "POST",
          body: JSON.stringify({ user_id: userId, email, avatar_url }),
        });
      } catch (err) {
        console.error("Profile sync failed", err);
      }
    };

    syncProfile();
  }, [userId, user]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-muted">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user?.imageUrl || ""} alt={user?.fullName || "User"} />
            <AvatarFallback className="rounded-lg">
              {getInitials(user?.fullName || user?.primaryEmailAddress?.emailAddress)}
            </AvatarFallback>
          </Avatar>

          <div className="grid flex-1 text-left text-sm leading-tight">
            {user?.fullName && (
              <span className="truncate font-medium">{user?.fullName || "User"}</span>
            )}
            <span className="text-muted-foreground truncate text-xs">
              {user?.primaryEmailAddress?.emailAddress || "--"}
            </span>
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={4} className="min-w-56 rounded-lg">
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-3 py-2 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user?.imageUrl || ""} alt={user?.fullName || "User"} />
              <AvatarFallback className="rounded-lg">
                {getInitials(user?.fullName || user?.primaryEmailAddress?.emailAddress)}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              {user?.fullName && (
                <span className="truncate font-medium">{user?.fullName || "User"}</span>
              )}
              <span className="text-muted-foreground truncate text-xs">
                {user?.primaryEmailAddress?.emailAddress || "--"}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Bookmark className="mr-2 h-4 w-4" /> Watchlist
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Star className="mr-2 h-4 w-4" /> Favorites
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <SignOutButton>
            <div className="flex items-center">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </div>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavUser;
