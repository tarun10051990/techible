import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  Briefcase,
  BookOpen,
  GraduationCap,
  Users,
  Calendar,
  ArrowRight,
  Zap,
  Target,
  TrendingUp,
  Star,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [internshipCount, courseCount, collegeCount, mentorCount, eventCount] =
    await Promise.all([
      prisma.internship.count({ where: { isActive: true } }),
      prisma.course.count({ where: { isActive: true } }),
      prisma.college.count({ where: { isActive: true } }),
      prisma.mentor.count({ where: { isActive: true } }),
      prisma.event.count({ where: { isActive: true } }),
    ]);

  const featuredInternships = await prisma.internship.findMany({
    where: { isActive: true, featured: true },
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  const featuredCourses = await prisma.course.findMany({
    where: { isActive: true, featured: true },
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  const upcomingEvents = await prisma.event.findMany({
    where: { isActive: true, date: { gte: new Date() } },
    take: 3,
    orderBy: { date: "asc" },
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0djJoLTJ2LTJoMnptMCAyMHYyaC0ydi0yaDJ6bTAtMjB2MmgtMnYtMmgyem0yMCAyMHYyaC0ydi0yaDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-6">
              <Zap className="w-4 h-4 text-yellow-300" />
              <span>Your Gateway to Tech Opportunities</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Discover Your Next
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Tech Opportunity
              </span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl">
              Connect with top companies, learn from industry experts, and build
              your career in tech. Find internships, courses, mentors, and more.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/internships"
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                Browse Internships
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/courses"
                className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
              >
                Explore Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {[
              { label: "Active Internships", count: `${internshipCount}+`, icon: Briefcase },
              { label: "Courses", count: `${courseCount}+`, icon: BookOpen },
              { label: "Top Institutes", count: `${collegeCount}+`, icon: GraduationCap },
              { label: "Expert Mentors", count: `${mentorCount}+`, icon: Users },
              { label: "Events", count: `${eventCount}+`, icon: Calendar },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <stat.icon className="w-6 h-6 text-blue-600 mb-2" />
                <span className="text-2xl font-bold text-gray-900">{stat.count}</span>
                <span className="text-sm text-gray-500">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Internships */}
      {featuredInternships.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Featured Internships</h2>
                <p className="text-gray-600 mt-1">Top opportunities from leading companies</p>
              </div>
              <Link href="/internships" className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredInternships.map((internship) => (
                <Link
                  key={internship.id}
                  href={`/internships/${internship.slug}`}
                  className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 text-sm line-clamp-1">
                        {internship.title}
                      </h3>
                      <p className="text-xs text-gray-500">{internship.company}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">
                      {internship.mode}
                    </span>
                    <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
                      {internship.duration}
                    </span>
                  </div>
                  {internship.stipend && (
                    <p className="text-sm font-medium text-gray-900">{internship.stipend}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">{internship.location}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900">How Techible Works</h2>
            <p className="text-gray-600 mt-2">Three simple steps to kickstart your tech career</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Discover Opportunities",
                desc: "Browse through hundreds of internships, courses, and events from top tech companies and institutions.",
              },
              {
                icon: TrendingUp,
                title: "Build Your Skills",
                desc: "Learn from industry experts through courses and mentorship programs designed for career growth.",
              },
              {
                icon: Star,
                title: "Launch Your Career",
                desc: "Apply to top internships, connect with mentors, and get placed at leading tech companies.",
              },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                  <step.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      {featuredCourses.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Popular Courses</h2>
                <p className="text-gray-600 mt-1">Learn industry-relevant skills</p>
              </div>
              <Link href="/courses" className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCourses.map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="h-40 bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-white/80" />
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-blue-600 font-medium">{course.category}</span>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mt-1 line-clamp-2 text-sm">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">by {course.instructor}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm font-bold text-gray-900">
                        {course.price === 0 ? "Free" : `₹${course.price}`}
                      </span>
                      <span className="text-xs text-gray-500">{course.level}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
                <p className="text-gray-600 mt-1">Hackathons, workshops & more</p>
              </div>
              <Link href="/events" className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.slug}`}
                  className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-700 rounded-full capitalize">
                      {event.type}
                    </span>
                    <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                      {event.mode}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{event.organizer}</p>
                  <div className="text-sm text-gray-600">
                    <p>{new Date(event.date).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}</p>
                    <p className="text-xs text-gray-400 mt-1">{event.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Tech Journey?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have found their dream internships,
            learned new skills, and launched their careers through Techible.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/signup"
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Sign Up Free
            </Link>
            <Link
              href="/for-business"
              className="px-8 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              For Business
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
