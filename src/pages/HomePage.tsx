import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Gallery from '../components/Gallery';
import ImageClassifier from '../components/ImageClassifier';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-16">
      <Hero />
      <About />
      <Gallery />
      <ImageClassifier />
    </div>
  );
};

export default HomePage;