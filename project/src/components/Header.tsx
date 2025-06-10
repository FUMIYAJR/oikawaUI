import React from 'react';
import { Zap, Code, User, Crown, Star, Gem, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onLogoClick?: () => void;
  currentPlan: string;
  selectedModel: string;
}

export default function Header({ onLogoClick, currentPlan, selectedModel }: HeaderProps) {
  const getPlanInfo = () => {
    switch (currentPlan) {
      case 'pro':
        return { name: 'プロプラン', icon: Crown, color: 'text-cyan-400', remaining: 47 };
      case 'enterprise':
        return { name: 'エンタープライズプラン', icon: Gem, color: 'text-purple-400', remaining: '無制限' };
      default:
        return { name: 'ベーシックプラン', icon: Star, color: 'text-gray-400', remaining: 3 };
    }
  };

  const getModelInfo = () => {
    switch (selectedModel) {
      case 'pro-model':
        return { name: 'プロモデル', color: 'text-cyan-400', icon: Crown };
      case 'enterprise-model':
        return { name: 'エンタープライズモデル', color: 'text-purple-400', icon: Gem };
      case 'premium-model':
        return { name: 'プレミアムモデル', color: 'text-pink-400', icon: Zap };
      default:
        return { name: 'ベーシックモデル', color: 'text-gray-400', icon: Star };
    }
  };

  const planInfo = getPlanInfo();
  const modelInfo = getModelInfo();
  const PlanIcon = planInfo.icon;
  const ModelIcon = modelInfo.icon;

  return (
    <header className="bg-gray-900/95 backdrop-blur-lg border-b border-cyan-500/20 sticky top-0 z-40">
      <div className="px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Code className="h-5 w-5 text-white" />
              </div>
              <Zap className="h-3 w-3 text-cyan-400 absolute -top-1 -right-1" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              adpon
            </h1>
          </div>

          {/* Model Selection Banner - ChatGPT Style */}
          {currentPlan !== 'basic' && (
            <div className="flex-1 max-w-md mx-8">
              <button
                onClick={onLogoClick}
                className="w-full bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 hover:border-gray-500/50 rounded-xl px-4 py-2.5 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-1.5 rounded-lg bg-gradient-to-br ${
                      selectedModel === 'enterprise-model' || selectedModel === 'premium-model' 
                        ? 'from-purple-500/20 to-pink-500/20 border border-purple-500/30' 
                        : selectedModel === 'pro-model'
                        ? 'from-cyan-500/20 to-blue-500/20 border border-cyan-500/30'
                        : 'from-gray-500/20 to-gray-400/20 border border-gray-500/30'
                    }`}>
                      <ModelIcon className={`h-4 w-4 ${modelInfo.color}`} />
                    </div>
                    <div className="text-left">
                      <div className={`font-medium ${modelInfo.color} text-sm`}>
                        {modelInfo.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {selectedModel === 'enterprise-model' || selectedModel === 'premium-model' 
                          ? '8K品質・最高速生成' 
                          : selectedModel === 'pro-model'
                          ? '4K品質・高速生成'
                          : 'HD品質・標準生成'
                        }
                      </div>
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-gray-300 transition-colors" />
                </div>
              </button>
            </div>
          )}

          {/* Right Side */}
          <div className="flex items-center space-x-6">
            {/* Plan Info */}
            <div className="flex items-center space-x-2 text-sm">
              <PlanIcon className={`h-4 w-4 ${planInfo.color}`} />
              <span className={`font-medium ${planInfo.color}`}>
                {planInfo.name}
              </span>
              <span className="text-gray-400">
                • 残り{planInfo.remaining}本
              </span>
            </div>
            
            <button className="flex items-center space-x-2 bg-gray-800 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              <User className="h-4 w-4" />
              <span>アカウント</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}