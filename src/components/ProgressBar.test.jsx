import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProgressBar from './ProgressBar';

describe('ProgressBar', () => {
  it('renders with correct aria attributes', () => {
    render(<ProgressBar progress={50} completed={false} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '50');
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
  });

  it('sets width style based on progress value', () => {
    render(<ProgressBar progress={75} completed={false} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveStyle({ width: '75%' });
  });

  it('applies the lime color class when completed', () => {
    render(<ProgressBar progress={100} completed={true} />);
    const bar = screen.getByRole('progressbar');
    expect(bar.className).toContain('bg-lime-600');
  });

  it('does not use the completed color while still in progress', () => {
    render(<ProgressBar progress={30} completed={false} />);
    const bar = screen.getByRole('progressbar');
    expect(bar.className).not.toContain('bg-lime-600');
  });
});
