import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CategoryBadge from './CategoryBadge';

describe('CategoryBadge', () => {
  it('renders the correct label for a known category', () => {
    render(<CategoryBadge categoryId="travel" />);
    expect(screen.getByText('ដំណើរកម្សាន្ត')).toBeInTheDocument();
  });

  it('falls back to "other" category for unknown id', () => {
    render(<CategoryBadge categoryId="unknown-category" />);
    expect(screen.getByText('ផ្សេងៗ')).toBeInTheDocument();
  });
});
