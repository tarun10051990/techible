import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function PostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { author: { select: { name: true } } },
  });
  if (!post) notFound();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/posts" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a73e8] hover:underline mb-6">
          <i className="fa-solid fa-arrow-left text-xs"></i> Back to Posts
        </Link>
        <article className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="h-48 bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center">
            <i className="fa-solid fa-newspaper text-6xl text-green-300"></i>
          </div>
          <div className="p-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{post.category}</span>
              <span className="text-xs text-gray-400">{formatDate(post.createdAt)}</span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 mb-2">{post.title}</h1>
            <p className="text-sm text-gray-500 flex items-center gap-2 mb-6">
              <i className="fa-solid fa-user text-xs"></i> {post.author?.name || "Techible Team"}
            </p>
            <div className="prose max-w-none text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
            {post.tags && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.split(",").map((tag) => (
                    <span key={tag} className="text-xs font-semibold bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{tag.trim()}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
