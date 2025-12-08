import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiPlus, FiDownload, FiArrowLeft } from 'react-icons/fi';
import api from '../utils/api';
import ChapterEditor from '../components/ChapterEditor';
import AIAssistant from '../components/AIAssistant';

const EbookEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ebook, setEbook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAI, setShowAI] = useState(false);

  useEffect(() => {
    fetchEbook();
  }, [id]);

  const fetchEbook = async () => {
    try {
      const { data } = await api.get(`/ebooks/${id}`);
      setEbook(data);
      if (data.chapters.length > 0) {
        setSelectedChapter(data.chapters[0]);
      }
    } catch (error) {
      toast.error('Failed to fetch eBook');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleAddChapter = async () => {
    const title = prompt('Enter chapter title:');
    if (!title) return;

    try {
      const { data } = await api.post(`/ebooks/${id}/chapters`, {
        title,
        content: '',
      });
      setEbook(data);
      setSelectedChapter(data.chapters[data.chapters.length - 1]);
      toast.success('Chapter added successfully');
    } catch (error) {
      toast.error('Failed to add chapter');
    }
  };

  const handleSaveChapter = async (chapterData) => {
    try {
      const { data } = await api.put(`/ebooks/${id}/chapters/${selectedChapter._id}`, chapterData);
      setEbook(data);
      setSelectedChapter(data.chapters.find((ch) => ch._id === selectedChapter._id));
      toast.success('Chapter saved successfully');
    } catch (error) {
      toast.error('Failed to save chapter');
    }
  };

  const handleDeleteChapter = async (chapterId) => {
    if (!window.confirm('Are you sure you want to delete this chapter?')) return;

    try {
      const { data } = await api.delete(`/ebooks/${id}/chapters/${chapterId}`);
      setEbook(data);
      setSelectedChapter(data.chapters[0] || null);
      toast.success('Chapter deleted successfully');
    } catch (error) {
      toast.error('Failed to delete chapter');
    }
  };

  const handleAIContentGenerated = (content) => {
    if (selectedChapter) {
      setSelectedChapter({
        ...selectedChapter,
        content: selectedChapter.content + '\n\n' + content,
      });
    }
  };

  const handleExportPDF = () => {
    // Simple PDF export using browser print
    const printWindow = window.open('', '_blank');
    const chaptersHTML = ebook.chapters
      .map(
        (ch) => `
      <div style="page-break-after: always;">
        <h2>${ch.title}</h2>
        <div style="white-space: pre-wrap;">${ch.content}</div>
      </div>
    `
      )
      .join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${ebook.title}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            h1 { text-align: center; margin-bottom: 20px; }
            h2 { margin-top: 30px; }
          </style>
        </head>
        <body>
          <h1>${ebook.title}</h1>
          <p style="text-align: center; margin-bottom: 40px;"><em>${ebook.genre}</em></p>
          ${chaptersHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="mr-4 text-gray-600 hover:text-gray-900"
            >
              <FiArrowLeft className="text-2xl" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{ebook.title}</h1>
              <p className="text-gray-600 text-sm">{ebook.genre}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowAI(!showAI)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              {showAI ? 'Hide AI' : 'Show AI Assistant'}
            </button>
            <button
              onClick={handleExportPDF}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center"
            >
              <FiDownload className="mr-2" />
              Export PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Chapters Sidebar */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900">Chapters</h3>
                <button
                  onClick={handleAddChapter}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                >
                  <FiPlus />
                </button>
              </div>

              <div className="space-y-2">
                {ebook.chapters.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">No chapters yet</p>
                ) : (
                  ebook.chapters.map((chapter, index) => (
                    <button
                      key={chapter._id}
                      onClick={() => setSelectedChapter(chapter)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition ${
                        selectedChapter?._id === chapter._id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      <div className="font-medium text-sm">
                        {index + 1}. {chapter.title}
                      </div>
                      <div className="text-xs opacity-75 mt-1">
                        {chapter.content.length} characters
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Main Editor Area */}
          <div className="col-span-9">
            {showAI && (
              <AIAssistant onContentGenerated={handleAIContentGenerated} />
            )}

            {selectedChapter ? (
              <ChapterEditor
                chapter={selectedChapter}
                onSave={handleSaveChapter}
                onDelete={handleDeleteChapter}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-500 mb-4">No chapter selected</p>
                <button
                  onClick={handleAddChapter}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Add First Chapter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EbookEditor;