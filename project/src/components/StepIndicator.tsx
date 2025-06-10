import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

export default function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center space-x-8 mb-12">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
              index < currentStep 
                ? 'bg-cyan-500 border-cyan-500 text-white' 
                : index === currentStep
                ? 'bg-gray-800 border-cyan-500 text-cyan-400'
                : 'bg-gray-800 border-gray-600 text-gray-500'
            }`}>
              {index < currentStep ? (
                <Check className="h-6 w-6" />
              ) : (
                <span className="text-sm font-semibold">{index + 1}</span>
              )}
            </div>
            <span className={`mt-2 text-sm font-medium ${
              index <= currentStep ? 'text-cyan-400' : 'text-gray-500'
            }`}>
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-16 h-0.5 mx-4 ${
              index < currentStep ? 'bg-cyan-500' : 'bg-gray-600'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}