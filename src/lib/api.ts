import axios, { AxiosError } from 'axios';
import {
  LoginRequest,
  LoginResponse,
  APILoginResponse,
  CollectionResponse,
  ProductResponse,
  FilterResponse,
  Product,
  Filter
} from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://maestro-api-dev.secil.biz';

const getToken = () => {
  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem('accessToken');
    console.log('Retrieved token:', token);
    return token;
  }
  return null;
};

const setToken = (token: string) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('accessToken', token);
    console.log('Token saved:', token);
  }
};

const logError = (error: any) => {
  console.error('Error Details:', {
    name: error.name,
    message: error.message,
    status: error.response?.status,
    statusText: error.response?.statusText,
    data: error.response?.data,
    config: error.config ? {
      url: error.config.url,
      method: error.config.method,
      baseURL: error.config.baseURL,
      headers: error.config.headers,
      data: error.config.data
    } : 'No config available',
    stack: error.stack
  });
};

const createAxiosInstance = (config = {}) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    },
    ...config
  });

  instance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token && !config.url?.includes('/Auth/Login')) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log('Request headers:', config.headers);
      console.log('Request URL:', config.url);
      console.log('Request method:', config.method);
      console.log('Request data:', config.data);
      return config;
    },
    (error) => {
      console.error('Request interceptor error:', error);
      logError(error);
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      console.log('Response:', {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
        headers: response.headers
      });
      return response;
    },
    (error: AxiosError) => {
      logError(error);
      if (error.response?.status === 401) {
        console.log('Unauthorized access, clearing token');
        window.localStorage.removeItem('accessToken');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

const authClient = createAxiosInstance();
const collectionClient = createAxiosInstance();

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      console.log('Login attempt with:', credentials);
      const response = await authClient.post<APILoginResponse>('/Auth/Login', {
        username: credentials.username,
        password: credentials.password
      });
      
      if (!response.data?.data?.accessToken) {
        throw new Error("Giriş yanıtında token bulunamadı");
      }

      const loginResponse: LoginResponse = {
        token: response.data.data.accessToken,
        user: {
          id: '0',
          name: response.data.data.name || 'Frontend Developer',
          email: credentials.username
        }
      };

      setToken(response.data.data.accessToken);
      return loginResponse;
      
    } catch (error: any) {
      console.error('Login error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      logError(error);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          "Giriş yapılırken bir hata oluştu";
      
      throw new Error(errorMessage);
    }
  },

  logout: () => {
    localStorage.removeItem('accessToken');
  }
};

export const collectionService = {
  getProducts: async (collectionId: number): Promise<{ data: Product[] }> => {
    try {
      const token = getToken();
      console.log('Getting products with token:', token);
      console.log('Collection ID:', collectionId);
      
      const response = await collectionClient.post<{ data: Product[] }>(
        `/Collection/GetProducts/${collectionId}`,
        {}
      );
      console.log('GetProducts response:', response.data);
      return response.data;
    } catch (error: any) {
      logError(error);
      if (error.response?.status === 401) {
        window.localStorage.removeItem('accessToken');
        window.location.href = '/login';
        throw new Error("Oturum süresi doldu. Lütfen tekrar giriş yapın.");
      }

      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          "Ürünler yüklenirken bir hata oluştu";
      
      throw new Error(errorMessage);
    }
  },

  getFilters: async (collectionId: number): Promise<FilterResponse> => {
    try {
      console.log('Getting filters for collection:', collectionId);
      const response = await collectionClient.post<FilterResponse>(
        `/Collection/${collectionId}/GetFiltersForConstants`,
        {}
      );
      console.log('GetFilters response:', response.data);
      return response.data;
    } catch (error: any) {
      logError(error);
      if (error.response?.status === 401) {
        window.localStorage.removeItem('accessToken');
        window.location.href = '/login';
        throw new Error("Oturum süresi doldu. Lütfen tekrar giriş yapın.");
      }

      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          "Filtreler yüklenirken bir hata oluştu";
      
      throw new Error(errorMessage);
    }
  },

  applyFilters: async (collectionId: number, filters: any): Promise<{ data: Product[] }> => {
    try {
      console.log('Applying filters:', { collectionId, filters });
      const response = await collectionClient.post<{ data: Product[] }>(
        `/Collection/${collectionId}/FilterProductsForConstants`,
        filters
      );
      console.log('ApplyFilters response:', response.data);
      return response.data;
    } catch (error: any) {
      logError(error);
      if (error.response?.status === 401) {
        window.localStorage.removeItem('accessToken');
        window.location.href = '/login';
        throw new Error("Oturum süresi doldu. Lütfen tekrar giriş yapın.");
      }

      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          "Filtreler uygulanırken bir hata oluştu";
      
      throw new Error(errorMessage);
    }
  },

  updateProductOrder: async (collectionId: number, productIds: string[]): Promise<{ data: Product[] }> => {
    try {
      console.log('Updating product order:', { collectionId, productIds });
      const response = await collectionClient.post<{ data: Product[] }>(
        `/Collection/${collectionId}/UpdateProductOrderForConstants`,
        { productIds }
      );
      console.log('UpdateProductOrder response:', response.data);
      return response.data;
    } catch (error: any) {
      logError(error);
      if (error.response?.status === 401) {
        window.localStorage.removeItem('accessToken');
        window.location.href = '/login';
        throw new Error("Oturum süresi doldu. Lütfen tekrar giriş yapın.");
      }

      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          "Ürün sıralaması güncellenirken bir hata oluştu";
      
      throw new Error(errorMessage);
    }
  },

  removeFromFixed: async (collectionId: number, productId: number): Promise<{ data: Product[] }> => {
    try {
      console.log('Removing from fixed:', { collectionId, productId });
      const response = await collectionClient.post<{ data: Product[] }>(
        `/Collection/${collectionId}/RemoveFromFixed/${productId}`,
        {}
      );
      console.log('RemoveFromFixed response:', response.data);
      return response.data;
    } catch (error: any) {
      logError(error);
      if (error.response?.status === 401) {
        window.localStorage.removeItem('accessToken');
        window.location.href = '/login';
        throw new Error("Oturum süresi doldu. Lütfen tekrar giriş yapın.");
      }

      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          "Ürün sabitlerden kaldırılırken bir hata oluştu";
      
      throw new Error(errorMessage);
    }
  }
}; 