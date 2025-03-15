import React from 'react';
import { ArrowRightCircle } from 'lucide-react';

interface ConversionButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const ConversionButton: React.FC<ConversionButtonProps> = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full mt-4 flex items-center justify-center px-4 py-2 rounded-md text-white
        ${disabled 
          ? 'bg-gray-300 cursor-not-allowed' 
          : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
        } transition-colors duration-200`}
    >
      <span className="mr-2">Convert</span>
      <ArrowRightCircle className="h-5 w-5" />
    </button>
  );
};