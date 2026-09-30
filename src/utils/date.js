export function getDaysRemaining(deadline) {
  if (!deadline) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(deadline);
  target.setHours(0, 0, 0, 0);

  const diffMs = target.getTime() - today.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

export function formatDeadlineLabel(deadline) {
  const days = getDaysRemaining(deadline);
  if (days === null) return null;

  if (days < 0) return `ហួសកាលកំណត់ ${Math.abs(days)} ថ្ងៃ`;
  if (days === 0) return 'ថ្ងៃនេះ';
  if (days === 1) return 'ស្អែក';
  return `នៅសល់ ${days} ថ្ងៃ`;
}

export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('km-KH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
