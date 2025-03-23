'use client';

import { useState } from 'react';
import { FiFilter, FiX } from 'react-icons/fi';

interface FilterPanelProps {
  onFilterChange: (filters: { category: string; minPrice: number; maxPrice: number }) => void;
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFilterChange({
      category: filters.category,
      minPrice: Number(filters.minPrice) || 0,
      maxPrice: Number(filters.maxPrice) || Infinity,
    });
  };

  const handleReset = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
    });
    onFilterChange({
      category: '',
      minPrice: 0,
      maxPrice: Infinity,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">
            Filtreler
          </h3>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-gray-500"
          >
            {isOpen ? <FiX className="h-5 w-5" /> : <FiFilter className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Kategori
            </label>
            <select
              name="category"
              id="category"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Tümü</option>
              <option value="giyim">Giyim</option>
              <option value="ayakkabi">Ayakkabı</option>
              <option value="aksesuar">Aksesuar</option>
            </select>
          </div>

          <div>
            <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
              Minimum Fiyat
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">₺</span>
              </div>
              <input
                type="number"
                name="minPrice"
                id="minPrice"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                className="block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
              Maksimum Fiyat
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">₺</span>
              </div>
              <input
                type="number"
                name="maxPrice"
                id="maxPrice"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                className="block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="1000"
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sıfırla
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Uygula
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 