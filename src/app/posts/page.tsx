import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { MessageSquare, Eye, Heart, Clock } from "lucide-react";
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Posts</h1>
        <p className="text-gray-600 mt-2">Share your knowledge and learn from the community</p>
      </div>
      {posts.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No posts yet. Be the first to share!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.slug}`} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="h-40 bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                <MessageSquare className="w-10 h-10 text-white/80" />
              </div>
              <div className="p-5">
                <span className="text-xs font-medium text-teal-600">{post.category}</span>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mt-1 line-clamp-2">{post.title}</h3>
                {post.excerpt && <p className="text-sm text-gray-600 mt-2 line-clamp-2">{post.excerpt}</p>}
                <div className="flex items-center justify-between mt-4 pt-3 border-t text-sm text-gray-500">
                  <span>{post.author.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{post.views}</span>
                    <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{post.likes}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatDate(post.createdAt)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
