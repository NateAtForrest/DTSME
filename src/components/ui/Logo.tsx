import React from 'react';
import { BookOpen } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <BookOpen className="h-8 w-8 text-blue-600" />
      <span className="ml-2 text-xl font-semibold text-gray-900">SyntheticSME</span>
    </div>
  );
};

export default Logo;