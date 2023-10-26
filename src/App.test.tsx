import { render, waitFor } from '@testing-library/react';
import { describe, vi, it, expect, beforeEach } from 'vitest';
import App from './App';

vi.mock('./components/Table', () => ({
  default: () => {
    return <div data-testid="mockTable">Mocked Table</div>;
  },
}));

describe('App', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should render the application', () => {
    const { container, getByText } = render(<App />);
    expect(container).toBeTruthy();
    expect(getByText('Invoice Data')).toBeTruthy();
  });

  it('should show a loading spinner', () => {
    const fetchPromise = new Promise(() => {});
    global.fetch = vi.fn().mockReturnValueOnce(fetchPromise);

    const { getByRole } = render(<App />);
    const spinner = getByRole('progressbar');
    expect(spinner).toBeTruthy();
  });

  it('should display error if fetch fails', async () => {
    // Simulate an error response
    global.fetch = vi.fn().mockReturnValueOnce(new Error('Failed to fetch'));

    const { getByText } = render(<App />);
    await waitFor(() => getByText(/Network response was not ok/i));
    expect(getByText(/Network response was not ok/i)).toBeTruthy();
  });

  it('should render the Table component when data is fetched successfully', async () => {
    // Simulate a successful response
    global.fetch = vi.fn().mockReturnValueOnce({
      ok: true,
      json: async () => [],
    });

    const { getByTestId } = render(<App />);
    await waitFor(() => getByTestId('mockTable'));
    expect(getByTestId('mockTable')).toBeTruthy();
  });
});
