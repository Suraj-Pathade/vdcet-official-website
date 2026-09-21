import React from 'react';
import { contentRepo } from '@/lib/repository';
import { MapPin, Phone, Mail, ExternalLink, Globe, Compass } from 'lucide-react';

export const revalidate = 0;

export default function ContactPage() {
  const address = contentRepo.get('address');
  const phone = contentRepo.get('phone');
  const email = contentRepo.get('email');
  const mapsEmbedUrl = contentRepo.get('maps_embed_url');
  const dteCode = contentRepo.get('dte_code');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Title */}
      <div className="space-y-4 border-b border-black/[0.06] pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-xs font-semibold text-neutral-800">
          <Compass className="w-3.5 h-3.5" />
          <span>Official Contacts & Location</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900">
          Contact VDCET Office
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 max-w-3xl leading-relaxed">
          Official institutional directory and Google Maps location guide for Vilasrao Deshmukh College of Engineering & Technology, Mouda.
        </p>
      </div>

      {/* Official Directory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-8 border border-black/[0.06] shadow-apple-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-black mb-2">
            <MapPin className="w-5 h-5" />
          </div>
          <h2 className="font-bold text-lg text-neutral-900">Campus Address</h2>
          <p className="text-xs text-neutral-600 leading-relaxed">{address}</p>
          <div className="pt-2">
            <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded bg-neutral-100 text-neutral-700">
              DTE Code: {dteCode}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-black/[0.06] shadow-apple-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-black mb-2">
            <Phone className="w-5 h-5" />
          </div>
          <h2 className="font-bold text-lg text-neutral-900">Telephone Lines</h2>
          <p className="text-sm font-semibold text-neutral-900">{phone}</p>
          <p className="text-xs text-neutral-500">Available during college administration hours (Mon - Sat).</p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-black/[0.06] shadow-apple-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-black mb-2">
            <Mail className="w-5 h-5" />
          </div>
          <h2 className="font-bold text-lg text-neutral-900">Official Email</h2>
          <p className="text-sm font-semibold text-neutral-900">{email}</p>
          <p className="text-xs text-neutral-500">For academic correspondence and institutional inquiries.</p>
        </div>
      </div>

      {/* Interactive Google Maps View */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">Google Maps Location</h2>
        <div className="rounded-3xl overflow-hidden border border-black/[0.08] shadow-apple-md h-96 w-full bg-neutral-100">
          <iframe
            title="VDCET Mouda Google Maps Location"
            src={mapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* Useful Official Links */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">Useful Institutional Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="https://cetcell.mahacet.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-5 rounded-2xl bg-white border border-black/[0.06] hover:border-black/[0.2] transition-colors shadow-apple-sm"
          >
            <div className="space-y-1">
              <span className="font-bold text-sm text-neutral-900">State CET Cell Maharashtra Portal</span>
              <p className="text-xs text-neutral-500">CAP Allotment & Merit List Notifications</p>
            </div>
            <ExternalLink className="w-4 h-4 text-neutral-400" />
          </a>

          <a
            href="https://www.vdcet.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-5 rounded-2xl bg-white border border-black/[0.06] hover:border-black/[0.2] transition-colors shadow-apple-sm"
          >
            <div className="space-y-1">
              <span className="font-bold text-sm text-neutral-900">Official VDCET Legacy Site</span>
              <p className="text-xs text-neutral-500">Archival College Portal</p>
            </div>
            <Globe className="w-4 h-4 text-neutral-400" />
          </a>
        </div>
      </div>
    </div>
  );
}
