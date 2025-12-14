"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import Navbar from "./Navbar";

// Client-only shell to lazy-load heavy visual/audio components
const FallingSnow = dynamic(() => import("./FallingSnow"), {
  ssr: false,
  loading: () => null,
});
const AnimatedSanta = dynamic(() => import("./AnimatedSanta"), {
  ssr: false,
  loading: () => null,
});
const SantaWithCart = dynamic(() => import("./SantaWithCart"), {
  ssr: false,
  loading: () => null,
});
const GlobalProgressGlass = dynamic(
  () => import("../Progress/GlobalProgressGlass"),
  { ssr: false, loading: () => null }
);
const MusicPlayer = dynamic(() => import("../Music/MusicPlayer"), {
  ssr: false,
  loading: () => null,
});

type Props = {
  children: ReactNode;
};

export default function ClientShell({ children }: Props) {
  return (
    <>
      <FallingSnow />
      <AnimatedSanta />
      <SantaWithCart />
      <GlobalProgressGlass />
      <MusicPlayer />
      <Navbar />
      <main className="relative z-10">{children}</main>
    </>
  );
}
