import { getCategory } from '../constants/categories';
import { CATEGORY_COLOR_CLASSES } from '../constants/categoryColors';
import { useLanguage } from '../context/LanguageContext';

function CategoryBadge({ categoryId }) {
  const { isEnglish } = useLanguage();
  const category = getCategory(categoryId);
  const Icon = category.icon;
  const colors =
    CATEGORY_COLOR_CLASSES[category.color] || CATEGORY_COLOR_CLASSES.slate;
  const label = isEnglish ? category.labelEn : category.label;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${colors.bg} ${colors.text}`}
    >
      <Icon className={`h-3 w-3 ${colors.icon}`} />
      {label}
    </span>
  );
}

export default CategoryBadge;
