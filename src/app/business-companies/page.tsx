import Link from "next/link";
import { Building2, ArrowRight } from "lucide-react";

export const metadata = { title: "Techible | Business Companies" };

const companies = [
  { name: "TechCorp India", industry: "Software Development", openings: 15 },
  { name: "DataViz Solutions", industry: "Data Analytics", openings: 8 },
  { name: "CloudNine Systems", industry: "Cloud Computing", openings: 12 },
  { name: "AI Innovations", industry: "Artificial Intelligence", openings: 6 },
  { name: "CyberShield", industry: "Cybersecurity", openings: 10 },
  { name: "MobileTech Labs", industry: "Mobile Development", openings: 9 },
];

export default function BusinessCompaniesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Business Companies</h1>
        <p className="text-gray-600 mt-2">Companies hiring through Techible</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <div key={company.name} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{company.name}</h3>
                <p className="text-sm text-gray-500">{company.industry}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t">
              <span className="text-sm text-gray-600">{company.openings} open positions</span>
              <Link href="/internships" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                View <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
