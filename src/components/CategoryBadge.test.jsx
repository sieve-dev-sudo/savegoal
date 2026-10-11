import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import CategoryBadge from './CategoryBadge';
import { LanguageProvider } from '../context/LanguageContext';

function renderBadge(categoryId) {
  return render(
    <LanguageProvider>
      <CategoryBadge categoryId={categoryId} />
    </LanguageProvider>
  );
}

describe('CategoryBadge', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders the Khmer label for a known category by default', () => {
    renderBadge('travel');
    expect(screen.getByText('ដំណើរកម្សាន្ត')).toBeInTheDocument();
  });

  it('falls back to the "other" category for an unknown id', () => {
    renderBadge('unknown-category');
    expect(screen.getByText('ផ្សេងៗ')).toBeInTheDocument();
  });

  it('renders the English label when English is selected', () => {
    window.localStorage.setItem('savegoal:language', JSON.stringify('en'));
    renderBadge('travel');
    expect(screen.getByText('Travel')).toBeInTheDocument();
  });
});
