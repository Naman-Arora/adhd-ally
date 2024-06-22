import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import { notFound } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return notFound();
  return (
    <>
      <NavBar route="/" />
      <Hero
        imageSource="https://i.pcmag.com/imagery/articles/02Xkt5sp3fVl5rGUtk3DXMi-7..v1569485349.jpg"
        title="Developer Visualizations"
      >
        <p className="mx-auto max-w-[1000px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed pb-50">
          This interactive data visualization page offers a detailed exploration
          of the challenges faced by uninsured and underinsured Americans,
          particularly those suffering from chronic illnesses such as multiple
          sclerosis, which often hinder their ability to work. Through a series
          of visualizations, this presents compelling statistics on the
          geographic and socio-economic barriers to accessing healthcare. This
          platform not only sheds light on the disparities in healthcare
          accessibility but also underscores the urgent need for comprehensive
          policy reforms and community support systems across the United States.
        </p>
      </Hero>
      {children}
    </>
  );
}
