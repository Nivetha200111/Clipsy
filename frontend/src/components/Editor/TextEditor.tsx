import React, { useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext';
import { formatContent, validateContent } from '../../services/api';
import { getCharacterCount, getCharacterCountColor, formatCharacterCount } from '../../utils/formatting';
import FormattingToolbar from './FormattingToolbar';
import CharacterCounter from './CharacterCounter';
import CopyButton from '../CopyButton';
import toast from 'react-hot-toast';

const TextEditor: React.FC = () => {
  const {
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
  } = useContent();

  const [isValidating, setIsValidating] = useState(false);

  // Update character count when content changes
  useEffect(() => {
    const count = getCharacterCount(content);
    setCharacterCount(count);
  }, [content, setCharacterCount]);

  // Auto-format content when it changes
  useEffect(() => {
    if (content.trim()) {
      handleFormat();
    } else {
      setFormattedContent('');
      setWarnings([]);
      setSuggestions([]);
    }
  }, [content]);

  const handleFormat = async () => {
    if (!content.trim()) return;

    setIsFormatting(true);
    try {
      const response = await formatContent({
        content,
        preserve_formatting: true,
      });

      setFormattedContent(response.formatted_content);
      setWarnings(response.warnings);
    } catch (error) {
      console.error('Formatting error:', error);
      toast.error('Failed to format content');
    } finally {
      setIsFormatting(false);
    }
  };

  const handleValidate = async () => {
    if (!content.trim()) return;

    setIsValidating(true);
    try {
      const response = await validateContent({ content });
      setWarnings(response.warnings);
      setSuggestions(response.suggestions);
      
      if (response.warnings.length > 0) {
        toast.error('Content has validation warnings');
      } else {
        toast.success('Content is valid for LinkedIn');
      }
    } catch (error) {
      console.error('Validation error:', error);
      toast.error('Failed to validate content');
    } finally {
      setIsValidating(false);
    }
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const insertText = (text: string) => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newContent = content.substring(0, start) + text + content.substring(end);
      setContent(newContent);
      
      // Set cursor position after inserted text
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + text.length, start + text.length);
      }, 0);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Content Editor</h2>
        <div className="flex items-center space-x-2">
          <CharacterCounter />
          <button
            onClick={handleValidate}
            disabled={!content.trim() || isValidating}
            className="btn-secondary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isValidating ? 'Validating...' : 'Validate'}
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <FormattingToolbar onInsertText={insertText} />
        
        <div className="flex-1 mt-4">
          <textarea
            id="content-editor"
            value={content}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder="Start writing your LinkedIn post here...

You can use:
• **bold text** for emphasis
• *italic text* for style
• Bullet points with •
• Emojis 🎉
• Hashtags #linkedin #content

The preview on the right shows exactly how it will look on LinkedIn."
            className="w-full h-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-linkedin-blue focus:border-transparent font-mono text-sm leading-relaxed"
            disabled={isFormatting}
          />
        </div>

        {formattedContent && (
          <div className="mt-4">
            <CopyButton content={formattedContent} />
          </div>
        )}
      </div>

      {/* Warnings and Suggestions */}
      {(warnings.length > 0 || suggestions.length > 0) && (
        <div className="mt-4 space-y-2">
          {warnings.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <h4 className="text-sm font-medium text-yellow-800 mb-2">⚠️ Warnings</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                {warnings.map((warning, index) => (
                  <li key={index}>• {warning}</li>
                ))}
              </ul>
            </div>
          )}
          
          {suggestions.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h4 className="text-sm font-medium text-blue-800 mb-2">💡 Suggestions</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                {suggestions.map((suggestion, index) => (
                  <li key={index}>• {suggestion}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TextEditor;
