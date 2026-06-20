"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface SearchResult {
  type: string;
  title: string;
  href: string;
  subtitle?: string;
}

export default function SearchModal({ isOpen: open, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
      } catch {
        setResults([]);
      }
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-start justify-center pt-20" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
          <i className="fa-solid fa-search text-sm text-gray-400"></i>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search internships, courses, events..."
            className="flex-1 text-sm outline-none bg-transparent"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") onClose();
            }}
          />
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <i className="fa-solid fa-xmark text-xs text-gray-400"></i>
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {loading && (
            <div className="px-4 py-8 text-center text-gray-500 text-sm">Searching...</div>
          )}
          {!loading && query && results.length === 0 && (
            <div className="px-4 py-8 text-center text-gray-500 text-sm">No results found</div>
          )}
          {!loading && results.length > 0 && (
            <div className="py-2">
              {results.map((result, i) => (
                <button
                  key={i}
                  onClick={() => {
                    router.push(result.href);
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                    {result.type}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{result.title}</p>
                    {result.subtitle && (
                      <p className="text-xs text-gray-500">{result.subtitle}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
          {!query && (
            <div className="px-4 py-6 text-center text-gray-500 text-sm">
              <p>Try searching for internships, courses, or events</p>
              <div className="flex justify-center gap-2 mt-3">
                {["React", "Machine Learning", "IIT", "Hackathon"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
