export const TRASH_RETENTION_DAYS = 30;

const DAY_MS = 24 * 60 * 60 * 1000;

// ថ្ងៃលុបមិនត្រឹមត្រូវ ត្រូវចាត់ទុកថាទើបលុបឥឡូវ (មិនឱ្យបាត់ទិន្នន័យដោយចៃដន្យ)
function toDeletedTime(deletedAt, now) {
  const time = new Date(deletedAt).getTime();
  return Number.isNaN(time) ? now : time;
}

export function isTrashExpired(deletedAt, now = Date.now()) {
  return now - toDeletedTime(deletedAt, now) >= TRASH_RETENTION_DAYS * DAY_MS;
}

export function getTrashDaysLeft(deletedAt, now = Date.now()) {
  const expiresAt =
    toDeletedTime(deletedAt, now) + TRASH_RETENTION_DAYS * DAY_MS;
  return Math.max(0, Math.ceil((expiresAt - now) / DAY_MS));
}

export function purgeExpired(trash, now = Date.now()) {
  return trash.filter((item) => !isTrashExpired(item.deletedAt, now));
}
