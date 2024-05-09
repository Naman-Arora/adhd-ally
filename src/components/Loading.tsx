"use client";

import BarLoader from "react-spinners/BarLoader";

export default function Loading() {
  return (
    <div className="grid place-items-center pt-10">
      <BarLoader loading speedMultiplier={1} height={6} width={200} />
    </div>
  );
}
