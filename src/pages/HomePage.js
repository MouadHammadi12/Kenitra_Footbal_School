import '../App.css';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import HomeSections from '../components/HomeSections';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="App">
      <div className="Shell">
        <Navbar />

        <main className="Main">
          <HeroSection />
          <HomeSections />
        </main>

        <Footer />
      </div>
    </div>
  );
}
