import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../utils/api';
import EbookCard from '../components/EbookCard';

const Dashboard = () => {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEbooks();
  }, []);

  const fetchEbooks = async () => {
    try {
      const { data } = await api.get('/ebooks');
      setEbooks(data);
    } catch (error) {
      toast.error('Failed to fetch eBooks');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this eBook?')) {
      try {
        await api.delete(`/ebooks/${id}`);
        setEbooks(ebooks.filter((ebook) => ebook._id !== id));
        toast.success('eBook deleted successfully');
      } catch (error) {
        toast.error('Failed to delete eBook');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My eBooks</h1>
            <p className="text-gray-600 mt-1">Manage and edit your eBook projects</p>
          </div>
          <Link
            to="/create"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center font-medium"
          >
            <FiPlus className="mr-2" />
            Create New eBook
          </Link>
        </div>

        {/* eBooks Grid */}
        {ebooks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <FiPlus className="text-6xl mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No eBooks yet</h3>
            <p className="text-gray-600 mb-6">Start creating your first eBook project</p>
            <Link
              to="/create"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Create Your First eBook
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ebooks.map((ebook) => (
              <EbookCard key={ebook._id} ebook={ebook} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;