import React from 'react';

interface ResetButtonProps {
  onClick: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
    >
      Reset
    </button>
  );
};

export default ResetButton;