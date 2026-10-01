import {
  Plane,
  ShoppingBag,
  ShieldAlert,
  GraduationCap,
  Smartphone,
  MoreHorizontal,
} from 'lucide-react';

export const CATEGORIES = [
  {
    id: 'travel',
    label: 'ដំណើរកម្សាន្ត',
    icon: Plane,
    color: 'sky',
  },
  {
    id: 'shopping',
    label: 'ទិញឥវ៉ាន់',
    icon: ShoppingBag,
    color: 'pink',
  },
  {
    id: 'emergency',
    label: 'សង្គ្រោះបន្ទាន់',
    icon: ShieldAlert,
    color: 'red',
  },
  {
    id: 'education',
    label: 'ការសិក្សា',
    icon: GraduationCap,
    color: 'amber',
  },
  {
    id: 'gadget',
    label: 'ឧបករណ៍អេឡិចត្រូនិក',
    icon: Smartphone,
    color: 'indigo',
  },
  {
    id: 'other',
    label: 'ផ្សេងៗ',
    icon: MoreHorizontal,
    color: 'slate',
  },
];

export const CURRENCIES = ['USD', 'KHR'];

export function getCategory(id) {
  return (
    CATEGORIES.find((c) => c.id === id) || CATEGORIES[CATEGORIES.length - 1]
  );
}
