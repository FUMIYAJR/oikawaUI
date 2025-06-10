import React from 'react';
import { Play, Download, Share2, Eye, Clock } from 'lucide-react';

export default function VideoGallery() {
  const videos = [
    {
      id: 1,
      title: 'Product Launch Campaign',
      thumbnail: 'https://images.pexels.com/photos/3772618/pexels-photo-3772618.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '0:30',
      created: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Brand Story Video',
      thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '1:15',
      created: '1 day ago',
      status: 'completed'
    },
    {
      id: 3,
      title: 'Social Media Promo',
      thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '0:15',
      created: '3 days ago',
      status: 'completed'
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50">
      <div className="p-6 border-b border-gray-200/50">
        <h3 className="text-xl font-bold text-gray-900">Recent Videos</h3>
        <p className="text-gray-600 mt-1">Your AI-generated video collection</p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="group cursor-pointer">
              <div className="relative rounded-xl overflow-hidden mb-3">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{video.duration}</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white/90 text-gray-900 p-3 rounded-full hover:bg-white transition-colors">
                    <Play className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                  {video.title}
                </h4>
                <p className="text-sm text-gray-500">{video.created}</p>
                
                <div className="flex items-center space-x-2 pt-2">
                  <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-purple-600 transition-colors">
                    <Eye className="h-4 w-4" />
                    <span>Preview</span>
                  </button>
                  <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                  <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-green-600 transition-colors">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}