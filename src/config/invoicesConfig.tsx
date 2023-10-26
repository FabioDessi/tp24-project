import { Column } from '../components/Table';
import { formatDateTime } from '../utils/formatDateTime';

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
    render: (row) => <span>{formatDateTime(row.IssueDate)}</span>,
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
    render: (row) => <span>{formatDateTime(row.DueDate)}</span>,
  },
  {
    id: 'ClosedDate',
    label: 'Closed Date',
    render: (row) => <span>{formatDateTime(row.ClosedDate)}</span>,
  },
  {
    id: 'Cancelled',
    label: 'Cancelled',
    render: (row) => (row.Cancelled ? <span>Yes</span> : <span>No</span>),
  },
];
