import { Link } from 'react-router-dom';
import { FiBook, FiZap, FiDownload, FiEdit } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Create Amazing eBooks with{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
              AI Power
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            StoryCraftor helps you plan, write, and export professional eBooks with the assistance
            of advanced AI technology. Bring your stories to life effortlessly.
          </p>

          <div className="flex justify-center space-x-4">
            {user ? (
              <Link
                to="/dashboard"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium border-2 border-blue-600 hover:bg-blue-50 transition"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiZap className="text-3xl text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Writing</h3>
            <p className="text-gray-600">
              Generate chapter outlines, content ideas, and complete sections with advanced AI
              assistance.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiEdit className="text-3xl text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Chapter Management</h3>
            <p className="text-gray-600">
              Organize your eBook with intuitive chapter management. Edit, reorder, and refine with
              ease.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiDownload className="text-3xl text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Export & Share</h3>
            <p className="text-gray-600">
              Export your completed eBook as PDF and share it with the world. Professional quality
              output.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-24">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Create Project', desc: 'Start a new eBook project with title and genre' },
              { step: '2', title: 'Plan Chapters', desc: 'Use AI to generate chapter outlines' },
              { step: '3', title: 'Write Content', desc: 'Write manually or with AI assistance' },
              { step: '4', title: 'Export', desc: 'Download your completed eBook as PDF' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="bg-linear-to-br from-blue-600 to-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;