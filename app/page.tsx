import Nav from "./_components/nav";
import Hero from "./_sections/hero";
import Thesis from "./_sections/thesis";
import GlobalFunnel from "./_sections/global-funnel";
import ThreeSurfaces from "./_sections/three-surfaces";
import MarinaDay from "./_sections/marina-day";
import LegoBlocks from "./_sections/lego-blocks";
import Flywheel from "./_sections/flywheel";
import PrivacyCta from "./_sections/privacy-cta";

export default function Landing() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Thesis />
        <GlobalFunnel />
        <ThreeSurfaces />
        <MarinaDay />
        <LegoBlocks />
        <Flywheel />
        <PrivacyCta />
      </main>
    </>
  );
}
