import React, { useState } from 'react';
import { Download, Edit3, Share2, Play, Pause, Volume2, VolumeX, RotateCcw, ArrowLeft, FileDown, Palette } from 'lucide-react';

interface VideoResultStepProps {
  onBack: () => void;
  onStartOver: () => void;
  selectedConcept: any;
}

export default function VideoResultStep({ onBack, onStartOver, selectedConcept }: VideoResultStepProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

  const downloadFormats = [
    { format: 'MP4 (HD)', size: '1920x1080', fileSize: '~15MB', recommended: true },
    { format: 'MP4 (Full HD)', size: '1920x1080', fileSize: '~25MB', recommended: false },
    { format: 'MOV (高品質)', size: '1920x1080', fileSize: '~35MB', recommended: false },
    { format: 'WebM (Web用)', size: '1920x1080', fileSize: '~12MB', recommended: false }
  ];

  const editOptions = [
    { id: 'text', label: 'テキスト・字幕を編集', icon: Edit3, description: 'タイトルや説明文を変更' },
    { id: 'music', label: 'BGMを変更', icon: Volume2, description: '音楽やナレーションを調整' },
    { id: 'colors', label: '色調・フィルターを調整', icon: Palette, description: 'カラーグレーディングを変更' },
    { id: 'timing', label: 'タイミング・速度を調整', icon: Edit3, description: 'シーンの長さや切り替えを変更' }
  ];

  const handleDownload = (format: any) => {
    // ダウンロード処理のシミュレーション
    console.log(`Downloading in ${format.format}`);
    setShowDownloadOptions(false);
  };

  const handleEdit = (editType: string) => {
    // 編集機能のシミュレーション
    console.log(`Opening editor for: ${editType}`);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Player */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 overflow-hidden">
            <div className="relative aspect-video bg-black">
              <img
                src={selectedConcept?.thumbnail || 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800'}
                alt="Generated Video"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              
              {/* Play/Pause Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-black/50 backdrop-blur-sm text-white p-4 rounded-full hover:bg-black/70 transition-colors"
                >
                  {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                </button>
              </div>

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="hover:text-cyan-400 transition-colors"
                    >
                      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </button>
                    <span className="text-sm">0:00 / 0:30</span>
                  </div>
                  <div className="text-sm text-gray-300">
                    {selectedConcept?.title || '生成された広告動画'}
                  </div>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-1 mt-2">
                  <div className="bg-cyan-500 h-1 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6">
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setShowDownloadOptions(!showDownloadOptions)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200"
                >
                  <Download className="h-5 w-5" />
                  <span>ダウンロード</span>
                </button>
                <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200">
                  <Edit3 className="h-5 w-5" />
                  <span>編集する</span>
                </button>
                <button className="flex items-center space-x-2 bg-gray-700 text-gray-300 px-6 py-3 rounded-xl hover:bg-gray-600 transition-colors">
                  <Share2 className="h-5 w-5" />
                  <span>共有</span>
                </button>
              </div>

              {/* Download Options */}
              {showDownloadOptions && (
                <div className="mt-6 bg-gray-900/50 rounded-xl p-4 border border-gray-600/30">
                  <h4 className="text-white font-semibold mb-4">ダウンロード形式を選択</h4>
                  <div className="space-y-3">
                    {downloadFormats.map((format, index) => (
                      <div
                        key={index}
                        onClick={() => handleDownload(format)}
                        className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <FileDown className="h-5 w-5 text-cyan-400" />
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-white font-medium">{format.format}</span>
                              {format.recommended && (
                                <span className="bg-cyan-500 text-white text-xs px-2 py-1 rounded">推奨</span>
                              )}
                            </div>
                            <span className="text-gray-400 text-sm">{format.size} • {format.fileSize}</span>
                          </div>
                        </div>
                        <Download className="h-4 w-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Video Info */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-6">
            <h3 className="text-xl font-bold text-white mb-4">動画情報</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">広告タイプ:</span>
                <span className="text-white">{selectedConcept?.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">長さ:</span>
                <span className="text-white">30秒</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">アスペクト比:</span>
                <span className="text-white">16:9</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">品質:</span>
                <span className="text-white">HD (1920x1080)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">生成日時:</span>
                <span className="text-white">今日</span>
              </div>
            </div>
          </div>

          {/* Edit Options */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-6">
            <h3 className="text-xl font-bold text-white mb-4">編集オプション</h3>
            <div className="space-y-3">
              {editOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleEdit(option.id)}
                  className="w-full flex items-start space-x-3 p-3 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition-colors text-left"
                >
                  <option.icon className="h-5 w-5 text-cyan-400 mt-0.5" />
                  <div>
                    <div className="text-white font-medium">{option.label}</div>
                    <div className="text-gray-400 text-sm">{option.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-6">
            <div className="space-y-3">
              <button
                onClick={onStartOver}
                className="w-full flex items-center justify-center space-x-2 bg-gray-700 text-gray-300 py-3 rounded-xl hover:bg-gray-600 transition-colors"
              >
                <RotateCcw className="h-5 w-5" />
                <span>新しい動画を作成</span>
              </button>
              <button
                onClick={onBack}
                className="w-full flex items-center justify-center space-x-2 text-gray-400 hover:text-white transition-colors py-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>広告案選択に戻る</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}