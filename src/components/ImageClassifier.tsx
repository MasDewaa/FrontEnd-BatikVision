import React, { useState, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Upload, X, Camera, Image as ImageIcon, AlertCircle, CheckCircle2, Wifi, WifiOff, Server } from 'lucide-react';
import { classifyImage, checkApiHealth, ApiClassificationResult, ApiError, HealthStatus } from '../services/api';

// Types for classification results
interface ClassificationResult {
  className: string;
  probability: number;
}

const ImageClassifier: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isClassifying, setIsClassifying] = useState(false);
  const [results, setResults] = useState<ClassificationResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [apiHealth, setApiHealth] = useState<HealthStatus | null>(null);
  const [isCheckingHealth, setIsCheckingHealth] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Monitor online status and API health
  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check API health on component mount
    const checkHealth = async () => {
      if (navigator.onLine) {
        setIsCheckingHealth(true);
        try {
          const health = await checkApiHealth();
          setApiHealth(health);
        } catch (error) {
          console.error('Health check failed:', error);
          setApiHealth(null);
        } finally {
          setIsCheckingHealth(false);
        }
      }
    };

    checkHealth();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPG, PNG, WEBP)');
      return;
    }
    
    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setError('Image size must be less than 5MB');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setImageFile(file);
      setResults(null);
    };
    reader.onerror = () => {
      setError('Failed to read the image file');
    };
    reader.readAsDataURL(file);
  };

