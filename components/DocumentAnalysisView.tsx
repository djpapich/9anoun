import React, { useState, useCallback, useRef } from 'react';
import type { Language, Attachment } from '../types';
import { UI_TEXTS } from '../constants';
import { analyzeDocument } from '../services/geminiService';
import { FileIcon, CameraIcon } from './icons/Icon';

interface DocumentAnalysisViewProps {
  language: Language;
  openScanner: (onCapture: (dataUrl: string) => void) => void;
}

const LoadingIndicator: React.FC = () => (
    <div className="flex items-center justify-center space-x-2">
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

export const DocumentAnalysisView: React.FC<DocumentAnalysisViewProps> = ({ language, openScanner }) => {
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [question, setQuestion] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
        try {
            const base64 = await fileToBase64(selectedFile);
            const base64Data = base64.split(',')[1];
            setAttachment({ data: base64Data, mimeType: selectedFile.type });
            setFileName(selectedFile.name);
            setError('');
        } catch (err) {
            setError(language === 'fr' ? 'Erreur lors de la lecture du fichier.' : 'خطأ في قراءة الملف.');
        }
    }
  };
  
  const handleScan = () => {
    openScanner((dataUrl: string) => {
      const mimeType = dataUrl.substring(dataUrl.indexOf(':') + 1, dataUrl.indexOf(';'));
      const base64Data = dataUrl.split(',')[1];
      setAttachment({ data: base64Data, mimeType });
      setFileName(language === 'fr' ? 'Document scanné' : 'مستند ممسوح ضوئيا');
      setError('');
    });
  };
  
  const handleAnalyze = async () => {
    if (!attachment || !question.trim()) return;
    setIsLoading(true);
    setAnalysisResult('');
    setError('');
    try {
      const result = await analyzeDocument(attachment, question, language);
      setAnalysisResult(result);
    } catch (err) {
      setError(language === 'fr' ? "Une erreur est survenue." : "حدث خطأ ما.");
    } finally {
      setIsLoading(false);
    }
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div dir={dir} className="p-4 md:p-8 h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white morocco:text-morocco-primary">{UI_TEXTS.analysisTitle[language]}</h1>
        <p className="text-gray-600 dark:text-gray-300 morocco:text-morocco-text mb-8">{UI_TEXTS.analysisDesc[language]}</p>
        
        <div className="space-y-6">
          <div className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 morocco:border-morocco-secondary/50 rounded-lg text-center bg-gray-50 dark:bg-dark-surface morocco:bg-white">
             <input type="file" id="file-upload" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*,application/pdf,text/plain" />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-700 dark:bg-dark-primary/20 dark:text-dark-primary morocco:bg-morocco-primary/20 morocco:text-morocco-primary font-medium hover:bg-blue-200 transition-colors">
                 <FileIcon className="w-5 h-5" />
                 {UI_TEXTS.uploadLabel[language]}
               </button>
               <button onClick={handleScan} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300 morocco:bg-morocco-secondary/20 morocco:text-morocco-secondary font-medium hover:bg-green-200 transition-colors">
                 <CameraIcon className="w-5 h-5" />
                 {UI_TEXTS.scanLabel[language]}
               </button>
            </div>
            {attachment && (
              <div className="mt-4">
                {attachment.mimeType.startsWith('image/') ? (
                   <img src={`data:${attachment.mimeType};base64,${attachment.data}`} alt="Preview" className="max-h-40 mx-auto rounded-md border p-1" />
                ) : (
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 morocco:text-morocco-text">{fileName} - {UI_TEXTS.fileReady[language]}</p>
                )}
              </div>
            )}
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </div>

          {attachment && (
            <>
              <div>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder={UI_TEXTS.askQuestion[language]}
                  rows={3}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 morocco:bg-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-dark-primary morocco:focus:ring-morocco-primary focus:outline-none transition"
                />
              </div>
              <div>
                <button
                  onClick={handleAnalyze}
                  disabled={isLoading || !question.trim()}
                  className="w-full py-3 px-4 rounded-lg text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700 dark:bg-dark-primary dark:hover:bg-blue-500 morocco:bg-morocco-primary morocco:hover:bg-morocco-primary/80"
                >
                  {isLoading ? <LoadingIndicator /> : UI_TEXTS.analyzeButton[language]}
                </button>
              </div>
            </>
          )}

          {analysisResult && (
            <div className="mt-8 p-6 bg-gray-50 dark:bg-dark-surface morocco:bg-white rounded-lg border border-gray-200 dark:border-gray-700 morocco:border-morocco-secondary/20">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white morocco:text-morocco-secondary">Résultat de l'analyse</h2>
              <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 morocco:text-morocco-text">{analysisResult}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
