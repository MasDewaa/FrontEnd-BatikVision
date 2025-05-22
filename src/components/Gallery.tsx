import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';

// Sample batik data - in a real application, this would come from an API
const batikData = [
  {
    id: 1,
    name: "Parang",
    image: "https://images.pexels.com/photos/5913391/pexels-photo-5913391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    origin: "Java",
    description: "One of the oldest batik patterns featuring diagonal lines representing waves or cliffs."
  },
  {
    id: 2,
    name: "Mega Mendung",
    image: "https://images.pexels.com/photos/6045028/pexels-photo-6045028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    origin: "Cirebon",
    description: "Cloud-like pattern symbolizing rain and fertility, characterized by gradations of color."
  },
  {
    id: 3,
    name: "Kawung",
    image: "https://images.pexels.com/photos/6045196/pexels-photo-6045196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    origin: "Central Java",
    description: "Geometric pattern of intersecting circles, originally reserved for royalty."
  },
  {
    id: 4,
    name: "Sidomukti",
    image: "https://images.pexels.com/photos/12489125/pexels-photo-12489125.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    origin: "Solo",
    description: "Pattern representing prosperity and success, often used in wedding ceremonies."
  },
  {
    id: 5,
    name: "Sogan",
    image: "https://images.pexels.com/photos/4219644/pexels-photo-4219644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    origin: "Yogyakarta",
    description: "Characterized by its earthy brown color derived from the local soga tree."
  },
  {
    id: 6,
    name: "Truntum",
    image: "https://images.pexels.com/photos/5913413/pexels-photo-5913413.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    origin: "Central Java",
    description: "Small star-like floral pattern symbolizing unconditional love and loyalty."
  }
];

const Gallery: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [selectedBatik, setSelectedBatik] = useState<number | null>(null);
  
  const handlePrev = () => {
    if (selectedBatik === null) return;
    setSelectedBatik(prev => (prev === 0 ? batikData.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    if (selectedBatik === null) return;
    setSelectedBatik(prev => (prev === batikData.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="gallery" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Batik Pattern Gallery
          </h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Explore the rich diversity of Indonesian batik patterns from various regions.
            Click on any pattern to learn more about its history and significance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {batikData.map((batik, index) => (
            <div 
              key={batik.id}
              className={`rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-2 ${
                isDarkMode ? 'shadow-lg shadow-indigo-900/10' : 'shadow-lg'
              }`}
              onClick={() => setSelectedBatik(index)}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={batik.image} 
                  alt={batik.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-xl font-bold">{batik.name}</h3>
                    <p className="text-sm opacity-90">Origin: {batik.origin}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm">
                  <Info size={16} className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Modal for detailed view */}
        {selectedBatik !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={() => setSelectedBatik(null)}>
            <div 
              className={`relative max-w-4xl w-full rounded-xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
              onClick={e => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-64 md:h-auto relative">
                  <img 
                    src={batikData[selectedBatik].image} 
                    alt={batikData[selectedBatik].name}
                    className="w-full h-full object-cover" 
                  />
                  <button 
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm"
                    onClick={handlePrev}
                  >
                    <ChevronLeft size={24} className="text-white" />
                  </button>
                  <button 
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm"
                    onClick={handleNext}
                  >
                    <ChevronRight size={24} className="text-white" />
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-serif font-bold mb-2">{batikData[selectedBatik].name}</h3>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-4">Origin: {batikData[selectedBatik].origin}</p>
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-2">Description</h4>
                    <p className="text-gray-700 dark:text-gray-300">{batikData[selectedBatik].description}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Cultural Significance</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Batik patterns carry deep cultural meaning and are often worn during important ceremonies and life events.
                      Each region in Indonesia has developed its own distinctive styles and techniques.
                    </p>
                  </div>
                  <button 
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    onClick={() => setSelectedBatik(null)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;