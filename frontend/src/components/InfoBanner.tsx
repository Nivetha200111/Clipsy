import React, { useState } from 'react';
import { Info, X, AlertTriangle } from 'lucide-react';

const InfoBanner: React.FC = () => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-blue-800 mb-1">
            Important: LinkedIn Formatting Limitations
          </h3>
          <div className="text-sm text-blue-700 space-y-1">
            <p>
              LinkedIn doesn't support native bold, italic, or underline formatting. 
              Our tool uses special Unicode characters to make text appear formatted.
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span className="text-xs text-yellow-700">
                Underlined text may look messy on LinkedIn - consider using bold instead.
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsDismissed(true)}
          className="flex-shrink-0 p-1 hover:bg-blue-100 rounded-full transition-colors duration-200"
        >
          <X className="h-4 w-4 text-blue-600" />
        </button>
      </div>
    </div>
  );
};

export default InfoBanner;
