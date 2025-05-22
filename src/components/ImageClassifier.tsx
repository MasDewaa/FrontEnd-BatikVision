import React, { useState, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Upload, X, Camera, Image as ImageIcon, AlertCircle, CheckCircle2 } from 'lucide-react';

// Types for classification results
interface ClassificationResult {
  className: string;
  probability: number;
}

const ImageClassifier: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [image, setImage] = useState<string | null>(null);
  const [isClassifying, setIsClassifying] = useState(false);
  const [results, setResults] = useState<ClassificationResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample classification results - in a real application, this would come from the ML model
  const sampleResults: ClassificationResult[] = [
    { className: "Parang", probability: 0.82 },
    { className: "Mega Mendung", probability: 0.11 },
    { className: "Kawung", probability: 0.05 },
    { className: "Truntum", probability: 0.02 }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setResults(null);
    };
    reader.readAsDataURL(file);
  };

  const handleClassify = () => {
    if (!image) return;
    
    setIsClassifying(true);
    setError(null);
    
    // Simulate API call to classification model
    setTimeout(() => {
      setResults(sampleResults);
      setIsClassifying(false);
    }, 2000);
  };

  const handleReset = () => {
    setImage(null);
    setResults(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getBgColor = (isDarkMode: boolean, hasImage: boolean) => {
    if (hasImage) return 'bg-transparent';
    return isDarkMode ? 'bg-gray-800' : 'bg-gray-100';
  };

  const getBorderStyle = (isDarkMode: boolean, hasImage: boolean, hasError: boolean) => {
    if (hasError) return 'border-red-500';
    if (hasImage) return isDarkMode ? 'border-indigo-500' : 'border-indigo-600';
    return isDarkMode ? 'border-gray-700' : 'border-gray-300';
  };

  return (
    <section id="identify" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Identify Your Batik Pattern
          </h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Upload a photo of a batik pattern, and our advanced AI will identify it
            and provide information about its origin and cultural significance.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col">
              {/* Image upload area */}
              <div 
                className={`relative h-80 border-2 border-dashed rounded-xl overflow-hidden transition-all duration-300 flex items-center justify-center mb-4 ${
                  getBgColor(isDarkMode, !!image)
                } ${
                  getBorderStyle(isDarkMode, !!image, !!error)
                }`}
              >
                {image ? (
                  <>
                    <img 
                      src={image} 
                      alt="Uploaded batik" 
                      className="w-full h-full object-contain" 
                    />
                    <button 
                      onClick={handleReset}
                      className="absolute top-2 right-2 p-1 rounded-full bg-gray-800/70 text-white hover:bg-gray-900/70 transition-colors"
                      aria-label="Remove image"
                    >
                      <X size={20} />
                    </button>
                  </>
                ) : (
                  <div className="text-center p-6">
                    <div className="mb-4 flex justify-center">
                      <Upload size={48} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                    </div>
                    <p className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Drag and drop your image here, or click to browse
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports JPG, PNG, WEBP (max 5MB)
                    </p>
                    {error && (
                      <div className="mt-3 flex items-center justify-center text-red-500">
                        <AlertCircle size={16} className="mr-1" />
                        <span className="text-sm">{error}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center ${
                    isDarkMode 
                      ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                      : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300'
                  }`}
                >
                  <ImageIcon size={20} className="mr-2" />
                  Browse Files
                </button>
                <input 
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                  aria-label="Upload image"
                />

                <button
                  onClick={() => alert('Camera functionality would be implemented here')}
                  className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center ${
                    isDarkMode 
                      ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                      : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300'
                  }`}
                >
                  <Camera size={20} className="mr-2" />
                  Take Photo
                </button>
              </div>

              {/* Classify button */}
              {image && !results && (
                <button
                  onClick={handleClassify}
                  disabled={isClassifying}
                  className={`mt-4 py-3 px-4 rounded-lg flex items-center justify-center transition-colors ${
                    isClassifying 
                      ? 'bg-indigo-400 cursor-not-allowed' 
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  } text-white`}
                >
                  {isClassifying ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </>
                  ) : (
                    'Identify Batik Pattern'
                  )}
                </button>
              )}
            </div>

            <div>
              {results ? (
                <div className={`rounded-xl p-6 h-full ${isDarkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
                  <div className="flex items-center mb-4">
                    <CheckCircle2 className="text-green-500 mr-2" size={24} />
                    <h3 className="text-xl font-semibold">Classification Results</h3>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                      {results[0].className}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Most likely batik pattern ({Math.round(results[0].probability * 100)}% confidence)
                    </p>
                    
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-6">
                      <div 
                        className="bg-indigo-600 h-4 rounded-full" 
                        style={{ width: `${results[0].probability * 100}%` }}
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <p className="font-medium">Other possibilities:</p>
                      {results.slice(1).map((result, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-gray-700 dark:text-gray-300">{result.className}</span>
                          <span className="text-gray-600 dark:text-gray-400">{Math.round(result.probability * 100)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold mb-2">What's next?</h4>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li>• View detailed information about this batik pattern</li>
                      <li>• See examples of similar patterns</li>
                      <li>• Learn about the cultural significance and history</li>
                    </ul>
                  </div>
                  
                  <button
                    onClick={handleReset}
                    className="mt-6 w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Identify Another Pattern
                  </button>
                </div>
              ) : (
                <div className={`rounded-xl p-6 h-full border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className="text-xl font-semibold mb-4">About Batik Classification</h3>
                  
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    Our system uses advanced transfer learning models with optimized hyperparameters 
                    to accurately identify batik patterns from images.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <h4 className="font-medium mb-2">How it Works</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        1. Upload a clear image of a batik pattern<br />
                        2. Our AI analyzes the visual features<br />
                        3. The system compares it to our database of patterns<br />
                        4. Results show the most likely pattern with confidence scores
                      </p>
                    </div>
                    
                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <h4 className="font-medium mb-2">For Best Results</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        • Use good lighting<br />
                        • Capture the pattern clearly<br />
                        • Include multiple repeats of the pattern if possible<br />
                        • Avoid reflections and shadows
                      </p>
                    </div>
                  </div>
                  
                  {!image && (
                    <p className="text-center text-sm text-gray-500 italic">
                      Upload an image to get started with the identification process
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageClassifier;