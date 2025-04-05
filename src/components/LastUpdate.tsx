import React from 'react';
import { Clock } from 'lucide-react';
import { formatTimeDifference } from '../utils/currency';

interface LastUpdateProps {
  timestamp: string;
}

export const LastUpdate: React.FC<LastUpdateProps> = ({ timestamp }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
      <Clock className="h-3 w-3 mr-1" />
      <span title={formatDate(timestamp)}>
        Last updated: {formatTimeDifference(timestamp)}
      </span>
    </div>
  );
};