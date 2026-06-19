import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, Heart, Clock, Tag } from "lucide-react";
import { formatDate, parseTags } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function PostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { author: { select: { name: true, avatar: true } } },
  });
  if (!post) notFound();

  await prisma.post.update({ where: { id: post.id }, data: { views: { increment: 1 } } });
  const tags = parseTags(post.tags);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/posts" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Posts
      </Link>
      <article className="bg-white rounded-xl border border-gray-200 p-8">
        <span className="text-sm font-medium text-teal-600">{post.category}</span>
        <h1 className="text-3xl font-bold text-gray-900 mt-2">{post.title}</h1>
        <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
          <span className="font-medium text-gray-700">{post.author.name}</span>
          <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{formatDate(post.createdAt)}</span>
          <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{post.views} views</span>
          <span className="flex items-center gap-1"><Heart className="w-4 h-4" />{post.likes} likes</span>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full flex items-center gap-1">
                <Tag className="w-3 h-3" />{tag}
              </span>
            ))}
          </div>
        )}
        <div className="mt-8 prose max-w-none text-gray-700 whitespace-pre-wrap">{post.content}</div>
      </article>
    </div>
  );
}
