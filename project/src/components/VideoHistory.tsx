import React, { useState } from 'react';
import { Play, Download, Share2, Edit3, Clock, Calendar, Filter, Search, Trash2, Eye } from 'lucide-react';

interface Video {
  id: number;
  title: string;
  concept: string;
  thumbnail: string;
  duration: string;
  aspectRatio: string;
  createdAt: string;
  status: string;
}

interface VideoHistoryProps {
  videos: Video[];
}

export default function VideoHistory({ videos }: VideoHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterConcept, setFilterConcept] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const concepts = ['all', 'エモーショナル・ストーリー', 'プロダクト・フォーカス', 'ライフスタイル・アプローチ'];

  const filteredVideos = videos
    .filter(video => 
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterConcept === 'all' || video.concept === filterConcept)
    )
    .sort((a, b) => {
      if (sortBy === 'newest') return b.id - a.id;
      if (sortBy === 'oldest') return a.id - b.id;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

  const handleVideoAction = (action: string, videoId: number) => {
    console.log(`${action} video ${videoId}`);
  };

  return (
    <section id="history" className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          動画履歴
        </h2>
        <p className="text-xl text-gray-400">
          これまでに作成した広告動画の一覧
        </p>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-8">
        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="動画を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div className="flex gap-4">
            <select
              value={filterConcept}
              onChange={(e) => setFilterConcept(e.target.value)}
              className="px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="all">すべての広告タイプ</option>
              {concepts.slice(1).map(concept => (
                <option key={concept} value={concept}>{concept}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="newest">新しい順</option>
              <option value="oldest">古い順</option>
              <option value="title">タイトル順</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-600/30">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <Play className="h-5 w-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">総動画数</p>
                <p className="text-white text-xl font-bold">{videos.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-600/30">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Clock className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">今月の作成数</p>
                <p className="text-white text-xl font-bold">{videos.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-600/30">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Download className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">ダウンロード数</p>
                <p className="text-white text-xl font-bold">{videos.length * 2}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-600/30">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-pink-500/20 rounded-lg">
                <Share2 className="h-5 w-5 text-pink-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">共有数</p>
                <p className="text-white text-xl font-bold">{Math.floor(videos.length * 1.5)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        {filteredVideos.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">動画が見つかりません</h3>
            <p className="text-gray-500">検索条件を変更するか、新しい動画を作成してください</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div key={video.id} className="group bg-gray-900/30 rounded-xl overflow-hidden border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300">
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                  
                  {/* Duration Badge */}
                  <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{video.duration}</span>
                  </div>
                  
                  {/* Aspect Ratio Badge */}
                  <div className="absolute top-3 left-3 bg-cyan-500/80 text-white px-2 py-1 rounded text-xs font-medium">
                    {video.aspectRatio}
                  </div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={() => handleVideoAction('play', video.id)}
                      className="bg-white/90 text-gray-900 p-3 rounded-full hover:bg-white transition-colors"
                    >
                      <Play className="h-6 w-6" />
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors mb-1">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-2">{video.concept}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{video.createdAt}</span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleVideoAction('preview', video.id)}
                        className="flex items-center space-x-1 text-xs text-gray-400 hover:text-cyan-400 transition-colors"
                      >
                        <Eye className="h-3 w-3" />
                        <span>プレビュー</span>
                      </button>
                      <button 
                        onClick={() => handleVideoAction('edit', video.id)}
                        className="flex items-center space-x-1 text-xs text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        <Edit3 className="h-3 w-3" />
                        <span>編集</span>
                      </button>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleVideoAction('download', video.id)}
                        className="flex items-center space-x-1 text-xs text-gray-400 hover:text-green-400 transition-colors"
                      >
                        <Download className="h-3 w-3" />
                        <span>DL</span>
                      </button>
                      <button 
                        onClick={() => handleVideoAction('share', video.id)}
                        className="flex items-center space-x-1 text-xs text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Share2 className="h-3 w-3" />
                        <span>共有</span>
                      </button>
                      <button 
                        onClick={() => handleVideoAction('delete', video.id)}
                        className="flex items-center space-x-1 text-xs text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-3 w-3" />
                        <span>削除</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}