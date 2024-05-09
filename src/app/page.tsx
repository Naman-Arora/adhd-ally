"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <>
      <NavBar route="/" />
      <main className="bg-gray-50/90 overflow-x-hidden">
        <Hero imageSource="/splash/road.jpg" title="Welcome to ADHDAlly">
          <p className="max-w-[600px] text-gray-200 md:text-xl dark:text-gray-400">
            Raising awareness for children struggling with ADHD all across the
            nation. Supporting the youth with the resources they need to
            successfully work with their unique struggles from professionals
            that teach and support groups that guide you every step of the way.
          </p>
        </Hero>
        <section className="py-6 md:py-12 lg:py-16 xl:py-20">
          <motion.div
            className="container px-4 md:px-6"
            initial={{
              x: 200,
              opacity: 0,
            }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: "just", delay: 0, duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="grid items-center gap-6 grid-rows-1 lg:grid-cols-2 lg:gap-12">
              <div className="flex items-center justify-center">
                <a
                  href="https://www.youtube.com/embed/z2hLa5kDRCA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <iframe
                    title="YouTube Video"
                    width="100%"
                    height="300"
                    src="https://www.youtube.com/embed/z2hLa5kDRCA"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="aspect-[2/1] rounded-3xl overflow-hidden object-cover"
                  ></iframe>
                </a>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter lg:text-4xl xl:text-5xl/none">
                    Overview
                  </h2>
                  <p className="max-w-prose text-gray-500 md:text-xl dark:text-gray-400">
                    ADHD, or Attention Deficit Hyperactivity Disorder, is
                    characterized by symptoms such as inattention,
                    hyperactivity, and impulsivity. These symptoms can
                    significantly impact a child&apos;s social life by causing
                    difficulties in maintaining friendships and participating in
                    group activities. Academically, these symptoms may lead to
                    challenges in concentration, organization, and following
                    instructions. However, with appropriate resources and
                    support, children with ADHD can better navigate these
                    challenges and improve their overall well-being and academic
                    performance.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
        <section className="bg-gray-900 py-12 md:py-16 lg:py-20 xl:py-24">
          <motion.div
            className="container px-4 md:px-6"
            initial={{
              x: -200,
              opacity: 0,
            }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: "just", delay: 0, duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="grid items-center gap-6 grid-rows-1 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 text-gray-50 dark:text-gray-900">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter lg:text-4xl xl:text-5xl/none">
                    States
                  </h2>
                  <p className="max-w-prose text-gray-200 md:text-xl dark:text-gray-400">
                    State-level statistics on other children across the nation
                    also working forward in their journey with ADHD.
                  </p>
                </div>
                <div>
                  <Link
                    className="inline-flex items-center text-sm font-medium underline underline-offset-2 rounded-md hover:underline-0 transition-none hover:underline-gray-950 dark:text-gray-900"
                    href={"/states"}
                  >
                    Learn More
                    <ChevronRightIcon className="w-4 h-4 ml-1 inline-block" />
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  alt="Statistics"
                  className="aspect-[2/1] rounded-3xl overflow-hidden object-cover"
                  height="300"
                  src="/splash/statistics.jpg"
                  width="600"
                />
              </div>
            </div>
          </motion.div>
        </section>
        <section className="py-12 md:py-16 lg:py-20 xl:py-24">
          <motion.div
            className="container px-4 md:px-6"
            initial={{
              x: 200,
              opacity: 0,
            }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: "just", delay: 0, duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="grid items-center gap-6 grid-rows-1 lg:grid-cols-2 lg:gap-12">
              <div className="flex items-center justify-center">
                <Image
                  alt="Professionals"
                  className="aspect-[2/1] rounded-3xl overflow-hidden object-cover"
                  height="300"
                  src="/splash/employement.jpg"
                  width="600"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter lg:text-4xl xl:text-5xl/none">
                    Professionals
                  </h2>
                  <p className="max-w-prose text-gray-500 md:text-xl dark:text-gray-400">
                    Offering diagnosis, medication management, therapy,
                    coaching, and other unique resources.
                  </p>
                </div>
                <div>
                  <Link
                    className="inline-flex items-center text-sm font-medium underline underline-offset-2 rounded-md hover:underline-0 transition-none hover:underline-gray-950"
                    href={"/professionals"}
                  >
                    Learn More
                    <ChevronRightIcon className="w-4 h-4 ml-1 inline-block" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
        <section className="bg-gray-900 py-12 md:py-16 lg:py-20 xl:py-24">
          <motion.div
            className="container px-4 md:px-6"
            initial={{
              x: -200,
              opacity: 0,
            }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: "just", delay: 0, duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="grid items-center gap-6 grid-rows-1 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 text-gray-50 dark:text-gray-900">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter lg:text-4xl xl:text-5xl/none">
                    Support Groups
                  </h2>
                  <p className="max-w-prose text-gray-200 md:text-xl dark:text-gray-400">
                    Access to peer support, shared experiences, accountability,
                    and a community to navigate this hardship with.
                  </p>
                </div>
                <div>
                  <Link
                    className="inline-flex items-center text-sm font-medium underline underline-offset-2 rounded-md hover:underline-0 transition-none hover:underline-gray-950 dark:text-gray-900"
                    href={"/supportgroups"}
                  >
                    Learn More
                    <ChevronRightIcon className="w-4 h-4 ml-1 inline-block" />
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  alt="Support Groups"
                  className="aspect-[2/1] rounded-3xl overflow-hidden object-cover"
                  height="300"
                  src="/splash/rehab.jpg"
                  width="600"
                />
              </div>
            </div>
          </motion.div>
        </section>
        <section className="py-12 md:py-16 lg:py-20 xl:py-24">
          <motion.div
            className="container px-4 md:px-6"
            initial={{
              x: 200,
              opacity: 0,
            }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: "just", delay: 0, duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="grid items-center gap-6 grid-rows-1 lg:grid-cols-2 lg:gap-12">
              <div className="flex items-center justify-center">
                <Image
                  alt="Professionals"
                  className="aspect-[2/1] rounded-3xl overflow-hidden object-cover"
                  height="300"
                  src="/splash/medication.jpg"
                  width="600"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter lg:text-4xl xl:text-5xl/none">
                    Medication Shortage
                  </h2>
                  <p className="max-w-prose text-gray-500 md:text-xl dark:text-gray-400">
                    ADHD medicine has classically been a common solution, but
                    recent shortages have made this more difficult than before.
                  </p>
                </div>
                <div>
                  <Link
                    className="inline-flex items-center text-sm font-medium underline underline-offset-2 rounded-md hover:underline-0 transition-none hover:underline-gray-950"
                    href={
                      "https://www.cbsnews.com/news/adhd-medication-shortage-cause/"
                    }
                  >
                    News Article
                    <ChevronRightIcon className="w-4 h-4 ml-1 inline-block" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}
