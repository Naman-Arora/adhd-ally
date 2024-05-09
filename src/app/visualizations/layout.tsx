import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";

export default function StateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar route="Visualizations" />
      <Hero
        imageSource="https://cdn.analyticsvidhya.com/wp-content/uploads/2021/06/70583featured-data-visualization.png"
        title="Visualizations"
      >
        <p className="max-w-[1000px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          By presenting state-level statistics on ADHD through various graphs
          and charts, our visualization page offers a comprehensive overview of
          the distribution of ADHD cases across the United States. By making
          these statistics readily accessible and visually engaging, we aim to
          highlight the importance of supporting children aged 3 to 17 years
          with ADHD and emphasize the need for resources and assistance
          nationwide.
        </p>
      </Hero>
      {children}
    </>
  );
}
