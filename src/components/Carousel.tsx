import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    url: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&q=80&w=1920",
    title: "Explore Amazing Destinations",
    subtitle: "Your journey begins here",
    link: "/services"
  },
  {
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=1920",
    title: "Nature's Beauty",
    subtitle: "Discover the wilderness",
    link: "/portfolio"
  },
  {
    url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=1920",
    title: "Adventure Awaits",
    subtitle: "Create unforgettable memories",
    link: "/contact"
  }
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleSlideClick = () => {
    navigate(slides[currentIndex].link);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const isLastSlide = currentIndex === slides.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      <div
        onClick={handleSlideClick}
        style={{
          backgroundImage: `url(${slides[currentIndex].url})`,
        }}
        className="h-full w-full cursor-pointer bg-cover bg-center duration-500 ease-out"
      >
        <div className="absolute inset-0 bg-black/30 transition-all hover:bg-black/40">
          <div className="flex h-full items-center justify-center text-center">
            <div className="px-4">
              <h2 className="mb-2 text-4xl font-bold text-white">
                {slides[currentIndex].title}
              </h2>
              <p className="text-xl text-gray-200">
                {slides[currentIndex].subtitle}
              </p>
              <button className="mt-6 rounded-full bg-white/20 px-6 py-2 text-white backdrop-blur-sm transition-all hover:bg-white/30">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 -translate-y-1/2 transform rounded-full bg-black/20 p-2 text-white transition hover:bg-black/40"
      >
        <ChevronLeft size={30} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 -translate-y-1/2 transform rounded-full bg-black/20 p-2 text-white transition hover:bg-black/40"
      >
        <ChevronRight size={30} />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              goToSlide(index);
            }}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}