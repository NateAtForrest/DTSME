import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-blue-600">404</h1>
      <h2 className="mt-4 text-2xl font-bold text-gray-900">Page Not Found</h2>
      <p className="mt-2 text-gray-600 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="mt-8">
        <Button 
          variant="primary" 
          size="md"
          icon={<Home size={16} />}
        >
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;