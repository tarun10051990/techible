import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-lg font-bold text-white">Techible</span>
            </div>
            <p className="text-sm text-gray-400">Your Gateway to Tech Opportunities</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Opportunities</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/internships" className="hover:text-white transition-colors">Skill Internships</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">Project Internships</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">Courses</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">Events</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/colleges" className="hover:text-white transition-colors">Institutes</Link></li>
              <li><Link href="/mentors" className="hover:text-white transition-colors">Mentors</Link></li>
              <li><Link href="/posts" className="hover:text-white transition-colors">Blog & Posts</Link></li>
              <li><Link href="/summer-school" className="hover:text-white transition-colors">Summer Schools</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/for-business" className="hover:text-white transition-colors">For Business</Link></li>
              <li><Link href="/support" className="hover:text-white transition-colors">Support</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-white transition-colors">Shipping Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Techible. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
