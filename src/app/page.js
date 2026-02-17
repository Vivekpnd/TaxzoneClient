import BestSellers from "./home-content/component/BestSellers";
import AboutSection from '../components/AboutSection'

export default function RootHome() {
  return (
    <main style={{ padding: 0 }} className="min-h-[100vh]">
      <BestSellers />
      <AboutSection />
    </main>
  );
}
