export const metadata = { title: "Techible | Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-extrabold text-gray-900">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mt-1">Last updated: January 2025</p>
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 space-y-8 text-sm text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><i className="fa-solid fa-database text-[#1a73e8] text-sm"></i> 1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create an account, apply for internships, enroll in courses, or contact us for support. This includes your name, email address, phone number, educational background, resume, and other profile information.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><i className="fa-solid fa-gears text-[#1a73e8] text-sm"></i> 2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, process applications, facilitate connections between students and companies, send notifications about opportunities, and respond to your requests.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><i className="fa-solid fa-share-nodes text-[#1a73e8] text-sm"></i> 3. Information Sharing</h2>
            <p>We share your information with companies and institutions only when you apply for their opportunities. We do not sell your personal information to third parties. We may share aggregated, anonymized data for research and analytics purposes.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><i className="fa-solid fa-shield-halved text-[#1a73e8] text-sm"></i> 4. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All data is encrypted in transit and at rest.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><i className="fa-solid fa-user-check text-[#1a73e8] text-sm"></i> 5. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information at any time. You can update your profile settings or contact us at support@techible.io for assistance with data requests.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><i className="fa-solid fa-cookie-bite text-[#1a73e8] text-sm"></i> 6. Cookies</h2>
            <p>We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage your cookie preferences through your browser settings.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><i className="fa-solid fa-envelope text-[#1a73e8] text-sm"></i> 7. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at support@techible.io or through our support page.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
