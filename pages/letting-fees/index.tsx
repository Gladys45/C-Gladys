import { memo, useState, useCallback } from 'react';
import LegalLayout from '@/components/legal/LegalLayout';
import LegalSection from '@/components/legal/LegalSection';
import LegalTable from '@/components/legal/LegalTable';
import BackToTop from '@/components/legal/BackToTop';
import { COMPANY_INFO } from '@/utils/constants';

type Currency = 'RWF' | 'USD';

const LettingFeesPage = memo(() => {
  const [currency, setCurrency] = useState<Currency>('RWF');

  const toggleCurrency = useCallback((cur: Currency) => setCurrency(cur), []);

  const landlordFees = [
    { service: 'Tenant Find Only', RWF: '500,000', USD: '385', timing: 'Upon tenant move-in' },
    { service: 'Rent Collection', RWF: '8%', USD: '8%', timing: 'Monthly' },
    { service: 'Full Property Management', RWF: '12%', USD: '12%', timing: 'Monthly' },
    { service: 'Lease Renewal', RWF: '250,000', USD: '192', timing: 'Upon renewal' },
    { service: 'Property Marketing Package', RWF: '350,000', USD: '269', timing: 'Upfront' },
  ];

  const tenantFees = [
    { fee: 'Application / Referencing Fee', RWF: '100,000', USD: '77', per: 'Per applicant' },
    { fee: 'Tenancy Agreement Fee', RWF: '75,000', USD: '58', per: 'Per tenancy' },
    { fee: 'Check-in Fee', RWF: '50,000', USD: '38', per: 'Per tenancy' },
    { fee: 'Check-out Fee', RWF: '50,000', USD: '38', per: 'Per tenancy' },
    { fee: 'Late Rent Penalty', RWF: '25,000', USD: '19', per: 'Per month late' },
  ];

  const depositData = [
    { type: 'Unfurnished Property', amount: "1 month's rent", protection: 'Rent Deposit Scheme (RDS)' },
    { type: 'Furnished Property', amount: "1.5 - 2 months' rent", protection: 'Rent Deposit Scheme (RDS)' },
    { type: 'High-Value Property', amount: "2 months' rent", protection: 'Rent Deposit Scheme (RDS)' },
  ];

  const salesFees = [
    { service: 'Sole Agency', fee: '3% + VAT', description: 'Exclusive marketing rights' },
    { service: 'Multiple Agency', fee: '4% + VAT', description: 'Flexible marketing terms' },
    { service: 'Joint Agency', fee: '3.5% + VAT', description: 'Shared with partner agency' },
  ];

  return (
    <LegalLayout title="Letting Fees and Charges" lastUpdated="11 April 2026">
      {/* Currency Toggle */}
      <div className="flex justify-end mb-6">
        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
          <button
            onClick={() => toggleCurrency('RWF')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              currency === 'RWF' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            RWF (₣)
          </button>
          <button
            onClick={() => toggleCurrency('USD')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              currency === 'USD' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            USD ($)
          </button>
        </div>
      </div>

      {/* Introduction */}
      <div className="bg-blue-50 p-6 rounded-lg mb-8 border-l-4 border-blue-500">
        <p className="text-lg">
          <strong>CUPITAL GROUP Ltd</strong> is committed to transparent and fair pricing. All fees are subject to 
          <strong> 18% VAT</strong> unless stated otherwise.
        </p>
      </div>

      {/* Landlord Fees */}
      <LegalSection title="Landlord Fees" id="landlord-fees">
        <LegalTable
          columns={['service', currency === 'RWF' ? 'RWF' : 'USD', 'timing']}
          data={landlordFees.map(f => ({
            service: f.service,
            [currency === 'RWF' ? 'RWF' : 'USD']: f[currency === 'RWF' ? 'RWF' : 'USD'],
            timing: f.timing
          }))}
        />
      </LegalSection>

      {/* Tenant Fees */}
      <LegalSection title="Tenant Fees" id="tenant-fees" variant="highlight">
        <LegalTable
          columns={['fee', currency === 'RWF' ? 'RWF' : 'USD', 'per']}
          data={tenantFees.map(f => ({
            fee: f.fee,
            [currency === 'RWF' ? 'RWF' : 'USD']: f[currency === 'RWF' ? 'RWF' : 'USD'],
            per: f.per
          }))}
        />
        <div className="mt-4 p-3 bg-amber-50 rounded text-sm">
          <strong> Note:</strong> Referencing and agreement fees are non-refundable once services are provided.
        </div>
      </LegalSection>

      {/* Deposit Requirements */}
      <LegalSection title="Deposit Requirements" id="deposits">
        <LegalTable columns={['type', 'amount', 'protection']} data={depositData} />
        <p className="text-sm text-gray-600 mt-3">
          Deposits are held in a government-approved scheme and refundable at tenancy end, subject to property condition.
        </p>
      </LegalSection>

      {/* Sales Fees */}
      <LegalSection title="Property Sales Fees" id="sales-fees">
        <div className="grid md:grid-cols-3 gap-4 my-4">
          {salesFees.map((item, i) => (
            <div key={i} className="p-5 border rounded-xl text-center hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-gray-900 mb-2">{item.service}</h3>
              <p className="text-2xl font-bold text-primary mb-1">{item.fee}</p>
              <p className="text-sm text-gray-500">of final sale price</p>
              <p className="text-xs text-gray-400 mt-2">{item.description}</p>
            </div>
          ))}
        </div>
      </LegalSection>

      {/* Payment Methods */}
      <LegalSection title="Accepted Payment Methods" id="payment" variant="info">
        <ul className="grid md:grid-cols-2 gap-3">
          <li className="flex items-center gap-2"> Bank Transfer (preferred)</li>
          <li className="flex items-center gap-2"> Mobile Money (MTN Rwanda, Airtel Money)</li>
          <li className="flex items-center gap-2"> Credit/Debit Card (2% processing fee)</li>
          <li className="flex items-center gap-2"> Cash (in-person only, receipt provided)</li>
        </ul>
      </LegalSection>

      {/* Contact for Custom Quote */}
      <div className="mt-8 p-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl text-center">
        <h3 className="text-xl font-bold mb-2">Need a Custom Quote?</h3>
        <p className="mb-4 opacity-90">
          For portfolio landlords or commercial properties, contact us for a personalized fee proposal.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="mailto:cupitalgroup@gmail.com"
            className="px-5 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Email Us
          </a>
          <a
            href="tel:+250784578531"
            className="px-5 py-2 border border-white rounded-lg font-medium hover:bg-white hover:text-gray-900 transition"
          >
            📞 Call {COMPANY_INFO.phone}
          </a>
        </div>
      </div>

      <BackToTop />
    </LegalLayout>
  );
});

LettingFeesPage.displayName = 'LettingFeesPage';
export default LettingFeesPage;