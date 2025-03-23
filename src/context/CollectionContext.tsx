"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Collection, Product, Filter } from '@/types/api';
import { collectionService } from '@/lib/api';

// Tip tanımlamaları
interface Collection {
  id: number;
  name: string;
  description: string;
  products: Product[];
}

interface Product {
  id: string;
  name: string;
  code: string;
  image: string;
  category: string;
  price: number;
}

interface Filter {
  id: string;
  title: string;
  values: {
    value: string;
    valueName: string | null;
  }[];
}

interface CollectionContextType {
  collections: Collection[];
  selectedCollection: Collection | null;
  filters: Filter[];
  loading: boolean;
  error: string | null;
  fetchCollections: () => Promise<void>;
  selectCollection: (id: number) => Promise<void>;
  applyFilters: (filters: any) => Promise<void>;
  updateProductOrder: (products: Product[]) => Promise<void>;
  removeFromFixed: (productId: string) => Promise<void>;
}

const CollectionContext = createContext<CollectionContextType | undefined>(undefined);

export function CollectionProvider({ children }: { children: ReactNode }) {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCollections = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await collectionService.getProducts(1);
      if (response.data) {
        setCollections([{
          id: 1,
          name: "Koleksiyon",
          description: "Koleksiyon açıklaması",
          products: response.data
        }]);
      }
    } catch (err: any) {
      setError("Koleksiyonlar yüklenirken bir sorun oluştu. Lütfen sayfayı yenileyip tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }, []);

  const selectCollection = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      
      const productsResponse = await collectionService.getProducts(id);
      const filtersResponse = await collectionService.getFilters(id);
      
      if (productsResponse.data && filtersResponse.data) {
        const collection = {
          id,
          name: "Koleksiyon",
          description: "Koleksiyon açıklaması",
          products: productsResponse.data
        };
        
        setSelectedCollection(collection);
        setFilters(filtersResponse.data);
      }
    } catch (err: any) {
      setError("Koleksiyon detayları yüklenirken bir sorun oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }, []);

  const applyFilters = useCallback(async (filterParams: any) => {
    try {
      setLoading(true);
      setError(null);
      
      if (selectedCollection) {
        const response = await collectionService.applyFilters(selectedCollection.id, filterParams);
        if (response.data) {
          setSelectedCollection({
            ...selectedCollection,
            products: response.data
          });
        }
      }
    } catch (err: any) {
      setError("Filtreler uygulanırken bir sorun oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }, [selectedCollection]);

  const updateProductOrder = useCallback(async (products: Product[]) => {
    try {
      setLoading(true);
      setError(null);
      
      if (selectedCollection) {
        const response = await collectionService.updateProductOrder(selectedCollection.id, products);
        if (response.data) {
          setSelectedCollection({
            ...selectedCollection,
            products: response.data
          });
        }
      }
    } catch (err: any) {
      setError("Ürün sıralaması güncellenirken bir sorun oluştu. Değişiklikleriniz kaydedilmedi.");
    } finally {
      setLoading(false);
    }
  }, [selectedCollection]);

  const removeFromFixed = useCallback(async (productId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      if (selectedCollection) {
        const response = await collectionService.removeFromFixed(selectedCollection.id, parseInt(productId));
        if (response.data) {
          setSelectedCollection({
            ...selectedCollection,
            products: response.data
          });
        }
      }
    } catch (err: any) {
      setError("Ürün sabit listesinden kaldırılırken bir sorun oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }, [selectedCollection]);

  const value = {
    collections,
    selectedCollection,
    filters,
    loading,
    error,
    fetchCollections,
    selectCollection,
    applyFilters,
    updateProductOrder,
    removeFromFixed
  };

  return (
    <CollectionContext.Provider value={value}>
      {children}
    </CollectionContext.Provider>
  );
}

export function useCollection() {
  const context = useContext(CollectionContext);
  
  if (!context) {
    throw new Error('useCollection hook\'u CollectionProvider içinde kullanılmalıdır');
  }
  
  return context;
} 