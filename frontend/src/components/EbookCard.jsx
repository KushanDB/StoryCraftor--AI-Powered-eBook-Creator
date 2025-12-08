import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2, FiClock } from 'react-icons/fi';

const EbookCard = ({ ebook, onDelete }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Cover Image */}
      <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <h3 className="text-white text-2xl font-bold text-center px-4">
          {ebook.title}
        </h3>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {ebook.genre}
          </span>
          <span
            className={`text-xs px-2 py-1 rounded ${
              ebook.status === 'published'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {ebook.status}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {ebook.description || 'No description available'}
        </p>

        <div className="flex items-center text-xs text-gray-500 mb-4">
          <FiClock className="mr-1" />
          <span>Updated {formatDate(ebook.updatedAt)}</span>
          <span className="mx-2">•</span>
          <span>{ebook.chapters?.length || 0} chapters</span>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Link
            to={`/ebooks/${ebook._id}`}
            className="flex-1 bg-blue-600 text-white text-center px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center"
          >
            <FiEdit className="mr-2" />
            Edit
          </Link>
          <button
            onClick={() => onDelete(ebook._id)}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EbookCard;