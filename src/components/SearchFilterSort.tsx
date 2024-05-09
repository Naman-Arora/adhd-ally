import { ArrowDownNarrowWide, Filter, SearchIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";

type Props = {
  setOpen: (open: boolean) => void;
};

export default function SearchFilterSort({ setOpen }: Props) {
  return (
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            variant={"outline"}
            className="fixed bottom-4 right-4 px-2 py-4"
            onClick={() => setOpen(true)}
          >
            <div className="flex flex-row gap-2">
              <SearchIcon className="h-6 w-6" />
              <Filter className="h-6 w-6" />
              <ArrowDownNarrowWide className="h-6 w-6" />
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={6}>
          <p>Search, Filter, & Sort</p>
        </TooltipContent>
      </Tooltip>
  );
}
