import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from '@shared/components/ui/Icons.jsx';

export const StatCard = ({ title, value, icon, linkText, onClick, color }) => {
  const colors = {
    navy: 'bg-navy-50 text-navy-700 border-navy-100 hover:border-navy-300',
    orange: 'bg-orange-50 text-orange-700 border-orange-100 hover:border-orange-300'
  };
  
  return (
    <div className="bg-surface rounded-xl border border-line shadow-card p-5 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors[color].split(' ')[0]} ${colors[color].split(' ')[1]}`}>
          {React.cloneElement(icon, { className: "w-5 h-5" })}
        </div>
        <button onClick={onClick} className="text-xs font-semibold text-navy-600 hover:underline">
          {linkText}
        </button>
      </div>
      <div>
        <p className="text-sm text-ink-700 font-semibold">{title}</p>
        <p className="text-3xl font-extrabold text-navy-950 mt-1">{value}</p>
      </div>
    </div>
  );
};
