

import React, { useState } from 'react';
import type { Language, DocumentCategory, DocumentTemplate } from '../types';
import { UI_TEXTS, DOCUMENT_CATEGORIES } from '../constants';
import { generateDocument } from '../services/geminiService';

const LoadingIndicator: React.FC = () => (
    <div className="flex items-center space-x-2 justify-center">
        <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
    </div>
);

export const DocumentGenerationView: React.FC<{ language: Language }> = ({ language }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [generatedDocument, setGeneratedDocument] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const selectedCategory = DOCUMENT_CATEGORIES.find(c => c.id === selectedCategoryId);
  const selectedTemplate = selectedCategory?.templates.find(t => t.id === selectedTemplateId);
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategoryId(e.target.value);
    setSelectedTemplateId('');
    setFormData({});
    setGeneratedDocument('');
  };

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTemplateId(e.target.value);
    setFormData({});
    setGeneratedDocument('');
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleGenerate = async () => {
    if (!selectedTemplate) return;
    setIsLoading(true);
    setGeneratedDocument('');
    try {
      const result = await generateDocument(selectedTemplate.name[language], formData, language);
      setGeneratedDocument(result);
    } catch(err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedDocument);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  const baseSelectClasses = "w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 morocco:bg-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-dark-primary morocco:focus:ring-morocco-primary focus:outline-none transition";

  return (
    <div dir={dir} className="p-4 md:p-8 h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white morocco:text-morocco-primary">{UI_TEXTS.generationTitle[language]}</h1>
        <p className="text-gray-600 dark:text-gray-300 morocco:text-morocco-text mb-8">{UI_TEXTS.generationDesc[language]}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <select value={selectedCategoryId} onChange={handleCategoryChange} className={baseSelectClasses}>
            <option value="">{UI_TEXTS.selectCategory[language]}</option>
            {DOCUMENT_CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.name[language]}</option>)}
          </select>
          <select value={selectedTemplateId} onChange={handleTemplateChange} disabled={!selectedCategory} className={baseSelectClasses}>
            <option value="">{UI_TEXTS.selectTemplate[language]}</option>
            {selectedCategory?.templates.map(tpl => <option key={tpl.id} value={tpl.id}>{tpl.name[language]}</option>)}
          </select>
        </div>

        {selectedTemplate && (
          <div className="mt-8">
            <div className="p-4 mb-6 rounded-lg bg-gray-100 dark:bg-dark-surface morocco:bg-morocco-bg border border-gray-200 dark:border-gray-700 morocco:border-morocco-secondary/20">
                <p className="text-sm text-gray-700 dark:text-gray-300 morocco:text-morocco-text italic">
                    {selectedTemplate.description[language]}
                </p>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-dark-surface morocco:bg-white rounded-lg border border-gray-200 dark:border-gray-700 morocco:border-morocco-secondary/20">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white morocco:text-morocco-secondary">{UI_TEXTS.fillDetails[language]}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedTemplate.fields.map(field => (
                  <div key={field.id} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                    <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 morocco:text-morocco-text mb-1">{field.label[language]}</label>
                    {field.type === 'textarea' ? (
                      <textarea id={field.id} name={field.id} onChange={handleFormChange} rows={4} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-1 focus:ring-blue-500 dark:bg-gray-800" />
                    ) : (
                      <input type={field.type} id={field.id} name={field.id} onChange={handleFormChange} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-1 focus:ring-blue-500 dark:bg-gray-800" />
                    )}
                  </div>
                ))}
              </div>
              <button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="mt-6 w-full py-3 px-4 rounded-lg text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700 dark:bg-dark-primary dark:hover:bg-blue-500 morocco:bg-morocco-primary morocco:hover:bg-morocco-primary/80"
                >
                {isLoading ? <LoadingIndicator /> : UI_TEXTS.generateButton[language]}
              </button>
            </div>
          </div>
        )}

        {generatedDocument && (
          <div className="mt-8 p-6 bg-gray-50 dark:bg-dark-surface morocco:bg-white rounded-lg border border-gray-200 dark:border-gray-700 morocco:border-morocco-secondary/20">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white morocco:text-morocco-secondary">{UI_TEXTS.generatedDocument[language]}</h2>
                <button onClick={handleCopy} className="px-4 py-2 text-sm rounded-md bg-gray-200 dark:bg-gray-600 morocco:bg-morocco-secondary/20 hover:bg-gray-300 dark:hover:bg-gray-500 morocco:hover:bg-morocco-secondary/30 transition-colors">
                    {isCopied ? UI_TEXTS.copied[language] : UI_TEXTS.copyButton[language]}
                </button>
            </div>
            <pre className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 morocco:text-morocco-text p-4 bg-white dark:bg-gray-800 morocco:bg-morocco-bg/50 rounded-md font-sans">{generatedDocument}</pre>
          </div>
        )}
      </div>
    </div>
  );
};