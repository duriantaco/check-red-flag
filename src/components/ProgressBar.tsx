import React from 'react';

interface ProgressBarProps {
  progress: number;
  riskLevel: 'low' | 'moderate' | 'high';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, riskLevel }) => {
  const colorClass = riskLevel === 'low' ? 'bg-green-500' : riskLevel === 'moderate' ? 'bg-yellow-500' : 'bg-red-500';
  return (
    <div className="w-full bg-gray-700 rounded-full h-4">
      <div
        className={`${colorClass} h-4 rounded-full transition-all duration-300 ease-in-out`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;