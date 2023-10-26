import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';

describe('Pagination component', () => {
  const user = userEvent.setup();

  const defaultProps = {
    dataLength: 100, // 100 total rows
    currentPage: 1,
    setCurrentPage: vi.fn(),
    rowsPerPage: 10,
    setRowsPerPage: vi.fn(),
    rowsPerPageOptions: [5, 10, 25, 50],
  };

  it('displays the current page and total pages correctly', () => {
    const { getByText } = render(<Pagination {...defaultProps} />);

    expect(getByText('1 of 10')).toBeTruthy();
  });

  it('changes rows per page when selected from dropdown', async () => {
    const { getByLabelText } = render(<Pagination {...defaultProps} />);

    await user.selectOptions(getByLabelText('Rows per page:'), '25');
    expect(defaultProps.setRowsPerPage).toHaveBeenCalledWith(25);
  });

  it('clicking on next button advances the page', async () => {
    const { getByText } = render(<Pagination {...defaultProps} />);

    await user.click(getByText('Next'));
    expect(defaultProps.setCurrentPage).toHaveBeenCalled();
  });

  it('clicking on previous button regresses the page', async () => {
    const { getByText } = render(
      <Pagination {...defaultProps} currentPage={2} />
    );

    await user.click(getByText('Previous'));
    expect(defaultProps.setCurrentPage).toHaveBeenCalled();
  });

  it('previous button is disabled on first page', () => {
    const { getByText } = render(<Pagination {...defaultProps} />);

    const prevButton = getByText('Previous').closest('button');
    expect(prevButton?.hasAttribute('disabled')).toBe(true);
  });

  it('next button is disabled on last page', () => {
    const { getByText } = render(
      <Pagination {...defaultProps} currentPage={10} />
    );

    const nextButton = getByText('Next').closest('button');
    expect(nextButton?.hasAttribute('disabled')).toBe(true);
  });
});
