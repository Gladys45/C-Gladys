import { memo } from 'react';
import LegalLayout from '@/components/legal/LegalLayout';
import LegalSection from '@/components/legal/LegalSection';
import LegalList from '@/components/legal/LegalList';
import BackToTop from '@/components/legal/BackToTop';
import { COMPANY_INFO } from '@/utils/constants';

const TermsPage = memo(() => {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="11 April 2026">
      {/* Introduction */}
      <div className="bg-amber-50 p-6 rounded-lg mb-8 border-l-4 border-amber-500">
        <p className="text-lg">
          By accessing our website and using our services, you agree to be bound by these Terms of Service.
          Please read them carefully before using our platform.
        </p>
      </div>

      <LegalSection title="1. Definitions" id="definitions">
        <LegalList items={[
          '<strong>"Company"</strong>, <strong>"We"</strong>, <strong>"Us"</strong> refers to CUPITAL GROUP Ltd',
          '<strong>"Services"</strong> refers to property letting, management, sales, and real estate services',
          '<strong>"User"</strong>, <strong>"You"</strong> refers to any individual or entity using our services',
          '<strong>"Platform"</strong> refers to our website and mobile applications'
        ]} />
      </LegalSection>

      <LegalSection title="2. Eligibility and Account Registration" id="eligibility">
        <p>To use our services, you must be at least 18 years old. By registering, you agree to:</p>
        <LegalList type="decimal" items={[
          'Provide accurate, current, and complete information',
          'Maintain the security of your account credentials',
          'Promptly update any changes to your information',
          'Accept responsibility for all activities under your account'
        ]} />
      </LegalSection>

      <LegalSection title="3. Our Services" id="services" variant="highlight">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-lg">
            <h3 className="font-bold text-gray-900">🏠 Property Sales</h3>
            <p className="text-sm text-gray-600">Listing, marketing, and facilitating property purchases</p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <h3 className="font-bold text-gray-900">🔑 Property Lettings</h3>
            <p className="text-sm text-gray-600">Tenant finding, referencing, and lease agreements</p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <h3 className="font-bold text-gray-900">📋 Property Management</h3>
            <p className="text-sm text-gray-600">Rent collection, maintenance, and compliance</p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <h3 className="font-bold text-gray-900">📊 Valuations</h3>
            <p className="text-sm text-gray-600">Professional property valuations and market insights</p>
          </div>
        </div>
      </LegalSection>

      <LegalSection title="4. User Obligations" id="obligations">
        <p>When using our platform, you agree NOT to:</p>
        <LegalList items={[
          'Post false, inaccurate, or misleading property information',
          'Violate any applicable laws or regulations',
          'Infringe upon third-party intellectual property rights',
          'Harass, abuse, or harm other users or our staff',
          'Attempt to bypass our security measures'
        ]} />
      </LegalSection>

      <LegalSection title="5. Fees and Payments" id="fees">
        <p>Our service fees are detailed in our <strong>Letting Fees</strong> page. Key payment terms:</p>
        <LegalList type="decimal" items={[
          'All fees are payable in Rwandan Francs (RWF) unless otherwise specified',
          'Fees are due within 14 days of invoice date',
          'Late payments may incur interest at 2% per month',
          'Tenant deposits are protected in a government-approved deposit scheme'
        ]} />
      </LegalSection>

      <LegalSection title="6. Limitation of Liability" id="liability" variant="warning">
        <p>
          To the maximum extent permitted by law, CUPITAL shall not be liable for indirect, incidental, 
          or consequential damages. Our total liability shall not exceed the total fees paid by you in the 
          preceding 12 months.
        </p>
      </LegalSection>

      <LegalSection title="7. Governing Law" id="governing-law">
        <p>
          These Terms are governed by the laws of <strong>Rwanda</strong>. Any disputes shall be resolved through:
        </p>
        <LegalList type="decimal" items={[
          'Good-faith negotiations between the parties',
          'Mediation through the Kigali International Arbitration Centre (KIAC)',
          'Binding arbitration in Kigali, Rwanda'
        ]} />
      </LegalSection>

      <LegalSection title="8. Contact Information" id="contact">
        <p>For questions about these Terms, please contact us at:</p>
        <div className="mt-3 p-4 bg-gray-50 rounded-lg">
          <p><strong>{COMPANY_INFO.name}</strong></p>
          <p>{COMPANY_INFO.address}</p>
          <p>Email: <a href="mailto:cupitalgroup@gmail.com" className="text-primary hover:underline">{COMPANY_INFO.email}</a></p>
          <p>Phone: {COMPANY_INFO.phone}</p>
        </div>
      </LegalSection>

      <BackToTop />
    </LegalLayout>
  );
});

TermsPage.displayName = 'TermsPage';
export default TermsPage;