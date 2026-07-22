import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedJobs from "../components/FeaturedJobs";
import Categories from "../components/Categories";
import WhyChoose from "../components/WhyChoose";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <Hero />
      <FeaturedJobs />
      <Categories />
      <WhyChoose />
      <Footer />
    </>
  );
}

export default Home;