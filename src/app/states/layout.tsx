import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";

export default function StateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar route="States" />
      <Hero
        imageSource="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Map_of_USA_with_state_names_2.svg/1400px-Map_of_USA_with_state_names_2.svg.png"
        title="States"
      >
        <p className="mx-auto max-w-[1000px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Welcome to the States section of our site, where we dive into the
          nuanced world of ADHD statistics across the United States. This
          overview aims to highlight the regional differences and trends in
          ADHD, offering valuable insights for individuals, families, and
          healthcare professionals navigating ADHD management and support.
        </p>
      </Hero>
      {children}
    </>
  );
}
