import { memo } from 'react';

interface LegalTableProps {
  columns: string[];
  data: Record<string, any>[];
  variant?: 'striped' | 'bordered' | 'minimal';
}

const LegalTable = memo(({ columns, data, variant = 'striped' }: LegalTableProps) => {
  const variants = {
    striped: 'bg-white rounded-lg overflow-hidden shadow-sm',
    bordered: 'border-collapse border border-gray-300 rounded-lg',
    minimal: 'divide-y divide-gray-200',
  };

  const headerStyles = {
    striped: 'bg-gray-900 text-white',
    bordered: 'bg-gray-100 text-gray-900 border border-gray-300',
    minimal: 'bg-transparent text-gray-900',
  };

  const rowStyles = {
    striped: 'hover:bg-gray-50 transition-colors',
    bordered: 'border border-gray-300 hover:bg-gray-50',
    minimal: 'hover:bg-gray-50 transition-colors',
  };

  return (
    <div className="overflow-x-auto my-6">
      <table className={`w-full text-sm ${variants[variant]}`}>
        <thead>
          <tr className={headerStyles[variant]}>
            {columns.map((col, i) => (
              <th key={i} className="px-4 py-3 text-left font-semibold">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className={`${rowStyles[variant]} ${variant === 'striped' && i % 2 === 1 ? 'bg-gray-50' : ''}`}>
              {columns.map((col, j) => (
                <td key={j} className="px-4 py-3 text-gray-700">
                  {row[col] || row[col.toLowerCase()] || '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

LegalTable.displayName = 'LegalTable';
export default LegalTable;