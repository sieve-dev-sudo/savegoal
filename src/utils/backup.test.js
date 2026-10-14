import { describe, it, expect } from 'vitest';
import { parseBackupFile } from './backup';

const baseGoal = {
  id: '1',
  name: 'Phone',
  targetAmount: 500,
  currentAmount: 100,
};

describe('parseBackupFile', () => {
  it('parses a backup object that contains goals', () => {
    const text = JSON.stringify({ app: 'savegoal', goals: [baseGoal] });
    const result = parseBackupFile(text);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Phone');
  });

  it('accepts a plain array of goals', () => {
    const result = parseBackupFile(JSON.stringify([baseGoal]));
    expect(result).toHaveLength(1);
  });

  it('fills missing optional fields with defaults', () => {
    const [goal] = parseBackupFile(JSON.stringify([baseGoal]));
    expect(goal.transactions).toEqual([]);
    expect(goal.currency).toBe('USD');
    expect(goal.category).toBe('other');
    expect(goal.deadline).toBeNull();
    expect(goal.note).toBe('');
    expect(goal.image).toBeNull();
  });

  it('keeps a valid image data URL', () => {
    const image = 'data:image/jpeg;base64,AAAA';
    const [goal] = parseBackupFile(JSON.stringify([{ ...baseGoal, image }]));
    expect(goal.image).toBe(image);
  });

  it('drops images that are not image data URLs', () => {
    const unsafe = [
      'https://example.com/a.png',
      'javascript:alert(1)',
      'data:text/html;base64,AAAA',
    ];
    unsafe.forEach((image) => {
      const [goal] = parseBackupFile(JSON.stringify([{ ...baseGoal, image }]));
      expect(goal.image).toBeNull();
    });
  });

  it('throws on invalid JSON', () => {
    expect(() => parseBackupFile('not json')).toThrow();
  });

  it('throws when goals are malformed', () => {
    const text = JSON.stringify([{ id: 1, name: 'Bad' }]);
    expect(() => parseBackupFile(text)).toThrow('INVALID_BACKUP');
  });
});
