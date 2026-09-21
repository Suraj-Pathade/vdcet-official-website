'use client';

import React, { useState, useEffect } from 'react';
import {
  Lock,
  LogOut,
  FileText,
  Calendar,
  Database,
  Globe,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  AlertCircle,
  FolderOpen,
} from 'lucide-react';

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'notices' | 'events' | 'documents' | 'knowledge' | 'content'>('notices');

  // Data states
  const [notices, setNotices] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [knowledge, setKnowledge] = useState<any[]>([]);
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // Form states for Notices
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeCategory, setNoticeCategory] = useState('General');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticePdfUrl, setNoticePdfUrl] = useState('');
  const [noticeStatus, setNoticeStatus] = useState<'Draft' | 'Published' | 'Archived'>('Published');
  const [noticeDate, setNoticeDate] = useState(new Date().toISOString().split('T')[0]);

  // Form states for Events
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState(new Date().toISOString().split('T')[0]);
  const [eventLocation, setEventLocation] = useState('VDCET Campus');
  const [eventDesc, setEventDesc] = useState('');
  const [eventStatus, setEventStatus] = useState<'Draft' | 'Published' | 'Archived'>('Published');

  // Form states for Documents
  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState('General');
  const [docUrl, setDocUrl] = useState('');
  const [docSize, setDocSize] = useState('PDF');

  // Form states for Knowledge Chunk
  const [kTitle, setKTitle] = useState('');
  const [kContent, setKContent] = useState('');
  const [kSource, setKSource] = useState('Official VDCET Document');
  const [kCategory, setKCategory] = useState('General');

  // Form states for Content
  const [editKey, setEditKey] = useState('');
  const [editVal, setEditVal] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/notices');
      if (res.ok) {
        setAuthenticated(true);
        loadAllData();
      } else {
        setAuthenticated(false);
      }
    } catch {
      setAuthenticated(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      });

      if (res.ok) {
        setAuthenticated(true);
        setPasswordInput('');
        loadAllData();
      } else {
        const data = await res.json();
        setAuthError(data.error || 'Invalid password');
      }
    } catch {
      setAuthError('Authentication failed');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setAuthenticated(false);
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [nRes, eRes, dRes, kRes, cRes] = await Promise.all([
        fetch('/api/admin/notices'),
        fetch('/api/admin/events'),
        fetch('/api/admin/documents'),
        fetch('/api/admin/knowledge-base'),
        fetch('/api/admin/content'),
      ]);

      if (nRes.ok) setNotices(await nRes.json());
      if (eRes.ok) setEvents(await eRes.json());
      if (dRes.ok) setDocuments(await dRes.json());
      if (kRes.ok) setKnowledge(await kRes.json());
      if (cRes.ok) setContent(await cRes.json());
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Helper notification
  const showStatus = (msg: string) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(''), 3000);
  };

  // NOTICE HANDLERS
  const handleAddNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle || !noticeContent) return;
    const res = await fetch('/api/admin/notices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: noticeTitle,
        category: noticeCategory,
        content: noticeContent,
        pdf_url: noticePdfUrl || null,
        status: noticeStatus,
        date: noticeDate,
      }),
    });
    if (res.ok) {
      setNoticeTitle('');
      setNoticeContent('');
      setNoticePdfUrl('');
      showStatus('Notice added successfully.');
      loadAllData();
    }
  };

  const handleDeleteNotice = async (id: number) => {
    if (!confirm('Are you sure you want to delete this notice?')) return;
    const res = await fetch(`/api/admin/notices?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      showStatus('Notice deleted.');
      loadAllData();
    }
  };

  const handleUpdateNoticeStatus = async (id: number, status: string) => {
    await fetch('/api/admin/notices', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    showStatus(`Status updated to ${status}`);
    loadAllData();
  };

  // EVENT HANDLERS
  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle || !eventDesc) return;
    const res = await fetch('/api/admin/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: eventTitle,
        date: eventDate,
        location: eventLocation,
        description: eventDesc,
        status: eventStatus,
      }),
    });
    if (res.ok) {
      setEventTitle('');
      setEventDesc('');
      showStatus('Event added successfully.');
      loadAllData();
    }
  };

  const handleDeleteEvent = async (id: number) => {
    if (!confirm('Delete event?')) return;
    await fetch(`/api/admin/events?id=${id}`, { method: 'DELETE' });
    showStatus('Event deleted.');
    loadAllData();
  };

  // DOCUMENT HANDLERS
  const handleAddDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle || !docUrl) return;
    const res = await fetch('/api/admin/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: docTitle,
        category: docCategory,
        file_url: docUrl,
        file_size: docSize,
      }),
    });
    if (res.ok) {
      setDocTitle('');
      setDocUrl('');
      showStatus('Document link uploaded.');
      loadAllData();
    }
  };

  const handleDeleteDocument = async (id: number) => {
    if (!confirm('Delete document?')) return;
    await fetch(`/api/admin/documents?id=${id}`, { method: 'DELETE' });
    showStatus('Document removed.');
    loadAllData();
  };

  // KNOWLEDGE BASE HANDLERS
  const handleAddKnowledge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!kTitle || !kContent) return;
    const res = await fetch('/api/admin/knowledge-base', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: kTitle,
        content: kContent,
        source_name: kSource,
        category: kCategory,
      }),
    });
    if (res.ok) {
      setKTitle('');
      setKContent('');
      showStatus('AI Knowledge Base chunk added.');
      loadAllData();
    }
  };

  const handleDeleteKnowledge = async (id: number) => {
    if (!confirm('Delete knowledge chunk?')) return;
    await fetch(`/api/admin/knowledge-base?id=${id}`, { method: 'DELETE' });
    showStatus('Knowledge chunk deleted.');
    loadAllData();
  };

  // CONTENT HANDLERS
  const handleUpdateContent = async (key: string, value: string) => {
    const res = await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value }),
    });
    if (res.ok) {
      showStatus(`Updated ${key}`);
      loadAllData();
    }
  };

  if (authenticated === null) {
    return <div className="py-24 text-center text-xs text-neutral-400">Loading admin portal...</div>;
  }

  // 1. UNAUTHENTICATED: LOGIN SCREEN
  if (!authenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-black/[0.08] shadow-apple-lg w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center mx-auto mb-2">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">VDCET Admin CMS</h1>
            <p className="text-xs text-neutral-500">Authorized personnel authentication only.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Admin Security Password
              </label>
              <input
                type="password"
                placeholder="Enter password..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm bg-neutral-50 border border-black/[0.1] focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            {authError && (
              <div className="text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-100 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-semibold text-sm text-white bg-black hover:bg-neutral-800 transition-colors shadow-sm"
            >
              Authenticate & Launch CMS
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED: DASHBOARD CMS
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.06] pb-6">
        <div>
          <span className="text-xs font-mono font-semibold text-neutral-400 uppercase">
            Hidden Administrative CMS
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">VDCET Management Dashboard</h1>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors self-start sm:self-auto"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      {statusMsg && (
        <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-4 py-3 rounded-xl text-xs font-medium flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-black/[0.06] pb-3">
        <button
          onClick={() => setActiveTab('notices')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'notices' ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }`}
        >
          Notices ({notices.length})
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'events' ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }`}
        >
          Events ({events.length})
        </button>
        <button
          onClick={() => setActiveTab('documents')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'documents' ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }`}
        >
          Documents ({documents.length})
        </button>
        <button
          onClick={() => setActiveTab('knowledge')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'knowledge' ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }`}
        >
          AI Knowledge Base ({knowledge.length})
        </button>
        <button
          onClick={() => setActiveTab('content')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'content' ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }`}
        >
          Website Content & Contacts
        </button>
      </div>

      {/* TAB 1: NOTICES */}
      {activeTab === 'notices' && (
        <div className="space-y-8">
          <form onSubmit={handleAddNotice} className="bg-white rounded-3xl p-6 border border-black/[0.06] space-y-4 shadow-apple-sm">
            <h3 className="font-bold text-base text-neutral-900">Add New Official Notice</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Notice Title"
                value={noticeTitle}
                onChange={(e) => setNoticeTitle(e.target.value)}
                className="px-4 py-2.5 rounded-xl text-xs bg-neutral-50 border border-black/[0.08]"
                required
              />
              <select
                value={noticeCategory}
                onChange={(e) => setNoticeCategory(e.target.value)}
                className="px-4 py-2.5 rounded-xl text-xs bg-neutral-50 border border-black/[0.08]"
              >
                <option value="General">General</option>
                <option value="Admission">Admission</option>
                <option value="Academic">Academic</option>
                <option value="Examination">Examination</option>
              </select>
              <select
                value={noticeStatus}
                onChange={(e) => setNoticeStatus(e.target.value as any)}
                className="px-4 py-2.5 rounded-xl text-xs bg-neutral-50 border border-black/[0.08]"
              >
                <option value="Published">Status: Published</option>
                <option value="Draft">Status: Draft</option>
                <option value="Archived">Status: Archived</option>
              </select>
            </div>
            <textarea
              placeholder="Notice Content..."
              value={noticeContent}
              onChange={(e) => setNoticeContent(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl text-xs bg-neutral-50 border border-black/[0.08]"
              required
            />
            <input
              type="url"
              placeholder="Optional PDF URL (e.g. https://domain.com/notice.pdf)"
              value={noticePdfUrl}
              onChange={(e) => setNoticePdfUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-xs bg-neutral-50 border border-black/[0.08]"
            />
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-black text-white text-xs font-semibold hover:bg-neutral-800">
              Publish Notice
            </button>
          </form>

          {/* Notices Table */}
          <div className="bg-white rounded-3xl border border-black/[0.06] overflow-hidden shadow-apple-sm">
            <table className="w-full text-left text-xs text-neutral-700">
              <thead className="bg-neutral-50 border-b border-black/[0.06] text-neutral-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {notices.map((n) => (
                  <tr key={n.id} className="hover:bg-neutral-50">
                    <td className="p-4 font-bold text-neutral-900">{n.title}</td>
                    <td className="p-4">{n.category}</td>
                    <td className="p-4">{n.date}</td>
                    <td className="p-4">
                      <select
                        value={n.status}
                        onChange={(e) => handleUpdateNoticeStatus(n.id, e.target.value)}
                        className="px-2 py-1 rounded bg-neutral-100 text-[11px] font-semibold"
                      >
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleDeleteNotice(n.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: EVENTS */}
      {activeTab === 'events' && (
        <div className="space-y-8">
          <form onSubmit={handleAddEvent} className="bg-white rounded-3xl p-6 border border-black/[0.06] space-y-4 shadow-apple-sm">
            <h3 className="font-bold text-base text-neutral-900">Add Campus Event</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Event Title"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                className="px-4 py-2.5 rounded-xl text-xs bg-neutral-50 border border-black/[0.08]"
                required
              />
              <input
                type="text"
                placeholder="Location"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                className="px-4 py-2.5 rounded-xl text-xs bg-neutral-50 border border-black/[0.08]"
              />
              <select
                value={eventStatus}
                onChange={(e) => setEventStatus(e.target.value as any)}
                className="px-4 py-2.5 rounded-xl text-xs bg-neutral-50 border border-black/[0.08]"
              >
                <option value="Published">Status: Published</option>
                <option value="Draft">Status: Draft</option>
                <option value="Archived">Status: Archived</option>
              </select>
            </div>
            <textarea
              placeholder="Event Description..."
              value={eventDesc}
              onChange={(e) => setEventDesc(e.target.value)}
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl text-xs bg-neutral-50 border border-black/[0.08]"
              required
            />
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-black text-white text-xs font-semibold hover:bg-neutral-800">
              Save Event
            </button>
          </form>

          <div className="bg-white rounded-3xl border border-black/[0.06] overflow-hidden shadow-apple-sm">
            <table className="w-full text-left text-xs text-neutral-700">
              <thead className="bg-neutral-50 border-b border-black/[0.06] text-neutral-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {events.map((e) => (
                  <tr key={e.id} className="hover:bg-neutral-50">
                    <td className="p-4 font-bold text-neutral-900">{e.title}</td>
                    <td className="p-4">{e.location}</td>
                    <td className="p-4">{e.date}</td>
                    <td className="p-4 font-semibold">{e.status}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleDeleteEvent(e.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: DOCUMENTS */}
      {activeTab === 'documents' && (
        <div className="space-y-8">
          <form onSubmit={handleAddDocument} className="bg-white rounded-3xl p-6 border border-black/[0.06] space-y-4 shadow-apple-sm">
            <h3 className="font-bold text-base text-neutral-900">Upload Official Document Link</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Document Title"
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                className="px-4 py-2.5 rounded-xl text-xs bg-neutral-50 border border-black/[0.08]"
                required
              />
              <input
                type="url"
                placeholder="Document File URL"
                value={docUrl}
                onChange={(e) => setDocUrl(e.target.value)}
                className="px-4 py-2.5 rounded-xl text-xs bg-neutral-50 border border-black/[0.08]"
                required
              />
              <input
                type="text"
                placeholder="Category (e.g. Admission / Syllabus)"
                value={docCategory}
                onChange={(e) => setDocCategory(e.target.value)}
                className="px-4 py-2.5 rounded-xl text-xs bg-neutral-50 border border-black/[0.08]"
              />
            </div>
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-black text-white text-xs font-semibold hover:bg-neutral-800">
              Save Document
            </button>
          </form>

          <div className="bg-white rounded-3xl border border-black/[0.06] overflow-hidden shadow-apple-sm">
            <table className="w-full text-left text-xs text-neutral-700">
              <thead className="bg-neutral-50 border-b border-black/[0.06] text-neutral-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Document Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">File Link</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {documents.map((d) => (
                  <tr key={d.id} className="hover:bg-neutral-50">
                    <td className="p-4 font-bold text-neutral-900">{d.title}</td>
                    <td className="p-4">{d.category}</td>
                    <td className="p-4 truncate max-w-xs">{d.file_url}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleDeleteDocument(d.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: AI KNOWLEDGE BASE */}
      {activeTab === 'knowledge' && (
        <div className="space-y-8">
          <form onSubmit={handleAddKnowledge} className="bg-white rounded-3xl p-6 border border-black/[0.06] space-y-4 shadow-apple-sm">
            <h3 className="font-bold text-base text-neutral-900">Add AI RAG Knowledge Base Chunk</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Knowledge Title"
                value={kTitle}
                onChange={(e) => setKTitle(e.target.value)}
                className="px-4 py-2.5 rounded-xl text-xs bg-neutral-50 border border-black/[0.08]"
                required
              />
              <input
                type="text"
                placeholder="Source Name (e.g. Official Brochure)"
                value={kSource}
                onChange={(e) => setKSource(e.target.value)}
                className="px-4 py-2.5 rounded-xl text-xs bg-neutral-50 border border-black/[0.08]"
              />
              <select
                value={kCategory}
                onChange={(e) => setKCategory(e.target.value)}
                className="px-4 py-2.5 rounded-xl text-xs bg-neutral-50 border border-black/[0.08]"
              >
                <option value="General">General</option>
                <option value="Academics">Academics</option>
                <option value="Admissions">Admissions</option>
                <option value="Campus">Campus</option>
                <option value="Contact">Contact</option>
              </select>
            </div>
            <textarea
              placeholder="Factual text chunk for RAG AI context..."
              value={kContent}
              onChange={(e) => setKContent(e.target.value)}
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl text-xs bg-neutral-50 border border-black/[0.08]"
              required
            />
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-black text-white text-xs font-semibold hover:bg-neutral-800">
              Add Knowledge Chunk
            </button>
          </form>

          <div className="space-y-3">
            {knowledge.map((k) => (
              <div key={k.id} className="bg-white rounded-2xl p-5 border border-black/[0.06] shadow-apple-sm space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-900">{k.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-100 text-neutral-600">
                      {k.category}
                    </span>
                  </div>
                  <button onClick={() => handleDeleteKnowledge(k.id)} className="text-red-600 hover:text-red-800">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed whitespace-pre-line">{k.content}</p>
                <p className="text-[10px] text-neutral-400">Source: {k.source_name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: WEBSITE CONTENT & CONTACT INFO */}
      {activeTab === 'content' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.06] space-y-6 shadow-apple-sm">
          <h3 className="font-bold text-base text-neutral-900">Edit Website Institutional Content & Contacts</h3>

          <div className="space-y-4">
            {Object.entries(content).map(([key, val]) => (
              <div key={key} className="space-y-1.5 p-4 rounded-2xl bg-neutral-50 border border-black/[0.04]">
                <label className="block text-xs font-mono font-bold text-neutral-700 capitalize">
                  {key.replace('_', ' ')} ({key})
                </label>
                <textarea
                  value={val}
                  onChange={(e) => {
                    const updated = { ...content, [key]: e.target.value };
                    setContent(updated);
                  }}
                  rows={key.includes('checklist') || key.includes('affiliation') ? 3 : 1}
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-white border border-black/[0.08]"
                />
                <button
                  type="button"
                  onClick={() => handleUpdateContent(key, content[key])}
                  className="px-3.5 py-1.5 rounded-lg bg-black text-white text-[11px] font-semibold hover:bg-neutral-800"
                >
                  Save {key}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
