import React from 'react';
import { eventRepo } from '@/lib/repository';
import { Building, BookOpen, Monitor, ShieldCheck, Sparkles, Calendar } from 'lucide-react';

export const revalidate = 0;

export default function CampusPage() {
  const events = eventRepo.getPublished();

  const facilities = [
    {
      title: 'Advanced Computer & AI Labs',
      desc: 'Equipped with high-performance workstations, modern development environments, and high-speed internet connectivity.',
      icon: Monitor,
    },
    {
      title: 'Central Library',
      desc: 'Extensive repository of technical reference books, engineering manuals, journals, and quiet study reading rooms.',
      icon: BookOpen,
    },
    {
      title: 'Civil & Mechanical Workshops',
      desc: 'Hands-on practical equipment for material testing, surveying, IC engines, and fluid mechanics.',
      icon: Building,
    },
    {
      title: 'Seminar Halls & Auditorium',
      desc: 'Spacious presentation venues equipped with modern audiovisual tools for technical symposiums and workshops.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Title */}
      <div className="space-y-4 border-b border-black/[0.06] pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-xs font-semibold text-neutral-800">
          <span>Mouda Campus Life</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900">
          Campus & Infrastructure
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 max-w-3xl leading-relaxed">
          Exploring learning spaces, practical workshops, computer centers, and student activities at VDCET Mouda.
        </p>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {facilities.map((fac) => {
          const IconComp = fac.icon;
          return (
            <div
              key={fac.title}
              className="bg-white rounded-3xl p-8 border border-black/[0.06] shadow-apple-sm space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-black">
                <IconComp className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-neutral-900">{fac.title}</h2>
              <p className="text-sm text-neutral-600 leading-relaxed">{fac.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Visual Photography Highlights Gallery */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">Campus Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-neutral-900 text-white rounded-2xl p-6 h-48 flex flex-col justify-end border border-black/[0.08] relative overflow-hidden">
            <span className="text-xs font-mono font-semibold text-neutral-400 uppercase">Facility</span>
            <h3 className="font-bold text-base text-white">Computer Engineering Center</h3>
          </div>
          <div className="bg-neutral-800 text-white rounded-2xl p-6 h-48 flex flex-col justify-end border border-black/[0.08] relative overflow-hidden">
            <span className="text-xs font-mono font-semibold text-neutral-400 uppercase">Workshop</span>
            <h3 className="font-bold text-base text-white">Engineering Laboratories</h3>
          </div>
          <div className="bg-neutral-950 text-white rounded-2xl p-6 h-48 flex flex-col justify-end border border-black/[0.08] relative overflow-hidden">
            <span className="text-xs font-mono font-semibold text-neutral-400 uppercase">Library</span>
            <h3 className="font-bold text-base text-white">Reference Library & Study</h3>
          </div>
        </div>
      </div>

      {/* Campus Events & Student Activities */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">Events & Activities</h2>
        </div>

        {events.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-black/[0.06] text-neutral-500 text-sm">
            Information will be updated soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((ev) => (
              <div key={ev.id} className="bg-white rounded-2xl p-6 border border-black/[0.06] shadow-apple-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-neutral-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {ev.date}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-neutral-100 text-neutral-700">
                    {ev.location}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900">{ev.title}</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">{ev.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
