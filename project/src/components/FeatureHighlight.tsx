import React from 'react';
import { Zap, Brain, Palette, Globe } from 'lucide-react';

export default function FeatureHighlight() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Content',
      description: 'Advanced AI analyzes your script and creates compelling visuals automatically'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate professional videos in minutes, not hours'
    },
    {
      icon: Palette,
      title: 'Customizable Styles',
      description: 'Choose from dozens of templates and customize every aspect'
    },
    {
      icon: Globe,
      title: 'Multi-Platform Export',
      description: 'Export in perfect formats for YouTube, Instagram, TikTok, and more'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Why Choose VideoAI Studio?</h3>
        <p className="text-gray-600">Powerful features that make video creation effortless</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex-shrink-0 p-3 bg-white rounded-xl shadow-sm">
              <feature.icon className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}