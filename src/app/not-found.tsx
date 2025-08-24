"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/global/button";
import NavBar from "@/components/global/navbar";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <NavBar />
      <h1 className="mb-2 text-4xl font-bold text-gray-900">404</h1>
      <p className="mb-6 text-lg text-gray-600">
        Oops! The page you are looking for doesn&apos;t exist.
      </p>
      <Button onClick={() => router.push("/")} className="rounded-lg px-6 py-2">
        Go back to Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
