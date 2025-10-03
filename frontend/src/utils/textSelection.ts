// Utility functions for handling text selection and formatting

export interface TextRange {
  start: number;
  end: number;
  styles: string[];
}

export const getTextSelection = (textarea: HTMLTextAreaElement): { start: number; end: number; text: string } => {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = textarea.value.substring(start, end);
  
  return { start, end, text };
};

export const setTextSelection = (textarea: HTMLTextAreaElement, start: number, end: number) => {
  textarea.focus();
  textarea.setSelectionRange(start, end);
};

export const insertTextAtSelection = (
  textarea: HTMLTextAreaElement, 
  text: string, 
  replaceSelection: boolean = true
): { newValue: string; newStart: number; newEnd: number } => {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const value = textarea.value;
  
  let newValue: string;
  let newStart: number;
  let newEnd: number;
  
  if (replaceSelection) {
    newValue = value.substring(0, start) + text + value.substring(end);
    newStart = start + text.length;
    newEnd = newStart;
  } else {
    newValue = value.substring(0, start) + text + value.substring(start);
    newStart = start + text.length;
    newEnd = newStart;
  }
  
  return { newValue, newStart, newEnd };
};

export const applyFormattingToSelection = (
  textarea: HTMLTextAreaElement,
  style: string
): { newValue: string; newStart: number; newEnd: number } => {
  const { start, end, text } = getTextSelection(textarea);
  
  if (text.length === 0) {
    // No selection, just insert formatting markers
    const markers = getFormattingMarkers(style);
    return insertTextAtSelection(textarea, markers, false);
  }
  
  // Apply formatting to selected text
  const formattedText = wrapTextWithMarkers(text, style);
  const newValue = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
  
  return {
    newValue,
    newStart: start,
    newEnd: start + formattedText.length
  };
};

export const getFormattingMarkers = (style: string): string => {
  switch (style) {
    case 'bold':
      return '**text**';
    case 'italic':
      return '*text*';
    case 'underline':
      return '_text_';
    default:
      return 'text';
  }
};

export const wrapTextWithMarkers = (text: string, style: string): string => {
  switch (style) {
    case 'bold':
      return `**${text}**`;
    case 'italic':
      return `*${text}*`;
    case 'underline':
      return `_${text}_`;
    default:
      return text;
  };
};

export const createFormattingRange = (
  start: number,
  end: number,
  styles: string[]
): TextRange => ({
  start,
  end,
  styles
});

export const mergeFormattingRanges = (ranges: TextRange[]): TextRange[] => {
  if (ranges.length === 0) return [];
  
  // Sort ranges by start position
  const sorted = [...ranges].sort((a, b) => a.start - b.start);
  const merged: TextRange[] = [];
  
  for (const range of sorted) {
    if (merged.length === 0) {
      merged.push(range);
      continue;
    }
    
    const last = merged[merged.length - 1];
    
    // If ranges overlap or are adjacent, merge them
    if (range.start <= last.end) {
      last.end = Math.max(last.end, range.end);
      last.styles = [...new Set([...last.styles, ...range.styles])];
    } else {
      merged.push(range);
    }
  }
  
  return merged;
};
