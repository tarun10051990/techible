import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Techible | Posts" };

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    where: { isPublished: true },
    include: { author: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-white min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-teal-50 py-12 md:py-16">
        <div className="absolute top-10 right-20 w-20 h-20 border-2 border-green-200/30 rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
            <i className="fa-solid fa-pen-fancy text-xs"></i>
            Blog & Articles
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-3">
            Latest <span className="text-[#1a73e8]">Posts</span>
          </h1>
          <p className="text-gray-500 max-w-md">Insights, guides, and stories from the Techible community</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <i className="fa-solid fa-newspaper text-5xl text-gray-200 mb-4"></i>
            <p className="text-gray-500">No posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post) => (
              <Link key={post.id} href={`/posts/${post.slug}`} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="h-40 bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center">
                  <i className="fa-solid fa-newspaper text-4xl text-green-300"></i>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{post.category}</span>
                    <span className="text-[10px] text-gray-400">{formatDate(post.createdAt)}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#1a73e8] transition-colors line-clamp-2">{post.title}</h3>
                  {post.excerpt && <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>}
                  <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                    <i className="fa-solid fa-user text-[10px]"></i>
                    <span>{post.author?.name || "Techible Team"}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
