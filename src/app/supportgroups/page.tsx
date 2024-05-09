import { Suspense } from "react";
import Hero from "@/components/Hero";
import Loading from "@/components/Loading";
import SupportGroups from "./SupportGroups";
import ErrorBoundary from "@/components/ErrorBoundary";
import {
  getSupportGroups,
  //   getSupportGroupsMetadata,
} from "@/lib/queries/supportgroups";

async function PageContent() {
  const supportgroups = await getSupportGroups(1);
  // const metadata = await getSupportGroupsMetadata();
  return (
    <SupportGroups supportGroups={supportgroups} /* metadata={metadata} */ />
  );
}

export default async function Page() {
  return (
    <>
      <Hero
        title="Support Groups"
        imageSource="/splash/rehab.jpg"
        imageFullHeight
      >
        <p className="mx-auto max-w-[1000px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Welcome to the Support Groups section of our site, a community where
          families can share experiences and find resources to navigate the
          challenges of ADHD and foster a supportive environment for every child
          to thrive.
        </p>
        <p className="mx-auto max-w-[1000px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Connecting with ADHD support groups as a child offers a supportive
          community where kids can share experiences without judgment. These
          groups provide valuable information, coping strategies, and emotional
          support, fostering a sense of belonging and making the challenges of
          ADHD more manageable.
        </p>
      </Hero>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <PageContent />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
