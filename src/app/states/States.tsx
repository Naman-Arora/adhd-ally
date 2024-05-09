"use client";

import {
  useQueryState,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import {
  SORT_ORDER,
  STATES_SORT,
  type SortOrder,
  type StatesSort,
  type StatesFilters,
  curateStates,
} from "@/lib/curate";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { type State } from "@/lib/queries/states";
import PageButtons from "@/components/PageButtons";
import CurateSheet from "@/components/CurateSheet";
import StatesCards from "@/components/sections/StatesCards";
import SearchFilterSort from "@/components/SearchFilterSort";
import { TooltipProvider } from "@/components/ui/tooltip";
import ClearFilter from "@/components/ClearFilter";

type Props = {
  states: State[];
};

const LIMIT = 9;

const TOTAL_POPULATION_FILTERS = [
  100_000, 500_000, 1_000_000, 5_000_000, 10_000_000,
] as const;
const TAKING_MEDICATION_FILTERS = [20, 40, 60] as const;
const BEHAVIORAL_TREATMENT_FILTERS = [20, 40, 60] as const;
const ADHD_DIAGNOSIS_FILTERS = [10_000, 50_000, 100_000, 200_000] as const;
const ADHD_POPULATION_FILTERS = [10_000, 50_000, 100_000, 200_000] as const;

export default function States({ states }: Props) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(states);
  const [key, setKey] = useState<number>(Date.now());
  const [filters, setFilters] = useState<StatesFilters>({});

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("")
  );
  const [order, setOrder] = useQueryState<SortOrder>(
    "order",
    parseAsStringLiteral(SORT_ORDER).withDefault("asc")
  );
  const [sort, setSort] = useQueryState<StatesSort>(
    "sort",
    parseAsStringLiteral(STATES_SORT).withDefault("Name")
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
      curateStates(
        states,
        debounced.search,
        debounced.filters,
        debounced.sort,
        debounced.order
      )
    );
  }, [states, page, debounced, setData]);

  const bound = Math.ceil(data.length / LIMIT);

  return (
    <TooltipProvider>
      <SearchFilterSort setOpen={setOpen} />
      <CurateSheet
        title="Curate States"
        description="Search, filter, and sort the states."
        open={open}
        setOpen={setOpen}
        search={search}
        setSearch={setSearch}
      >
        <div className="w-full flex flex-col gap-2">
          <Label>Sort Category</Label>
          <Select value={sort} onValueChange={(e) => setSort(e as StatesSort)}>
            <SelectTrigger>
              <SelectValue placeholder="N/A" />
            </SelectTrigger>
            <SelectContent>
              {STATES_SORT.map((k, i) => (
                <SelectItem key={i} value={k}>
                  {k}
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
          <Label>Filter Total Population</Label>
          <Select
            key={key}
            value={filters.population?.toString()}
            onValueChange={(e) =>
              setFilters((f) => ({
                ...f,
                population: parseInt(e),
              }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="N/A" />
            </SelectTrigger>
            <SelectContent>
              {TOTAL_POPULATION_FILTERS.map((k, i) => (
                <SelectItem key={i} value={k.toString()}>
                  {k.toLocaleString()}+
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label>Filter Population Diagnosed With ADHD</Label>
          <Select
            key={key}
            value={filters.receivedDiagnosis?.toString()}
            onValueChange={(e) =>
              setFilters((f) => ({
                ...f,
                receivedDiagnosis: parseInt(e),
              }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="N/A" />
            </SelectTrigger>
            <SelectContent>
              {ADHD_DIAGNOSIS_FILTERS.map((k, i) => (
                <SelectItem key={i} value={k.toString()}>
                  {k.toLocaleString()}+
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label>Filter Current ADHD Population</Label>
          <Select
            key={key}
            value={filters.currentAdhd?.toString()}
            onValueChange={(e) =>
              setFilters((f) => ({
                ...f,
                currentAdhd: parseInt(e),
              }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="N/A" />
            </SelectTrigger>
            <SelectContent>
              {ADHD_POPULATION_FILTERS.map((k, i) => (
                <SelectItem key={i} value={k.toString()}>
                  {k.toLocaleString()}+
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label>Filter Percentage Taking Medication</Label>
          <Select
            key={key}
            value={filters.takingMedication?.toString()}
            onValueChange={(e) =>
              setFilters((f) => ({
                ...f,
                takingMedication: parseInt(e),
              }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="N/A" />
            </SelectTrigger>
            <SelectContent>
              {TAKING_MEDICATION_FILTERS.map((k, i) => (
                <SelectItem key={i} value={k.toString()}>
                  {k.toLocaleString()}%+
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label>Filter Percentage Receiving Behavioral Treatment</Label>
          <Select
            key={key}
            value={filters.behavioralTreatment?.toString()}
            onValueChange={(e) =>
              setFilters((f) => ({
                ...f,
                behavioralTreatment: parseInt(e),
              }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="N/A" />
            </SelectTrigger>
            <SelectContent>
              {BEHAVIORAL_TREATMENT_FILTERS.map((k, i) => (
                <SelectItem key={i} value={k.toString()}>
                  {k.toLocaleString()}%+
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
      <StatesCards
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
