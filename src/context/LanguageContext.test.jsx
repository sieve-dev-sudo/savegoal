import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider, useLanguage } from './LanguageContext';

function Probe() {
  const { language, toggleLanguage } = useLanguage();
  return (
    <button type="button" onClick={toggleLanguage}>
      {language}
    </button>
  );
}

function renderProbe() {
  return render(
    <LanguageProvider>
      <Probe />
    </LanguageProvider>
  );
}

describe('LanguageProvider', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.lang = '';
  });

  it('defaults to Khmer and sets the html lang to km', () => {
    renderProbe();
    expect(screen.getByRole('button')).toHaveTextContent('kh');
    expect(document.documentElement.lang).toBe('km');
  });

  it('switches the html lang to en after toggling', async () => {
    const user = userEvent.setup();
    renderProbe();
    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveTextContent('en');
    expect(document.documentElement.lang).toBe('en');
  });

  it('starts in English when it was saved earlier', () => {
    window.localStorage.setItem('savegoal:language', JSON.stringify('en'));
    renderProbe();
    expect(document.documentElement.lang).toBe('en');
  });
});
