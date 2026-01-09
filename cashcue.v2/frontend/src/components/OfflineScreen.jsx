import React from 'react';
import { WifiOff } from 'lucide-react';

const OfflineScreen = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <WifiOff size={64} className="text-brand-primary mb-4" />
      <h1 className="text-2xl font-bold text-brand-primary mb-4">No Internet Connection</h1>
      <button
        onClick={handleRetry}
        className="px-6 py-2 bg-brand-primary text-black rounded-lg hover:bg-opacity-80 transition-colors"
      >
        Retry
      </button>
    </div>
  );
};

export default OfflineScreen;
