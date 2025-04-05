import React from 'react';

interface RedFlagCheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const RedFlagCheckbox: React.FC<RedFlagCheckboxProps> = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center space-x-3 cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div className={`block w-14 h-8 rounded-full ${checked ? 'bg-red-600' : 'bg-gray-600'}`}></div>
        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${checked ? 'transform translate-x-6' : ''}`}></div>
      </div>
      <span className="text-gray-300 hover:text-white transition">{label}</span>
    </label>
  );
};

export default RedFlagCheckbox;