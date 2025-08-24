"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthenticateWithRedirectCallback, useAuth, useUser } from "@clerk/nextjs";

const SSOCallback = () => {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const syncProfile = async () => {
      if (!isLoaded || !userId || !user) return;

      try {
        const email = user.primaryEmailAddress?.emailAddress ?? "";
        const avatar_url = user.imageUrl ?? null;

        await fetch("/api/profiles", {
          method: "POST",
          body: JSON.stringify({ user_id: userId, email, avatar_url }),
        });

        router.replace("/");
      } catch (err) {
        console.error("Profile sync failed", err);
        router.replace("/");
      }
    };

    syncProfile();
  }, [isLoaded, userId, user, router]);

  return <AuthenticateWithRedirectCallback />;
};

export default SSOCallback;
