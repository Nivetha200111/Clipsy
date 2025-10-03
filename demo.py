#!/usr/bin/env python3
"""
Demo script showing LinkedIn formatting capabilities
"""

from backend.app.services.formatter import LinkedInFormatter
from backend.app.services.validator import ContentValidator

def demo_formatting():
    print("LinkedIn Content Formatter - Demo")
    print("=" * 50)
    
    formatter = LinkedInFormatter()
    validator = ContentValidator()
    
    # Demo content with various formatting
    demo_content = """
# My LinkedIn Post

**Exciting news!** I'm thrilled to announce our new product launch.

Here's what makes it special:
• *Innovative features* that solve real problems
• **Proven results** from our beta testing
• Easy to use interface

This represents a major milestone for our team. I'm excited to see how this will benefit our customers.

What questions do you have about this launch? Let me know in the comments below!

#productlaunch #innovation #business #startup
    """.strip()
    
    print("Original Content:")
    print("-" * 30)
    print(demo_content)
    print()
    
    # Format the content
    print("Formatted for LinkedIn:")
    print("-" * 30)
    formatted = formatter.format_for_linkedin(demo_content)
    print(formatted)
    print()
    
    # Validate the content
    print("Validation Results:")
    print("-" * 30)
    validation = validator.validate_content(formatted)
    print(f"Character count: {validation['character_count']}")
    print(f"Is valid: {validation['is_valid']}")
    
    if validation['warnings']:
        print("Warnings:")
        for warning in validation['warnings']:
            print(f"  - {warning}")
    
    if validation['suggestions']:
        print("Suggestions:")
        for suggestion in validation['suggestions']:
            print(f"  - {suggestion}")
    
    print("\n" + "=" * 50)
    print("Demo completed! Copy the formatted content above to LinkedIn.")

if __name__ == "__main__":
    demo_formatting()
