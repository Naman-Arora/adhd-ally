"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Menu, SearchIcon } from "lucide-react";
import { useQueries } from "@tanstack/react-query";
import {
  curateProfessionals,
  curateSupportGroups,
  curateStates,
} from "@/lib/curate";
import Search from "./Search";
import { cn } from "@/lib/utils";
import { PATHS } from "@/lib/pages";
import {
  type SupportGroup,
  getSupportGroups,
} from "@/lib/queries/supportgroups";
import {
  type Professional,
  getProfessionals,
} from "@/lib/queries/professionals";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { type State, getStates } from "@/lib/queries/states";
import PageButtons from "@/components/PageButtons";
import { ScrollArea } from "@/components/ui/scroll-area";
import StatesCards from "@/components/sections/StatesCards";
import ProfessionalsCards from "@/components/sections/ProfessionalsCards";
import SupportGroupsCards from "@/components/sections/SupportGroupsCards";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  route: (typeof PATHS)[number]["name"] | "/";
  showGlobalSearch?: boolean;
};

const STATES_LIMIT = 9;
const PROFESSIONALS_LIMIT = 9;
const SUPPORT_GROUPS_LIMIT = 9;

export default function NavBar({ route }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debounced] = useDebounceValue(search.toLowerCase(), 500);

  //   const {
  //     data: { professionals, states, supportgroups },
  //   } = useQueries({
  //     queries: [
  //       {
  //         queryKey: ["states_global"],
  //         queryFn: () => getStates(1),
  //         refetchOnMount: false,
  //         refetchOnWindowFocus: false,
  //         refetchOnReconnect: false,
  //         staleTime: Infinity,
  //         enabled: true,
  //       },
  //       {
  //         queryKey: ["professionals_global"],
  //         queryFn: () => getProfessionals(1),
  //         refetchOnMount: false,
  //         refetchOnWindowFocus: false,
  //         refetchOnReconnect: false,
  //         staleTime: Infinity,
  //         enabled: true,
  //       },
  //       {
  //         queryKey: ["supportgroups_global"],
  //         queryFn: () => getSupportGroups(1),
  //         refetchOnMount: false,
  //         refetchOnWindowFocus: false,
  //         refetchOnReconnect: false,
  //         staleTime: Infinity,
  //         enabled: true,
  //       },
  //     ],
  //     combine: (results) => {
  //       return {
  //         data: {
  //           states: results[0].data,
  //           professionals: results[1].data,
  //           supportgroups: results[2].data,
  //         },
  //         pending: results.some((result) => result.isPending),
  //         error: results.some((result) => result.isError),
  //       };
  //     },
  //   });

  //   const [curatedStates, setCuratedStates] = useState<State[]>([]);
  //   const [curatedProfessionals, setCuratedProfessionals] = useState<
  //     Professional[]
  //   >([]);
  //   const [curatedSupportGroups, setCuratedSupportGroups] = useState<
  //     SupportGroup[]
  //   >([]);

  //   useEffect(() => {
  //     states && setCuratedStates(curateStates(states, debounced));
  //   }, [states, debounced]);

  //   useEffect(() => {
  //     professionals &&
  //       setCuratedProfessionals(curateProfessionals(professionals, debounced));
  //   }, [professionals, debounced]);

  //   useEffect(() => {
  //     supportgroups &&
  //       setCuratedSupportGroups(curateSupportGroups(supportgroups, debounced));
  //   }, [supportgroups, debounced]);

  return (
    <nav className="w-full h-16 flex flex-row items-center justify-between px-4 bg-white border-gray-200 border-b rounded shadow">
      <Link className="flex flex-row items-center gap-2" href={"/"}>
        <span className="font-bold text-2xl">ADHDAlly</span>
      </Link>
      <div className="flex flex-row items-center justify-between gap-2 md:gap-4">
        {/* <Dialog> 
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              className={cn(
                "rounded-full border border-gray-200 hover:border-gray-400 items-center gap-2 font-semibold shadow-md hidden",
                { flex: true }
              )}
              size="default"
              onClick={() => setSearch("")}
            >
              <SearchIcon className="w-4 h-4" strokeWidth={2} />
              Global Search
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[100vw] h-[100vh] md:max-w-[95vw] md:h-[95vh] flex flex-col gap-4 border-gray-900 p-1 pt-4 md:p-4">
            <ScrollArea>
              <div className="flex flex-col gap-4 pl-2 pr-6">
                <h1 className="text-2xl font-bold">Global Search</h1>
                <Search
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="text-lg placeholder:text-lg w-full shadow-md"
                />
                <Tabs defaultValue="states" className="w-full">
                  <TabsList className="w-full justify-around h-12">
                    <TabsTrigger
                      value="states"
                      className="md:px-20 rounded-md text-base font-semibold"
                      onClick={() => setPage(1)}
                    >
                      States
                    </TabsTrigger>
                    <TabsTrigger
                      value="professionals"
                      className="md:px-20 rounded-md text-base font-semibold"
                      onClick={() => setPage(1)}
                    >
                      Professionals
                    </TabsTrigger>
                    <TabsTrigger
                      value="supportgroups"
                      className="md:px-20 rounded-md text-base font-semibold"
                      onClick={() => setPage(1)}
                    >
                      Support Groups
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="states">
                    {states && (
                      <>
                        <StatesCards
                          data={curatedStates.slice(
                            (page - 1) * STATES_LIMIT,
                            STATES_LIMIT * page
                          )}
                          highlight={debounced}
                        />
                        <PageButtons
                          bound={Math.ceil(curatedStates.length / STATES_LIMIT)}
                          page={page}
                          setPage={setPage}
                        />
                      </>
                    )}
                  </TabsContent>
                  <TabsContent value="professionals">
                    {professionals && (
                      <>
                        <ProfessionalsCards
                          data={curatedProfessionals.slice(
                            (page - 1) * PROFESSIONALS_LIMIT,
                            PROFESSIONALS_LIMIT * page
                          )}
                          highlight={debounced}
                        />
                        <PageButtons
                          bound={Math.ceil(
                            curatedProfessionals.length / PROFESSIONALS_LIMIT
                          )}
                          page={page}
                          setPage={setPage}
                        />
                      </>
                    )}
                  </TabsContent>
                  <TabsContent value="supportgroups">
                    {supportgroups && (
                      <>
                        <SupportGroupsCards
                          data={curatedSupportGroups.slice(
                            (page - 1) * SUPPORT_GROUPS_LIMIT,
                            SUPPORT_GROUPS_LIMIT * page
                          )}
                          highlight={debounced}
                        />
                        <PageButtons
                          bound={Math.ceil(
                            curatedSupportGroups.length / SUPPORT_GROUPS_LIMIT
                          )}
                          page={page}
                          setPage={setPage}
                        />
                      </>
                    )}
                  </TabsContent>
                </Tabs> 

                
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
        {/*  )} */}
        <div className="hidden md:flex flex-row gap-4 font-semibold">
          {PATHS.map(({ name, path }, index) => (
            <Link
              className={cn(
                "cursor-pointer hover:bg-gray-200 rounded-full p-2 pl-4 pr-4",
                {
                  "text-blue-800": route === name,
                }
              )}
              key={index}
              href={path}
            >
              {name}
            </Link>
          ))}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="md:hidden" size="icon" variant="ghost">
              <Menu className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 border border-gray-400">
            {PATHS.map(({ name, path }, index) => (
              <DropdownMenuItem
                asChild
                key={index}
                className={cn({ "bg-gray-200": route === name })}
              >
                <Link href={path} className="font-semibold">
                  {name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
