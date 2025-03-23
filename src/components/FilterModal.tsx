import { useState } from 'react';
import { FiX } from 'react-icons/fi';

interface FilterModalProps {
  onClose: () => void;
  onApply: (filters: FilterValues) => void;
  onReset: () => void;
}

interface FilterValues {
  year: string;
  filtre: string;
  filtre2: string;
  stok: string;
  minStok?: string;
  maxStok?: string;
  urunKodu?: string;
  hasStock: boolean;
  siralama: string;
}

export default function FilterModal({ onClose, onApply, onReset }: FilterModalProps) {
  const [filters, setFilters] = useState<FilterValues>({
    year: '2024',
    filtre: '',
    filtre2: '',
    stok: '',
    minStok: '',
    maxStok: '',
    urunKodu: '',
    hasStock: false,
    siralama: ''
  });

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    onReset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-30"
        onClick={onClose}
      />
      <div 
        className="relative bg-white w-[800px] rounded-lg shadow-lg"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <FiX className="w-5 h-5" />
        </button>
        <div className="p-6">
          <div className="grid grid-cols-4 gap-6">
            <div>
              <h2 className="text-sm font-medium text-gray-900 mb-2">Filtreler</h2>
              <div className="space-y-2">
                <select
                  value={filters.filtre}
                  onChange={(e) => setFilters({ ...filters, filtre: e.target.value })}
                  className="w-full h-10 border border-gray-300 rounded px-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                >
                  <option value="">Lütfen filtre seçiniz</option>
                  <option value="filtre1">Filtre 1</option>
                  <option value="filtre2">Filtre 2</option>
                </select>

                <select
                  value={filters.filtre2}
                  onChange={(e) => setFilters({ ...filters, filtre2: e.target.value })}
                  className="w-full h-10 border border-gray-300 rounded px-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                >
                  <option value="">Lütfen filtre seçiniz</option>
                  <option value="filtre1">Filtre 1</option>
                  <option value="filtre2">Filtre 2</option>
                </select>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-medium text-gray-900 mb-2">Stok</h2>
              <div className="space-y-2">
                <select
                  value={filters.stok}
                  onChange={(e) => setFilters({ ...filters, stok: e.target.value })}
                  className="w-full h-10 border border-gray-300 rounded px-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                >
                  <option value="">Lütfen depo seçiniz</option>
                  <option value="depo1">Depo 1</option>
                  <option value="depo2">Depo 2</option>
                </select>

                <input
                  type="number"
                  value={filters.minStok}
                  onChange={(e) => setFilters({ ...filters, minStok: e.target.value })}
                  placeholder="Minimum Stok"
                  className="w-full h-10 border border-gray-300 rounded px-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                />

                <input
                  type="number"
                  value={filters.maxStok}
                  onChange={(e) => setFilters({ ...filters, maxStok: e.target.value })}
                  placeholder="Maksimum Stok"
                  className="w-full h-10 border border-gray-300 rounded px-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
            </div>

            <div>
              <h2 className="text-sm font-medium text-gray-900 mb-2">Ürün Kodu</h2>
              <div className="space-y-2">
                <input
                  type="text"
                  value={filters.urunKodu}
                  onChange={(e) => setFilters({ ...filters, urunKodu: e.target.value })}
                  placeholder="Seçiniz"
                  className="w-full h-10 border border-gray-300 rounded px-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="hasStock"
                    checked={filters.hasStock}
                    onChange={(e) => setFilters({ ...filters, hasStock: e.target.checked })}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                  <label htmlFor="hasStock" className="ml-2 text-sm text-gray-600">
                    Tüm Bedenlerinde Stok Olanlar
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-medium text-gray-900 mb-2">Sıralamalar</h2>
              <select
                value={filters.siralama}
                onChange={(e) => setFilters({ ...filters, siralama: e.target.value })}
                className="w-full h-10 border border-gray-300 rounded px-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              >
                <option value="">Seçiniz</option>
                <option value="yeni">En Yeni</option>
                <option value="eski">En Eski</option>
                <option value="artan">Fiyat (Artan)</option>
                <option value="azalan">Fiyat (Azalan)</option>
              </select>
            </div>
          </div>

          {/* Uygulanan Kriterler */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Uygulanan Kriterler</h3>
            <div className="bg-gray-50 rounded p-3 min-h-[80px] border border-gray-200">
              {filters.year && (
                <div className="inline-flex items-center bg-white rounded-full px-3 py-1 text-sm mr-2 mb-2 border border-gray-200">
                  <span>Yıl: {filters.year}</span>
                  <button
                    onClick={() => setFilters({ ...filters, year: '' })}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Butonlar */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handleReset}
              className="w-[200px] h-10 bg-black text-white text-sm font-medium rounded hover:bg-gray-800"
            >
              Seçimi Temizle
            </button>
            <button
              onClick={handleApply}
              className="w-[200px] h-10 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50"
            >
              Ara
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 