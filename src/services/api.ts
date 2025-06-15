// API configuration and service functions
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface ApiClassificationResult {
  class_name: string;
  confidence: number;
  probabilities?: Record<string, number>;
}

export interface ApiResponse {
  success: boolean;
  data?: ApiClassificationResult;
  error?: string;
  message?: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Mock batik patterns for demonstration
const MOCK_BATIK_PATTERNS = [
  'Parang Rusak',
  'Kawung',
  'Mega Mendung',
  'Truntum',
  'Sido Mukti',
  'Sekar Jagad',
  'Ceplok',
  'Nitik',
  'Tambal',
  'Lereng'
];

// Mock classification function for demo purposes
const mockClassifyImage = async (imageFile: File): Promise<ApiClassificationResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
  
  // Generate mock results
  const mainPattern = MOCK_BATIK_PATTERNS[Math.floor(Math.random() * MOCK_BATIK_PATTERNS.length)];
  const confidence = 0.7 + Math.random() * 0.25; // 70-95% confidence
  
  // Generate probabilities for other patterns
  const probabilities: Record<string, number> = {};
  probabilities[mainPattern] = confidence;
  
  // Add 2-3 other patterns with lower probabilities
  const otherPatterns = MOCK_BATIK_PATTERNS.filter(p => p !== mainPattern)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  
  let remainingProbability = 1 - confidence;
  otherPatterns.forEach((pattern, index) => {
    const prob = index === otherPatterns.length - 1 
      ? remainingProbability 
      : remainingProbability * (0.3 + Math.random() * 0.4);
    probabilities[pattern] = Math.max(0.01, prob);
    remainingProbability -= prob;
  });
  
  return {
    class_name: mainPattern,
    confidence: confidence,
    probabilities: probabilities
  };
};

// Check if backend is available
const checkBackendAvailability = async (): Promise<boolean> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
    
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    return false;
  }
};

export const classifyImage = async (imageFile: File): Promise<ApiClassificationResult> => {
  // First check if backend is available
  const isBackendAvailable = await checkBackendAvailability();
  
  if (!isBackendAvailable) {
    console.warn('Backend service not available, using mock classification');
    return mockClassifyImage(imageFile);
  }
  
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch(`${API_BASE_URL}/classify`, {
      method: 'POST',
      body: formData,
      headers: {
        // Don't set Content-Type header when using FormData
        // The browser will set it automatically with the boundary
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `HTTP error! status: ${response.status}`,
        response.status,
        errorData.code
      );
    }

    const result: ApiResponse = await response.json();
    
    if (!result.success || !result.data) {
      throw new ApiError(result.error || 'Classification failed');
    }

    return result.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Handle network errors - fallback to mock
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.warn('Network error detected, falling back to mock classification');
      return mockClassifyImage(imageFile);
    }
    
    throw new ApiError('An unexpected error occurred during classification');
  }
};

// Alternative endpoint for base64 images if your API supports it
export const classifyImageBase64 = async (base64Image: string): Promise<ApiClassificationResult> => {
  // Check if backend is available
  const isBackendAvailable = await checkBackendAvailability();
  
  if (!isBackendAvailable) {
    console.warn('Backend service not available, using mock classification');
    // Convert base64 to a mock file for consistency
    const mockFile = new File([''], 'image.jpg', { type: 'image/jpeg' });
    return mockClassifyImage(mockFile);
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/classify-base64`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: base64Image.split(',')[1], // Remove data:image/jpeg;base64, prefix
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `HTTP error! status: ${response.status}`,
        response.status,
        errorData.code
      );
    }

    const result: ApiResponse = await response.json();
    
    if (!result.success || !result.data) {
      throw new ApiError(result.error || 'Classification failed');
    }

    return result.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.warn('Network error detected, falling back to mock classification');
      const mockFile = new File([''], 'image.jpg', { type: 'image/jpeg' });
      return mockClassifyImage(mockFile);
    }
    
    throw new ApiError('An unexpected error occurred during classification');
  }
};