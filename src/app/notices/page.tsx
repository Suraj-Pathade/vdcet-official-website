'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Calendar, Download, Search, Tag } from 'lucide-react';

interface NoticeItem {
  id: number;
  title: string;
  category: string;
  content: string;
  pdf_url?: string | null;
  status: string;
  date: string;
}

export default function NoticesPage() {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);

  const categories = ['All', 'Admission', 'Academic', 'Examination', 'General'];

  useEffect(() => {
    fetchNotices();
  }, [activeCategory]);

  const fetchNotices = async () => {
    setLoading(true);
    try {
      // Fetch published notices
      const res = await fetch(`/api/public/notices?category=${encodeURIComponent(activeCategory)}`);
      if (res.ok) {
        const data = await res.json();
        setNotices(data);
      } else {
        setNotices([]);
      }
    } catch {
      setNotices([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredNotices = notices.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      {/* Title */}
      <div className="space-y-4 border-b border-black/[0.06] pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-xs font-semibold text-neutral-800">
          <FileText className="w-3.5 h-3.5" />
          <span>Official Circulars</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900">
          Notice Board
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 max-w-3xl leading-relaxed">
          Official VDCET institutional announcements, academic schedules, examination circulars, and CAP admission updates.
        </p>
      </div>

      {/* Filter Bar & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-black text-white font-semibold shadow-sm'
                  : 'bg-white text-neutral-600 hover:text-black border border-black/[0.08]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search notices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-full text-xs bg-white border border-black/[0.08] focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      {/* Notices List */}
      {loading ? (
        <div className="py-12 text-center text-xs text-neutral-400">Loading notice board...</div>
      ) : filteredNotices.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-black/[0.06] space-y-3">
          <FileText className="w-10 h-10 text-neutral-300 mx-auto" />
          <h3 className="font-bold text-base text-neutral-800">No notices found</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Information will be updated soon.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotices.map((notice) => (
            <div
              key={notice.id}
              className="bg-white rounded-2xl p-6 border border-black/[0.06] shadow-apple-sm hover:shadow-apple-md transition-all duration-200 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 border border-black/[0.04]">
                    {notice.category}
                  </span>
                  <span className="text-xs text-neutral-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {notice.date}
                  </span>
                </div>
                {notice.pdf_url && (
                  <a
                    href={notice.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-black hover:underline self-start sm:self-auto"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                )}
              </div>

              <h2 className="text-lg font-bold text-neutral-900 leading-snug">
                {notice.title}
              </h2>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed whitespace-pre-line">
                {notice.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
