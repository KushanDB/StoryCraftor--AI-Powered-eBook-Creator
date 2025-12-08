import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiBook } from 'react-icons/fi';
import api from '../utils/api';

const CreateEbook = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: 'Fiction',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const genres = [
    'Fiction',
    'Non-Fiction',
    'Mystery',
    'Romance',
    'Science Fiction',
    'Fantasy',
    'Thriller',
    'Biography',
    'Self-Help',
    'Business',
    'Other',
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post('/ebooks', formData);
      toast.success('eBook created successfully!');
      navigate(`/ebooks/${data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create eBook');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="flex items-center mb-6">
            <FiBook className="text-3xl text-blue-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create New eBook</h1>
              <p className="text-gray-600">Start your writing journey</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                eBook Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your eBook title..."
              />
            </div>

            {/* Genre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Genre *</label>
              <select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of your eBook..."
              />
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 font-medium"
              >
                {loading ? 'Creating...' : 'Create eBook'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEbook;