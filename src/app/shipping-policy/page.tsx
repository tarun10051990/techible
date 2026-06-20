export const metadata = { title: "Techible | Shipping Policy" };

export default function ShippingPolicyPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-extrabold text-gray-900">Shipping Policy</h1>
          <p className="text-sm text-gray-500 mt-1">Last updated: January 2025</p>
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 space-y-8 text-sm text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><i className="fa-solid fa-cloud-arrow-down text-[#1a73e8] text-sm"></i> 1. Digital Products</h2>
            <p>Techible primarily offers digital services including online courses, internship placements, and event registrations. As these are digital products, no physical shipping is involved. Access is granted immediately upon successful purchase or registration.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><i className="fa-solid fa-certificate text-[#1a73e8] text-sm"></i> 2. Certificates</h2>
            <p>Digital certificates for completed courses and internships are delivered via email and are available for download from your dashboard. Physical certificates, if applicable, will be shipped within 15-20 business days to the address provided in your profile.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><i className="fa-solid fa-rotate-left text-[#1a73e8] text-sm"></i> 3. Refund Policy</h2>
            <p>For paid courses, a full refund is available within 7 days of purchase if you have not completed more than 20% of the course content. Event registration fees are non-refundable unless the event is cancelled by the organizer.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><i className="fa-solid fa-envelope text-[#1a73e8] text-sm"></i> 4. Contact</h2>
            <p>For any shipping or delivery-related queries, please contact us at support@techible.io.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
