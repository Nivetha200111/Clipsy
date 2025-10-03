import React from 'react';
import { useContent } from '../../context/ContentContext';
import { getCharacterCountColor, formatCharacterCount } from '../../utils/formatting';

const CharacterCounter: React.FC = () => {
  const { characterCount } = useContent();
  const colorClass = getCharacterCountColor(characterCount);
  const isOverLimit = characterCount > 3000;

  return (
    <div className={`text-sm font-medium ${colorClass}`}>
      {formatCharacterCount(characterCount)}
      {isOverLimit && (
        <span className="ml-2 text-red-600 font-bold">
          OVER LIMIT!
        </span>
      )}
    </div>
  );
};

export default CharacterCounter;
