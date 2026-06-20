"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Plan = { id: string; name: string; slug: string; price: number; duration: number; features: string; resumeDownloads: number; isPopular: boolean };
type ActiveSub = { id: string; status: string; endDate: string; plan: Plan };

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export default function SubscriptionPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [activeSub, setActiveSub] = useState<ActiveSub | null>(null);
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth").then(r => r.json()).then(d => { if (d.user) setUser(d.user); });
    fetch("/api/subscriptions").then(r => r.json()).then(d => {
      setPlans(d.plans || []);
      if (d.activeSubscription) setActiveSub(d.activeSubscription);
    });
  }, []);

  async function handleSubscribe(plan: Plan) {
    if (!user) { window.location.href = "/login"; return; }
    if (plan.price === 0) return;

    setLoading(plan.id);
    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "subscription", referenceId: plan.id, amount: plan.price }),
      });
      const data = await res.json();

      if (data.error) { alert(data.error); setLoading(null); return; }

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "Techible",
        description: `${plan.name} Subscription - ${plan.duration} days`,
        order_id: data.orderId,
        handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          const verifyRes = await fetch("/api/payments", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              paymentId: data.paymentId,
            }),
          });
          const result = await verifyRes.json();
          if (result.success) {
            alert("Subscription activated successfully!");
            window.location.reload();
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: { name: user.name, email: user.email },
        theme: { color: "#1a73e8" },
        modal: { ondismiss: () => setLoading(null) },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      alert("Failed to initiate payment");
    }
    setLoading(null);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Razorpay Script */}
      <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>

      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 py-16 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <i className="fa-solid fa-crown text-yellow-300"></i> Subscription Plans
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Choose Your Plan</h1>
          <p className="text-lg text-blue-100 max-w-xl mx-auto">Unlock premium features including resume downloads, priority support, and more.</p>
        </div>
      </section>

      {activeSub && (
        <div className="max-w-4xl mx-auto px-4 mt-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
            <i className="fa-solid fa-circle-check text-green-600 text-lg"></i>
            <div>
              <p className="font-semibold text-green-800">Active: {activeSub.plan.name} Plan</p>
              <p className="text-sm text-green-600">Valid until {new Date(activeSub.endDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map(plan => (
            <div key={plan.id} className={`bg-white rounded-2xl border-2 p-6 relative ${plan.isPopular ? "border-[#1a73e8] shadow-lg" : "border-gray-100"}`}>
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1a73e8] text-white text-xs font-bold px-4 py-1 rounded-full">MOST POPULAR</div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-3">
                  <span className="text-4xl font-extrabold text-gray-900">{plan.price === 0 ? "Free" : `₹${plan.price}`}</span>
                  {plan.price > 0 && <span className="text-gray-500 text-sm">/{plan.duration} days</span>}
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.split(",").map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <i className="fa-solid fa-check text-green-500 mt-0.5 text-xs"></i>
                    {f.trim()}
                  </li>
                ))}
              </ul>
              {activeSub?.plan.id === plan.id ? (
                <button disabled className="w-full py-3 rounded-full font-semibold text-sm bg-green-50 text-green-600 border border-green-200">Current Plan</button>
              ) : plan.price === 0 ? (
                <button disabled className="w-full py-3 rounded-full font-semibold text-sm bg-gray-50 text-gray-400 border">Free Forever</button>
              ) : (
                <button onClick={() => handleSubscribe(plan)} disabled={loading === plan.id} className={`w-full py-3 rounded-full font-semibold text-sm transition ${plan.isPopular ? "bg-[#1a73e8] text-white hover:bg-blue-700" : "border-2 border-[#1a73e8] text-[#1a73e8] hover:bg-blue-50"}`}>
                  {loading === plan.id ? "Processing..." : "Subscribe Now"}
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-2xl border p-8 text-center">
          <h3 className="font-bold text-lg text-gray-900 mb-2">Payment Methods</h3>
          <p className="text-gray-500 mb-4">We accept all major payment methods via Razorpay</p>
          <div className="flex items-center justify-center gap-6 text-2xl text-gray-400">
            <i className="fa-brands fa-cc-visa"></i>
            <i className="fa-brands fa-cc-mastercard"></i>
            <i className="fa-solid fa-building-columns"></i>
            <span className="text-sm font-bold border px-3 py-1 rounded">UPI</span>
            <i className="fa-brands fa-google-pay"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
