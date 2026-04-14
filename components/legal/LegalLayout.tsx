import { ReactNode, memo } from 'react';
import Head from 'next/head';

interface LegalLayoutProps {
  title: string;
  children: ReactNode;
  lastUpdated?: string;
}

const LegalLayout = memo(({ title, children, lastUpdated }: LegalLayoutProps) => {
  return (
    <>
      <Head>
        <title>{title} | CUPITAL GROUP Ltd</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`${title} | CUPITAL`} />
        <meta property="og:type" content="website" />
      </Head>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{title}</h1>
          {lastUpdated && (
            <p className="text-sm text-gray-500">
              Last Updated: <time dateTime={lastUpdated}>{lastUpdated}</time>
            </p>
          )}
          <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </header>
        <div className="prose prose-gray max-w-none">{children}</div>
      </article>
    </>
  );
});

LegalLayout.displayName = 'LegalLayout';
export default LegalLayout;