import Gallery from "./_components/Gallery";
import Hero from "./_components/Hero";

export default function Home() {
  return (
    <main className="flex flex-col gap-8 items-center sm:items-start">
      <Hero />
      <Gallery />
    </main>
  );
}
