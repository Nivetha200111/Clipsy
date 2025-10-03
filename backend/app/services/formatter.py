import re
import unicodedata
from typing import Dict, Any

class LinkedInFormatter:
    """Handles formatting content specifically for LinkedIn compatibility"""
    
    def __init__(self):
        # Complete Unicode character mappings for bold, italic, and bold-italic
        self.bold_chars = {
            'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛',
            'I': '𝗜', 'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣',
            'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫',
            'Y': '𝗬', 'Z': '𝗭',
            'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵',
            'i': '𝗶', 'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽',
            'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅',
            'y': '𝘆', 'z': '𝘇',
            '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵'
        }
        
        self.italic_chars = {
            'A': '𝘈', 'B': '𝘉', 'C': '𝘊', 'D': '𝘋', 'E': '𝘌', 'F': '𝘍', 'G': '𝘎', 'H': '𝘏',
            'I': '𝘐', 'J': '𝘑', 'K': '𝘒', 'L': '𝘓', 'M': '𝘔', 'N': '𝘕', 'O': '𝘖', 'P': '𝘗',
            'Q': '𝘘', 'R': '𝘙', 'S': '𝘚', 'T': '𝘛', 'U': '𝘜', 'V': '𝘝', 'W': '𝘞', 'X': '𝘟',
            'Y': '𝘠', 'Z': '𝘡',
            'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧', 'g': '𝘨', 'h': '𝘩',
            'i': '𝘪', 'j': '𝘫', 'k': '𝘬', 'l': '𝘭', 'm': '𝘮', 'n': '𝘯', 'o': '𝘰', 'p': '𝘱',
            'q': '𝘲', 'r': '𝘳', 's': '𝘴', 't': '𝘵', 'u': '𝘶', 'v': '𝘷', 'w': '𝘸', 'x': '𝘹',
            'y': '𝘺', 'z': '𝘻'
        }
        
        self.bold_italic_chars = {
            'A': '𝘼', 'B': '𝘽', 'C': '𝘾', 'D': '𝘿', 'E': '𝙀', 'F': '𝙁', 'G': '𝙂', 'H': '𝙃',
            'I': '𝙄', 'J': '𝙅', 'K': '𝙆', 'L': '𝙇', 'M': '𝙈', 'N': '𝙉', 'O': '𝙊', 'P': '𝙋',
            'Q': '𝙌', 'R': '𝙍', 'S': '𝙎', 'T': '𝙏', 'U': '𝙐', 'V': '𝙑', 'W': '𝙒', 'X': '𝙓',
            'Y': '𝙔', 'Z': '𝙕',
            'a': '𝙖', 'b': '𝙗', 'c': '𝙘', 'd': '𝙙', 'e': '𝙚', 'f': '𝙛', 'g': '𝙜', 'h': '𝙝',
            'i': '𝙞', 'j': '𝙟', 'k': '𝙠', 'l': '𝙡', 'm': '𝙢', 'n': '𝙣', 'o': '𝙤', 'p': '𝙥',
            'q': '𝙦', 'r': '𝙧', 's': '𝙨', 't': '𝙩', 'u': '𝙪', 'v': '𝙫', 'w': '𝙬', 'x': '𝙭',
            'y': '𝙮', 'z': '𝙯'
        }
        
        # Underline combining character
        self.underline_combining = '\u0332'
    
    def format_for_linkedin(self, content: str, preserve_formatting: bool = True) -> str:
        """
        Convert content to LinkedIn-compatible format
        
        Args:
            content: Raw content with HTML or markdown formatting
            preserve_formatting: Whether to convert formatting to Unicode
            
        Returns:
            LinkedIn-formatted content
        """
        if not content:
            return ""
        
        # Clean the content first
        formatted = self._clean_content(content)
        
        if preserve_formatting:
            # Convert HTML formatting to Unicode
            formatted = self._convert_html_to_unicode(formatted)
            
            # Convert markdown formatting to Unicode
            formatted = self._convert_markdown_to_unicode(formatted)
        
        # Handle line breaks properly for LinkedIn
        formatted = self._handle_line_breaks(formatted)
        
        # Clean up any remaining issues
        formatted = self._final_cleanup(formatted)
        
        return formatted
    
    def format_with_ranges(self, content: str, ranges: list[dict]) -> str:
        """
        Format content with specific text ranges
        
        Args:
            content: The original content
            ranges: List of dictionaries with 'start', 'end', and 'styles' keys
                   Example: [{'start': 0, 'end': 10, 'styles': ['bold']}]
        
        Returns:
            Formatted content with Unicode characters
        """
        if not ranges:
            return content
        
        result = list(content)
        
        # Sort ranges by start position (process from end to beginning to maintain indices)
        sorted_ranges = sorted(ranges, key=lambda x: x['start'], reverse=True)
        
        for range_format in sorted_ranges:
            start = range_format['start']
            end = range_format['end']
            styles = range_format.get('styles', [])
            
            if start >= len(result) or end > len(result) or start >= end:
                continue
                
            text = ''.join(result[start:end])
            
            # Apply formatting based on styles
            if 'bold' in styles and 'italic' in styles:
                formatted = self._to_bold_italic(text)
            elif 'bold' in styles:
                formatted = self._to_bold(text)
            elif 'italic' in styles:
                formatted = self._to_italic(text)
            elif 'underline' in styles:
                formatted = self._to_underline(text)
            else:
                formatted = text
                
            result[start:end] = list(formatted)
        
        return ''.join(result)
    
    def _clean_content(self, content: str) -> str:
        """Remove problematic characters and normalize content"""
        # Remove invisible characters that can break LinkedIn
        content = ''.join(char for char in content if unicodedata.category(char) != 'Cf')
        
        # Remove zero-width characters
        content = re.sub(r'[\u200b-\u200d\ufeff]', '', content)
        
        # Normalize whitespace
        content = re.sub(r'[ \t]+', ' ', content)
        
        return content.strip()
    
    def _convert_html_to_unicode(self, content: str) -> str:
        """Convert HTML formatting tags to Unicode characters"""
        # Handle bold tags
        content = re.sub(r'<b>(.*?)</b>', lambda m: self._to_bold(m.group(1)), content, flags=re.IGNORECASE)
        content = re.sub(r'<strong>(.*?)</strong>', lambda m: self._to_bold(m.group(1)), content, flags=re.IGNORECASE)
        
        # Handle italic tags
        content = re.sub(r'<i>(.*?)</i>', lambda m: self._to_italic(m.group(1)), content, flags=re.IGNORECASE)
        content = re.sub(r'<em>(.*?)</em>', lambda m: self._to_italic(m.group(1)), content, flags=re.IGNORECASE)
        
        # Remove any remaining HTML tags
        content = re.sub(r'<[^>]+>', '', content)
        
        return content
    
    def _convert_markdown_to_unicode(self, content: str) -> str:
        """Convert markdown formatting to Unicode characters"""
        # Handle bold markdown
        content = re.sub(r'\*\*(.*?)\*\*', lambda m: self._to_bold(m.group(1)), content)
        content = re.sub(r'__(.*?)__', lambda m: self._to_bold(m.group(1)), content)
        
        # Handle italic markdown
        content = re.sub(r'\*(.*?)\*', lambda m: self._to_italic(m.group(1)), content)
        content = re.sub(r'_(.*?)_', lambda m: self._to_italic(m.group(1)), content)
        
        return content
    
    def _to_bold(self, text: str) -> str:
        """Convert text to Unicode bold characters"""
        return ''.join(self.bold_chars.get(char, char) for char in text)
    
    def _to_italic(self, text: str) -> str:
        """Convert text to Unicode italic characters"""
        return ''.join(self.italic_chars.get(char, char) for char in text)
    
    def _to_bold_italic(self, text: str) -> str:
        """Convert text to Unicode bold italic characters"""
        return ''.join(self.bold_italic_chars.get(char, char) for char in text)
    
    def _to_underline(self, text: str) -> str:
        """Convert text to underlined using combining characters"""
        return ''.join(char + self.underline_combining for char in text)
    
    def _handle_line_breaks(self, content: str) -> str:
        """Handle line breaks properly for LinkedIn"""
        # Convert single line breaks to double line breaks for paragraph separation
        # But preserve intentional single breaks within paragraphs
        lines = content.split('\n')
        processed_lines = []
        
        for i, line in enumerate(lines):
            line = line.strip()
            if not line:  # Empty line
                if i > 0 and processed_lines and processed_lines[-1].strip():
                    processed_lines.append('')  # Add empty line for paragraph break
            else:
                processed_lines.append(line)
        
        # Join lines and ensure proper paragraph spacing
        result = '\n'.join(processed_lines)
        
        # Clean up multiple consecutive empty lines
        result = re.sub(r'\n\s*\n\s*\n+', '\n\n', result)
        
        return result
    
    def _final_cleanup(self, content: str) -> str:
        """Final cleanup of the formatted content"""
        # Remove leading/trailing whitespace
        content = content.strip()
        
        # Ensure content doesn't start or end with empty lines
        content = re.sub(r'^\n+', '', content)
        content = re.sub(r'\n+$', '', content)
        
        return content
