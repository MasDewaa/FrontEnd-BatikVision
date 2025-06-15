// API configuration and service functions
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

export const classifyImage = async (imageFile: File): Promise<ApiClassificationResult> => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

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