import { prisma } from "@/lib/prisma";
import InternshipsClient from "./InternshipsClient";

export default async function InternshipsPage() {
  const internships = await prisma.internship.findMany({ orderBy: { createdAt: "desc" } });
  return <InternshipsClient internships={internships} />;
}
