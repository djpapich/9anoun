import React from 'react';
import type { Language } from '../types';
import { UI_TEXTS } from '../constants';
import { DocIcon } from './icons/Icon';

interface WelcomeViewProps {
  language: Language;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({ language }) => {
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div dir={dir} className="flex flex-col items-center justify-center h-full p-6 sm:p-8 lg:p-16 text-center bg-white dark:bg-dark-bg morocco:bg-morocco-bg transition-colors duration-300">
      <div className="max-w-3xl">
        <div className="inline-block p-4 mb-6 bg-blue-100 dark:bg-dark-primary/20 morocco:bg-morocco-primary/20 rounded-full">
            <DocIcon className="w-12 h-12 text-blue-600 dark:text-dark-primary morocco:text-morocco-primary" />
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white morocco:text-morocco-primary mb-4">
          {UI_TEXTS.welcomeTitle[language]}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 morocco:text-morocco-text mb-12">
          {UI_TEXTS.welcomeDesc[language]}
        </p>

        <div className="p-6 border border-gray-200 dark:border-gray-700 morocco:border-morocco-secondary/20 rounded-lg bg-gray-50 dark:bg-dark-surface morocco:bg-white text-left">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 morocco:text-morocco-secondary mb-3">
            {UI_TEXTS.welcomeKnowledge[language]}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 morocco:text-morocco-text">
            {UI_TEXTS.welcomeKnowledgeDesc[language]}
          </p>
        </div>
      </div>
    </div>
  );
};
