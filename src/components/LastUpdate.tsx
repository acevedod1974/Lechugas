import React from 'react';
import { Clock } from 'lucide-react';

interface LastUpdateProps {
  timestamp: string;
}

export const LastUpdate: React.FC<LastUpdateProps> = ({ timestamp }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="flex items-center text-xs text-gray-500">
      <Clock className="h-3 w-3 mr-1" />
      Last updated: {formatDate(timestamp)}
    </div>
  );
};