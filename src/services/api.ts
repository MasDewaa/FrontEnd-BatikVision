// API configuration and service functions
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://newbatikfastapi-production.up.railway.app/predict';

export interface ApiClassificationResult {
  class_name: string;
  confidence: number;
  probabilities: Record<string, number>;
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

export const classifyImage = async (imageFile: File): Promise<ApiClassificationResult> => {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await fetch(`${API_BASE_URL}/predict`, {
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
    
    // Handle network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiError('Network error: Unable to connect to the classification service. Please ensure the backend API is running.');
    }
    
    throw new ApiError('An unexpected error occurred during classification');
  }
};

// Alternative endpoint for base64 images if your API supports it
export const classifyImageBase64 = async (base64Image: string): Promise<ApiClassificationResult> => {
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
      throw new ApiError('Network error: Unable to connect to the classification service');
    }
    
    throw new ApiError('An unexpected error occurred during classification');
  }
};

// Health check function to verify API status and model loading
export interface HealthStatus {
  status: string;
  model_loaded: boolean;
  model_path: string;
}

export const checkApiHealth = async (): Promise<HealthStatus> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new ApiError(`Health check failed: ${response.status}`, response.status);
    }

    const healthData: HealthStatus = await response.json();
    return healthData;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiError('Network error: Unable to connect to the API health endpoint');
    }
    
    throw new ApiError('An unexpected error occurred during health check');
  }
};