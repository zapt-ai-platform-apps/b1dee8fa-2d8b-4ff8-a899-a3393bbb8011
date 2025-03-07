// Categories for tools
const categories = [
  { id: 'time', name: 'Time & Productivity' },
  { id: 'text', name: 'Text Tools' },
  { id: 'calculators', name: 'Calculators' },
  { id: 'generators', name: 'Generators' },
  { id: 'converters', name: 'Converters' },
  { id: 'lists', name: 'Lists & Trackers' },
  { id: 'fun', name: 'Fun & Games' },
  { id: 'visual', name: 'Visual Tools' },
  { id: 'health', name: 'Health & Life' },
  { id: 'math', name: 'Math & Logic' },
  { id: 'misc', name: 'Miscellaneous' }
];

// Get all categories
export function getCategories() {
  return categories;
}

// Get category by ID
export function getCategoryById(categoryId) {
  return categories.find(category => category.id === categoryId);
}