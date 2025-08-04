import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { ChevronLeft, ChevronRight, Info, Search, Filter } from 'lucide-react';

// Batik data based on the files in Batik Nitik 960 folder - All 60 classes
const batikData = [
  {
    id: 1,
    name: "Sekar Kemuning",
    className: "1 Sekar Kemuning",
    imageA: "/Batik Nitik 960/1 Sekar Kemuning A.jpg",
    imageB: "/Batik Nitik 960/1 Sekar Kemuning B.jpg",
    origin: "Yogyakarta",
    description: "Pattern inspired by the kemuning flower, featuring delicate floral motifs arranged in a harmonious composition.",
    category: "Floral"
  },
  {
    id: 2,
    name: "Sekar Liring",
    className: "2 Sekar Liring",
    imageA: "/Batik Nitik 960/2 Sekar Liring A.jpg",
    imageB: "/Batik Nitik 960/2 Sekar Liring B.jpg",
    origin: "Central Java",
    description: "A traditional pattern with flowing lines and geometric elements representing natural movement.",
    category: "Geometric"
  },
  {
    id: 3,
    name: "Sekar Duren",
    className: "3 Sekar Duren",
    imageA: "/Batik Nitik 960/3 Sekar Duren A.jpg",
    imageB: "/Batik Nitik 960/3 Sekar Duren B.jpg",
    origin: "Java",
    description: "Pattern inspired by the durian fruit, featuring spiky geometric motifs and organic forms.",
    category: "Fruit"
  },
  {
    id: 4,
    name: "Sekar Gayam",
    className: "4 Sekar Gayam",
    imageA: "/Batik Nitik 960/4 Sekar Gayam A.jpg",
    imageB: "/Batik Nitik 960/4 Sekar Gayam B.jpg",
    origin: "Central Java",
    description: "Elegant pattern featuring the gayam flower motif with intricate detailing and balanced composition.",
    category: "Floral"
  },
  {
    id: 5,
    name: "Sekar Pacar",
    className: "5 Sekar Pacar",
    imageA: "/Batik Nitik 960/5 Sekar Pacar A.jpg",
    imageB: "/Batik Nitik 960/5 Sekar Pacar B.jpg",
    origin: "Java",
    description: "Pattern inspired by the pacar flower, known for its vibrant colors and medicinal properties.",
    category: "Floral"
  },
  {
    id: 6,
    name: "Arumdalu",
    className: "6 Arumdalu",
    imageA: "/Batik Nitik 960/6 Arumdalu A.jpg",
    imageB: "/Batik Nitik 960/6 Arumdalu B.jpg",
    origin: "Yogyakarta",
    description: "A sophisticated pattern featuring the arumdalu flower, symbolizing purity and elegance.",
    category: "Floral"
  },
  {
    id: 7,
    name: "Sekar Srigadhing",
    className: "7 Sekar Srigadhing",
    imageA: "/Batik Nitik 960/7 Sekar Srigadhing A.jpg",
    imageB: "/Batik Nitik 960/7 Sekar Srigadhing B.jpg",
    origin: "Central Java",
    description: "Pattern featuring the srigadhing flower motif with traditional Javanese aesthetic elements.",
    category: "Floral"
  },
  {
    id: 8,
    name: "Kemukus",
    className: "8 Kemukus",
    imageA: "/Batik Nitik 960/8 Kemukus A.jpg",
    imageB: "/Batik Nitik 960/8 Kemukus B.jpg",
    origin: "Java",
    description: "A distinctive pattern inspired by the kemukus plant, featuring unique geometric arrangements.",
    category: "Geometric"
  },
  {
    id: 9,
    name: "Sekar Gudhe",
    className: "9 Sekar Gudhe",
    imageA: "/Batik Nitik 960/9 Sekar Gudhe A.jpg",
    imageB: "/Batik Nitik 960/9 Sekar Gudhe B.jpg",
    origin: "Central Java",
    description: "Pattern featuring the gudhe flower motif with traditional batik techniques and cultural significance.",
    category: "Floral"
  },
  {
    id: 10,
    name: "Sekar Ketongkeng",
    className: "10 Sekar Ketongkeng",
    imageA: "/Batik Nitik 960/10 Sekar Ketongkeng A.jpg",
    imageB: "/Batik Nitik 960/10 Sekar Ketongkeng B.jpg",
    origin: "Java",
    description: "A unique pattern inspired by the ketongkeng fruit, featuring organic forms and natural motifs.",
    category: "Fruit"
  },
  {
    id: 11,
    name: "Brendhi",
    className: "11 Brendhi",
    imageA: "/Batik Nitik 960/11 Brendhi A.jpg",
    imageB: "/Batik Nitik 960/11 Brendhi B.jpg",
    origin: "Central Java",
    description: "Traditional pattern with distinctive geometric elements and cultural heritage significance.",
    category: "Geometric"
  },
  {
    id: 12,
    name: "Cakar Ayam",
    className: "12 Cakar Ayam",
    imageA: "/Batik Nitik 960/12 Cakar Ayam A.jpg",
    imageB: "/Batik Nitik 960/12 Cakar Ayam B.jpg",
    origin: "Java",
    description: "Pattern inspired by chicken claws, featuring distinctive claw-like geometric motifs.",
    category: "Animal"
  },
  {
    id: 13,
    name: "Sekar Menur",
    className: "13 Sekar Menur",
    imageA: "/Batik Nitik 960/13 Sekar Menur A.jpg",
    imageB: "/Batik Nitik 960/13 Sekar Menur B.jpg",
    origin: "Central Java",
    description: "Elegant pattern featuring the menur flower motif with delicate detailing and balanced composition.",
    category: "Floral"
  },
  {
    id: 14,
    name: "Sekar Tebu",
    className: "14 Sekar Tebu",
    imageA: "/Batik Nitik 960/14 Sekar Tebu A.jpg",
    imageB: "/Batik Nitik 960/14 Sekar Tebu B.jpg",
    origin: "Java",
    description: "Pattern inspired by sugarcane flowers, featuring tall, elegant motifs and natural forms.",
    category: "Floral"
  },
  {
    id: 15,
    name: "Sekar Manggis",
    className: "15 Sekar Manggis",
    imageA: "/Batik Nitik 960/15 Sekar Manggis A.jpg",
    imageB: "/Batik Nitik 960/15 Sekar Manggis B.jpg",
    origin: "Central Java",
    description: "Pattern featuring the manggis fruit motif with its distinctive crown-like appearance.",
    category: "Fruit"
  },
  {
    id: 16,
    name: "Sekar Randhu",
    className: "16 Sekar Randhu",
    imageA: "/Batik Nitik 960/16 Sekar Randhu A.jpg",
    imageB: "/Batik Nitik 960/16 Sekar Randhu B.jpg",
    origin: "Java",
    description: "Traditional pattern with the randhu flower motif, symbolizing natural beauty and harmony.",
    category: "Floral"
  },
  {
    id: 17,
    name: "Worawari Rumpuk",
    className: "17 Worawari Rumpuk",
    imageA: "/Batik Nitik 960/17 Worawari Rumpuk A.jpg",
    imageB: "/Batik Nitik 960/17 Worawari Rumpuk B.jpg",
    origin: "Central Java",
    description: "Pattern featuring clustered worawari flowers in a dense, intricate arrangement.",
    category: "Floral"
  },
  {
    id: 18,
    name: "Sekar Dhuku",
    className: "18 Sekar Dhuku",
    imageA: "/Batik Nitik 960/18 Sekar Dhuku A.jpg",
    imageB: "/Batik Nitik 960/18 Sekar Dhuku B.jpg",
    origin: "Java",
    description: "Pattern inspired by the dhuku fruit, featuring organic forms and natural motifs.",
    category: "Fruit"
  },
  {
    id: 19,
    name: "Sekar Jagung",
    className: "19 Sekar Jagung",
    imageA: "/Batik Nitik 960/19 Sekar Jagung A.jpg",
    imageB: "/Batik Nitik 960/19 Sekar Jagung B.jpg",
    origin: "Central Java",
    description: "Pattern featuring corn flower motifs, symbolizing fertility and agricultural abundance.",
    category: "Floral"
  },
  {
    id: 20,
    name: "Jayakirana",
    className: "20 Jayakirana",
    imageA: "/Batik Nitik 960/20 Jayakirana A.jpg",
    imageB: "/Batik Nitik 960/20 Jayakirana B.jpg",
    origin: "Java",
    description: "A majestic pattern with royal connotations, featuring sophisticated geometric and floral elements.",
    category: "Royal"
  },
  {
    id: 21,
    name: "Mawur",
    className: "21 Mawur",
    imageA: "/Batik Nitik 960/21 Mawur A.jpg",
    imageB: "/Batik Nitik 960/21 Mawur B.jpg",
    origin: "Central Java",
    description: "Traditional pattern with scattered motifs, creating a dynamic and lively composition.",
    category: "Geometric"
  },
  {
    id: 22,
    name: "Sekar Tanjung",
    className: "22 Sekar Tanjung",
    imageA: "/Batik Nitik 960/22 Sekar Tanjung A.jpg",
    imageB: "/Batik Nitik 960/22 Sekar Tanjung B.jpg",
    origin: "Java",
    description: "Pattern featuring the tanjung flower motif, known for its fragrant and beautiful appearance.",
    category: "Floral"
  },
  {
    id: 23,
    name: "Sekar Keben",
    className: "23 Sekar Keben",
    imageA: "/Batik Nitik 960/23 Sekar Keben A.jpg",
    imageB: "/Batik Nitik 960/23 Sekar Keben B.jpg",
    origin: "Central Java",
    description: "Pattern inspired by the keben flower, featuring elegant floral motifs and traditional styling.",
    category: "Floral"
  },
  {
    id: 24,
    name: "Sekar Srengenge",
    className: "24 Sekar Srengenge",
    imageA: "/Batik Nitik 960/24 Sekar Srengenge A.jpg",
    imageB: "/Batik Nitik 960/24 Sekar Srengenge B.jpg",
    origin: "Java",
    description: "Pattern featuring sun flower motifs, symbolizing light, warmth, and divine energy.",
    category: "Floral"
  },
  {
    id: 25,
    name: "Sekar Soka",
    className: "25 Sekar Soka",
    imageA: "/Batik Nitik 960/25 Sekar Soka A.jpg",
    imageB: "/Batik Nitik 960/25 Sekar Soka B.jpg",
    origin: "Central Java",
    description: "Pattern inspired by the soka flower, featuring vibrant motifs and cultural significance.",
    category: "Floral"
  },
  {
    id: 26,
    name: "Sekar Nangka",
    className: "26 Sekar Nangka",
    imageA: "/Batik Nitik 960/26 Sekar Nangka A.jpg",
    imageB: "/Batik Nitik 960/26 Sekar Nangka B.jpg",
    origin: "Java",
    description: "Pattern featuring jackfruit flower motifs, symbolizing abundance and natural wealth.",
    category: "Fruit"
  },
  {
    id: 27,
    name: "Kawung Nitik",
    className: "27 Kawung Nitik",
    imageA: "/Batik Nitik 960/27 Kawung Nitik A.jpg",
    imageB: "/Batik Nitik 960/27 Kawung Nitik B.jpg",
    origin: "Central Java",
    description: "A refined variation of the traditional kawung pattern with intricate nitik detailing.",
    category: "Geometric"
  },
  {
    id: 28,
    name: "Sekar Kenthang",
    className: "28 Sekar Kenthang",
    imageA: "/Batik Nitik 960/28 Sekar Kenthang A.jpg",
    imageB: "/Batik Nitik 960/28 Sekar Kenthang B.jpg",
    origin: "Java",
    description: "Pattern featuring potato flower motifs, representing agricultural heritage and sustenance.",
    category: "Floral"
  },
  {
    id: 29,
    name: "Sekar Pudhak",
    className: "29 Sekar Pudhak",
    imageA: "/Batik Nitik 960/29 Sekar Pudhak A.jpg",
    imageB: "/Batik Nitik 960/29 Sekar Pudhak B.jpg",
    origin: "Central Java",
    description: "Pattern inspired by the pudhak flower, featuring elegant and sophisticated floral motifs.",
    category: "Floral"
  },
  {
    id: 30,
    name: "Sekar Dlima",
    className: "30 Sekar Dlima",
    imageA: "/Batik Nitik 960/30 Sekar Dlima A.jpg",
    imageB: "/Batik Nitik 960/30 Sekar Dlima B.jpg",
    origin: "Java",
    description: "Pattern featuring five-petaled flower motifs, symbolizing balance and harmony in nature.",
    category: "Floral"
  },
  {
    id: 31,
    name: "Krawitan",
    className: "31 Krawitan",
    imageA: "/Batik Nitik 960/31 Krawitan  A.jpg",
    imageB: "/Batik Nitik 960/31 Krawitan  B.jpg",
    origin: "Central Java",
    description: "Traditional pattern with distinctive geometric elements and cultural heritage significance.",
    category: "Geometric"
  },
  {
    id: 32,
    name: "Cinde Wilis",
    className: "32 Cinde Wilis",
    imageA: "/Batik Nitik 960/32 Cinde Wilis A.jpg",
    imageB: "/Batik Nitik 960/32 Cinde Wilis B.jpg",
    origin: "Java",
    description: "A sophisticated pattern featuring the cinde wilis motif with traditional Javanese aesthetics.",
    category: "Geometric"
  },
  {
    id: 33,
    name: "Sekar Mlathi",
    className: "33 Sekar Mlathi",
    imageA: "/Batik Nitik 960/33 Sekar Mlathi A.jpg",
    imageB: "/Batik Nitik 960/33 Sekar Mlathi B.jpg",
    origin: "Central Java",
    description: "Pattern featuring jasmine flower motifs, symbolizing purity, beauty, and spiritual significance.",
    category: "Floral"
  },
  {
    id: 34,
    name: "Kuncup Kanthil",
    className: "34 Kuncup Kanthil",
    imageA: "/Batik Nitik 960/34 Kuncup Kanthil A.jpg",
    imageB: "/Batik Nitik 960/34 Kuncup Kanthil B.jpg",
    origin: "Java",
    description: "Pattern featuring budding kanthil flowers, representing growth, potential, and new beginnings.",
    category: "Floral"
  },
  {
    id: 35,
    name: "Sekar Dangan",
    className: "35 Sekar Dangan",
    imageA: "/Batik Nitik 960/35 Sekar Dangan A.jpg",
    imageB: "/Batik Nitik 960/35 Sekar Dangan B.jpg",
    origin: "Central Java",
    description: "Pattern inspired by the dangan flower, featuring delicate and intricate floral motifs.",
    category: "Floral"
  },
  {
    id: 36,
    name: "Sekar Sawo",
    className: "36 Sekar Sawo",
    imageA: "/Batik Nitik 960/36 Sekar Sawo A.jpg",
    imageB: "/Batik Nitik 960/36 Sekar Sawo B.jpg",
    origin: "Java",
    description: "Pattern featuring sapodilla flower motifs, symbolizing sweetness and natural abundance.",
    category: "Fruit"
  },
  {
    id: 37,
    name: "Manggar",
    className: "37 Manggar",
    imageA: "/Batik Nitik 960/37 Manggar A.jpg",
    imageB: "/Batik Nitik 960/37 Manggar B.jpg",
    origin: "Central Java",
    description: "Pattern inspired by coconut flower clusters, representing tropical abundance and natural beauty.",
    category: "Floral"
  },
  {
    id: 38,
    name: "Sekar Cengkeh",
    className: "38 Sekar Cengkeh",
    imageA: "/Batik Nitik 960/38 Sekar Cengkeh A.jpg",
    imageB: "/Batik Nitik 960/38 Sekar Cengkeh B.jpg",
    origin: "Java",
    description: "Pattern featuring clove flower motifs, symbolizing spice trade heritage and aromatic beauty.",
    category: "Floral"
  },
  {
    id: 39,
    name: "Sritaman",
    className: "39 Sritaman",
    imageA: "/Batik Nitik 960/39 Sritaman A.jpg",
    imageB: "/Batik Nitik 960/39 Sritaman B.jpg",
    origin: "Central Java",
    description: "A traditional pattern with royal connotations, featuring sophisticated geometric elements.",
    category: "Royal"
  },
  {
    id: 40,
    name: "Sekar Mundhu",
    className: "40 Sekar Mundhu",
    imageA: "/Batik Nitik 960/40 Sekar Mundhu A.jpg",
    imageB: "/Batik Nitik 960/40 Sekar Mundhu B.jpg",
    origin: "Java",
    description: "Pattern inspired by the mundhu flower, featuring elegant and traditional floral motifs.",
    category: "Floral"
  },
  {
    id: 41,
    name: "Sekar Andhong",
    className: "41 Sekar Andhong",
    imageA: "/Batik Nitik 960/41 Sekar Andhong A.jpg",
    imageB: "/Batik Nitik 960/41 Sekar Andhong B.jpg",
    origin: "Central Java",
    description: "Pattern featuring the andhong flower motif with traditional Javanese aesthetic elements.",
    category: "Floral"
  },
  {
    id: 42,
    name: "Gedhangan",
    className: "42 Gedhangan",
    imageA: "/Batik Nitik 960/42 Gedhangan A.jpg",
    imageB: "/Batik Nitik 960/42 Gedhangan B.jpg",
    origin: "Java",
    description: "Traditional pattern with distinctive geometric elements and cultural heritage significance.",
    category: "Geometric"
  },
  {
    id: 43,
    name: "Sekar Pala",
    className: "43 Sekar Pala",
    imageA: "/Batik Nitik 960/43 Sekar Pala A.jpg",
    imageB: "/Batik Nitik 960/43 Sekar Pala B.jpg",
    origin: "Central Java",
    description: "Pattern inspired by nutmeg flowers, featuring intricate detailing and spice trade heritage.",
    category: "Floral"
  },
  {
    id: 44,
    name: "Klampok Arum",
    className: "44 Klampok Arum",
    imageA: "/Batik Nitik 960/44 Klampok Arum A.jpg",
    imageB: "/Batik Nitik 960/44 Klampok Arum B.jpg",
    origin: "Java",
    description: "Pattern featuring fragrant klampok flowers, symbolizing aromatic beauty and natural elegance.",
    category: "Floral"
  },
  {
    id: 45,
    name: "Sekar Jali",
    className: "45 Sekar Jali",
    imageA: "/Batik Nitik 960/45 Sekar Jali A.jpg",
    imageB: "/Batik Nitik 960/45 Sekar Jali B.jpg",
    origin: "Central Java",
    description: "Pattern featuring jali flower motifs, representing natural beauty and traditional Javanese aesthetics.",
    category: "Floral"
  },
  {
    id: 46,
    name: "Sekar Lintang",
    className: "46 Sekar Lintang",
    imageA: "/Batik Nitik 960/46 Sekar Lintang A.jpg",
    imageB: "/Batik Nitik 960/46 Sekar Lintang B.jpg",
    origin: "Java",
    description: "Pattern inspired by star flowers, featuring celestial motifs and cosmic symbolism.",
    category: "Floral"
  },
  {
    id: 47,
    name: "Sekar Kenanga",
    className: "47 Sekar Kenanga",
    imageA: "/Batik Nitik 960/47 Sekar Kenanga A.jpg",
    imageB: "/Batik Nitik 960/47 Sekar Kenanga B.jpg",
    origin: "Central Java",
    description: "Pattern featuring ylang-ylang flower motifs, symbolizing fragrance, beauty, and spiritual significance.",
    category: "Floral"
  },
  {
    id: 48,
    name: "Sekar Jeruk",
    className: "48 Sekar Jeruk",
    imageA: "/Batik Nitik 960/48 Sekar Jeruk A.jpg",
    imageB: "/Batik Nitik 960/48 Sekar Jeruk B.jpg",
    origin: "Java",
    description: "Pattern inspired by citrus flowers, featuring bright, cheerful motifs and natural vitality.",
    category: "Fruit"
  },
  {
    id: 49,
    name: "Sekar Mindi",
    className: "49 Sekar Mindi",
    imageA: "/Batik Nitik 960/49 Sekar Mindi A.jpg",
    imageB: "/Batik Nitik 960/49 Sekar Mindi B.jpg",
    origin: "Central Java",
    description: "Pattern featuring mindi flower motifs, representing traditional Javanese botanical heritage.",
    category: "Floral"
  },
  {
    id: 50,
    name: "Tanjung Gunung",
    className: "50 Tanjung Gunung",
    imageA: "/Batik Nitik 960/50 Tanjung Gunung A.jpg",
    imageB: "/Batik Nitik 960/50 Tanjung Gunung B.jpg",
    origin: "Java",
    description: "Pattern inspired by mountain tanjung flowers, symbolizing strength, elevation, and natural grandeur.",
    category: "Floral"
  },
  {
    id: 51,
    name: "Sekar Kenikir",
    className: "51 Sekar Kenikir",
    imageA: "/Batik Nitik 960/51 Sekar Kenikir A.jpg",
    imageB: "/Batik Nitik 960/51 Sekar Kenikir B.jpg",
    origin: "Central Java",
    description: "Pattern featuring kenikir flower motifs, representing traditional herbal medicine and natural healing.",
    category: "Floral"
  },
  {
    id: 52,
    name: "Sekar Blimbing",
    className: "52 Sekar Blimbing",
    imageA: "/Batik Nitik 960/52 Sekar Blimbing A.jpg",
    imageB: "/Batik Nitik 960/52 Sekar Blimbing B.jpg",
    origin: "Java",
    description: "Pattern inspired by starfruit flowers, featuring distinctive star-shaped motifs and geometric beauty.",
    category: "Fruit"
  },
  {
    id: 53,
    name: "Sekar Pijetan",
    className: "53 Sekar Pijetan",
    imageA: "/Batik Nitik 960/53 Sekar Pijetan A.jpg",
    imageB: "/Batik Nitik 960/53 Sekar Pijetan B.jpg",
    origin: "Central Java",
    description: "Pattern featuring pijetan flower motifs, representing traditional Javanese botanical knowledge.",
    category: "Floral"
  },
  {
    id: 54,
    name: "Sari Mulat",
    className: "54 Sari Mulat",
    imageA: "/Batik Nitik 960/54 Sari Mulat A.jpg",
    imageB: "/Batik Nitik 960/54 Sari Mulat B.jpg",
    origin: "Java",
    description: "A sophisticated pattern with royal connotations, featuring elegant geometric and floral elements.",
    category: "Royal"
  },
  {
    id: 55,
    name: "Sekar Mrica",
    className: "55 Sekar Mrica",
    imageA: "/Batik Nitik 960/55 Sekar Mrica A.jpg",
    imageB: "/Batik Nitik 960/55 Sekar Mrica B.jpg",
    origin: "Central Java",
    description: "Pattern featuring pepper flower motifs, symbolizing spice trade heritage and culinary traditions.",
    category: "Floral"
  },
  {
    id: 56,
    name: "Sekar Kepel",
    className: "56 Sekar Kepel",
    imageA: "/Batik Nitik 960/56 Sekar Kepel A.jpg",
    imageB: "/Batik Nitik 960/56 Sekar Kepel B.jpg",
    origin: "Java",
    description: "Pattern inspired by kepel fruit flowers, featuring unique motifs and traditional significance.",
    category: "Fruit"
  },
  {
    id: 57,
    name: "Truntum Kurung",
    className: "57 Truntum Kurung",
    imageA: "/Batik Nitik 960/57 Truntum Kurung A.jpg",
    imageB: "/Batik Nitik 960/57 Truntum Kurung B.jpg",
    origin: "Central Java",
    description: "A traditional pattern featuring truntum motifs in a framed arrangement, symbolizing love and devotion.",
    category: "Geometric"
  },
  {
    id: 58,
    name: "Jayakusuma",
    className: "58 Jayakusuma",
    imageA: "/Batik Nitik 960/58 Jayakusuma A.jpg",
    imageB: "/Batik Nitik 960/58 Jayakusuma B.jpg",
    origin: "Java",
    description: "A majestic pattern with royal connotations, featuring sophisticated geometric and floral elements.",
    category: "Royal"
  },
  {
    id: 59,
    name: "Rengganis",
    className: "59 Rengganis",
    imageA: "/Batik Nitik 960/59 Rengganis A.jpg",
    imageB: "/Batik Nitik 960/59 Rengganis B.jpg",
    origin: "Central Java",
    description: "A traditional pattern with royal connotations, featuring sophisticated geometric and floral elements.",
    category: "Royal"
  },
  {
    id: 60,
    name: "Sekar Gambir",
    className: "60 Sekar Gambir",
    imageA: "/Batik Nitik 960/60 Sekar Gambir A.jpg",
    imageB: "/Batik Nitik 960/60 Sekar Gambir B.jpg",
    origin: "Java",
    description: "Pattern featuring gambir flower motifs, representing traditional herbal medicine and natural healing.",
    category: "Floral"
  }
];

