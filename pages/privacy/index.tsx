import { memo } from 'react';
import LegalLayout from '@/components/legal/LegalLayout';
import LegalSection from '@/components/legal/LegalSection';
import LegalList from '@/components/legal/LegalList';
import LegalTable from '@/components/legal/LegalTable';
import BackToTop from '@/components/legal/BackToTop';
import CookieConsent from '@/components/legal/CookieConsent';
import { COMPANY_INFO, COOKIE_DATA, DATA_CATEGORIES } from '@/utils/constants';

const PrivacyPage = memo(() => {
  return (
    <>
      <LegalLayout title="Privacy Notice" lastUpdated="11 April 2026">
        {/* Introduction */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <p className="text-lg leading-relaxed">
            <strong className="text-gray-900">{COMPANY_INFO.name}</strong> (trading as <strong>CUPITAL</strong>) 
            respects your privacy and is committed to protecting your personal data. This privacy notice informs 
            you how we look after your personal data, your privacy rights, and how the law protects you.
          </p>
        </div>

        {/* Section 1: Important Information */}
        <LegalSection title="1. Important Information and Who We Are" id="important-info">
          <p className="mb-4">
            This privacy notice aims to give you information on how CUPITAL collects and processes your personal data.
            This website is not intended for children and we do not knowingly collect data relating to children.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mt-4">
            <h3 className="font-semibold text-gray-900 mb-2">Controller</h3>
            <p className="mb-1"><strong>CUPITAL GROUP Ltd</strong> is the data controller</p>
            <p className="mb-1">📧 Email: <a href="mailto:cupitalgroup@gmail.com" className="text-primary hover:underline">{COMPANY_INFO.email}</a></p>
            <p className="mb-1">📍 Address: {COMPANY_INFO.address}</p>
            <p className="mb-1">📞 Phone: <a href="tel:+250784578531" className="text-primary hover:underline">{COMPANY_INFO.phone}</a></p>
          </div>
        </LegalSection>

        {/* Section 2: Data Collection */}
        <LegalSection title="2. The Data We Collect About You" id="data-collection">
          <p>We may collect, use, store and transfer different kinds of personal data:</p>
          <LegalTable columns={['Category', 'Examples', 'Legal Basis']} data={DATA_CATEGORIES} />
          <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-500 rounded-r">
            <p className="text-sm">
              <strong className="text-green-800">✓ We do NOT collect</strong> special categories of personal data 
              (race, religion, health, political opinions) or criminal conviction data.
            </p>
          </div>
        </LegalSection>

        {/* Section 3: How We Use Data */}
        <LegalSection title="3. How We Use Your Personal Data" id="how-we-use">
          <p>We will only use your personal data when the law allows us to:</p>
          <LegalList items={[
            '<strong>Contract performance</strong> - to provide services you requested',
            '<strong>Legitimate interests</strong> - for business operations where your rights are protected',
            '<strong>Legal obligations</strong> - to comply with laws and regulations',
            '<strong>Consent</strong> - where you have given explicit permission'
          ]} />
        </LegalSection>

        {/* Section 4: Cookies */}
        <LegalSection title="4. Cookies and Tracking Technologies" id="cookies" variant="highlight">
          <p>Cookies are small text files placed on your device. We use them to:</p>
          <LegalList items={[
            'Analyze website traffic and improve user experience',
            'Remember your preferences',
            'Provide relevant advertising (with your consent)',
            'Maintain website security'
          ]} />
          <LegalTable columns={['Cookie Name', 'Purpose', 'Duration', 'Type']} data={COOKIE_DATA} />
          <p className="text-sm text-gray-600 mt-4">
            You can disable cookies in your browser settings. For Google Analytics opt-out, visit{' '}
            <a href="http://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              tools.google.com/dlpage/gaoptout
            </a>
          </p>
        </LegalSection>

        {/* Section 5: Data Security & Retention */}
        <LegalSection title="5. Data Security and Retention" id="security">
          <p>
            We have implemented appropriate security measures to prevent unauthorized access. We retain your personal 
            data only as long as necessary. By law, we must keep certain customer information for{' '}
            <strong className="text-gray-900">six (6) years</strong> after they cease being customers.
          </p>
        </LegalSection>

        {/* Section 6: Your Legal Rights */}
        <LegalSection title="6. Your Legal Rights" id="your-rights">
          <p>Under data protection laws, you have the following rights:</p>
          <LegalList type="decimal" items={[
            '<strong>Request access</strong> to your personal data',
            '<strong>Request correction</strong> of inaccurate data',
            '<strong>Request erasure</strong> (right to be forgotten)',
            '<strong>Object to processing</strong> for direct marketing',
            '<strong>Request data portability</strong>',
            '<strong>Withdraw consent</strong> at any time'
          ]} />
          <p className="mt-4">
            To exercise these rights, contact our Data Protection Officer at{' '}
            <a href="mailto:cupitalgroup@gmail.com" className="text-primary hover:underline">cupitalgroup@gmail.com</a>.
            We will respond within <strong>one month</strong>.
          </p>
        </LegalSection>

        {/* Section 7: Contact */}
        <LegalSection title="7. Contact Us" id="contact" variant="info">
          <p>
            For questions about this privacy notice or to make a complaint, please contact us at:
          </p>
          <div className="mt-3">
            <p><strong>{COMPANY_INFO.name}</strong></p>
            <p>{COMPANY_INFO.address}</p>
            <p>Email: {COMPANY_INFO.email}</p>
            <p>Phone: {COMPANY_INFO.phone}</p>
          </div>
          <p className="mt-3 text-sm">
            You also have the right to lodge a complaint with the{' '}
            <strong>National Cyber Security Authority (NCSA) of Rwanda</strong>.
          </p>
        </LegalSection>
      </LegalLayout>
      <CookieConsent />
      <BackToTop />
    </>
  );
});

PrivacyPage.displayName = 'PrivacyPage';
export default PrivacyPage;