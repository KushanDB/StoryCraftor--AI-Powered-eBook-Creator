import { useState } from 'react';
import { FiSave, FiTrash2 } from 'react-icons/fi';

const ChapterEditor = ({ chapter, onSave, onDelete }) => {
  const [title, setTitle] = useState(chapter?.title || '');
  const [content, setContent] = useState(chapter?.content || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await onSave({ title, content });
    setIsSaving(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Chapter Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Chapter Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter chapter title..."
        />
      </div>

      {/* Chapter Content */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={15}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
          placeholder="Write your chapter content here..."
        />
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400 flex items-center"
        >
          <FiSave className="mr-2" />
          {isSaving ? 'Saving...' : 'Save Chapter'}
        </button>

        {chapter && (
          <button
            onClick={() => onDelete(chapter._id)}
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition flex items-center"
          >
            <FiTrash2 className="mr-2" />
            Delete Chapter
          </button>
        )}
      </div>
    </div>
  );
};

export default ChapterEditor;