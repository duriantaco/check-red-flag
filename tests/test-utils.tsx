import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

export function renderWithProviders(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, {
    wrapper: ({ children }) => (
      <HelmetProvider>
        <MemoryRouter>
          {children}
        </MemoryRouter>
      </HelmetProvider>
    ),
    ...options
  });
}

export * from '@testing-library/react';
export { renderWithProviders as render };