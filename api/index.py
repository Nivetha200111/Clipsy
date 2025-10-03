from http.server import BaseHTTPRequestHandler
import json
import sys
import os

# Add the backend directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'backend'))

from app.services.formatter import LinkedInFormatter
from app.services.validator import ContentValidator
from app.services.templates import TemplateService

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/api/format':
            self.handle_format()
        elif self.path == '/api/format-advanced':
            self.handle_format_advanced()
        elif self.path == '/api/validate':
            self.handle_validate()
        else:
            self.send_error(404, "Not Found")
    
    def do_GET(self):
        if self.path == '/api/templates':
            self.handle_templates()
        else:
            self.send_error(404, "Not Found")
    
    def handle_format(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            if 'content' not in data:
                self.send_error(400, "Content is required")
                return
            
            # Format the content
            formatter = LinkedInFormatter()
            formatted_content = formatter.format_for_linkedin(
                data['content'], 
                preserve_formatting=data.get('preserve_formatting', True)
            )
            
            # Validate the formatted content
            validator = ContentValidator()
            validation_result = validator.validate_content(formatted_content)
            
            response = {
                'formatted_content': formatted_content,
                'character_count': len(formatted_content),
                'warnings': validation_result.get('warnings', [])
            }
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())
            
        except Exception as e:
            self.send_error(500, str(e))
    
    def handle_format_advanced(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            if 'content' not in data:
                self.send_error(400, "Content is required")
                return
            
            # Format the content with ranges
            formatter = LinkedInFormatter()
            formatted_content = formatter.format_with_ranges(
                data['content'], 
                data.get('ranges', [])
            )
            
            # Validate the formatted content
            validator = ContentValidator()
            validation_result = validator.validate_content(formatted_content)
            
            response = {
                'formatted_content': formatted_content,
                'character_count': len(formatted_content),
                'warnings': validation_result.get('warnings', [])
            }
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())
            
        except Exception as e:
            self.send_error(500, str(e))
    
    def handle_validate(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            if 'content' not in data:
                self.send_error(400, "Content is required")
                return
            
            # Validate the content
            validator = ContentValidator()
            result = validator.validate_content(data['content'])
            
            response = {
                'is_valid': result.get('is_valid', True),
                'warnings': result.get('warnings', []),
                'suggestions': result.get('suggestions', [])
            }
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())
            
        except Exception as e:
            self.send_error(500, str(e))
    
    def handle_templates(self):
        try:
            template_service = TemplateService()
            templates = template_service.get_templates()
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()
            self.wfile.write(json.dumps(templates).encode())
            
        except Exception as e:
            self.send_error(500, str(e))
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
