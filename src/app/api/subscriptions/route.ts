import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// Get subscription plans and user's active subscription
export async function GET() {
  const user = await getSession();

  const plans = await prisma.subscriptionPlan.findMany({
    where: { isActive: true },
    orderBy: { price: "asc" },
  });

  let activeSubscription = null;
  if (user) {
    activeSubscription = await prisma.subscription.findFirst({
      where: { userId: user.id, status: "active", endDate: { gte: new Date() } },
      include: { plan: true },
      orderBy: { endDate: "desc" },
    });
  }

  return Response.json({ plans, activeSubscription });
}
