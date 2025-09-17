'use client';

import React, { useState } from 'react';
import { Search, Plus, Trash2, Tag } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import type { Template } from '@/types';

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TemplateModal({ isOpen, onClose }: TemplateModalProps) {
  const { state, dispatch } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = Array.from(new Set(state.templates.flatMap((t) => t.tags)));

  // ✅ Strong typing with Template
  const filteredTemplates: Template[] = state.templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => template.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const loadTemplate = (template: Template) => {
    dispatch({ type: 'SET_PROMPT', payload: template.prompt });
    dispatch({ type: 'SET_PARAMETERS', payload: template.parameters });
    onClose();
  };

  const deleteTemplate = (templateId: string) => {
    dispatch({ type: 'DELETE_TEMPLATE', payload: templateId });
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Template Library" size="lg">
      <div className="space-y-6">
        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-3 text-gray-400 dark:text-gray-100"
            />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 
                         rounded-lg bg-white dark:bg-gray-800 
                         text-gray-900 dark:text-gray-100 
                         placeholder-gray-400 dark:placeholder-gray-500 
                         focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <Tag size={12} />
                <span>{tag}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Template List */}
        <div className="space-y-3 max-h-96 overflow-y-auto chat-scroll">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg 
                         hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    {template.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {template.description}
                  </p>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => loadTemplate(template)}
                    className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    title="Load template"
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    onClick={() => deleteTemplate(template.id)}
                    className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    title="Delete template"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Prompt Preview */}
              <div className="mb-3">
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {template.prompt.substring(0, 150)}
                  {template.prompt.length > 150 && '...'}
                </p>
              </div>

              {/* Tags + Timestamp */}
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 
                                 text-gray-600 dark:text-gray-400 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="ml-2 text-xs text-gray-400 dark:text-gray-500">
                  {new Date(template.updatedAt).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}

          {filteredTemplates.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                No templates found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
