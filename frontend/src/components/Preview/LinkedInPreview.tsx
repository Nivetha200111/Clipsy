import React from 'react';
import { useContent } from '../../context/ContentContext';
import { Linkedin, User, MoreHorizontal, ThumbsUp, MessageCircle, Share, Send } from 'lucide-react';

const LinkedInPreview: React.FC = () => {
  const { formattedContent, isFormatting, characterCount } = useContent();

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">LinkedIn Preview</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Linkedin className="h-4 w-4" />
          <span>Live Preview</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          {/* LinkedIn Post Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-linkedin-blue rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-900">Your Name</h3>
                  <span className="text-gray-500">•</span>
                  <span className="text-sm text-gray-500">1st</span>
                </div>
                <p className="text-sm text-gray-600">Your Professional Title</p>
                <p className="text-xs text-gray-500">now</p>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded-full">
                <MoreHorizontal className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* LinkedIn Post Content */}
          <div className="p-4">
            {isFormatting ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-linkedin-blue"></div>
                <span className="ml-2 text-gray-500">Formatting...</span>
              </div>
            ) : formattedContent ? (
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-gray-900 leading-relaxed">
                  {formattedContent}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Linkedin className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>Start typing to see your LinkedIn post preview</p>
                <p className="text-sm mt-1">The preview will show exactly how your content will appear on LinkedIn</p>
              </div>
            )}
          </div>

          {/* LinkedIn Post Footer */}
          {formattedContent && (
            <div className="px-4 py-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-gray-500">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-1 hover:text-linkedin-blue transition-colors">
                    <ThumbsUp className="h-5 w-5" />
                    <span className="text-sm">Like</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-linkedin-blue transition-colors">
                    <MessageCircle className="h-5 w-5" />
                    <span className="text-sm">Comment</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-linkedin-blue transition-colors">
                    <Share className="h-5 w-5" />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
                <button className="flex items-center space-x-1 hover:text-linkedin-blue transition-colors">
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Character Count Display */}
        {formattedContent && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Character Count:</span>
              <span className={`font-medium ${characterCount > 3000 ? 'text-red-600' : characterCount > 2500 ? 'text-yellow-600' : 'text-gray-900'}`}>
                {characterCount.toLocaleString()}/3,000
              </span>
            </div>
            {characterCount > 3000 && (
              <p className="text-xs text-red-600 mt-1">
                ⚠️ Content exceeds LinkedIn's character limit
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkedInPreview;
