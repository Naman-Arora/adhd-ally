// "use client";
import Image from "next/legacy/image";
import { TECH } from "@/lib/tech";
import NavBar from "@/components/NavBar";
import { getAboutData } from "@/lib/queries/about";
import Hero from "@/components/Hero";

export default async function About() {
   const { contributors, totalCommits, totalIssues, totalUnitTests } =
      await getAboutData();

   return (
      <>
         <NavBar route="About" />
         <Hero
            imageSource="https://fundamatics.net/deploy/wp-content/uploads/2020/09/ADHD-illustration.jpg"
            title="About ADHD Ally"
         >
            <p className="mx-auto max-w-[1000px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
               ADHD Ally aims to support children aged 3 to 17 years with ADHD in the
               United States. We accomplish this by connecting these individuals with
               ADHD support groups and professionals. We also provide state-level
               statistics about ADHD to raise awareness about the condition.
            </p>
            <p className="mx-auto max-w-[1000px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
               Integrating the disparate data sources offers significant insights
               into the ADHD community within children aged 3 to 17 years. This
               includes understanding the prevalence of ADHD in young children at the
               state level in addition to identifying the optimal support strategies
               for those affected. Key learnings include the critical need for a
               comprehensive support system, combining support groups with
               professional advice, and the value of tailored care, leveraging both
               state statistics and advice from local professionals.
            </p>
         </Hero>
         <section className="w-full py-12 md:py-24">
            <div className="container px-4 flex flex-col gap-10 md:gap-12">
               <div className="flex flex-col gap-4 text-center">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                     The Team
                  </h1>
                  {/* <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              We are
            </p> */}
               </div>
               <div className="container grid max-w-3xl px-4 gap-6 md:grid-cols-2 md:px-6 lg:max-w-5xl xl:grid-cols-5 xl:max-w-6xl xl:gap-8">
                  {contributors.map((c, index) => (
                     <div
                        key={index}
                        className="flex flex-col gap-2 items-center min-h-[300px]"
                     >
                        <Image
                           alt={c.name}
                           className="rounded-lg object-cover"
                           height="200"
                           src={c.image}
                           style={{
                              aspectRatio: "200/200",
                              objectFit: "cover",
                           }}
                           width="200"
                        />
                        <div className="flex flex-col gap-1 text-center">
                           <h3 className="text-xl font-semibold">{c.name}</h3>
                           <p className="text-sm text-gray-500">{c.role}</p>
                           <p className="text-sm text-gray-500 dark:text-gray-400">
                              {c.bio}
                           </p>
                           <p className="text-sm text-gray-500 dark:text-gray-400">{`Number of Issues: ${c.issues}`}</p>
                           <p className="text-sm text-gray-500 dark:text-gray-400">{`Number of Commits: ${c.commits}`}</p>
                           <p className="text-sm text-gray-500 dark:text-gray-400">{`Number of Unit Tests: ${c.unittests}`}</p>
                        </div>
                     </div>
                  ))}
               </div>
               <div className="flex flex-col gap-1 text-center">
                  <p className="text-xl font-semibold ">{`Total Issues: ${totalIssues}`}</p>
                  <p className="text-xl font-semibold">{`Total Commits: ${totalCommits}`}</p>
                  <p className="text-xl font-semibold">{`Total Unit Tests: ${totalUnitTests}`}</p>
               </div>
            </div>
         </section>
         <section className="w-full py-12 md:py-24 bg-gray-900 ">
            <div className="container px-4 flex flex-col gap-10 md:gap-12">
               <div className="flex flex-col gap-4 text-center">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-50">
                     The Tech
                  </h1>
                  <p className="mx-auto max-w-[600px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                     The technology we used to complete this project.
                  </p>
               </div>
               <div className="container grid max-w-3xl px-4 gap-6 md:grid-cols-2 md:px-6 lg:max-w-5xl xl:grid-cols-4 xl:max-w-6xl xl:gap-8 py-">
                  {TECH.map(({ image, name }, index) => (
                     <div
                        className="text-gray-200 border border-white grid place-items-center rounded py-4 gap-4 bg-gray-700/50 backdrop-blur-sm"
                        key={index}
                     >
                        <Image alt={name} src={image} width={50} height={50} />
                        <span>{name}</span>
                     </div>
                  ))}
               </div>
            </div>
         </section>
         <section className="w-full py-12 md:py-24">
            <div className="container px-4 flex flex-col gap-10 md:gap-12">
               <div className="flex flex-col gap-4 text-center">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                     Data Sources
                  </h1>
                  <p className="mx-auto max-w-[800px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                     <a
                        className="inline-flex items-center font-medium underline underline-offset-2 rounded-md hover:underline-0 transition-none hover:underline-gray-950 dark:text-gray-900"
                        href="https://journals.sagepub.com/eprint/A4CQI4TZJAJRIMIPYKET/full"
                        target="_blank"
                     >
                        Statistics by State
                     </a>
                  </p>
                  <p className="mx-auto max-w-[800px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                     <a
                        className="inline-flex items-center font-medium underline underline-offset-2 rounded-md hover:underline-0 transition-none hover:underline-gray-950 dark:text-gray-900"
                        href="https://chadd.org/affiliate-locator/"
                        target="_blank"
                     >
                        Support Groups
                     </a>
                  </p>
                  <p className="mx-auto max-w-[800px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                     <a
                        className="inline-flex items-center font-medium underline underline-offset-2 rounded-md hover:underline-0 transition-none hover:underline-gray-950 dark:text-gray-900"
                        href="https://add.org/professional-directory/"
                        target="_blank"
                     >
                        Professionals
                     </a>
                  </p>
                  <p className="mx-auto max-w-[800px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                     <a
                        className="inline-flex items-center font-medium underline underline-offset-2 rounded-md hover:underline-0 transition-none hover:underline-gray-950 dark:text-gray-900"
                        href="https://www.britannica.com/topic/largest-U-S-state-by-population"
                        target="_blank"
                     >
                        Population by State
                     </a>
                  </p>
                  <p className="mx-auto max-w-[800px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                     <a
                        className="inline-flex items-center font-medium underline underline-offset-2 rounded-md hover:underline-0 transition-none hover:underline-gray-950 dark:text-gray-900"
                        href="https://developers.google.com/maps"
                        target="_blank"
                     >
                        Google Maps API
                     </a>
                  </p>
                  <br></br>
                  <h1 className="text-xl">
                     <a
                        className="inline-flex items-center bg-gray-900 text-white px-10 py-5 rounded-md transition-none hover:underline hover:text-blue-800 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-700"
                        href="https://documenter.getpostman.com/view/32958006/2sA2r53kYu"
                        target="_blank"
                     >
                        API Documentation
                     </a>
                  </h1>
                  <p></p>
                  <h1 className="text-xl">
                     <a
                        className="inline-flex items-center bg-gray-900 text-white px-10 py-5 rounded-md transition-none hover:underline hover:text-blue-800 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-700"
                        href="https://gitlab.com/tejaswithapa/cs373-group-15"
                        target="_blank"
                     >
                        GitLab Repository
                     </a>
                  </h1>
               </div>
            </div>
         </section>
      </>
   );
}
