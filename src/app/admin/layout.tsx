import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

export const metadata = { title: "Techible Admin" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getSession();
  if (!user || user.role !== "admin") redirect("/login");

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      <AdminSidebar />
      <div className="flex-1 bg-gray-50 p-6 overflow-auto">{children}</div>
    </div>
  );
}
