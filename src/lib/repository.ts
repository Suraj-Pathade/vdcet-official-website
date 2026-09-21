import { readDB, writeDB, Notice, EventItem, DocumentItem, KnowledgeChunk } from './db';

export type { Notice, EventItem, DocumentItem, KnowledgeChunk };

// -------------------------------------------------------------
// NOTICES REPOSITORY
// -------------------------------------------------------------
export const noticeRepo = {
  getPublished(category?: string): Notice[] {
    const data = readDB();
    let published = data.notices.filter((n) => n.status === 'Published');
    if (category && category !== 'All') {
      published = published.filter((n) => n.category.toLowerCase() === category.toLowerCase());
    }
    return published.sort((a, b) => b.id - a.id);
  },

  getAllAdmin(): Notice[] {
    const data = readDB();
    return [...data.notices].sort((a, b) => b.id - a.id);
  },

  create(item: Omit<Notice, 'id' | 'created_at'>): Notice {
    const data = readDB();
    data.counters.noticeId += 1;
    const newNotice: Notice = {
      id: data.counters.noticeId,
      ...item,
      created_at: new Date().toISOString(),
    };
    data.notices.push(newNotice);
    writeDB(data);
    return newNotice;
  },

  update(id: number, patch: Partial<Notice>): boolean {
    const data = readDB();
    const index = data.notices.findIndex((n) => n.id === id);
    if (index === -1) return false;
    data.notices[index] = { ...data.notices[index], ...patch };
    writeDB(data);
    return true;
  },

  delete(id: number): boolean {
    const data = readDB();
    const initialLen = data.notices.length;
    data.notices = data.notices.filter((n) => n.id !== id);
    if (data.notices.length !== initialLen) {
      writeDB(data);
      return true;
    }
    return false;
  },
};

// -------------------------------------------------------------
// EVENTS REPOSITORY
// -------------------------------------------------------------
export const eventRepo = {
  getPublished(): EventItem[] {
    const data = readDB();
    return data.events.filter((e) => e.status === 'Published').sort((a, b) => b.id - a.id);
  },

  getAllAdmin(): EventItem[] {
    const data = readDB();
    return [...data.events].sort((a, b) => b.id - a.id);
  },

  create(item: Omit<EventItem, 'id' | 'created_at'>): EventItem {
    const data = readDB();
    data.counters.eventId += 1;
    const newEvent: EventItem = {
      id: data.counters.eventId,
      ...item,
      created_at: new Date().toISOString(),
    };
    data.events.push(newEvent);
    writeDB(data);
    return newEvent;
  },

  update(id: number, patch: Partial<EventItem>): boolean {
    const data = readDB();
    const index = data.events.findIndex((e) => e.id === id);
    if (index === -1) return false;
    data.events[index] = { ...data.events[index], ...patch };
    writeDB(data);
    return true;
  },

  delete(id: number): boolean {
    const data = readDB();
    const initialLen = data.events.length;
    data.events = data.events.filter((e) => e.id !== id);
    if (data.events.length !== initialLen) {
      writeDB(data);
      return true;
    }
    return false;
  },
};

// -------------------------------------------------------------
// DOCUMENTS REPOSITORY
// -------------------------------------------------------------
export const documentRepo = {
  getAll(): DocumentItem[] {
    const data = readDB();
    return [...data.documents].sort((a, b) => b.id - a.id);
  },

  create(item: Omit<DocumentItem, 'id' | 'uploaded_at'>): DocumentItem {
    const data = readDB();
    data.counters.documentId += 1;
    const newDoc: DocumentItem = {
      id: data.counters.documentId,
      ...item,
      uploaded_at: new Date().toISOString(),
    };
    data.documents.push(newDoc);
    writeDB(data);
    return newDoc;
  },

  delete(id: number): boolean {
    const data = readDB();
    const initialLen = data.documents.length;
    data.documents = data.documents.filter((d) => d.id !== id);
    if (data.documents.length !== initialLen) {
      writeDB(data);
      return true;
    }
    return false;
  },
};

// -------------------------------------------------------------
// KNOWLEDGE BASE REPOSITORY FOR RAG
// -------------------------------------------------------------
export const knowledgeRepo = {
  getAll(): KnowledgeChunk[] {
    const data = readDB();
    return [...data.knowledge_base].sort((a, b) => a.id - b.id);
  },

  create(item: Omit<KnowledgeChunk, 'id' | 'created_at'>): KnowledgeChunk {
    const data = readDB();
    data.counters.knowledgeId += 1;
    const newChunk: KnowledgeChunk = {
      id: data.counters.knowledgeId,
      ...item,
      created_at: new Date().toISOString(),
    };
    data.knowledge_base.push(newChunk);
    writeDB(data);
    return newChunk;
  },

  update(id: number, patch: Partial<KnowledgeChunk>): boolean {
    const data = readDB();
    const index = data.knowledge_base.findIndex((k) => k.id === id);
    if (index === -1) return false;
    data.knowledge_base[index] = { ...data.knowledge_base[index], ...patch };
    writeDB(data);
    return true;
  },

  delete(id: number): boolean {
    const data = readDB();
    const initialLen = data.knowledge_base.length;
    data.knowledge_base = data.knowledge_base.filter((k) => k.id !== id);
    if (data.knowledge_base.length !== initialLen) {
      writeDB(data);
      return true;
    }
    return false;
  },
};

// -------------------------------------------------------------
// WEBSITE CONTENT / CONTACT INFO REPOSITORY
// -------------------------------------------------------------
export const contentRepo = {
  get(key: string, fallback: string = 'Information will be updated soon.'): string {
    const data = readDB();
    return data.website_content[key] || fallback;
  },

  getAll(): Record<string, string> {
    const data = readDB();
    return { ...data.website_content };
  },

  set(key: string, value: string): void {
    const data = readDB();
    data.website_content[key] = value;
    writeDB(data);
  },
};
