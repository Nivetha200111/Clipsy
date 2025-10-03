import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useContent } from '../../context/ContentContext';
import { formatContent, validateContent } from '../../services/api';
import { getCharacterCount } from '../../utils/formatting';
import { 
  getTextSelection, 
  setTextSelection, 
  applyFormattingToSelection,
  insertTextAtSelection 
} from '../../utils/textSelection';
import EnhancedFormattingToolbar from './EnhancedFormattingToolbar';
import CharacterCounter from './CharacterCounter';
import CopyButton from '../CopyButton';
import InfoBanner from '../InfoBanner';
import toast from 'react-hot-toast';

const EnhancedTextEditor: React.FC = () => {
  const {
    content,
    setContent,
    formattedContent,
    setFormattedContent,
    isFormatting,
    setIsFormatting,
    setCharacterCount,
    warnings,
    setWarnings,
    suggestions,
    setSuggestions,
  } = useContent();

  const [isValidating, setIsValidating] = useState(false);
  const [hasSelection, setHasSelection] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  // Check for text selection
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleSelectionChange = () => {
      const { start, end } = getTextSelection(textarea);
      setHasSelection(start !== end);
    };

    textarea.addEventListener('select', handleSelectionChange);
    textarea.addEventListener('click', handleSelectionChange);
    textarea.addEventListener('keyup', handleSelectionChange);

    return () => {
      textarea.removeEventListener('select', handleSelectionChange);
      textarea.removeEventListener('click', handleSelectionChange);
      textarea.removeEventListener('keyup', handleSelectionChange);
    };
  }, []);

  const handleFormat = useCallback(async () => {
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
  }, [content, setIsFormatting, setFormattedContent, setWarnings]);

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

  const handleFormatText = (style: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const { newValue, newStart, newEnd } = applyFormattingToSelection(textarea, style);
    
    setContent(newValue);
    
    // Set cursor position after formatting
    setTimeout(() => {
      setTextSelection(textarea, newStart, newEnd);
    }, 0);
  };

  const handleInsertText = (text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const { newValue, newStart, newEnd } = insertTextAtSelection(textarea, text);
    
    setContent(newValue);
    
    // Set cursor position after insertion
    setTimeout(() => {
      setTextSelection(textarea, newStart, newEnd);
    }, 0);
  };

  const handleClearFormatting = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const { start, end, text } = getTextSelection(textarea);
    
    if (text.length === 0) {
      toast.error('Please select text to clear formatting');
      return;
    }

    // Remove formatting markers
    const cleanedText = text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/__(.*?)__/g, '$1')
      .replace(/_(.*?)_/g, '$1');

    const newValue = textarea.value.substring(0, start) + cleanedText + textarea.value.substring(end);
    
    setContent(newValue);
    
    // Set cursor position after clearing
    setTimeout(() => {
      setTextSelection(textarea, start, start + cleanedText.length);
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          handleFormatText('bold');
          break;
        case 'i':
          e.preventDefault();
          handleFormatText('italic');
          break;
        case 'u':
          e.preventDefault();
          handleFormatText('underline');
          break;
      }
    }
  };

  return (
    <div className="h-full flex flex-col">
      <InfoBanner />
      
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
        <EnhancedFormattingToolbar
          onFormatText={handleFormatText}
          onInsertText={handleInsertText}
          onClearFormatting={handleClearFormatting}
          hasSelection={hasSelection}
        />
        
        <div className="flex-1 mt-4">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => handleContentChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Start writing your LinkedIn post here...

You can:
• Select text and use formatting buttons above
• Use keyboard shortcuts: Ctrl+B (bold), Ctrl+I (italic), Ctrl+U (underline)
• Insert bullets, emojis, hashtags, and links
• See live preview on the right

The preview shows exactly how it will look on LinkedIn."
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

export default EnhancedTextEditor;
