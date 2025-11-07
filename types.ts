export type Theme = 'light' | 'dark' | 'morocco';
export type Language = 'fr' | 'ar';
export type View = 'welcome' | 'chat' | 'analysis' | 'generation';

export interface Attachment {
  data: string; // base64 encoded
  mimeType: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  attachments?: Attachment[];
}

export interface DocumentField {
  id: string;
  type: 'text' | 'textarea' | 'date';
  label: { [key in Language]: string };
}

export interface DocumentTemplate {
  id:string;
  name: { [key in Language]: string };
  description: { [key in Language]: string };
  fields: DocumentField[];
}

export interface DocumentCategory {
  id: string;
  name: { [key in Language]: string };
  templates: DocumentTemplate[];
}