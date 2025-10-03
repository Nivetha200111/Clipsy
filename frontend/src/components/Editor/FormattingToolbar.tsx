import React from 'react';
import { Bold, Italic, Hash, List, Smile, Link } from 'lucide-react';

interface FormattingToolbarProps {
  onInsertText: (text: string) => void;
}

const FormattingToolbar: React.FC<FormattingToolbarProps> = ({ onInsertText }) => {
  const formattingOptions = [
    {
      icon: Bold,
      label: 'Bold',
      action: () => onInsertText('**bold text**'),
      description: 'Make text bold'
    },
    {
      icon: Italic,
      label: 'Italic',
      action: () => onInsertText('*italic text*'),
      description: 'Make text italic'
    },
    {
      icon: Hash,
      label: 'Hashtag',
      action: () => onInsertText('#hashtag'),
      description: 'Add a hashtag'
    },
    {
      icon: List,
      label: 'Bullet',
      action: () => onInsertText('• '),
      description: 'Add bullet point'
    },
    {
      icon: Smile,
      label: 'Emoji',
      action: () => onInsertText('🎉'),
      description: 'Add emoji'
    },
    {
      icon: Link,
      label: 'Link',
      action: () => onInsertText('https://example.com'),
      description: 'Add a link'
    }
  ];

  const quickInserts = [
    { text: 'What do you think?', label: 'Question' },
    { text: 'Let me know in the comments!', label: 'CTA' },
    { text: 'Share your thoughts below 👇', label: 'Engagement' },
    { text: 'Follow for more tips!', label: 'Follow' }
  ];

  return (
    <div className="space-y-3">
      {/* Formatting Buttons */}
      <div className="flex flex-wrap gap-2">
        {formattingOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <button
              key={index}
              onClick={option.action}
              className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              title={option.description}
            >
              <Icon className="h-4 w-4" />
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>

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

export default FormattingToolbar;
