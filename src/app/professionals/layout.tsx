import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";

export default function StateLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <>
      <NavBar route="Professionals" />
      <Hero title="Professionals" imageSource="/splash/employement.jpg">
        <p className="mx-auto max-w-[1000px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Welcome to the Professionals section of our site, designed as a
          dedicated resource for children or parents who have children with ADHD
          regarding healthcare providers, educators, and other professionals who
          work with individuals affected by ADHD.
        </p>
        <p className="mx-auto max-w-[1000px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Sessions with these professionals can cost anywhere from $75 to $200+.
          These prices are negotiated with the professionals and require a
          consultation.
        </p>
      </Hero>
      {children}
    </>
  );
}
