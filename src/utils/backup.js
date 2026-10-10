export function exportGoalsToFile(goals) {
  const data = {
    app: 'savegoal',
    version: 1,
    exportedAt: new Date().toISOString(),
    goals,
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const dateStamp = new Date().toISOString().split('T')[0];
  link.href = url;
  link.download = `savegoal-backup-${dateStamp}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function parseBackupFile(text) {
  const parsed = JSON.parse(text);
  const goals = Array.isArray(parsed) ? parsed : parsed?.goals;

  if (!Array.isArray(goals)) {
    throw new Error('INVALID_BACKUP');
  }

  const valid = goals.every(
    (g) =>
      g &&
      typeof g.id === 'string' &&
      typeof g.name === 'string' &&
      typeof g.targetAmount === 'number' &&
      typeof g.currentAmount === 'number'
  );

  if (!valid) {
    throw new Error('INVALID_BACKUP');
  }

  return goals.map((g) => ({
    ...g,
    transactions: Array.isArray(g.transactions) ? g.transactions : [],
    currency: g.currency || 'USD',
    category: g.category || 'other',
    deadline: g.deadline || null,
    note: g.note || '',
  }));
}