const handleClassify = async () => {
  if (!imageFile || !isOnline) return;

  setIsClassifying(true);
  setError(null);

  try {
    const apiResult: ApiClassificationResult = await classifyImage(imageFile);

    // Konversi ke array & urutkan berdasarkan probabilitas desc
    const probabilitiesArray = Object.entries(apiResult.probabilities)
      .map(([label, confidence]) => ({
        className: label,
        probability: confidence
      }))
      .sort((a, b) => b.probability - a.probability)
      .slice(0, 5); // Ambil top 5

    setResults(probabilitiesArray);

  } catch (err) {
    console.error('Classification error:', err);

    if (err instanceof ApiError) {
      switch (err.status) {
        case 400:
          setError('Invalid image format. Please try a different image.');
          break;
        case 413:
          setError('Image file is too large. Please use an image smaller than 5MB.');
          break;
        case 422:
          setError('Unprocessable image. Please check the file format.');
          break;
        case 429:
          setError('Too many requests. Please wait a moment and try again.');
          break;
        case 500:
          setError('Server error. Please try again later.');
          break;
        default:
          setError(err.message || 'Failed to classify the image. Please try again.');
      }
    } else {
      setError('An unexpected error occurred. Please check your connection and try again.');
    }

  } finally {
    setIsClassifying(false);
  }
};


  const handleReset = () => {
    setImage(null);
    setImageFile(null);
    setResults(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      // Process the file directly instead of creating a fake event
      setError(null);
      
      // Validate file type
      if (!imageFile.type.startsWith('image/')) {
        setError('Please upload an image file (JPG, PNG, WEBP)');
        return;
      }
      
      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (imageFile.size > maxSize) {
        setError('Image size must be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setImageFile(imageFile);
        setResults(null);
      };
      reader.onerror = () => {
        setError('Failed to read the image file');
      };
      reader.readAsDataURL(imageFile);
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
          
          {/* Connection and API status indicators */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {/* Connection status */}
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
              isOnline 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {isOnline ? <Wifi size={16} className="mr-1" /> : <WifiOff size={16} className="mr-1" />}
              {isOnline ? 'Connected' : 'Offline'}
            </div>

            {/* API Health status */}
            {isOnline && (
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                isCheckingHealth
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  : apiHealth?.status === 'healthy'
                    ? apiHealth.model_loaded
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                <Server size={16} className="mr-1" />
                {isCheckingHealth 
                  ? 'Checking API...' 
                  : apiHealth?.status === 'healthy'
                    ? apiHealth.model_loaded
                      ? 'Model Ready'
                      : 'Model Loading...'
                    : 'API Unavailable'
                }
              </div>
            )}
          </div>
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
                onDragOver={handleDragOver}
                onDrop={handleDrop}
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
                  disabled={!isOnline}
                  className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center transition-colors ${
                    !isOnline 
                      ? 'opacity-50 cursor-not-allowed' 
                      : isDarkMode 
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
                  disabled={!isOnline}
                  className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center transition-colors ${
                    !isOnline 
                      ? 'opacity-50 cursor-not-allowed' 
                      : isDarkMode 
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
                   disabled={isClassifying || !isOnline || (apiHealth ? !apiHealth.model_loaded : false)}
                   className={`mt-4 py-3 px-4 rounded-lg flex items-center justify-center transition-colors ${
                     isClassifying || !isOnline || (apiHealth ? !apiHealth.model_loaded : false)
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
                       Analyzing Pattern...
                     </>
                   ) : !isOnline ? (
                     'Offline - Cannot Classify'
                   ) : apiHealth && !apiHealth.model_loaded ? (
                     'Model Loading...'
                   ) : (
                     'Identify Batik Pattern'
                   )}
                 </button>
               )}

              {/* Error display */}
              {error && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle size={20} className="text-red-600 dark:text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-red-800 dark:text-red-200 font-medium mb-1">Classification Error</h4>
                      <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                      {error.includes('Unable to connect') && (
                        <div className="mt-2 text-red-600 dark:text-red-400 text-sm">
                          <p className="font-medium">Troubleshooting:</p>
                          <ul className="list-disc list-inside mt-1 space-y-1">
                            <li>Ensure your backend API server is running</li>
                            <li>Check if the API URL is correct in your .env file</li>
                            <li>Verify your internet connection</li>
                            <li>Check if the API endpoint accepts the correct request format</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
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
                        className="bg-indigo-600 h-4 rounded-full transition-all duration-1000" 
                        style={{ width: `${results[0].probability * 100}%` }}
                      />
                    </div>
                    
                    {results.length > 1 && (
                      <div className="space-y-3">
                        <p className="font-medium">Other possibilities:</p>
                        {results.slice(1).map((result, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-gray-700 dark:text-gray-300">{result.className}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-gray-400 h-2 rounded-full transition-all duration-1000" 
                                  style={{ width: `${result.probability * 100}%` }}
                                />
                              </div>
                              <span className="text-gray-600 dark:text-gray-400 text-sm w-10">
                                {Math.round(result.probability * 100)}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold mb-2">What's next?</h4>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li>• View detailed information about this batik pattern</li>
                      <li>• See examples of similar patterns in our gallery</li>
                      <li>• Learn about the cultural significance and history</li>
                      <li>• Share your results with others</li>
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
                        3. The system compares it to our trained model<br />
                        4. Results show the most likely pattern with confidence scores
                      </p>
                    </div>
                    
                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <h4 className="font-medium mb-2">For Best Results</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        • Use good lighting and clear focus<br />
                        • Capture the pattern clearly without blur<br />
                        • Include multiple repeats of the pattern if possible<br />
                        • Avoid reflections, shadows, and obstructions<br />
                        • Ensure the image is under 5MB in size
                      </p>
                    </div>

                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <h4 className="font-medium mb-2">Supported Formats</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        • JPEG (.jpg, .jpeg)<br />
                        • PNG (.png)<br />
                        • WebP (.webp)<br />
                        • Maximum file size: 5MB
                      </p>
                    </div>

                    <div className={`p-4 rounded-lg border-l-4 border-orange-500 ${isDarkMode ? 'bg-orange-900/20' : 'bg-orange-50'}`}>
                      <div className="flex items-center mb-2">
                        <Server size={16} className="text-orange-600 dark:text-orange-400 mr-2" />
                        <h4 className="font-medium text-orange-800 dark:text-orange-200">Backend Required</h4>
                      </div>
                      <p className="text-sm text-orange-700 dark:text-orange-300">
                        This feature requires a running backend API service for image classification. 
                        Make sure your machine learning API is running and accessible.
                      </p>
                    </div>
                  </div>
                  
                  {!image && (
                    <p className="text-center text-sm text-gray-500 italic">
                      {isOnline 
                        ? "Upload an image to get started with the identification process"
                        : "Please check your internet connection to use the classification feature"
                      }
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