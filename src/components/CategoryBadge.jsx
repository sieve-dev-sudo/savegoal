import { getCategory } from '../constants/categories';
import { CATEGORY_COLOR_CLASSES } from '../constants/categoryColors';

function CategoryBadge({ categoryId }) {
  const category = getCategory(categoryId);
  const Icon = category.icon;
  const colors =
    CATEGORY_COLOR_CLASSES[category.color] || CATEGORY_COLOR_CLASSES.slate;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${colors.bg} ${colors.text}`}
    >
      <Icon className={`h-3 w-3 ${colors.icon}`} />
      {category.label}
    </span>
  );
}

export default CategoryBadge;
