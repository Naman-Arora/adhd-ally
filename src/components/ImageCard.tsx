import Link from "next/link";
import { type ReactNode, type Key } from "react";
import { motion } from "framer-motion";
import Image from "@/components/Image";
import { Button } from "@/components/ui/button";
import HighlightSearch from "@/components/HighlightSearch";

type Props = {
  title: string;
  website?: string;
  destination: string;
  imageUrl: string;
  children: ReactNode;
  highlight?: string;
  id: Key;
};

export default function ImageCard({
  title,
  website,
  destination,
  imageUrl,
  children,
  highlight,
  id
}: Props) {
  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ type: "just", delay: 0, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-md max-w-sm hover:shadow-xl border border-gray-200 flex flex-col"
      key={id}
    >
      <div className="grid place-items-center h-[400px] w-full">
        <Image
          alt="Picture"
          className="object-cover rounded border h-[400px] w-[400px]"
          src={imageUrl}
          height={400}
          width={400}
          fallback="/gradient.jpeg"
        />
      </div>
      <div className="px-4 pb-4 pt-8 h-full flex flex-col justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold hover:text-gray-700 transition-all duration-200 pb-2 text-pretty">
            <HighlightSearch data={title} highlight={highlight} />
          </h1>
          {children}
        </div>
        <Button
          className="w-full hover:border-gray-700 hover:text-gray-700 transition-all duration-200"
          size="sm"
          variant="outline"
          asChild
        >
          {website ? (
            <a href={website}>Visit</a>
          ) : (
              <Link href={destination}>Learn More</Link>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
