import NavBar from "@/components/NavBar";

export default function StateLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <>
      <NavBar route="Professionals" />
      {children}
    </>
  );
}
