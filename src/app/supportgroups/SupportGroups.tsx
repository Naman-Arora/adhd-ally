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
  SortOrder,
  SORT_ORDER,
  curateSupportGroups,
  SUPPORT_GROUPS_SORT,
  SupportGroupsSort,
  SupportGroupsFilters,
  STATE_NAMES,
  StateName,
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
import ClearFilter from "@/components/ClearFilter";
import CurateSheet from "@/components/CurateSheet";
import { TooltipProvider } from "@/components/ui/tooltip";
import SearchFilterSort from "@/components/SearchFilterSort";
import { type SupportGroup } from "@/lib/queries/supportgroups";
import SupportGroupsCards from "@/components/sections/SupportGroupsCards";

type Props = {
  supportGroups: SupportGroup[];
};

const LIMIT = 9;

export default function SupportGroups({ supportGroups }: Props) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(supportGroups);
  const [key, setKey] = useState<number>(Date.now());
  const [filters, setFilters] = useState<SupportGroupsFilters>({});

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("")
  );
  const [order, setOrder] = useQueryState<SortOrder>(
    "order",
    parseAsStringLiteral(SORT_ORDER).withDefault("asc")
  );
  const [sort, setSort] = useQueryState<SupportGroupsSort>(
    "sort",
    parseAsStringLiteral(SUPPORT_GROUPS_SORT).withDefault("Name")
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
      curateSupportGroups(
        supportGroups,
        debounced.search,
        debounced.filters,
        debounced.sort,
        debounced.order
      )
    );
  }, [supportGroups, page, debounced, setData]);

  const bound = Math.ceil(data.length / LIMIT);

  return (
    <TooltipProvider>
      <SearchFilterSort setOpen={setOpen} />
      <CurateSheet
        title="Curate Support Groups"
        description="Search, filter, and sort the support groups."
        open={open}
        search={search}
        setOpen={setOpen}
        setSearch={setSearch}
      >
        <div className="w-full flex flex-col gap-2">
          <Label>Sort Category</Label>
          <Select
            value={sort}
            onValueChange={(e: SupportGroupsSort) => setSort(e)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="N/A" />
            </SelectTrigger>
            <SelectContent>
              {SUPPORT_GROUPS_SORT.map((v, k) => (
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
        <ClearFilter
          onClick={() => {
            setKey(Date.now());
            setFilters(() => ({}));
          }}
        />
      </CurateSheet>
      <SupportGroupsCards
        data={data.slice((page - 1) * LIMIT, LIMIT * page)}
        highlight={debounced.search}
      />
      <PageButtons bound={bound} page={page} setPage={setPage} />
      <p className="text-center mx-auto max-w-[1000px] text-gray-600 md:text-xl/relaxed pb-8">
        {data.length} Result(s)
      </p>
    </TooltipProvider>
  );
}
