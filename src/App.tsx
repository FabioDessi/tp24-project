import React, { useState, useEffect } from 'react';
import Table from './components/Table';
import { invoiceColumns } from './config/invoicesConfig';

import type { Invoices } from './config/invoicesConfig';

const App: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoices[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        // TODO: replace CORS everywhere
        const response = await fetch(
          'https://cors-anywhere.herokuapp.com/https://tech-test.tp24.io/invoices.json'
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setInvoices(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div className="bg-gray-100 flex flex-col justify-center">
      <div className="mx-auto px-4">
        <div className="bg-white rounded-lg shadw p-6">
          <h1 className="text-2xl font-semibold mb-4">Invoice Data</h1>

          {loading ? (
            <div className="flex justify-center items-center mt-5">
              <div
                role="progressbar"
                aria-label="Loading"
                className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-900"
              ></div>
            </div>
          ) : error ? (
            <div className="text-red-500 mt-5">{error.message}</div>
          ) : (
            <div className="mt-5">
              <Table<Invoices> data={invoices} columns={invoiceColumns} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
