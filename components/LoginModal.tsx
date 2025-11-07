import React, { useState } from 'react';
import type { Language } from '../types';
import { UI_TEXTS } from '../constants';
import { XIcon } from './icons/Icon';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string) => void;
  language: Language;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin, language }) => {
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      onLogin(email);
    }
  };
  
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div 
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" 
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="relative bg-white dark:bg-dark-surface morocco:bg-morocco-bg rounded-lg shadow-xl w-full max-w-md p-6 md:p-8" 
        onClick={e => e.stopPropagation()}
        dir={dir}
      >
        <button onClick={onClose} className={`absolute top-4 ${language === 'ar' ? 'left-4' : 'right-4'} text-gray-400 hover:text-gray-600 dark:hover:text-gray-200`}>
          <XIcon className="h-6 w-6" />
        </button>
        
        <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white morocco:text-morocco-primary">{UI_TEXTS.signInTitle[language]}</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300 morocco:text-morocco-text">{UI_TEXTS.signInDesc[language]}</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className={`block text-sm font-medium text-gray-700 dark:text-gray-300 morocco:text-morocco-text ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              {UI_TEXTS.emailLabel[language]}
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-dark-primary morocco:focus:ring-morocco-primary bg-white dark:bg-gray-800 morocco:bg-white text-gray-900 dark:text-white"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-dark-primary dark:hover:bg-blue-500 morocco:bg-morocco-primary morocco:hover:bg-morocco-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {UI_TEXTS.signIn[language]}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};