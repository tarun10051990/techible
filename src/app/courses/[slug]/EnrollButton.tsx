"use client";

import { useState, useEffect } from "react";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export default function EnrollButton({ courseId, price }: { courseId: string; price: number }) {
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/auth").then(r => r.json()).then(d => {
      if (d.user) {
        setUser(d.user);
        // Check if already enrolled
        fetch(`/api/courses?checkEnrollment=true&courseId=${courseId}`).then(r => r.json()).then(ed => {
          if (ed.enrolled) setEnrolled(true);
        });
      }
    });
  }, [courseId]);

  async function handleEnroll() {
    if (!user) { window.location.href = "/login"; return; }

    if (price === 0) {
      // Free course - enroll directly
      const res = await fetch("/api/courses", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, action: "enroll" }),
      });
      const data = await res.json();
      if (data.success) { setEnrolled(true); alert("Successfully enrolled!"); }
      return;
    }

    // Paid course - use Razorpay
    setLoading(true);
    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "course", referenceId: courseId, amount: price }),
      });
      const data = await res.json();

      if (data.error) { alert(data.error); setLoading(false); return; }

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "Techible",
        description: "Course Enrollment",
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
          if (result.success) { setEnrolled(true); alert("Enrollment successful!"); }
          else { alert("Payment verification failed. Please contact support."); }
        },
        prefill: { name: user.name, email: user.email },
        theme: { color: "#1a73e8" },
        modal: { ondismiss: () => setLoading(false) },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      alert("Failed to initiate payment");
    }
    setLoading(false);
  }

  if (enrolled) {
    return (
      <button disabled className="px-6 py-2.5 bg-green-500 text-white font-bold rounded-full">
        <i className="fa-solid fa-check mr-2"></i>Enrolled
      </button>
    );
  }

  return (
    <>
      <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      <button onClick={handleEnroll} disabled={loading} className="px-6 py-2.5 bg-[#1a73e8] text-white font-bold rounded-full hover:bg-[#1557b0] transition-colors disabled:opacity-50">
        {loading ? "Processing..." : price === 0 ? "Enroll Free" : `Enroll Now - ₹${price}`}
      </button>
    </>
  );
}
