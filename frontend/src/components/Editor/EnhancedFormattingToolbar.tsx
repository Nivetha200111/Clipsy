import React, { useState } from 'react';
import { Bold, Italic, Underline, Type, Hash, List, Smile, Link, RotateCcw } from 'lucide-react';

interface EnhancedFormattingToolbarProps {
  onFormatText: (style: string) => void;
  onInsertText: (text: string) => void;
  onClearFormatting: () => void;
  hasSelection: boolean;
}

const EnhancedFormattingToolbar: React.FC<EnhancedFormattingToolbarProps> = ({
  onFormatText,
  onInsertText,
  onClearFormatting,
  hasSelection
}) => {
  const [showBulletPicker, setShowBulletPicker] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const formattingButtons = [
    {
      icon: Bold,
      label: 'Bold',
      style: 'bold',
      shortcut: 'Ctrl+B',
      description: 'Make text bold (Unicode)'
    },
    {
      icon: Italic,
      label: 'Italic',
      style: 'italic',
      shortcut: 'Ctrl+I',
      description: 'Make text italic (Unicode)'
    },
    {
      icon: Underline,
      label: 'Underline',
      style: 'underline',
      shortcut: 'Ctrl+U',
      description: 'Underline text (combining characters)'
    }
  ];

  const bulletOptions = [
    { char: '•', label: 'Bullet' },
    { char: '▪', label: 'Square' },
    { char: '►', label: 'Arrow' },
    { char: '→', label: 'Right Arrow' },
    { char: '◦', label: 'White Bullet' },
    { char: '‣', label: 'Triangle' }
  ];

  const emojiOptions = [
    '🎉', '🚀', '💡', '⭐', '🔥', '💪', '🎯', '📈', '🌟', '✨',
    '👍', '👏', '🎊', '🏆', '💯', '🎨', '📝', '🔗', '💼', '🎪'
  ];

  const quickInserts = [
    { text: 'What do you think?', label: 'Question' },
    { text: 'Let me know in the comments!', label: 'CTA' },
    { text: 'Share your thoughts below 👇', label: 'Engagement' },
    { text: 'Follow for more tips!', label: 'Follow' }
  ];

  return (
    <div className="space-y-4">
      {/* Main Formatting Buttons */}
      <div className="flex items-center space-x-1 p-2 bg-gray-50 rounded-lg">
        {formattingButtons.map((button, index) => {
          const Icon = button.icon;
          return (
            <button
              key={index}
              onClick={() => onFormatText(button.style)}
              disabled={!hasSelection && button.style !== 'underline'}
              className={`flex items-center justify-center w-10 h-10 rounded-md transition-colors duration-200 ${
                hasSelection || button.style === 'underline'
                  ? 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
              title={`${button.description} (${button.shortcut})`}
            >
              <Icon className="h-5 w-5" />
            </button>
          );
        })}
        
        <div className="w-px h-6 bg-gray-300 mx-2" />
        
        <button
          onClick={onClearFormatting}
          className="flex items-center justify-center w-10 h-10 rounded-md text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors duration-200"
          title="Clear formatting"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      {/* Insert Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setShowBulletPicker(!showBulletPicker)}
          className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <List className="h-4 w-4" />
          <span>Bullets</span>
        </button>

        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <Smile className="h-4 w-4" />
          <span>Emojis</span>
        </button>

        <button
          onClick={() => onInsertText('#hashtag')}
          className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <Hash className="h-4 w-4" />
          <span>Hashtag</span>
        </button>

        <button
          onClick={() => onInsertText('https://example.com')}
          className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <Link className="h-4 w-4" />
          <span>Link</span>
        </button>
      </div>

      {/* Bullet Picker Dropdown */}
      {showBulletPicker && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <div className="flex flex-wrap gap-2">
            {bulletOptions.map((bullet, index) => (
              <button
                key={index}
                onClick={() => {
                  onInsertText(bullet.char + ' ');
                  setShowBulletPicker(false);
                }}
                className="flex items-center justify-center w-8 h-8 text-lg hover:bg-gray-100 rounded-md transition-colors duration-200"
                title={bullet.label}
              >
                {bullet.char}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Emoji Picker Dropdown */}
      {showEmojiPicker && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <div className="flex flex-wrap gap-2">
            {emojiOptions.map((emoji, index) => (
              <button
                key={index}
                onClick={() => {
                  onInsertText(emoji);
                  setShowEmojiPicker(false);
                }}
                className="flex items-center justify-center w-8 h-8 text-lg hover:bg-gray-100 rounded-md transition-colors duration-200"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Insert Buttons */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-gray-500 self-center">Quick inserts:</span>
        {quickInserts.map((insert, index) => (
          <button
            key={index}
            onClick={() => onInsertText(insert.text)}
            className="px-3 py-1 text-xs text-linkedin-blue hover:text-linkedin-dark hover:bg-linkedin-light rounded-md transition-colors duration-200"
          >
            {insert.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EnhancedFormattingToolbar;
