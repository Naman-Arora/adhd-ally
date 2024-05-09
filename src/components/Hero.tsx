import { type ReactNode } from "react";
import Image from "@/components/Image";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  imageSource: string;
  imageFullHeight?: boolean;
  children?: ReactNode;
};

export default function Hero({
  title,
  imageSource,
  children,
  imageFullHeight = false,
}: Props) {
  return (
    <section className="w-full py-12 md:py-24 bg-gray-900">
      <div className="container px-4 md:px-8 flex md:flex-row flex-col gap-8 md:gap-12 justify-between">
        <div className="flex flex-col justify-center gap-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-50 ">
            {title}
          </h1>
          {children}
        </div>
        <div className="grid place-items-center">
          <Image
            alt={title}
            className={cn(
              "aspect-[2/1] rounded-3xl overflow-hidden object-cover",
              { "h-full": imageFullHeight }
            )}
            height="350"
            src={imageSource}
            width="700"
            fallback=""
          />
        </div>
      </div>
    </section>
  );
}
