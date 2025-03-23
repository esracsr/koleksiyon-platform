'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FiSun, FiMoon, FiGlobe, FiBell, FiMail, FiFilter, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { BsGrid, BsListUl, BsGridFill, BsListTask, BsHouse } from 'react-icons/bs';
import { IoCartOutline } from 'react-icons/io5';
import { MdKeyboardArrowDown } from 'react-icons/md';

interface Product {
  id: string;
  name: string;
  code: string;
  image: string;
  category: string;
  isFixed?: boolean;
}

interface ApiProduct {
  id: string;
  name: string;
  code: string;
  image: string;
  category: string;
}

export default function EditPage() {
  const router = useRouter();
  const params = useParams();
  const collectionId = params?.id;

  const [products, setProducts] = useState<Product[]>([]);
  const [fixedProducts, setFixedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'compact' | 'detail'>('grid');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [collectionId]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://maestro-api-dev.secil.biz/Collection/${collectionId}/GetProductsForConstants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
          additionalFilters: [],
          page: 1,
          pageSize: 36
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const formattedProducts = data.data.map((product: ApiProduct) => ({
        id: product.id,
        name: product.name,
        code: product.code,
        image: product.image || '/placeholder.jpg',
        category: product.category || 'Genel',
        isFixed: false
      }));

      setProducts(formattedProducts);
      setFixedProducts([]);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Ürünler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToFixed = (product: Product) => {
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === product.id ? { ...p, isFixed: true } : p
      )
    );

    setFixedProducts(prev => {
      if (prev.some(p => p.id === product.id)) {
        return prev;
      }
      return [...prev, { ...product, isFixed: true }];
    });
  };

  const handleRemoveFromFixed = (productId: string) => {
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId ? { ...p, isFixed: false } : p
      )
    );

    setFixedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleSave = async () => {
    try {
      const productIds = fixedProducts.map(p => p.id);

      const response = await fetch(`https://maestro-api-dev.secil.biz/Collection/${collectionId}/UpdateProductOrderForConstants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({ productIds })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      router.push('/collections');
    } catch (err: any) {
      setError(err.message || 'Değişiklikler kaydedilirken bir hata oluştu');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sol Menü */}
      <div className="w-64 bg-white border-r flex flex-col">
        <div className="p-6">
          <div className="text-2xl font-bold mb-8">LOGO</div>
          <div className="text-sm text-gray-500 mb-4">MENÜ</div>
          <nav className="space-y-2">
            <a href="/dashboard" className="flex items-center space-x-3 p-2 rounded hover:bg-gray-100">
              <BsHouse size={20} />
              <span>Dashboard</span>
            </a>
            <div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-gray-100">
                <div className="flex items-center space-x-3">
                  <IoCartOutline size={20} />
                  <span>Ürünler</span>
                </div>
                <MdKeyboardArrowDown size={20} />
              </div>
            </div>
          </nav>
          <div className="mt-6">
            <div className="text-sm text-gray-500 mb-4">Satış</div>
            <button className="w-full flex items-center space-x-3 p-2 rounded border hover:bg-gray-100">
              <IoCartOutline size={20} />
              <span>Koleksiyon</span>
            </button>
          </div>
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="flex-1">
        {/* Üst Bar */}
        <div className="bg-white border-b">
          <div className="max-w-[1400px] mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-semibold">Sabitleri Düzenle</h1>
                <p className="text-sm text-gray-500">Koleksiyon - {products.length} / 336 Ürün</p>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <FiSun size={20} className="text-gray-400" />
                  <div className="w-12 h-6 bg-blue-500 rounded-full p-1 cursor-pointer">
                    <div className="bg-white w-4 h-4 rounded-full ml-auto"></div>
                  </div>
                  <FiMoon size={20} />
                </div>
                <FiGlobe size={20} />
                <div className="relative">
                  <FiBell size={20} />
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">12</span>
                </div>
                <FiMail size={20} />
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>

        {/* İçerik Alanı */}
        <div className="max-w-[1400px] mx-auto p-6">
          {/* Üst Araçlar */}
          <div className="flex justify-between items-center mb-6">
            {/* Yıl Seçici */}
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <FiChevronLeft size={20} />
              </button>
              <div className="bg-white border rounded-lg px-4 py-2">
                Yıl: 2024
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <FiChevronRight size={20} />
              </button>
            </div>

            <div className="flex items-center space-x-4">
              {/* Görünüm Modları */}
              <div className="flex bg-white border rounded-lg p-1">
                <button 
                  onClick={() => setViewMode('detail')}
                  className={`p-2 rounded ${viewMode === 'detail' ? 'bg-gray-100' : ''}`}
                >
                  <BsListTask size={18} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                >
                  <BsListUl size={18} />
                </button>
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                >
                  <BsGridFill size={18} />
                </button>
              </div>

              {/* Filtreler Butonu */}
              <button className="flex items-center space-x-2 bg-white border rounded-lg px-4 py-2">
                <FiFilter size={18} />
                <span>Filtreler</span>
              </button>
            </div>
          </div>

          {/* Ürün Grid'leri */}
          <div className="grid grid-cols-2 gap-6">
            {/* Koleksiyon Ürünleri */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Koleksiyon Ürünleri</h2>
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-3' : 'grid-cols-1'} gap-4`}>
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="group relative border rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200"
                    onClick={() => handleAddToFixed(product)}
                  >
                    <div className="relative">
                      <img
                        src={product.image || '/placeholder.jpg'}
                        alt={product.name}
                        className="w-full h-[280px] object-cover"
                      />
                      {product.isFixed && (
                        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                          <span className="text-white text-sm font-medium">Eklendi</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="text-sm font-medium mb-1">{product.category}</div>
                      <h3 className="font-medium text-base mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.code}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Sayfalama */}
              <div className="flex justify-center items-center mt-6 space-x-1">
                <button className="w-8 h-8 flex items-center justify-center rounded border hover:bg-gray-50">
                  <FiChevronLeft size={18} />
                </button>
                {[1, 2, 3, 4].map((page) => (
                  <button
                    key={page}
                    className={`w-8 h-8 flex items-center justify-center rounded border ${
                      page === 1 ? 'bg-black text-white' : 'hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="w-8 h-8 flex items-center justify-center rounded border hover:bg-gray-50">
                  <FiChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Sabitler */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Sabitler</h2>
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-3' : 'grid-cols-1'} gap-4`}>
                {fixedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group relative border rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200"
                    onClick={() => handleRemoveFromFixed(product.id)}
                  >
                    <div className="relative">
                      <img
                        src={product.image || '/placeholder.jpg'}
                        alt={product.name}
                        className="w-full h-[280px] object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="text-sm font-medium mb-1">{product.category}</div>
                      <h3 className="font-medium text-base mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.code}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Sayfalama */}
              <div className="flex justify-center items-center mt-6 space-x-1">
                <button className="w-8 h-8 flex items-center justify-center rounded border hover:bg-gray-50">
                  <FiChevronLeft size={18} />
                </button>
                {[1, 2, 3, 4].map((page) => (
                  <button
                    key={page}
                    className={`w-8 h-8 flex items-center justify-center rounded border ${
                      page === 1 ? 'bg-black text-white' : 'hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="w-8 h-8 flex items-center justify-center rounded border hover:bg-gray-50">
                  <FiChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Alt Butonlar */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={() => router.push('/collections')}
              className="px-8 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Vazgeç
            </button>
            <button
              onClick={handleSave}
              className="px-8 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Kaydet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 