import { Column } from './components/Table';

export interface Invoices {
  Id: number;
  UniqueReference: string;
  CurrencyCode: string;
  IssueDate: string;
  OpeningValue: number;
  RemainingBalance: number;
  DueDate: string;
  ClosedDate: string;
  Cancelled: boolean;
}

export const invoiceColumns: Column<Invoices>[] = [
  {
    id: 'Id',
    label: 'ID',
  },
  {
    id: 'UniqueReference',
    label: 'Unique Reference',
  },
  {
    id: 'CurrencyCode',
    label: 'Currency Code',
  },
  {
    id: 'IssueDate',
    label: 'Issue Date',
  },
  {
    id: 'OpeningValue',
    label: 'Opening Value',
  },
  {
    id: 'RemainingBalance',
    label: 'Remaining Balance',
  },
  {
    id: 'DueDate',
    label: 'Due Date',
  },
  {
    id: 'ClosedDate',
    label: 'Closed Date',
  },
  {
    id: 'Cancelled',
    label: 'Cancelled',
    render: (row) => (row.Cancelled ? <span>Yes</span> : <span>No</span>),
  },
];
