import React, { useState } from 'react';
import { Zap, MessageSquare, Settings, Sparkles } from 'lucide-react';

interface GenerateStepProps {
  onNext: (data: any) => void;
}

export default function GenerateStep({ onNext }: GenerateStepProps) {
  const [message, setMessage] = useState('');
  const [duration, setDuration] = useState('30');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [targetAudience, setTargetAudience] = useState('');

  const handleGenerate = () => {
    if (message.trim()) {
      onNext({ message, duration, aspectRatio, targetAudience });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30">
            <Sparkles className="h-6 w-6 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">広告動画を生成</h2>
            <p className="text-gray-400">伝えたいメッセージと設定を入力してください</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-3">
              <MessageSquare className="h-4 w-4" />
              <span>伝えたいメッセージ・内容</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="例：新しいスマートフォンアプリの魅力を20代の女性に伝えたい。使いやすさと便利さを強調し、日常生活がより豊かになることをアピールしたい。"
              rows={5}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 resize-none"
            />
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-3">
              <MessageSquare className="h-4 w-4" />
              <span>ターゲット層（任意）</span>
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="例：20代〜30代の働く女性、ITに興味のある男性など"
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-3">
                <Settings className="h-4 w-4" />
                <span>動画の長さ</span>
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="15">15秒</option>
                <option value="30">30秒</option>
                <option value="60">1分</option>
                <option value="90">1分30秒</option>
              </select>
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-3">
                <Settings className="h-4 w-4" />
                <span>アスペクト比</span>
              </label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="16:9">16:9 (YouTube・横型)</option>
                <option value="9:16">9:16 (TikTok・Instagram縦型)</option>
                <option value="1:1">1:1 (Instagram正方形)</option>
                <option value="4:5">4:5 (Instagramフィード)</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!message.trim()}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none disabled:hover:shadow-none flex items-center justify-center space-x-2"
          >
            <Zap className="h-5 w-5" />
            <span>広告案を生成する</span>
          </button>
        </div>
      </div>
    </div>
  );
}