import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ContentContextType {
  content: string;
  setContent: (content: string) => void;
  formattedContent: string;
  setFormattedContent: (content: string) => void;
  isFormatting: boolean;
  setIsFormatting: (loading: boolean) => void;
  characterCount: number;
  setCharacterCount: (count: number) => void;
  warnings: string[];
  setWarnings: (warnings: string[]) => void;
  suggestions: string[];
  setSuggestions: (suggestions: string[]) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

interface ContentProviderProps {
  children: ReactNode;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({ children }) => {
  const [content, setContent] = useState('');
  const [formattedContent, setFormattedContent] = useState('');
  const [isFormatting, setIsFormatting] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const value = {
    content,
    setContent,
    formattedContent,
    setFormattedContent,
    isFormatting,
    setIsFormatting,
    characterCount,
    setCharacterCount,
    warnings,
    setWarnings,
    suggestions,
    setSuggestions,
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};
