import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Table, { Column } from './Table';

type MockDataType = {
  id: string;
  name: string;
  date: string;
};

describe('Table component', () => {
  const user = userEvent.setup();

  const mockData: MockDataType[] = Array.from({ length: 50 }, (_, index) => ({
    id: `ID${index + 1}`,
    name: `Name ${index + 1}`,
    date: `${(index % 28) + 1}/10/2023`,
  }));

  const mockColumns: Column<MockDataType>[] = [
    {
      id: 'id',
      label: 'ID',
    },
    {
      id: 'name',
      label: 'Name',
    },
    {
      id: 'date',
      label: 'Date',
    },
  ];

  const mockColumnsRender: Column<MockDataType>[] = [
    {
      id: 'id',
      label: 'ID',
    },
    {
      id: 'name',
      label: 'Name',
      render: (row) => <>Hello, {row.name}</>,
    },
    {
      id: 'date',
      label: 'Date',
    },
  ];

  it('renders', () => {
    const { getByText } = render(
      <Table<MockDataType> data={mockData} columns={mockColumns} />
    );

    // Check if the column headers are rendered
    expect(getByText('ID')).toBeTruthy();
    expect(getByText('Name')).toBeTruthy();
    expect(getByText('Date')).toBeTruthy();
  });

  it('displays data correctly', () => {
    const { getByText } = render(
      <Table<MockDataType> data={mockData} columns={mockColumns} />
    );

    // Check if the data is rendered
    expect(getByText('Name 1')).toBeTruthy();
    expect(getByText('Name 2')).toBeTruthy();
    expect(getByText('1/10/2023')).toBeTruthy();
    expect(getByText('2/10/2023')).toBeTruthy();
  });

  it('should render the correct number of rows based on rowsPerPage and display pagination correctly', () => {
    const { getAllByRole, getByText } = render(
      <Table data={mockData} columns={mockColumns} defaultRowsPerPage={10} />
    );

    // Check if initially 10 rows are displayed
    expect(getAllByRole('row')).toHaveLength(11); // 10 data rows + 1 header row
    // Check initial page indication
    expect(getByText('1 of 5')).toBeTruthy();
  });

  it('should display the next set of rows when clicking "Next"', async () => {
    const { getByText } = render(
      <Table data={mockData} columns={mockColumns} defaultRowsPerPage={10} />
    );

    // Move to the next page
    await user.click(getByText('Next'));

    // Check that the first item on the second page (Item 11) is displayed
    expect(getByText('Name 11')).toBeTruthy();
  });

  it('should display the correct set of rows when changing rows per page', async () => {
    const { getByLabelText, getAllByRole } = render(
      <Table data={mockData} columns={mockColumns} defaultRowsPerPage={10} />
    );

    // Change rows per page to 25
    await user.selectOptions(getByLabelText('Rows per page:'), '25');

    // Check if 25 rows are displayed
    expect(getAllByRole('row')).toHaveLength(26); // 25 data rows + 1 header row
  });

  it('renders "No data available." message when data is empty', () => {
    const { getByText } = render(<Table data={[]} columns={mockColumns} />);

    expect(getByText('No data available.')).toBeTruthy();
  });

  it('renders custom cell using render prop', () => {
    const { getByText } = render(
      <Table data={mockData} columns={mockColumnsRender} />
    );

    expect(getByText('Hello, Name 1')).toBeTruthy();
  });
});
