"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({ className, width = 93, height = 46 }: LogoProps) {
  return (
    <div className={cn("inline-flex items-center justify-center", className)}>
      <Image
        src="/WiseTeamLogo.png"
        alt="WiseTeam Logo"
        width={width}
        height={height}
        priority
        className="object-contain"
        style={{ display: "inline", verticalAlign: "middle" }}
      />
    </div>
  );
}
