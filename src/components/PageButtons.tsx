import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

type Props = {
  setPage: (page: number | ((page: number) => number)) => void;
  page: number;
  bound: number;
  className?: string;
};

export default function PageButtons({
  bound,
  page,
  setPage,
  className,
}: Props) {
  return (
    <Pagination className={cn("pb-2 transition-all", className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            onClick={() => {
              window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
              setPage(1);
            }}
          >
            <ChevronsLeft className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            onClick={() => {
              window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
              setPage((p) => {
                if (p && p > 1) return p - 1;
                return 1;
              });
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className="block md:hidden">
          <PaginationLink
          // isActive={index + 1 === page}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
        {Array.apply(null, Array(bound)).map((_, index) => (
          <PaginationItem key={index} className="hidden md:block">
            <PaginationLink
              isActive={index + 1 === page}
              onClick={() => {
                window.scroll({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                });
                setPage(index + 1);
              }}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationLink
            onClick={() => {
              window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
              setPage((p) => {
                if (p && p < bound) return p + 1;
                return bound;
              });
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            onClick={() => {
              window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
              setPage(bound);
            }}
          >
            <ChevronsRight className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
