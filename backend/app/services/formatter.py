import re
import unicodedata
from typing import Dict, Any

class LinkedInFormatter:
    """Handles formatting content specifically for LinkedIn compatibility"""
    
    def __init__(self):
        # Unicode character mappings for bold and italic
        self.bold_chars = {
            'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛',
            'I': '𝗜', 'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣',
            'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫',
            'Y': '𝗬', 'Z': '𝗭',
            'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵',
            'i': '𝗶', 'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽',
            'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅',
            'y': '𝘆', 'z': '𝘇'
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
