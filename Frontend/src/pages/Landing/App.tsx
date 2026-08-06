import Footer from "@/components/Footer/Footer";
import HeaderNav from "@/components/Header/Header";
import {
  Faq,
  HeroSection,
  HowItWorked,
  SupportedFashion,
  ImageEditSection,
} from "@/components/Sections";

function App() {
  return (
    <>
      <div className="overflow-x-hidden">
        <div className="relative mx-auto flex h-screen w-full max-w-6xl flex-col gap-4 px-4 sm:px-6 lg:px-8">
          <HeaderNav />
          <HeroSection />
          <HowItWorked />
          <ImageEditSection />
          <SupportedFashion />
          <Faq />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
