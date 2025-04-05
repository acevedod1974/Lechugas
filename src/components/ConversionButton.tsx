import React from 'react';
import { ArrowRightCircle, Loader2 } from 'lucide-react';

interface ConversionButtonProps {
  onClick: () => void;
  disabled: boolean;
  loading?: boolean;
}

export const ConversionButton: React.FC<ConversionButtonProps> = ({ 
  onClick, 
  disabled,
  loading = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      aria-label="Convert USD to VES"
      className={`w-full mt-4 flex items-center justify-center px-4 py-2.5 rounded-md text-white
        ${disabled || loading
          ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400' 
          : 'bg-primary-500 hover:bg-primary-600 active:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500'
        } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
    >
      {loading ? (
        <>
          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
          <span>Converting...</span>
        </>
      ) : (
        <>
          <span className="mr-2">Convert</span>
          <ArrowRightCircle className="h-5 w-5" />
        </>
      )}
    </button>
  );
};