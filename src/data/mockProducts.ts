// import { Product } from "@/types/product";

export interface Product {
  id: string;
  name: string;
  code: string;
  image: string;
  category: string;
  price: number;
  isAdded?: boolean;
}

export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Elbise',
    code: '123456789',
    image: '/images/file.svg',
    category: 'Giyim',
    price: 10000,
    isAdded: true
  },
  {
    id: 'p2',
    name: 'Pantolon',
    code: '123456788',
    image: '/images/file.svg',
    category: 'Giyim',
    price: 10000,
    isAdded: true
  },
  {
    id: 'p3',
    name: 'Ceket',
    code: '123456787',
    image: '/images/file.svg',
    category: 'Giyim',
    price: 10000,
    isAdded: true
  },
  {
    id: 'p4',
    name: 'Elbise',
    code: '123456786',
    image: '/images/file.svg',
    category: 'Giyim',
    price: 10000,
    isAdded: false
  },
  {
    id: 'p5',
    name: 'Elbise',
    code: '123456785',
    image: '/images/file.svg',
    category: 'Giyim',
    price: 10000,
    isAdded: false
  },
  {
    id: 'p6',
    name: 'Elbise',
    code: '123456784',
    image: '/images/file.svg',
    category: 'Giyim',
    price: 10000,
    isAdded: false
  },
  {
    id: 'p7',
    name: 'Kazak',
    code: '123456783',
    image: '/images/file.svg',
    category: 'Giyim',
    price: 10000,
    isAdded: false
  },
  {
    id: 'p8',
    name: 'Gömlek',
    code: '123456782',
    image: '/images/file.svg',
    category: 'Giyim',
    price: 10000,
    isAdded: false
  },
  {
    id: 'p9',
    name: 'Tişört',
    code: '123456781',
    image: '/images/file.svg',
    category: 'Giyim',
    price: 10000,
    isAdded: false
  }
];