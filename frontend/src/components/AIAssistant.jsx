import { useState } from 'react';
import { FiZap } from 'react-icons/fi';
import api from '../utils/api';
import { toast } from 'react-toastify';

const AIAssistant = ({ onContentGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setGenerating(true);
    try {
      const { data } = await api.post('/ai/generate', {
        prompt,
        type: 'chapter',
      });

      onContentGenerated(data.content);
      toast.success('Content generated successfully!');
      setPrompt('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to generate content');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="bg-linear-to-r from-purple-50 to-blue-50 rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <FiZap className="text-2xl text-purple-600 mr-2" />
        <h3 className="text-xl font-bold text-gray-900">AI Assistant</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Describe what you want to write
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="e.g., Write an exciting opening scene for a fantasy adventure..."
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={generating}
          className="w-full bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition disabled:bg-gray-400 flex items-center justify-center"
        >
          <FiZap className="mr-2" />
          {generating ? 'Generating...' : 'Generate with AI'}
        </button>
      </div>

      <p className="text-xs text-gray-600 mt-4">
        💡 Tip: Be specific about the tone, style, and key elements you want in your content.
      </p>
    </div>
  );
};

export default AIAssistant;