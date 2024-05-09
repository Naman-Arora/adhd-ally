import { Button } from "./ui/button";
import { RotateCcw } from "lucide-react";

type Props = {
  onClick: () => void;
};

export default function ClearFilter({ onClick }: Props) {
  return (
    <Button
      variant={"outline"}
      className="rounded-lg flex flex-row gap-2 w-full items-center"
      onClick={onClick}
      size={"lg"}
    >
      <p>Reset Filters</p>
      <RotateCcw className="h-4 w-4" />
    </Button>
  );
}
