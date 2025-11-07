import React, { useState, useRef, useEffect } from 'react';
import type { Language, ChatMessage, Attachment } from '../types';
import { UI_TEXTS } from '../constants';
import { getChatResponse } from '../services/geminiService';
import { PaperclipIcon, CameraIcon, XIcon } from './icons/Icon';

interface ChatViewProps {
  language: Language;
  openScanner: (onCapture: (dataUrl: string) => void) => void;
  currentUser: string | null;
}

const LoadingIndicator: React.FC = () => (
    <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
    </div>
);

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

export const ChatView: React.FC<ChatViewProps> = ({ language, openScanner, currentUser }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const historyKey = currentUser ? `chatHistory_${currentUser}` : null;

  // Load history when user changes
  useEffect(() => {
    if (historyKey) {
      const savedHistory = localStorage.getItem(historyKey);
      setMessages(savedHistory ? JSON.parse(savedHistory) : []);
    } else {
      setMessages([]); // Clear messages if no user
    }
  }, [currentUser]);

  // Save history when messages change
  useEffect(() => {
    if (historyKey) {
      localStorage.setItem(historyKey, JSON.stringify(messages));
    }
  }, [messages, historyKey]);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      const base64Data = base64.split(',')[1];
      setAttachments([{ data: base64Data, mimeType: file.type }]);
      // Reset file input to allow re-uploading the same file
      if(e.target) e.target.value = '';
    }
  };
  
  const handleScan = () => {
    openScanner((dataUrl: string) => {
      const mimeType = dataUrl.substring(dataUrl.indexOf(':') + 1, dataUrl.indexOf(';'));
      const base64Data = dataUrl.split(',')[1];
      setAttachments([{ data: base64Data, mimeType }]);
    });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || (!userInput.trim() && attachments.length === 0) || isLoading) return;

    const newMessage: ChatMessage = { role: 'user', text: userInput, attachments: attachments };
    const historyForAPI = [...messages]; // Send previous messages for context
    const newMessagesForUI: ChatMessage[] = [...messages, newMessage];
    
    setMessages(newMessagesForUI);
    setUserInput('');
    setAttachments([]);
    setIsLoading(true);

    try {
      const response = await getChatResponse(historyForAPI, newMessage, language);
      setMessages([...newMessagesForUI, { role: 'model', text: response }]);
    } catch (error) {
      console.error(error);
      setMessages([...newMessagesForUI, { role: 'model', text: 'An error occurred.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div dir={dir} className="flex flex-col h-full bg-white dark:bg-dark-bg morocco:bg-morocco-bg transition-colors duration-300">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {!currentUser && (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400 morocco:text-morocco-text">{UI_TEXTS.chatSignInRequired[language]}</p>
          </div>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''} ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
            {msg.role === 'model' && (
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-500 dark:bg-dark-primary morocco:bg-morocco-primary text-white flex-shrink-0">
                AI
              </div>
            )}
            <div className={`max-w-[85%] p-4 rounded-lg shadow-sm ${msg.role === 'user' ? 'bg-blue-100 dark:bg-blue-900/50 morocco:bg-morocco-primary/20 text-gray-800 dark:text-gray-200 morocco:text-morocco-text' : 'bg-gray-100 dark:bg-dark-surface morocco:bg-white text-gray-700 dark:text-gray-300 morocco:text-morocco-text'}`}>
              {msg.attachments && msg.attachments.length > 0 && (
                <div className="mb-2">
                  {msg.attachments.map((att, i) => (
                    <img key={i} src={`data:${att.mimeType};base64,${att.data}`} alt="Attachment" className="max-w-xs max-h-48 rounded-md" />
                  ))}
                </div>
              )}
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
             {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-300 dark:bg-gray-600 morocco:bg-morocco-secondary/50 text-gray-800 dark:text-gray-200 flex-shrink-0">
                U
              </div>
            )}
          </div>
        ))}
        {isLoading && (
            <div className={`flex items-start gap-3 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-500 dark:bg-dark-primary morocco:bg-morocco-primary text-white flex-shrink-0">
                AI
              </div>
              <div className="max-w-xl p-4 rounded-lg shadow-sm bg-gray-100 dark:bg-dark-surface morocco:bg-white text-gray-700 dark:text-gray-300 morocco:text-morocco-text">
                  <LoadingIndicator />
              </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className={`p-2 md:p-4 border-t border-gray-200 dark:border-gray-700 morocco:border-morocco-secondary/20 bg-white dark:bg-dark-surface morocco:bg-morocco-bg/80 backdrop-blur-sm`}>
        <form onSubmit={handleSendMessage} className="relative">
          {attachments.length > 0 && (
            <div className={`absolute bottom-full p-2 ${language === 'ar' ? 'right-0' : 'left-0'}`}>
              <div className="relative inline-block bg-gray-200 dark:bg-gray-700 p-2 rounded-lg">
                <img src={`data:${attachments[0].mimeType};base64,${attachments[0].data}`} className="h-20 w-auto rounded" alt="attachment preview" />
                <button type="button" onClick={() => setAttachments([])} className={`absolute -top-2 ${language === 'ar' ? '-left-2' : '-right-2'} bg-red-500 text-white rounded-full p-0.5`}>
                  <XIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
          <div className="flex items-center">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/jpeg,image/png,image/webp,application/pdf,text/plain" />
            <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-dark-primary morocco:hover:text-morocco-primary disabled:opacity-50" aria-label="Attach file" disabled={!currentUser || isLoading}>
              <PaperclipIcon className="w-6 h-6" />
            </button>
            <button type="button" onClick={handleScan} className="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-dark-primary morocco:hover:text-morocco-primary disabled:opacity-50" aria-label="Scan document" disabled={!currentUser || isLoading}>
              <CameraIcon className="w-6 h-6" />
            </button>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={currentUser ? UI_TEXTS.chatPlaceholder[language] : UI_TEXTS.chatSignInRequired[language]}
              className={`flex-1 py-3 pl-4 rounded-full border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-dark-primary morocco:focus:ring-morocco-primary focus:outline-none bg-gray-50 dark:bg-gray-800 morocco:bg-white dark:text-white morocco:text-morocco-text transition-shadow ${language === 'ar' ? 'pr-20' : 'pr-12'}`}
              disabled={!currentUser || isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !currentUser || (!userInput.trim() && attachments.length === 0)}
              className={`absolute top-1/2 -translate-y-1/2 ${language === 'ar' ? 'left-3' : 'right-2'} p-2 rounded-full text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-600 dark:bg-dark-primary dark:hover:bg-blue-500 morocco:bg-morocco-primary morocco:hover:bg-morocco-primary/80`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};