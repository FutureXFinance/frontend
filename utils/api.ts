/**
 * API Client Utility for FutureXFinance Frontend
 * Handles all API communication with backend services
 */

import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_V1 = process.env.NEXT_PUBLIC_API_V1 || '/api/v1';

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
    baseURL: `${API_BASE_URL}${API_V1}`,
    timeout: 30000, // 30 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
apiClient.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        // Handle common errors
        if (error.response) {
            const status = error.response.status;

            switch (status) {
                case 401:
                    // Unauthorized - redirect to login
                    if (typeof window !== 'undefined') {
                        window.location.href = '/sign-in';
                    }
                    break;
                case 403:
                    console.error('Access forbidden');
                    break;
                case 404:
                    console.error('Resource not found');
                    break;
                case 500:
                    console.error('Server error');
                    break;
            }
        } else if (error.request) {
            console.error('Network error - no response received');
        }

        return Promise.reject(error);
    }
);

// Types
export interface KYCVerificationResult {
    verification_id: string;
    status: 'VERIFIED' | 'REJECTED' | 'PENDING';
    timestamp: string;
    face_match_confidence: number;
    details: {
        id_quality?: string;
        selfie_quality?: string;
        face_match?: string;
        face_detected?: boolean;
        ocr_confidence?: number;
        ocr_success?: boolean;
        extracted_text_preview?: string;
        structured_data?: any;
        rejection_reason?: string;
    };
}

export interface FraudAnalysisResult {
    transaction_id: string;
    risk_score: number;
    risk_level: string;
    is_fraudulent: boolean;
    ml_score: number | null;
    rule_score: number;
    anomalies: string[];
    recommendation: string;
    details: {
        model_used: string;
        [key: string]: any;
    };
}

export interface DocumentParseResult {
    document_id: string;
    extracted_text: string;
    entities: any[];
    confidence: number;
}

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

export interface ChatResponse {
    message: string;
    intent?: string;
    confidence?: number;
}

// KYC API Functions
export const uploadKycDocument = async (
    idDocument: File,
    selfie: File
): Promise<KYCVerificationResult> => {
    const formData = new FormData();
    formData.append('id_document', idDocument);
    formData.append('selfie', selfie);

    try {
        const response = await apiClient.post<KYCVerificationResult>(
            '/kyc/verify',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('KYC upload error:', error);
        throw error;
    }
};

export const verifySingleDocument = async (document: File) => {
    const formData = new FormData();
    formData.append('document', document);

    try {
        const response = await apiClient.post('/kyc/verify-single', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Document verification error:', error);
        throw error;
    }
};

export const getKycStatus = async (verificationId: string) => {
    try {
        const response = await apiClient.get(`/kyc/status/${verificationId}`);
        return response.data;
    } catch (error) {
        console.error('KYC status error:', error);
        throw error;
    }
};

// Fraud Detection API Functions
export const analyzeFraud = async (transactionData: any): Promise<FraudAnalysisResult> => {
    try {
        const response = await apiClient.post<FraudAnalysisResult>(
            '/fraud/analyze',
            transactionData
        );
        return response.data;
    } catch (error) {
        console.error('Fraud analysis error:', error);
        throw error;
    }
};

export const getFraudHistory = async (limit: number = 50) => {
    try {
        const response = await apiClient.get(`/fraud/history?limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error('Fraud history error:', error);
        throw error;
    }
};

// Document Parser API Functions
export const parseDocument = async (document: File): Promise<DocumentParseResult> => {
    const formData = new FormData();
    formData.append('document', document);

    try {
        const response = await apiClient.post<DocumentParseResult>(
            '/documents/parse',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Document parse error:', error);
        throw error;
    }
};

// Chatbot API Functions
export const sendChatMessage = async (message: string): Promise<ChatResponse> => {
    try {
        const response = await apiClient.post<ChatResponse>('/chatbot/chat', {
            message,
        });
        return response.data;
    } catch (error) {
        console.error('Chat error:', error);
        throw error;
    }
};

export const getChatHistory = async () => {
    try {
        const response = await apiClient.get('/chatbot/history');
        return response.data;
    } catch (error) {
        console.error('Chat history error:', error);
        throw error;
    }
};

// Customer Insights API Functions
export const getCustomerInsights = async (customerId: string) => {
    try {
        const response = await apiClient.get(`/insights/customer/${customerId}`);
        return response.data;
    } catch (error) {
        console.error('Insights error:', error);
        throw error;
    }
};

export const getRecommendations = async (customerId: string) => {
    try {
        const response = await apiClient.get(`/insights/recommendations/${customerId}`);
        return response.data;
    } catch (error) {
        console.error('Recommendations error:', error);
        throw error;
    }
};

// Compliance Monitoring API Functions
export const getComplianceUpdates = async () => {
    try {
        const response = await apiClient.get('/compliance/updates');
        return response.data;
    } catch (error) {
        console.error('Compliance updates error:', error);
        throw error;
    }
};

export const getComplianceAlerts = async () => {
    try {
        const response = await apiClient.get('/compliance/alerts');
        return response.data;
    } catch (error) {
        console.error('Compliance alerts error:', error);
        throw error;
    }
};

// Health Check
export const checkApiHealth = async () => {
    try {
        const response = await apiClient.get('/health');
        return response.data;
    } catch (error) {
        console.error('Health check error:', error);
        throw error;
    }
};

// Export the axios instance for custom requests
export default apiClient;
