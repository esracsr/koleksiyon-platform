'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FiHome,
  FiBox,
  FiShoppingCart,
  FiSun,
  FiMoon,
  FiGlobe,
  FiBell,
  FiMail,
  FiSettings,
  FiUser,
  FiEdit2,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';

interface Collection {
  id: number;
  title: string;
  conditions: string[];
  salesChannel: string;
}

const mockCollections: Collection[] = [
  {
    id: 1,
    title: 'Koleksiyon - 1',
    conditions: ['Ürün Renk bilgisi Şuna Eşit: Mor'],
    salesChannel: 'Satış Kanalı - 1'
  },
  {
    id: 2,
    title: 'Koleksiyon - 2',
    conditions: ['Ürün Renk bilgisi Şuna Eşit: Sarı'],
    salesChannel: 'Satış Kanalı - 1'
  },
  {
    id: 3,
    title: 'Koleksiyon - 3',
    conditions: [
      'Ürün Renk bilgisi Şuna Eşit: Fuşya',
      'Ürün Beden bilgisi Şuna Eşit: 38'
    ],
    salesChannel: 'Satış Kanalı - 2'
  },
  {
    id: 4,
    title: 'Koleksiyon - 4',
    conditions: [
      'Ürün Beden bilgisi Şuna Eşit: 42',
      'Ürün Beden bilgisi Şuna Eşit: 44',
      'Ürün Beden bilgisi Şuna Eşit: 46'
    ],
    salesChannel: 'Satış Kanalı - 2'
  },
  {
    id: 5,
    title: 'Koleksiyon - 5',
    conditions: [
      'Ürün Etiket bilgisi Şuna Eşit: %20 İndirim Deneme',
      'Ürün Renk bilgisi Şuna Eşit: Mavi',
      'Ürün Renk bilgisi Şuna Eşit: Siyah',
      'Ürün Renk bilgisi Şuna Eşit: Kırmızı'
    ],
    salesChannel: 'Satış Kanalı - 3'
  }
];

export default function CollectionsPage() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sol Menü */}
      <div className="w-64 bg-white border-r border-gray-200 p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">LOGO</h1>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-gray-500 mb-4">MENÜ</p>
          <button className="flex items-center space-x-3 w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <FiHome className="h-5 w-5" />
            <span>Dashboard</span>
          </button>
          <button className="flex items-center space-x-3 w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <FiBox className="h-5 w-5" />
            <span>Ürünler</span>
          </button>
          <button className="flex items-center space-x-3 w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <FiShoppingCart className="h-5 w-5" />
            <span>Satış</span>
          </button>
          <button className="flex items-center space-x-3 w-full px-3 py-2 bg-gray-100 text-blue-600 rounded-lg">
            <FiBox className="h-5 w-5" />
            <span>Koleksiyon</span>
          </button>
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="flex-1 flex flex-col">
        {/* Üst Bar */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Koleksiyon</h1>
            <p className="text-sm text-gray-500">Koleksiyon Listesi</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              {isDarkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <FiGlobe className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative">
              <FiBell className="h-5 w-5" />
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                12
              </span>
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <FiMail className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <FiSettings className="h-5 w-5" />
            </button>
            <button className="w-8 h-8 bg-gray-200 rounded-full">
              <FiUser className="w-full h-full p-2" />
            </button>
          </div>
        </div>

        {/* Tablo */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Başlık
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ürün Koşulları
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Satış Kanalı
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockCollections.map((collection) => (
                  <tr key={collection.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {collection.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="space-y-1">
                        {collection.conditions.map((condition, index) => (
                          <div key={index}>{condition}</div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {collection.salesChannel}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => router.push(`/edit/${collection.id}`)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <FiEdit2 className="h-5 w-5" />
                        </button>
                        {collection.id === 1 && (
                          <button
                            onClick={() => router.push(`/edit/${collection.id}`)}
                            className="ml-2 px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                          >
                            Sabitleri Düzenle
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sayfalama */}
          <div className="mt-4 flex items-center justify-center space-x-2">
            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">
              <FiChevronLeft className="h-5 w-5" />
            </button>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg
                  ${page === currentPage
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {page}
              </button>
            ))}
            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">
              <FiChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 