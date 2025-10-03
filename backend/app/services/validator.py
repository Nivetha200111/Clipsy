import re
from typing import Dict, List, Any

class ContentValidator:
    """Validates content for LinkedIn compatibility and provides suggestions"""
    
    def __init__(self):
        self.max_characters = 3000
        self.warning_threshold = 2500
        
    def validate_content(self, content: str) -> Dict[str, Any]:
        """
        Validate content for LinkedIn compatibility
        
        Args:
            content: Content to validate
            
        Returns:
            Dictionary with validation results
        """
        warnings = []
        suggestions = []
        
        # Check character count
        char_count = len(content)
        if char_count > self.max_characters:
            warnings.append(f"Content exceeds LinkedIn's character limit ({char_count}/{self.max_characters})")
        elif char_count > self.warning_threshold:
            warnings.append(f"Content is approaching character limit ({char_count}/{self.max_characters})")
        
        # Check for problematic characters
        problematic_chars = self._find_problematic_characters(content)
        if problematic_chars:
            warnings.append(f"Found potentially problematic characters: {', '.join(problematic_chars)}")
        
        # Check for formatting issues
        formatting_issues = self._check_formatting_issues(content)
        if formatting_issues:
            warnings.extend(formatting_issues)
        
        # Generate suggestions
        suggestions = self._generate_suggestions(content)
        
        return {
            "is_valid": len(warnings) == 0,
            "warnings": warnings,
            "suggestions": suggestions,
            "character_count": char_count
        }
    
    def _find_problematic_characters(self, content: str) -> List[str]:
        """Find characters that might cause issues on LinkedIn"""
        problematic = []
        
        # Check for invisible characters
        invisible_chars = re.findall(r'[\u200b-\u200d\ufeff]', content)
        if invisible_chars:
            problematic.append("invisible characters")
        
        # Check for unusual Unicode characters that might not display well
        unusual_chars = re.findall(r'[\u0000-\u001f\u007f-\u009f]', content)
        if unusual_chars:
            problematic.append("control characters")
        
        # Check for characters that might break formatting
        breaking_chars = re.findall(r'[<>]', content)
        if breaking_chars:
            problematic.append("HTML-like characters")
        
        return problematic
    
    def _check_formatting_issues(self, content: str) -> List[str]:
        """Check for common formatting issues"""
        issues = []
        
        # Check for HTML tags that won't work
        html_tags = re.findall(r'<[^>]+>', content)
        if html_tags:
            issues.append("HTML tags detected - these won't display on LinkedIn")
        
        # Check for excessive line breaks
        excessive_breaks = re.search(r'\n{4,}', content)
        if excessive_breaks:
            issues.append("Excessive line breaks detected")
        
        # Check for inconsistent spacing
        inconsistent_spacing = re.search(r'[ \t]{3,}', content)
        if inconsistent_spacing:
            issues.append("Inconsistent spacing detected")
        
        # Check for very long lines (might cause display issues)
        lines = content.split('\n')
        long_lines = [line for line in lines if len(line) > 200]
        if long_lines:
            issues.append("Very long lines detected - consider breaking into shorter paragraphs")
        
        return issues
    
    def _generate_suggestions(self, content: str) -> List[str]:
        """Generate improvement suggestions for the content"""
        suggestions = []
        
        # Check for engagement opportunities
        if not re.search(r'[?!]', content):
            suggestions.append("Consider adding questions or exclamations to increase engagement")
        
        # Check for hashtags
        hashtags = re.findall(r'#\w+', content)
        if len(hashtags) < 3:
            suggestions.append("Consider adding 3-5 relevant hashtags for better reach")
        elif len(hashtags) > 10:
            suggestions.append("Consider reducing hashtags - 3-5 is optimal")
        
        # Check for call-to-action
        cta_patterns = [
            r'what do you think',
            r'let me know',
            r'share your thoughts',
            r'comment below',
            r'what\'s your experience'
        ]
        has_cta = any(re.search(pattern, content, re.IGNORECASE) for pattern in cta_patterns)
        if not has_cta:
            suggestions.append("Consider adding a call-to-action to encourage engagement")
        
        # Check for emojis
        emojis = re.findall(r'[\U0001F600-\U0001F64F\U0001F300-\U0001F5FF\U0001F680-\U0001F6FF\U0001F1E0-\U0001F1FF]', content)
        if not emojis:
            suggestions.append("Consider adding emojis to make your post more engaging")
        
        # Check for paragraph structure
        paragraphs = [p.strip() for p in content.split('\n\n') if p.strip()]
        if len(paragraphs) == 1 and len(content) > 500:
            suggestions.append("Consider breaking long content into multiple paragraphs for better readability")
        
        return suggestions
