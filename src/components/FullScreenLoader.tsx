import React from 'react';

interface FullScreenLoaderProps {
  message?: string;
}

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({ message = "Loading..." }) => {
  return (
    <div 
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white/30 backdrop-blur-sm cursor-wait"
      aria-busy="true"
      role="alert"
    >
      {/* Rotating Circle */}
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
      
      {/* Optional Message */}
      {message && (
        <p className="mt-4 text-lg font-medium text-gray-700 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

export default FullScreenLoader;