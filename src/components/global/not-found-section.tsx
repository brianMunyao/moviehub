"use client";

import React, { useEffect, useRef } from "react";
import { FileWarning } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";

import { IconType } from "@/types/IconType";
import { Button } from "@/components/ui/button";

type Props = {
  Icon?: IconType;
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

const NotFoundSection = ({
  Icon = FileWarning,
  title = "Not Found",
  description,
  ctaLabel,
  ctaHref,
}: Props) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { autoAlpha: 0, scale: 0.95 },
        { autoAlpha: 1, scale: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      role="region"
      aria-label={title}
      className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4"
    >
      <Icon className="w-12 h-12 text-muted-foreground" />

      <h2 className="text-2xl font-bold text-foreground">{title}</h2>

      {description && (
        <p className="max-w-md text-muted-foreground text-sm sm:text-base">{description}</p>
      )}

      {ctaLabel && ctaHref && (
        <Button asChild>
          <Link href={ctaHref}>{ctaLabel}</Link>
        </Button>
      )}
    </section>
  );
};

export default NotFoundSection;
