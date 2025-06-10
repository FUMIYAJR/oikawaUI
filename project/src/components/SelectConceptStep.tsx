import React, { useState } from 'react';
import { Play, Check, Sparkles, ArrowLeft } from 'lucide-react';

interface SelectConceptStepProps {
  onNext: (selectedConcept: any) => void;
  onBack: () => void;
  generationData: any;
}

export default function SelectConceptStep({ onNext, onBack, generationData }: SelectConceptStepProps) {
  const [selectedConcept, setSelectedConcept] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // AIが生成した3つの広告案
  const concepts = [
    {
      id: 1,
      title: 'エモーショナル・ストーリー',
      description: '感情に訴えかけるストーリー仕立ての広告。日常のシーンから始まり、商品・サービスがもたらす変化を描きます。',
      thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
      style: 'bg-gradient-to-br from-pink-600 to-purple-500',
      features: ['感情的なつながり', 'ストーリー性', '共感を呼ぶ']
    },
    {
      id: 2,
      title: 'プロダクト・フォーカス',
      description: '商品・サービスの機能や特徴を分かりやすく紹介。実際の使用シーンを交えながら具体的なメリットを伝えます。',
      thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400',
      style: 'bg-gradient-to-br from-blue-600 to-cyan-500',
      features: ['機能説明', '使用シーン', '具体的メリット']
    },
    {
      id: 3,
      title: 'ライフスタイル・アプローチ',
      description: 'ターゲット層のライフスタイルに溶け込む自然な広告。憧れの生活や理想の姿を提示し、商品との関連性を示します。',
      thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
      style: 'bg-gradient-to-br from-green-600 to-teal-500',
      features: ['ライフスタイル提案', '憧れの演出', '自然な訴求']
    }
  ];

  const handleGenerate = () => {
    if (selectedConcept !== null) {
      setIsGenerating(true);
      // 動画生成のシミュレーション
      setTimeout(() => {
        onNext(concepts.find(c => c.id === selectedConcept));
      }, 4000);
    }
  };

  if (isGenerating) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-12 text-center">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
              <Sparkles className="h-8 w-8 text-cyan-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">広告動画を生成中...</h3>
              <p className="text-gray-400">AIがあなたの広告動画を作成しています</p>
            </div>
            <div className="w-full max-w-md bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
            </div>
            <p className="text-sm text-gray-500">通常30秒〜1分程度で完了します</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30">
            <Sparkles className="h-6 w-6 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">広告案を選択</h2>
            <p className="text-gray-400">AIが生成した3つの広告案からお選びください</p>
          </div>
        </div>

        {/* 入力内容の確認 */}
        <div className="bg-gray-900/30 rounded-xl p-4 mb-8 border border-gray-600/30">
          <h3 className="text-white font-semibold mb-2">入力内容</h3>
          <p className="text-gray-300 text-sm mb-2">{generationData?.message}</p>
          <div className="flex space-x-4 text-xs text-gray-400">
            <span>長さ: {generationData?.duration}秒</span>
            <span>比率: {generationData?.aspectRatio}</span>
            {generationData?.targetAudience && <span>ターゲット: {generationData.targetAudience}</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {concepts.map((concept) => (
            <div
              key={concept.id}
              onClick={() => setSelectedConcept(concept.id)}
              className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                selectedConcept === concept.id
                  ? 'border-cyan-500 ring-2 ring-cyan-500/30 transform scale-[1.02]'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <div className="relative h-48">
                <img
                  src={concept.thumbnail}
                  alt={concept.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 ${concept.style} opacity-60`}></div>
                <div className="absolute inset-0 bg-black/40"></div>
                
                {selectedConcept === concept.id && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                )}
                
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg mb-1">{concept.title}</h3>
                  <p className="text-gray-200 text-sm mb-2">{concept.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {concept.features.map((feature, index) => (
                      <span key={index} className="bg-white/20 text-white text-xs px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full">
                    <Play className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-700 text-gray-300 rounded-xl hover:bg-gray-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>戻る</span>
          </button>
          <button
            onClick={handleGenerate}
            disabled={selectedConcept === null}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-8 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none disabled:hover:shadow-none flex items-center space-x-2"
          >
            <Sparkles className="h-5 w-5" />
            <span>この案で動画を生成</span>
          </button>
        </div>
      </div>
    </div>
  );
}