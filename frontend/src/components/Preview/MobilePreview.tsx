import React from 'react';
import { Smartphone } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

const MobilePreview: React.FC = () => {
  const { formattedContent, isFormatting } = useContent();

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Smartphone className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-900">Mobile Preview</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg">
          {/* Mobile Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-linkedin-blue rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">Y</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm">Your Name</h3>
                <p className="text-xs text-gray-500">Your Title</p>
                <p className="text-xs text-gray-400">now</p>
              </div>
            </div>
          </div>

          {/* Mobile Content */}
          <div className="p-4">
            {isFormatting ? (
              <div className="flex items-center justify-center py-6">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-linkedin-blue"></div>
              </div>
            ) : formattedContent ? (
              <div className="text-sm text-gray-900 leading-relaxed whitespace-pre-wrap">
                {formattedContent}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-400">
                <Smartphone className="h-8 w-8 mx-auto mb-2" />
                <p className="text-xs">Mobile preview will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;
