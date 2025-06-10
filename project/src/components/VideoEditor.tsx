import React, { useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, RotateCcw, Download, Save, Type, Music, Palette, Scissors, Layers, Sliders, Undo, Redo, Eye, EyeOff, Plus, Check } from 'lucide-react';

interface VideoEditorProps {
  video: any;
  onClose: () => void;
}

export default function VideoEditor({ video, onClose }: VideoEditorProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeTab, setActiveTab] = useState('text');
  const [showPreview, setShowPreview] = useState(true);
  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);
  const [showSaveOptions, setShowSaveOptions] = useState(false);

  const editorTabs = [
    { id: 'text', label: 'テキスト', icon: Type },
    { id: 'music', label: '音楽', icon: Music },
    { id: 'colors', label: '色調', icon: Palette },
    { id: 'timing', label: 'タイミング', icon: Scissors },
    { id: 'effects', label: 'エフェクト', icon: Layers }
  ];

  const textElements = [
    { id: 1, text: 'あなたの生活を変える', time: 2, duration: 3, x: 50, y: 20 },
    { id: 2, text: '新しいアプリ', time: 5, duration: 4, x: 50, y: 50 },
    { id: 3, text: '今すぐダウンロード', time: 25, duration: 5, x: 50, y: 80 }
  ];

  const musicTracks = [
    { id: 1, name: 'Upbeat Corporate', duration: '2:30', volume: 80, active: true },
    { id: 2, name: 'Inspiring Piano', duration: '3:15', volume: 0, active: false },
    { id: 3, name: 'Modern Electronic', duration: '2:45', volume: 0, active: false }
  ];

  const colorFilters = [
    { id: 1, name: 'オリジナル', preview: 'bg-gray-400' },
    { id: 2, name: 'ウォーム', preview: 'bg-orange-400' },
    { id: 3, name: 'クール', preview: 'bg-blue-400' },
    { id: 4, name: 'ビビッド', preview: 'bg-pink-400' },
    { id: 5, name: 'モノクロ', preview: 'bg-gray-600' },
    { id: 6, name: 'セピア', preview: 'bg-yellow-600' }
  ];

  const handleSave = () => {
    console.log('Saving video edits...');
    setShowSaveOptions(true);
  };

  const handleExport = () => {
    console.log('Exporting video...');
    setShowDownloadSuccess(true);
    setTimeout(() => {
      setShowDownloadSuccess(false);
    }, 3000);
  };

  const handleCreateNewVideo = () => {
    onClose(); // 編集ページを閉じて動画生成ページに戻る
  };

  const handleContinueEditing = () => {
    setShowSaveOptions(false);
  };

  // 保存オプション選択モーダル
  if (showSaveOptions) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="bg-gray-900 rounded-2xl border border-gray-700 p-12 max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">保存完了！</h2>
          <p className="text-gray-400 mb-8">
            編集内容が保存されました。次に何をしますか？
          </p>
          <div className="space-y-4">
            <button
              onClick={handleCreateNewVideo}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>新しい広告を作成</span>
            </button>
            <button
              onClick={handleContinueEditing}
              className="w-full bg-gray-700 text-gray-300 py-3 px-6 rounded-xl hover:bg-gray-600 transition-colors"
            >
              編集を続ける
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ダウンロード成功モーダル
  if (showDownloadSuccess) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="bg-gray-900 rounded-2xl border border-gray-700 p-12 max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Download className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">ダウンロード完了！</h2>
          <p className="text-gray-400 mb-8">
            動画のダウンロードが完了しました。編集した動画をご確認ください。
          </p>
          <div className="space-y-4">
            <button
              onClick={handleCreateNewVideo}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>新しい広告を作成</span>
            </button>
            <button
              onClick={() => setShowDownloadSuccess(false)}
              className="w-full bg-gray-700 text-gray-300 py-3 px-6 rounded-xl hover:bg-gray-600 transition-colors"
            >
              編集を続ける
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700 p-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-4">
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold text-white">{video.title} - 編集</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={handleCreateNewVideo}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200"
          >
            <Plus className="h-4 w-4" />
            <span>新しい広告を作成</span>
          </button>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
          >
            {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span>{showPreview ? 'プレビュー非表示' : 'プレビュー表示'}</span>
          </button>
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
          >
            <Save className="h-4 w-4" />
            <span>保存</span>
          </button>
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/25 transition-all duration-200"
          >
            <Download className="h-4 w-4" />
            <span>エクスポート</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Video Preview */}
        {showPreview && (
          <div className="flex-1 bg-black flex flex-col overflow-hidden">
            <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
              <div className="relative max-w-4xl w-full">
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt="Video Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                  
                  {/* Text Overlays */}
                  {textElements.map((element) => (
                    <div
                      key={element.id}
                      className="absolute text-white font-bold text-2xl text-center cursor-move"
                      style={{
                        left: `${element.x}%`,
                        top: `${element.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      {element.text}
                    </div>
                  ))}
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="bg-black/50 backdrop-blur-sm text-white p-4 rounded-full hover:bg-black/70 transition-colors"
                    >
                      {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                    </button>
                  </div>
                </div>
                
                {/* Video Controls */}
                <div className="bg-gray-900 rounded-b-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                      </button>
                      <span className="text-white text-sm">0:00 / 0:30</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <Undo className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <Redo className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <RotateCcw className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Timeline */}
                  <div className="relative">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(currentTime / 30) * 100}%` }}
                      ></div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="30"
                      value={currentTime}
                      onChange={(e) => setCurrentTime(Number(e.target.value))}
                      className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Editor Panel */}
        <div className="w-96 bg-gray-900 border-l border-gray-700 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-700 flex-shrink-0">
            <div className="flex overflow-x-auto">
              {editorTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-cyan-500 text-cyan-400'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content - スクロール可能 */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {activeTab === 'text' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white">テキスト編集</h3>
                  
                  <button className="w-full bg-cyan-600 text-white py-2 px-4 rounded-lg hover:bg-cyan-700 transition-colors">
                    + テキストを追加
                  </button>
                  
                  <div className="space-y-4">
                    {textElements.map((element) => (
                      <div key={element.id} className="bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-white font-medium">テキスト {element.id}</span>
                          <button className="text-red-400 hover:text-red-300">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm text-gray-400 mb-1">内容</label>
                            <input
                              type="text"
                              value={element.text}
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-sm text-gray-400 mb-1">開始時間</label>
                              <input
                                type="number"
                                value={element.time}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-400 mb-1">表示時間</label>
                              <input
                                type="number"
                                value={element.duration}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm text-gray-400 mb-2">フォントサイズ</label>
                            <input
                              type="range"
                              min="12"
                              max="48"
                              className="w-full"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'music' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white">音楽・音声</h3>
                  
                  <div className="space-y-4">
                    {musicTracks.map((track) => (
                      <div key={track.id} className="bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="text-white font-medium">{track.name}</h4>
                            <p className="text-gray-400 text-sm">{track.duration}</p>
                          </div>
                          <button
                            className={`px-3 py-1 rounded text-sm ${
                              track.active
                                ? 'bg-cyan-600 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                          >
                            {track.active ? '使用中' : '選択'}
                          </button>
                        </div>
                        
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">音量: {track.volume}%</label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={track.volume}
                            className="w-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full bg-gray-700 text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors">
                    + 音楽をアップロード
                  </button>
                </div>
              )}

              {activeTab === 'colors' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white">色調・フィルター</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {colorFilters.map((filter) => (
                      <button
                        key={filter.id}
                        className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors"
                      >
                        <div className={`w-full h-16 ${filter.preview} rounded mb-2`}></div>
                        <span className="text-white text-sm">{filter.name}</span>
                      </button>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">明度</label>
                      <input type="range" min="0" max="200" defaultValue="100" className="w-full" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">コントラスト</label>
                      <input type="range" min="0" max="200" defaultValue="100" className="w-full" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">彩度</label>
                      <input type="range" min="0" max="200" defaultValue="100" className="w-full" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'timing' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white">タイミング調整</h3>
                  
                  <div className="bg-gray-800 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">シーン分割</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">イントロ</span>
                        <span className="text-white text-sm">0:00 - 0:05</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">メイン</span>
                        <span className="text-white text-sm">0:05 - 0:25</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">CTA</span>
                        <span className="text-white text-sm">0:25 - 0:30</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">再生速度</label>
                      <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm">
                        <option>0.5x</option>
                        <option>0.75x</option>
                        <option>1.0x</option>
                        <option>1.25x</option>
                        <option>1.5x</option>
                        <option>2.0x</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">トランジション</label>
                      <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm">
                        <option>フェード</option>
                        <option>スライド</option>
                        <option>ズーム</option>
                        <option>カット</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'effects' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white">エフェクト</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white">パーティクル</span>
                        <input type="checkbox" className="rounded" />
                      </div>
                      <p className="text-gray-400 text-sm">キラキラエフェクトを追加</p>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white">モーションブラー</span>
                        <input type="checkbox" className="rounded" />
                      </div>
                      <p className="text-gray-400 text-sm">動きにブラー効果を追加</p>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white">グロー</span>
                        <input type="checkbox" className="rounded" />
                      </div>
                      <p className="text-gray-400 text-sm">テキストに光る効果を追加</p>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white">シャドウ</span>
                        <input type="checkbox" className="rounded" defaultChecked />
                      </div>
                      <p className="text-gray-400 text-sm">要素に影を追加</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}