import HeroSection from "./components/HeroSection";

function App() {
  return (
    <>
      <HeroSection />

      {/* Extra content to allow scrolling */}
      <section className="h-[60vh] bg-zinc-950 flex items-center justify-center">
        <h2 className="text-4xl text-zinc-500">Scroll Continues...</h2>
      </section>
    </>
  );
}

export default App;