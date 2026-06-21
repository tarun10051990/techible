import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-[#1a73e8] rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-arrow-up-right-dots text-white text-xs"></i>
              </div>
              <span className="text-lg font-extrabold text-[#1a73e8]">Techible</span>
            </Link>
            <p className="text-sm text-gray-500 mb-3">
              Made with <span className="text-red-500">♥</span> for the world
            </p>
            <a href="mailto:info@techible.io" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#1a73e8] mb-3">
              <i className="fa-solid fa-envelope text-xs"></i>
              info@techible.io
            </a>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="instagram" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-[#1a73e8] hover:text-white transition-colors">
                <i className="fa-brands fa-instagram text-sm"></i>
              </a>
              <a href="#" aria-label="linkedin" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-[#1a73e8] hover:text-white transition-colors">
                <i className="fa-brands fa-linkedin-in text-sm"></i>
              </a>
            </div>
          </div>

          {/* Business */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3">Business</h3>
            <ul className="space-y-2">
              <li><Link href="/for-business" className="text-sm text-gray-500 hover:text-[#1a73e8] flex items-center gap-1">For Businesses <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i></Link></li>
              <li><Link href="/business-companies" className="text-sm text-gray-500 hover:text-[#1a73e8]">For Companies/Recruiters</Link></li>
              <li><Link href="/business-college" className="text-sm text-gray-500 hover:text-[#1a73e8]">For Colleges</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3">About</h3>
            <ul className="space-y-2">
              <li><Link href="/about-us" className="text-sm text-gray-500 hover:text-[#1a73e8]">About Us</Link></li>
              <li><Link href="/privacy-policy" className="text-sm text-gray-500 hover:text-[#1a73e8]">Privacy & Policy</Link></li>
              <li><Link href="/shipping-policy" className="text-sm text-gray-500 hover:text-[#1a73e8]">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Apply */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3">Apply</h3>
            <ul className="space-y-2">
              <li><Link href="/internships" className="text-sm text-gray-500 hover:text-[#1a73e8]">Skill Based Internships</Link></li>
              <li><Link href="/projects" className="text-sm text-gray-500 hover:text-[#1a73e8]">Project Based Internships</Link></li>
              <li><Link href="/mentors" className="text-sm text-gray-500 hover:text-[#1a73e8]">Mentorships</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3">Contact & Support</h3>
            <ul className="space-y-2">
              <li><Link href="/support" className="text-sm text-gray-500 hover:text-[#1a73e8]">Contact & Support</Link></li>
              <li><Link href="/shipping-policy" className="text-sm text-gray-500 hover:text-[#1a73e8]">Shipping Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Techible Smart Learn Private Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
