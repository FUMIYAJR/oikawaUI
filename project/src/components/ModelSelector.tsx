import React, { useState } from 'react';
import { X, Brain, Zap, Crown, Gem, Star, Check, Lock, Sparkles, Target, Lightbulb, ArrowRight } from 'lucide-react';

interface ModelSelectorProps {
  currentPlan: string;
  selectedModel: string;
  onModelSelect: (modelId: string) => void;
  onClose: () => void;
}

export default function ModelSelector({ currentPlan, selectedModel, onModelSelect, onClose }: ModelSelectorProps) {
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);

  const models = [
    {
      id: 'basic-model',
      name: 'ベーシックモデル',
      description: '基本的な広告動画生成に最適',
      shortDesc: 'HD品質・標準生成',
      icon: Star,
      color: 'from-gray-600 to-gray-500',
      borderColor: 'border-gray-600',
      textColor: 'text-gray-400',
      bgColor: 'from-gray-500/20 to-gray-400/20',
      requiredPlan: 'basic',
      features: [
        'HD品質（1080p）',
        '基本テンプレート',
        '標準的な生成速度',
        '基本的なカスタマイズ'
      ],
      capabilities: {
        quality: 3,
        speed: 3,
        creativity: 2,
        customization: 2
      }
    },
    {
      id: 'pro-model',
      name: 'プロモデル',
      description: 'ビジネス用途に最適化された高品質モデル',
      shortDesc: '4K品質・高速生成',
      icon: Crown,
      color: 'from-cyan-500 to-blue-600',
      borderColor: 'border-cyan-500',
      textColor: 'text-cyan-400',
      bgColor: 'from-cyan-500/20 to-blue-500/20',
      requiredPlan: 'pro',
      features: [
        '4K品質対応',
        'プレミアムテンプレート',
        '高速生成',
        '高度なカスタマイズ',
        'ブランド最適化'
      ],
      capabilities: {
        quality: 4,
        speed: 4,
        creativity: 4,
        customization: 4
      }
    },
    {
      id: 'enterprise-model',
      name: 'エンタープライズモデル',
      description: '大規模企業向けの最高品質モデル',
      shortDesc: '8K品質・最高速生成',
      icon: Gem,
      color: 'from-purple-600 to-pink-600',
      borderColor: 'border-purple-600',
      textColor: 'text-purple-400',
      bgColor: 'from-purple-500/20 to-pink-500/20',
      requiredPlan: 'enterprise',
      features: [
        '8K品質対応',
        'カスタムテンプレート',
        '最高速生成',
        '完全カスタマイズ',
        'ブランド統合',
        'API連携'
      ],
      capabilities: {
        quality: 5,
        speed: 5,
        creativity: 5,
        customization: 5
      }
    },
    {
      id: 'premium-model',
      name: 'プレミアムモデル',
      description: '最新AI技術を搭載した次世代モデル',
      shortDesc: '8K品質・最高速生成',
      icon: Sparkles,
      color: 'from-pink-500 to-rose-600',
      borderColor: 'border-pink-500',
      textColor: 'text-pink-400',
      bgColor: 'from-pink-500/20 to-rose-500/20',
      requiredPlan: 'enterprise',
      features: [
        '8K+ 品質',
        'AI創造性最大化',
        '瞬間生成',
        '無制限カスタマイズ',
        '感情分析連携',
        'リアルタイム最適化'
      ],
      capabilities: {
        quality: 5,
        speed: 5,
        creativity: 5,
        customization: 5
      },
      isNew: true
    }
  ];

  const getAvailableModels = () => {
    switch (currentPlan) {
      case 'enterprise':
        return models; // すべてのモデル
      case 'pro':
        return models.filter(m => ['basic-model', 'pro-model'].includes(m.id));
      default:
        return models.filter(m => m.id === 'basic-model');
    }
  };

  const availableModels = getAvailableModels();
  const lockedModels = models.filter(m => !availableModels.includes(m));

  const handleModelSelect = (modelId: string) => {
    const model = models.find(m => m.id === modelId);
    if (model && availableModels.includes(model)) {
      onModelSelect(modelId);
    }
  };

  const renderCapabilityBar = (value: number, max: number = 5) => {
    return (
      <div className="flex space-x-1">
        {Array.from({ length: max }, (_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i < value ? 'bg-cyan-400' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30">
              <Brain className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">AIモデルを選択</h2>
              <p className="text-gray-400">用途に応じて最適なAIモデルを選択してください</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Current Selection */}
          <div className="bg-gray-800/50 rounded-xl p-4 mb-6 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {(() => {
                  const currentModel = models.find(m => m.id === selectedModel);
                  const ModelIcon = currentModel?.icon || Star;
                  return (
                    <>
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${currentModel?.bgColor || 'from-gray-500/20 to-gray-400/20'} border ${currentModel?.borderColor || 'border-gray-500/30'}`}>
                        <ModelIcon className={`h-5 w-5 ${currentModel?.textColor || 'text-gray-400'}`} />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">
                          現在選択中: {currentModel?.name || 'ベーシックモデル'}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {currentModel?.shortDesc || 'HD品質・標準生成'}
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm">
                  {currentPlan === 'enterprise' ? 'エンタープライズ' :
                   currentPlan === 'pro' ? 'プロ' : 'ベーシック'}プラン
                </p>
              </div>
            </div>
          </div>

          {/* Model List - ChatGPT Style */}
          <div className="space-y-3">
            {availableModels.map((model) => {
              const ModelIcon = model.icon;
              const isSelected = selectedModel === model.id;

              return (
                <button
                  key={model.id}
                  onClick={() => handleModelSelect(model.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 hover:scale-[1.01] ${
                    isSelected
                      ? `${model.borderColor} bg-gradient-to-r ${model.bgColor}`
                      : 'border-gray-600 hover:border-gray-500 bg-gray-800/30 hover:bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2.5 rounded-lg bg-gradient-to-br ${model.bgColor} border ${model.borderColor}`}>
                        <ModelIcon className={`h-5 w-5 ${model.textColor}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className={`font-semibold ${model.textColor}`}>
                            {model.name}
                          </h3>
                          {model.isNew && (
                            <span className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                              NEW
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm mt-1">{model.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-gray-500">品質:</span>
                            {renderCapabilityBar(model.capabilities.quality)}
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-gray-500">速度:</span>
                            {renderCapabilityBar(model.capabilities.speed)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {isSelected && (
                        <div className="flex items-center space-x-2 text-cyan-400">
                          <Check className="h-4 w-4" />
                          <span className="text-sm font-medium">選択中</span>
                        </div>
                      )}
                      <ArrowRight className={`h-4 w-4 ${isSelected ? 'text-cyan-400' : 'text-gray-500'}`} />
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Locked Models */}
            {lockedModels.length > 0 && (
              <>
                <div className="pt-4 border-t border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-400 mb-3 flex items-center">
                    <Lock className="h-4 w-4 mr-2" />
                    プランアップグレードで利用可能
                  </h3>
                </div>
                {lockedModels.map((model) => {
                  const ModelIcon = model.icon;

                  return (
                    <div
                      key={model.id}
                      className="w-full p-4 rounded-xl border-2 border-gray-700 bg-gray-800/20 opacity-60"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-2.5 rounded-lg bg-gray-700/50 border border-gray-600">
                            <ModelIcon className="h-5 w-5 text-gray-500" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-gray-500">
                                {model.name}
                              </h3>
                              {model.isNew && (
                                <span className="bg-gray-600 text-gray-400 px-2 py-0.5 rounded-full text-xs font-semibold">
                                  NEW
                                </span>
                              )}
                            </div>
                            <p className="text-gray-500 text-sm mt-1">{model.description}</p>
                            <p className="text-gray-500 text-xs mt-2">
                              {model.requiredPlan === 'pro' ? 'プロプラン' : 'エンタープライズプラン'}で利用可能
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Lock className="h-4 w-4 text-gray-500" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-700">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-700 text-gray-300 rounded-xl hover:bg-gray-600 transition-colors"
            >
              キャンセル
            </button>
            <div className="flex space-x-4">
              {currentPlan !== 'enterprise' && (
                <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200">
                  プランをアップグレード
                </button>
              )}
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200"
              >
                選択を確定
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}