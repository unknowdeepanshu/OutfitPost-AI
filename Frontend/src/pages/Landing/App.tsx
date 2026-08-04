import HeaderNav from "@/components/Header/Header";
import { HeroSection } from "@/components/Sections/heroSection";
import { Link } from "react-router";

function App() {
  return (
    <>
      <div className="sm:max-w-2x1 mx-auto flex h-screen max-w-2/3 flex-col gap-4 md:max-w-2/3">
        <HeaderNav />
        <HeroSection />
        <Link to={"/dashboard"}>this is landing pages</Link>
      </div>
    </>
  );
}

export default App;
