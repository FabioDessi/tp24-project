import { render } from '@testing-library/react';

import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('should render the application', () => {
    const { container, getByText } = render(<App />);

    expect(container).toBeTruthy();
    expect(getByText('Vite + React')).toBeTruthy();
  });
});
