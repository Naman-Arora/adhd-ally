import { type ReactNode } from "react";
import Search from "./Search";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";

type Props = {
  open: boolean;
  title: string;
  search: string;
  description: string;
  setOpen: (open: boolean) => void;
  setSearch: (search: string) => void;
  children: ReactNode;
};

export default function CurateSheet({
  open,
  title,
  search,
  setOpen,
  children,
  setSearch,
  description,
}: Props) {
  return (
    <Sheet open={open} onOpenChange={(o) => setOpen(o)}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="grid place-items-center gap-4 py-8">
          <div className="w-full flex flex-col gap-2">
            <Label>Search Query</Label>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>
          {children}
          {/* <div className="w-full flex flex-col gap-2">
            <Label>Sort Category</Label>
            <Select
              value={sort}
              onValueChange={(e) => setSort(e as StatesSort)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
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
            <Select
              value={order}
              onValueChange={(e) => setOrder(e as SortOrder)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort Order" />
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
              value={String(filters?.population)}
              onValueChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  population: parseInt(e),
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort Order" />
              </SelectTrigger>
              <SelectContent>
                {TOTAL_POPULATION_FILTERS.map((k, i) => (
                  <SelectItem key={i} value={String(k)}>
                    &gt; {k.toLocaleString()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full flex flex-col gap-2">
            <Label>Filter Population Diagnosed With ADHD</Label>
            <Select
              value={String(filters?.receivedDiagnosis)}
              onValueChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  receivedDiagnosis: parseInt(e),
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort Order" />
              </SelectTrigger>
              <SelectContent>
                {ADHD_DIAGNOSIS_FILTERS.map((k, i) => (
                  <SelectItem key={i} value={String(k)}>
                    &gt; {k.toLocaleString()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full flex flex-col gap-2">
            <Label>Filter Current ADHD Population</Label>
            <Select
              value={String(filters?.currentAdhd)}
              onValueChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  currentAdhd: parseInt(e),
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort Order" />
              </SelectTrigger>
              <SelectContent>
                {ADHD_POPULATION_FILTERS.map((k, i) => (
                  <SelectItem key={i} value={String(k)}>
                    &gt; {k.toLocaleString()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full flex flex-col gap-2">
            <Label>Filter Percentage Taking Medication</Label>
            <Select
              value={String(filters?.takingMedication)}
              onValueChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  takingMedication: parseInt(e),
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort Order" />
              </SelectTrigger>
              <SelectContent>
                {TAKING_MEDICATION_FILTERS.map((k, i) => (
                  <SelectItem key={i} value={String(k)}>
                    &gt; {k.toLocaleString()}%
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full flex flex-col gap-2">
            <Label>Filter Percentage Receiving Behavioral Treatment</Label>
            <Select
              value={String(filters?.behavioralTreatment)}
              onValueChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  behavioralTreatment: parseInt(e),
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort Order" />
              </SelectTrigger>
              <SelectContent>
                {BEHAVIORAL_TREATMENT_FILTERS.map((k, i) => (
                  <SelectItem key={i} value={String(k)}>
                    &gt; {k.toLocaleString()}%
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div> */}
        </div>
      </SheetContent>
    </Sheet>
  );
}
