import React from 'react';

interface ResultDisplayProps {
  score: number;
  maxScore: number;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ score, maxScore }) => {
  const percentage = (score / maxScore) * 100;
  let riskLevel: 'low' | 'moderate' | 'high';
  let message;

  if (percentage < 20) {
    riskLevel = 'low';
    message = "Low Risk - Seems chill, but keep an eye out.";
  } else if (percentage < 50) {
    riskLevel = 'moderate';
    message = "Moderate Risk - Proceed with caution.";
  } else {
    riskLevel = 'high';
    message = "High Risk - This one's a walking red flag.";
  }

  return (
    <div className={`text-center p-4 rounded-lg ${riskLevel === 'low' ? 'bg-green-900' : riskLevel === 'moderate' ? 'bg-yellow-900' : 'bg-red-900'}`}>
      <h2 className="text-2xl font-bold text-white mb-2">Verdict</h2>
      <p className="text-white">{message}</p>
      <p className="text-sm text-gray-300 mt-2">Score: {score} / {maxScore}</p>
    </div>
  );
};

export default ResultDisplay;