const categories = ["All", "Floral", "Fruit", "Geometric", "Animal", "Royal"];

const Gallery: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [selectedBatik, setSelectedBatik] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentImage, setCurrentImage] = useState<'A' | 'B'>('A');
  
  const handlePrev = () => {
    if (selectedBatik === null) return;
    setSelectedBatik(prev => (prev === 0 ? batikData.length - 1 : prev - 1));
    setCurrentImage('A');
  };
  
  const handleNext = () => {
    if (selectedBatik === null) return;
    setSelectedBatik(prev => (prev === batikData.length - 1 ? 0 : prev + 1));
    setCurrentImage('A');
  };

  const filteredBatik = batikData.filter(batik => {
    const matchesSearch = batik.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         batik.origin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || batik.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="gallery" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Batik Nitik Pattern Gallery
          </h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Explore the rich diversity of Indonesian batik nitik patterns. This collection features over 60 unique patterns
            from various regions, each with its own cultural significance and artistic beauty.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search patterns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 pr-4 py-2 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400" size={20} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredBatik.length} of {batikData.length} patterns
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBatik.map((batik, index) => (
            <div 
              key={batik.id}
              className={`rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-2 ${
                isDarkMode ? 'shadow-lg shadow-indigo-900/10' : 'shadow-lg'
              }`}
              onClick={() => {
                setSelectedBatik(index);
                setCurrentImage('A');
              }}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={batik.imageA} 
                  alt={batik.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-lg font-bold">{batik.name}</h3>
                    <p className="text-sm opacity-90">Origin: {batik.origin}</p>
                    <span className="inline-block mt-1 px-2 py-1 bg-indigo-600/80 rounded-full text-xs">
                      {batik.category}
                    </span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm">
                  <Info size={16} className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredBatik.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No patterns found matching your search criteria.
            </p>
          </div>
        )}
        
        {/* Modal for detailed view */}
        {selectedBatik !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={() => setSelectedBatik(null)}>
            <div 
              className={`relative max-w-6xl w-full rounded-xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
              onClick={e => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="h-64 lg:h-auto relative">
                  <img 
                    src={currentImage === 'A' ? filteredBatik[selectedBatik].imageA : filteredBatik[selectedBatik].imageB} 
                    alt={filteredBatik[selectedBatik].name}
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
                  
                  {/* Image Toggle Buttons */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    <button
                      onClick={() => setCurrentImage('A')}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        currentImage === 'A' 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-white/20 text-white backdrop-blur-sm'
                      }`}
                    >
                      A
                    </button>
                    <button
                      onClick={() => setCurrentImage('B')}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        currentImage === 'B' 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-white/20 text-white backdrop-blur-sm'
                      }`}
                    >
                      B
                    </button>
                  </div>
                </div>
                <div className="p-6 overflow-y-auto max-h-96 lg:max-h-none">
                  <h3 className="text-2xl font-serif font-bold mb-2">{filteredBatik[selectedBatik].name}</h3>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-2">Origin: {filteredBatik[selectedBatik].origin}</p>
                  <span className="inline-block mb-4 px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm">
                    {filteredBatik[selectedBatik].category}
                  </span>
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-2">Description</h4>
                    <p className="text-gray-700 dark:text-gray-300">{filteredBatik[selectedBatik].description}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Cultural Significance</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Batik nitik patterns carry deep cultural meaning and are often worn during important ceremonies and life events.
                      Each pattern represents different aspects of Javanese culture, from natural elements to spiritual symbolism.
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