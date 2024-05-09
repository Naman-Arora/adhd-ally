"use client";
import {
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  useQueryState,
} from "nuqs";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import {
  type SortOrder,
  type ProfessionalsSort,
  type ProfessionalsFilters,
  StateName,
  SORT_ORDER,
  STATE_NAMES,
  PROFESSIONALS_SORT,
  curateProfessionals,
} from "@/lib/curate";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import PageButtons from "@/components/PageButtons";
import CurateSheet from "@/components/CurateSheet";
import ClearFilter from "@/components/ClearFilter";
import { TooltipProvider } from "@/components/ui/tooltip";
import SearchFilterSort from "@/components/SearchFilterSort";
import { type Professional } from "@/lib/queries/professionals";
import ProfessionalsCards from "@/components/sections/ProfessionalsCards";

type Props = {
  professionals: Professional[];
};

const LIMIT = 9;

export default function Professionals({ professionals }: Props) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(professionals);
  const [key, setKey] = useState<number>(Date.now());
  const [filters, setFilters] = useState<ProfessionalsFilters>({});

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("")
  );
  const [order, setOrder] = useQueryState<SortOrder>(
    "order",
    parseAsStringLiteral(SORT_ORDER).withDefault("asc")
  );
  const [sort, setSort] = useQueryState<ProfessionalsSort>(
    "sort",
    parseAsStringLiteral(PROFESSIONALS_SORT).withDefault("Name")
  );

  const [debounced] = useDebounceValue(
    {
      search: search.toLowerCase(),
      sort,
      order,
      filters,
    },
    500
  );

  useEffect(() => {
    setData(
      curateProfessionals(
        professionals,
        debounced.search,
        debounced.filters,
        debounced.sort,
        debounced.order
      )
    );
  }, [professionals, page, debounced]);

  const bound = Math.ceil(data.length / LIMIT);

  return (
    <TooltipProvider>
      <SearchFilterSort setOpen={setOpen} />
      <CurateSheet
        title="Curate Professionals"
        description="Search, filter, and sort the professionals."
        open={open}
        search={search}
        setOpen={setOpen}
        setSearch={setSearch}
      >
        <div className="w-full flex flex-col gap-2">
          <Label>Sort Category</Label>
          <Select
            value={sort}
            onValueChange={(e) => setSort(e as ProfessionalsSort)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="N/A" />
            </SelectTrigger>
            <SelectContent>
              {PROFESSIONALS_SORT.map((v, k) => (
                <SelectItem key={k} value={v}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label>Sort Order</Label>
          <Select value={order} onValueChange={(e) => setOrder(e as SortOrder)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="N/A" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending &#8599;</SelectItem>
              <SelectItem value="desc">Descending &#8600;</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label>Filter State</Label>
          <Select
            key={key}
            value={filters.state}
            onValueChange={(e: StateName) =>
              setFilters((f) => ({
                ...f,
                state: e,
              }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="N/A" />
            </SelectTrigger>
            <SelectContent>
              {STATE_NAMES.map((v, k) => (
                <SelectItem key={k} value={v}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label>Filter Works Remotely</Label>
          <Select
            key={key}
            value={
              filters.worksRemotely === undefined
                ? undefined
                : filters.worksRemotely
                ? "Works Remotely"
                : "Does Not Work Remotely"
            }
            onValueChange={(e) =>
              setFilters((f) => ({
                ...f,
                worksRemotely: e === "Works Remotely",
              }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="N/A" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Works Remotely">Works Remotely</SelectItem>
              <SelectItem value="Does Not Work Remotely">
                Does Not Work Remotely
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ClearFilter
          onClick={() => {
            setKey(Date.now());
            setFilters(() => ({}));
          }}
        />
      </CurateSheet>
      <ProfessionalsCards
        data={data.slice((page - 1) * LIMIT, LIMIT * page)}
        highlight={debounced.search}
      />
      <PageButtons bound={bound} page={page} setPage={setPage} />
      <p className="text-center text-gray-700 md:text-lg/relaxed pb-10">
        {data.length} Result(s)
      </p>
    </TooltipProvider>
  );
}
