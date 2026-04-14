import { memo, ReactNode } from 'react';

interface LegalListProps {
  items: (string | ReactNode)[];
  type?: 'disc' | 'decimal' | 'lower-alpha' | 'lower-roman';
  nested?: boolean;
  className?: string;
}

const listStyles = {
  disc: 'list-disc',
  decimal: 'list-decimal',
  'lower-alpha': 'list-[lower-alpha]',
  'lower-roman': 'list-[lower-roman]',
};

const LegalList = memo(({ items, type = 'decimal', nested = false, className = '' }: LegalListProps) => {
  return (
    <ul className={`${listStyles[type]} ${nested ? 'ml-6' : 'ml-5'} space-y-2 my-4 ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="leading-relaxed text-gray-700">
          {typeof item === 'string' ? <span dangerouslySetInnerHTML={{ __html: item }} /> : item}
        </li>
      ))}
    </ul>
  );
});

LegalList.displayName = 'LegalList';
export default LegalList;