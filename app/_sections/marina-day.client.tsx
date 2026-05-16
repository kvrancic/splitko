"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ease, sectionViewport } from "@/lib/motion";

export default function MarinaSceneIn({ children }: { children: ReactNode }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={sectionViewport}
      transition={{ duration: 0.75, ease: ease.outQuart }}
      className="list-none"
    >
      {children}
    </motion.li>
  );
}
