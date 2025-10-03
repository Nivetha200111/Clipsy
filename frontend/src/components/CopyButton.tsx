import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '../utils/formatting';
import toast from 'react-hot-toast';

interface CopyButtonProps {
  content: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ content }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(content);
    
    if (success) {
      setIsCopied(true);
      toast.success('Content copied to clipboard!');
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } else {
      toast.error('Failed to copy content');
    }
  };

  return (
    <button
      onClick={handleCopy}
      disabled={!content.trim()}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        isCopied
          ? 'bg-green-100 text-green-700 border border-green-200'
          : 'btn-primary hover:bg-linkedin-dark'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isCopied ? (
        <>
          <Check className="h-4 w-4" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          <span>Copy to Clipboard</span>
        </>
      )}
    </button>
  );
};

export default CopyButton;
