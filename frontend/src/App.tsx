import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Editor from './components/Editor/EnhancedTextEditor';
import Preview from './components/Preview/LinkedInPreview';
import Templates from './components/Templates/TemplateGallery';
import { ContentProvider } from './context/ContentContext';

function App() {
  const [showTemplates, setShowTemplates] = useState(false);

  return (
    <ContentProvider>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        <Header onToggleTemplates={() => setShowTemplates(!showTemplates)} />
        
        <div className="flex h-screen pt-16">
          {/* Main Content Area */}
          <div className="flex-1 flex">
            {/* Editor Section */}
            <div className="flex-1 p-6">
              <Editor />
            </div>
            
            {/* Preview Section */}
            <div className="flex-1 p-6 border-l border-gray-200">
              <Preview />
            </div>
          </div>
          
          {/* Templates Sidebar */}
          {showTemplates && (
            <div className="w-80 border-l border-gray-200 bg-white">
              <Templates onClose={() => setShowTemplates(false)} />
            </div>
          )}
        </div>
      </div>
    </ContentProvider>
  );
}

export default App;
