import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatView } from './components/ChatView';
import { DocumentAnalysisView } from './components/DocumentAnalysisView';
import { DocumentGenerationView } from './components/DocumentGenerationView';
import { WelcomeView } from './components/WelcomeView';
import { CameraScanner } from './components/CameraScanner';
import { LoginModal } from './components/LoginModal';
import type { Theme, Language, View } from './types';
import { UI_TEXTS } from './constants';
import { MenuIcon } from './components/icons/Icon';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('fr');
  const [activeView, setActiveView] = useState<View>('welcome');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScannerOpen, setScannerOpen] = useState(false);
  const [onCapture, setOnCapture] = useState<(dataUrl: string) => void>(() => () => {});
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark', 'morocco');
    root.classList.add(theme);
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);
  
  const openScanner = (onCaptureCallback: (dataUrl: string) => void) => {
    setOnCapture(() => onCaptureCallback);
    setScannerOpen(true);
  };

  const handleSetView = (view: View) => {
    setActiveView(view);
    setIsSidebarOpen(false);
  };

  const handleLogin = (email: string) => {
    localStorage.setItem('currentUser', email);
    setCurrentUser(email);
    setLoginModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setActiveView('welcome'); // Reset to welcome on logout
  };

  const renderView = () => {
    switch (activeView) {
      case 'chat':
        return <ChatView language={language} openScanner={openScanner} currentUser={currentUser} />;
      case 'analysis':
        return <DocumentAnalysisView language={language} openScanner={openScanner} />;
      case 'generation':
        return <DocumentGenerationView language={language} />;
      case 'welcome':
      default:
        return <WelcomeView language={language} />;
    }
  };

  const viewTitles: { [key in View]: keyof typeof UI_TEXTS } = {
    welcome: 'welcome',
    chat: 'chat',
    analysis: 'docAnalysis',
    generation: 'docGeneration',
  };
  const currentTitleKey = viewTitles[activeView];


  return (
    <div className={`relative flex h-screen font-sans transition-colors duration-300 overflow-hidden ${theme === 'morocco' ? 'bg-morocco-bg text-morocco-text' : 'bg-gray-100 dark:bg-dark-bg text-gray-900 dark:text-dark-text'}`}>
       <Sidebar 
        activeView={activeView}
        setActiveView={handleSetView}
        theme={theme}
        setTheme={setTheme}
        language={language}
        setLanguage={setLanguage}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        currentUser={currentUser}
        onLoginClick={() => setLoginModalOpen(true)}
        onLogout={handleLogout}
      />
      {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-30 md:hidden" aria-hidden="true"></div>}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 morocco:border-morocco-secondary/20 bg-white dark:bg-dark-surface morocco:bg-morocco-bg sticky top-0 z-20">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2" aria-label="Open menu">
            <MenuIcon className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-bold">{UI_TEXTS[currentTitleKey][language]}</h1>
          <div className="w-8"></div> {/* Spacer */}
        </header>
        <div className="flex-1 overflow-y-auto">
          {renderView()}
        </div>
      </main>
      {isScannerOpen && <CameraScanner onCapture={onCapture} onClose={() => setScannerOpen(false)} />}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setLoginModalOpen(false)} 
        onLogin={handleLogin}
        language={language}
      />
    </div>
  );
};

export default App;