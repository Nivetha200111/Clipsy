import React from 'react';
import { FileText, Calendar, Tag } from 'lucide-react';
import { Template } from '../../services/api';

interface TemplateCardProps {
  template: Template;
  onSelect: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onSelect }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'business':
        return 'bg-blue-100 text-blue-800';
      case 'personal':
        return 'bg-green-100 text-green-800';
      case 'professional':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'business':
        return '💼';
      case 'personal':
        return '👤';
      case 'professional':
        return '🎯';
      default:
        return '📄';
    }
  };

  const truncateContent = (content: string, maxLength: number = 120) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div
      onClick={onSelect}
      className="p-4 border border-gray-200 rounded-lg hover:border-linkedin-blue hover:shadow-md transition-all duration-200 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          <FileText className="h-4 w-4 text-gray-500 group-hover:text-linkedin-blue" />
          <h3 className="font-medium text-gray-900 group-hover:text-linkedin-blue">
            {template.name}
          </h3>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(template.category)}`}>
          {getCategoryIcon(template.category)} {template.category}
        </span>
      </div>

      {template.description && (
        <p className="text-sm text-gray-600 mb-3">
          {template.description}
        </p>
      )}

      <div className="text-sm text-gray-700 leading-relaxed">
        {truncateContent(template.content)}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{template.content.length} chars</span>
          </span>
        </div>
        <span className="text-linkedin-blue group-hover:text-linkedin-dark font-medium">
          Use template →
        </span>
      </div>
    </div>
  );
};

export default TemplateCard;
