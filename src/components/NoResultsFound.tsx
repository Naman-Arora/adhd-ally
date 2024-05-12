"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { AlertTriangle, Search } from "lucide-react";

type Props = {
  showSearchIcon?: boolean;
};

export default function NoResultsFound({ showSearchIcon = true }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ type: "just", delay: 0, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="grid place-items-center gap-2 py-10"
    >
      <AlertTriangle className="h-24 w-24" />
      <p className="flex flex-row gap-2 items-center text-xl font-semibold">
        <Search className={cn("h-6 w-6", { hidden: !showSearchIcon })} />
        No results found
      </p>
    </motion.div>
  );
}
