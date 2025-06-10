import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
}

export default function StatsCard({ title, value, change, icon: Icon, color }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <p className={`text-sm mt-1 ${color}`}>{change}</p>
        </div>
        <div className={`p-3 rounded-xl ${color.includes('green') ? 'bg-green-100' : color.includes('blue') ? 'bg-blue-100' : color.includes('purple') ? 'bg-purple-100' : 'bg-pink-100'}`}>
          <Icon className={`h-6 w-6 ${color.includes('green') ? 'text-green-600' : color.includes('blue') ? 'text-blue-600' : color.includes('purple') ? 'text-purple-600' : 'text-pink-600'}`} />
        </div>
      </div>
    </div>
  );
}