'use client';

import { Product } from '@/types/product';
import { Reorder } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';

interface DraggableProductListProps {
  products: Product[];
  onReorder: (products: Product[]) => void;
}

export default function DraggableProductList({ products, onReorder }: DraggableProductListProps) {
  return (
    <Reorder.Group axis="y" values={products} onReorder={onReorder}>
      <div className="space-y-3">
        {products.map((product) => (
          <Reorder.Item
            key={product.id}
            value={product}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow"
            whileDrag={{ scale: 1.02, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <FiMenu className="h-5 w-5 text-gray-400" />
              </div>
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-gray-900 truncate">
                  {product.name}
                </h3>
                <div className="mt-1 flex items-center space-x-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {product.category}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {product.price.toLocaleString('tr-TR')} TL
                  </span>
                </div>
              </div>
            </div>
          </Reorder.Item>
        ))}
      </div>
    </Reorder.Group>
  );
} 