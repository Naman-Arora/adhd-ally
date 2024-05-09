"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

type Props = ImageProps & {
  fallback: string;
};

export default function Img(props: Props) {
  const [imageSource, setImageSource] = useState(props.src);

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      {...props}
      src={imageSource}
      onError={() => setImageSource("/gradient.jpeg")}
    />
  );
}
