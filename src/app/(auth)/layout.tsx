"use client";

import Image from "next/image";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<object>;

const posters = [
  "/example-poster.jpg",
  "/example-poster.jpg",
  "/example-poster.jpg",
  "/example-poster.jpg",
  "/example-poster.jpg",
  "/example-poster.jpg",
  "/example-poster.jpg",
  "/example-poster.jpg",
];

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col md:flex-row h-screen max-h-screen">
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6 sm:p-8 bg-white">
        <div className="w-full max-w-sm sm:max-w-md">{children}</div>
      </div>

      <div className="hidden md:flex w-1/2 bg-gray-50 overflow-hidden relative">
        <div className="absolute inset-0 animate-scroll">
          <div className="grid grid-cols-2 gap-4 p-6">
            {posters.map((src, idx) => (
              <div key={idx} className="relative aspect-[2/3] rounded-xl shadow-md overflow-hidden">
                <Image src={src} alt={`Poster ${idx + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
