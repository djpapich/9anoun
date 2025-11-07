import React from 'react';
import type { Theme, Language, View } from '../types';
import { UI_TEXTS } from '../constants';
import { SunIcon, MoonIcon, PaletteIcon, ChatIcon, FileIcon, DocIcon, HomeIcon, XIcon } from './icons/Icon';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentUser: string | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

const NavButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  theme: Theme;
  language: Language;
}> = ({ icon, label, isActive, onClick, theme, language }) => {
  const baseClasses = `flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${language === 'ar' ? 'flex-row-reverse' : ''}`;
  
  const themeClasses = {
    light: isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900',
    dark: isActive ? 'bg-dark-primary/20 text-dark-primary' : 'text-gray-300 hover:bg-dark-surface hover:text-white',
    morocco: isActive ? 'bg-morocco-primary/20 text-morocco-primary' : 'text-morocco-text hover:bg-morocco-secondary/10 hover:text-morocco-primary'
  };

  return (
    <button onClick={onClick} className={`${baseClasses} ${themeClasses[theme]}`}>
      {icon}
      <span className={language === 'ar' ? 'mr-3' : 'ml-3'}>{label}</span>
    </button>
  );
};


export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, theme, setTheme, language, setLanguage, isOpen, setIsOpen, currentUser, onLoginClick, onLogout }) => {
  const navItems = [
    { id: 'welcome', icon: <HomeIcon className="h-5 w-5"/>, label: UI_TEXTS.welcome[language] },
    { id: 'chat', icon: <ChatIcon className="h-5 w-5" />, label: UI_TEXTS.chat[language] },
    { id: 'analysis', icon: <FileIcon className="h-5 w-5" />, label: UI_TEXTS.docAnalysis[language] },
    { id: 'generation', icon: <DocIcon className="h-5 w-5" />, label: UI_TEXTS.docGeneration[language] },
  ];

  const sidebarBg = theme === 'morocco' ? 'bg-morocco-bg border-r border-morocco-secondary/20' : 'bg-white dark:bg-dark-surface border-r border-gray-200 dark:border-gray-700';
  const titleColor = theme === 'morocco' ? 'text-morocco-primary' : 'text-gray-800 dark:text-white';
  const dividerColor = theme === 'morocco' ? 'border-morocco-secondary/20' : 'border-gray-200 dark:border-gray-700';
  const labelColor = theme === 'morocco' ? 'text-morocco-text' : 'text-gray-500 dark:text-gray-400';
  const creditColor = theme === 'morocco' ? 'text-morocco-text/70' : 'text-gray-400 dark:text-gray-500';
  const textColor = theme === 'morocco' ? 'text-morocco-text' : 'text-gray-700 dark:text-gray-300';
  
  const langButtonClasses = (lang: Language) => {
    const isActive = language === lang;
    const base = 'px-3 py-1 text-sm rounded-md transition-colors';
    const activeTheme = {
        light: 'bg-blue-600 text-white',
        dark: 'bg-dark-primary text-white',
        morocco: 'bg-morocco-primary text-white',
    };
    const inactiveTheme = {
        light: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
        dark: 'bg-gray-600 text-gray-200 hover:bg-gray-500',
        morocco: 'bg-morocco-secondary/20 text-morocco-text hover:bg-morocco-secondary/30',
    };
    return `${base} ${isActive ? activeTheme[theme] : inactiveTheme[theme]}`;
  }
  
  return (
    <div 
      dir={language === 'ar' ? 'rtl' : 'ltr'} 
      className={`fixed inset-y-0 ${language === 'ar' ? 'right-0' : 'left-0'} transform ${isOpen ? 'translate-x-0' : (language === 'ar' ? 'translate-x-full' : '-translate-x-full')} md:relative md:translate-x-0 w-64 flex-shrink-0 flex flex-col p-4 space-y-4 ${sidebarBg} transition-all duration-300 z-40`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
    >
      <div className="flex items-center justify-between px-2 pt-2">
          <h1 className={`text-xl font-bold ${titleColor}`}>{UI_TEXTS.appTitle[language]}</h1>
          <button onClick={() => setIsOpen(false)} className="md:hidden p-2" aria-label="Close menu">
            <XIcon className="h-6 w-6" />
          </button>
      </div>
      
      <nav className="flex-1 space-y-2 mt-4">
        {navItems.map(item => (
            <NavButton
                key={item.id}
                icon={item.icon}
                label={item.label}
                isActive={activeView === item.id}
                onClick={() => setActiveView(item.id as View)}
                theme={theme}
                language={language}
            />
        ))}
      </nav>

      <div>
        <div className={`pt-4 space-y-4 border-t ${dividerColor}`}>
          {currentUser ? (
            <div className='text-center p-2 rounded-lg bg-gray-100 dark:bg-dark-surface morocco:bg-morocco-secondary/10'>
              <p className={`text-sm font-medium truncate ${textColor}`}>{currentUser}</p>
              <button onClick={onLogout} className={`mt-2 text-xs font-semibold ${theme === 'morocco' ? 'text-morocco-primary' : 'text-red-500'} hover:underline`}>
                {UI_TEXTS.signOut[language]}
              </button>
            </div>
          ) : (
            <button onClick={onLoginClick} className={`w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${theme === 'morocco' ? 'bg-morocco-primary/90 hover:bg-morocco-primary text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.956 0 8.641-3.52 8.641-8.743 0-.638-.057-1.25-.156-1.858z"></path></svg>
                {UI_TEXTS.signIn[language]}
            </button>
          )}
          <div>
            <h3 className={`px-3 text-xs font-semibold uppercase ${labelColor} mt-4`}>{UI_TEXTS.theme[language]}</h3>
            <div className="flex items-center justify-around mt-2 p-1 rounded-lg bg-gray-200 dark:bg-gray-700 morocco:bg-morocco-secondary/10">
              {(['light', 'dark', 'morocco'] as Theme[]).map(t => {
                  const isActive = theme === t;
                  const Icon = {light: SunIcon, dark: MoonIcon, morocco: PaletteIcon}[t];
                  return (
                      <button key={t} onClick={() => setTheme(t)} className={`p-2 rounded-md transition-colors ${isActive ? 'bg-white dark:bg-dark-primary text-dark-primary dark:text-white morocco:bg-morocco-primary morocco:text-white' : 'text-gray-500 dark:text-gray-400 morocco:text-morocco-text hover:bg-gray-300 dark:hover:bg-gray-600 morocco:hover:bg-morocco-secondary/20'}`} aria-pressed={isActive}>
                          <Icon className="h-5 w-5" />
                      </button>
                  )
              })}
            </div>
          </div>
          <div>
            <h3 className={`px-3 text-xs font-semibold uppercase ${labelColor}`}>{UI_TEXTS.language[language]}</h3>
            <div className="flex items-center justify-around mt-2">
              <button onClick={() => setLanguage('fr')} className={langButtonClasses('fr')}>FR</button>
              <button onClick={() => setLanguage('ar')} className={langButtonClasses('ar')}>AR</button>
            </div>
          </div>
        </div>
        <div className={`pt-4 mt-4 text-center border-t ${dividerColor}`}>
            <p className={`text-xs ${creditColor}`}>{UI_TEXTS.developerCredit[language]}</p>
        </div>
      </div>
    </div>
  );
};