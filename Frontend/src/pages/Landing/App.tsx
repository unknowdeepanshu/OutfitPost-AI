import Footer from "@/components/Footer/Footer";
import HeaderNav from "@/components/Header/Header";
import {
  Faq,
  HeroSection,
  HowItWorked,
  SupportedFashion,
} from "@/components/Sections";

import { Link } from "react-router";

function App() {
  return (
    <>
      <div className="overflow-x-hidden">
        <div className="mx-auto flex h-screen w-full max-w-6xl flex-col gap-4 px-4 sm:px-6 lg:px-8">
          <HeaderNav />
          <HeroSection />
          <HowItWorked />
          <SupportedFashion />
          <Faq />
          <Footer />
          {/* <Link to={"/dashboard"} className="py-4">
            this is landing pages
          </Link> */}
        </div>
      </div>
    </>
  );
}

export default App;
