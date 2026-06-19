export const metadata = { title: "Techible | Shipping Policy" };

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Shipping Policy</h1>
      <div className="prose max-w-none text-gray-700 space-y-6">
        <p className="text-sm text-gray-500">Last updated: January 2025</p>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">1. Digital Products</h2>
          <p>Techible primarily offers digital services including online courses, internship placements, and event registrations. As these are digital products, no physical shipping is involved. Access is granted immediately upon successful purchase or registration.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">2. Certificates</h2>
          <p>Digital certificates for completed courses and internships are delivered via email and are available for download from your dashboard. Physical certificates, if applicable, will be shipped within 15-20 business days to the address provided in your profile.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">3. Refund Policy</h2>
          <p>For paid courses, a full refund is available within 7 days of purchase if you have not completed more than 20% of the course content. Event registration fees are non-refundable unless the event is cancelled by the organizer.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">4. Contact</h2>
          <p>For any shipping or delivery-related queries, please contact us at support@techible.io.</p>
        </section>
      </div>
    </div>
  );
}
