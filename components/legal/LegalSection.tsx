import { memo, ReactNode } from 'react';

interface LegalSectionProps {
  title: string;
  id: string;
  children: ReactNode;
  variant?: 'default' | 'highlight' | 'warning' | 'info';
}

const variants = {
  default: 'border-l-4 border-gray-900 pl-4',
  highlight: 'border-l-4 border-amber-500 bg-amber-50 p-4 rounded-r-lg',
  warning: 'border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg',
  info: 'border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg',
};

const LegalSection = memo(({ title, id, children, variant = 'default' }: LegalSectionProps) => {
  return (
    <section id={id} className="scroll-mt-20 mb-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
        {title}
      </h2>
      <div className={variants[variant]}>{children}</div>
    </section>
  );
});

LegalSection.displayName = 'LegalSection';
export default LegalSection;