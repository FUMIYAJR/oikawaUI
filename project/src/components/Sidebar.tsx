import React, { useState } from 'react';
import { Play, Search, Filter, Calendar, Clock, Download, Share2, Edit3, Trash2, Eye, Home, CreditCard, History, Settings, Crown, Star, Gem } from 'lucide-react';
import ShareModal from './ShareModal';

interface SidebarProps {
  videoHistory: any[];
  currentView: string;
  onViewChange: (view: string) => void;
  onEditVideo: (video: any) => void;
  onLogoClick?: () => void;
  currentPlan: string;
}

export default function Sidebar({ videoHistory, currentView, onViewChange, onEditVideo, onLogoClick, currentPlan }: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterConcept, setFilterConcept] = useState('all');
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const concepts = ['all', 'エモーショナル・ストーリー', 'プロダクト・フォーカス', 'ライフスタイル・アプローチ'];

  const filteredVideos = videoHistory
    .filter(video => 
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterConcept === 'all' || video.concept === filterConcept)
    );

  const getPlanIcon = () => {
    switch (currentPlan) {
      case 'pro':
        return Crown;
      case 'enterprise':
        return Gem;
      default:
        return Star;
    }
  };

  const menuItems = [
    { id: 'generate', label: '動画生成', icon: Home },
    { id: 'plans', label: 'プラン・支払い', icon: CreditCard },
    { id: 'settings', label: '設定', icon: Settings }
  ];

  const handleVideoAction = (action: string, video: any) => {
    if (action === 'edit') {
      onEditVideo(video);
    } else if (action === 'share') {
      setSelectedVideo(video);
      setShowShareModal(true);
    } else if (action === 'download') {
      // ダウンロード処理
      console.log(`Downloading video ${video.id}`);
      const link = document.createElement('a');
      link.href = video.thumbnail; // 実際は動画ファイルのURL
      link.download = `${video.title}.mp4`;
      link.click();
    } else {
      console.log(`${action} video ${video.id}`);
    }
  };

  const PlanIcon = getPlanIcon();

  return (
    <div className="w-80 bg-gray-900/95 backdrop-blur-lg border-r border-gray-700/50 flex flex-col">
      {/* Navigation */}
      <div className="p-6 border-b border-gray-700/50">
        {/* Plan Status */}
        <div className="mb-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700/30">
          <div className="flex items-center space-x-3 mb-2">
            <PlanIcon className={`h-5 w-5 ${
              currentPlan === 'enterprise' ? 'text-purple-400' :
              currentPlan === 'pro' ? 'text-cyan-400' : 'text-gray-400'
            }`} />
            <span className={`font-semibold ${
              currentPlan === 'enterprise' ? 'text-purple-400' :
              currentPlan === 'pro' ? 'text-cyan-400' : 'text-gray-400'
            }`}>
              {currentPlan === 'enterprise' ? 'エンタープライズ' :
               currentPlan === 'pro' ? 'プロプラン' : 'ベーシックプラン'}
            </span>
          </div>
          <div className="text-sm text-gray-400">
            残り動画生成数: {
              currentPlan === 'enterprise' ? '無制限' :
              currentPlan === 'pro' ? '47本' : '3本'
            }
          </div>
          {currentPlan === 'basic' && (
            <button
              onClick={() => onViewChange('plans')}
              className="mt-2 w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200"
            >
              プランをアップグレード
            </button>
          )}
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                currentView === item.id
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Video History */}
      <div className="flex-1 flex flex-col">
        <div className="p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-2 mb-4">
            <History className="h-5 w-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">動画履歴</h3>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="動画を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Filter */}
          <select
            value={filterConcept}
            onChange={(e) => setFilterConcept(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
          >
            <option value="all">すべての広告タイプ</option>
            {concepts.slice(1).map(concept => (
              <option key={concept} value={concept}>{concept}</option>
            ))}
          </select>
        </div>

        {/* Video List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {filteredVideos.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Play className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-gray-400 text-sm">動画が見つかりません</p>
              </div>
            ) : (
              filteredVideos.map((video) => (
                <div key={video.id} className="group bg-gray-800/30 rounded-xl overflow-hidden border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300">
                  <div className="relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                    
                    {/* Duration Badge */}
                    <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{video.duration}</span>
                    </div>
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        onClick={() => handleVideoAction('play', video)}
                        className="bg-white/90 text-gray-900 p-2 rounded-full hover:bg-white transition-colors"
                      >
                        <Play className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-3">
                    <h4 className="font-semibold text-white text-sm mb-1 line-clamp-2">
                      {video.title}
                    </h4>
                    <p className="text-xs text-gray-400 mb-2">{video.concept}</p>
                    <div className="flex items-center text-xs text-gray-500 mb-3">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{video.createdAt}</span>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-1">
                        <button 
                          onClick={() => handleVideoAction('preview', video)}
                          className="p-1.5 text-gray-400 hover:text-cyan-400 transition-colors"
                          title="プレビュー"
                        >
                          <Eye className="h-3 w-3" />
                        </button>
                        <button 
                          onClick={() => handleVideoAction('edit', video)}
                          className="p-1.5 text-gray-400 hover:text-purple-400 transition-colors"
                          title="編集"
                        >
                          <Edit3 className="h-3 w-3" />
                        </button>
                      </div>
                      
                      <div className="flex space-x-1">
                        <button 
                          onClick={() => handleVideoAction('download', video)}
                          className="p-1.5 text-gray-400 hover:text-green-400 transition-colors"
                          title="ダウンロード"
                        >
                          <Download className="h-3 w-3" />
                        </button>
                        <button 
                          onClick={() => handleVideoAction('share', video)}
                          className="p-1.5 text-gray-400 hover:text-blue-400 transition-colors"
                          title="共有"
                        >
                          <Share2 className="h-3 w-3" />
                        </button>
                        <button 
                          onClick={() => handleVideoAction('delete', video)}
                          className="p-1.5 text-gray-400 hover:text-red-400 transition-colors"
                          title="削除"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && selectedVideo && (
        <ShareModal
          video={selectedVideo}
          onClose={() => {
            setShowShareModal(false);
            setSelectedVideo(null);
          }}
        />
      )}
    </div>
  );
}