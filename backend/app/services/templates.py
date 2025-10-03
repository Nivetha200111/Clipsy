import json
import uuid
from typing import List, Dict, Optional, Any

class TemplateService:
    """Manages LinkedIn post templates"""
    
    def __init__(self):
        self.templates_file = "templates.json"
        self.templates = self._load_templates()
    
    def _load_templates(self) -> List[Dict[str, Any]]:
        """Load templates from file or return default templates"""
        try:
            with open(self.templates_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            return self._get_default_templates()
    
    def _save_templates(self):
        """Save templates to file"""
        with open(self.templates_file, 'w', encoding='utf-8') as f:
            json.dump(self.templates, f, indent=2, ensure_ascii=False)
    
    def _get_default_templates(self) -> List[Dict[str, Any]]:
        """Get default LinkedIn post templates"""
        return [
            {
                "id": "announcement",
                "name": "Product/Service Announcement",
                "category": "business",
                "description": "Template for announcing new products or services",
                "content": "🎉 Exciting news! I'm thrilled to announce [PRODUCT/SERVICE NAME].\n\n[DESCRIPTION OF WHAT IT IS AND WHY IT MATTERS]\n\nThis represents [SIGNIFICANCE/IMPACT]. I'm excited to see how this will [BENEFIT/OUTCOME].\n\nWhat questions do you have about [TOPIC]? Let me know in the comments below!\n\n#announcement #innovation #business"
            },
            {
                "id": "personal-story",
                "name": "Personal Story/Experience",
                "category": "personal",
                "description": "Template for sharing personal experiences and lessons learned",
                "content": "I want to share something personal that happened to me recently...\n\n[YOUR STORY - be authentic and vulnerable]\n\nThis experience taught me [KEY LESSON/INSIGHT].\n\nI'm sharing this because I believe [WHY OTHERS SHOULD CARE].\n\nHave you had a similar experience? I'd love to hear your thoughts.\n\n#personal #story #growth #lessonslearned"
            },
            {
                "id": "industry-tips",
                "name": "Industry Tips/Advice",
                "category": "professional",
                "description": "Template for sharing professional tips and industry insights",
                "content": "💡 [NUMBER] [INDUSTRY] tips that have transformed my approach:\n\n1️⃣ [TIP 1 - be specific and actionable]\n2️⃣ [TIP 2 - explain the why behind it]\n3️⃣ [TIP 3 - include a personal example]\n\nThese aren't just theoretical - I've seen them work in practice.\n\nWhich tip resonates most with you? Share your experience below!\n\n#[INDUSTRY] #tips #professional #advice"
            },
            {
                "id": "thought-leadership",
                "name": "Thought Leadership",
                "category": "professional",
                "description": "Template for sharing industry insights and thought leadership",
                "content": "I've been thinking about [INDUSTRY TREND/TOPIC] lately, and here's what I believe:\n\n[YOUR INSIGHT/OPINION - be bold and specific]\n\nHere's why this matters:\n• [REASON 1]\n• [REASON 2]\n• [REASON 3]\n\n[PERSONAL EXPERIENCE OR EVIDENCE TO SUPPORT YOUR POINT]\n\nI'm curious - do you agree? What's your take on [TOPIC]?\n\n#thoughtleadership #[INDUSTRY] #insights #trends"
            },
            {
                "id": "behind-scenes",
                "name": "Behind the Scenes",
                "category": "personal",
                "description": "Template for sharing behind-the-scenes content",
                "content": "Ever wondered what goes into [YOUR WORK/PROJECT]? Here's a peek behind the curtain:\n\n[DESCRIBE THE PROCESS - be specific and visual]\n\n[SHARE CHALLENGES AND HOW YOU OVERCAME THEM]\n\n[INCLUDE A FUN FACT OR SURPRISING DETAIL]\n\nThis is why I love what I do - [PASSION STATEMENT].\n\nWhat would you like to know more about? Ask away!\n\n#behindthescenes #process #work #passion"
            },
            {
                "id": "celebration",
                "name": "Achievement/Celebration",
                "category": "personal",
                "description": "Template for celebrating achievements and milestones",
                "content": "🎉 I'm incredibly grateful to share that [ACHIEVEMENT/MILESTONE]!\n\n[WHAT IT MEANS TO YOU AND WHY IT MATTERS]\n\nNone of this would have been possible without [ACKNOWLEDGE SUPPORT/HELP].\n\n[SHARE WHAT YOU LEARNED OR HOW YOU GREW]\n\nTo anyone working toward [SIMILAR GOAL] - keep going! Your persistence will pay off.\n\nWhat are you celebrating lately? I'd love to hear about your wins!\n\n#celebration #achievement #grateful #milestone"
            }
        ]
    
    def get_templates(self, category: Optional[str] = None) -> List[Dict[str, Any]]:
        """Get all templates, optionally filtered by category"""
        if category:
            return [t for t in self.templates if t.get("category") == category]
        return self.templates
    
    def get_template(self, template_id: str) -> Optional[Dict[str, Any]]:
        """Get a specific template by ID"""
        for template in self.templates:
            if template.get("id") == template_id:
                return template
        return None
    
    def create_template(self, name: str, content: str, category: str, description: Optional[str] = None) -> Dict[str, Any]:
        """Create a new custom template"""
        template = {
            "id": str(uuid.uuid4()),
            "name": name,
            "content": content,
            "category": category,
            "description": description or ""
        }
        
        self.templates.append(template)
        self._save_templates()
        
        return template
    
    def update_template(self, template_id: str, **kwargs) -> Optional[Dict[str, Any]]:
        """Update an existing template"""
        for i, template in enumerate(self.templates):
            if template.get("id") == template_id:
                self.templates[i].update(kwargs)
                self._save_templates()
                return self.templates[i]
        return None
    
    def delete_template(self, template_id: str) -> bool:
        """Delete a template"""
        for i, template in enumerate(self.templates):
            if template.get("id") == template_id:
                del self.templates[i]
                self._save_templates()
                return True
        return False
