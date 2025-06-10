import React, { useState } from 'react';
import { X, Share2, Copy, Check, Mail, MessageCircle, Facebook, Twitter, Linkedin, Download, QrCode, Link, Users, Globe } from 'lucide-react';

interface ShareModalProps {
  video: any;
  onClose: () => void;
}

export default function ShareModal({ video, onClose }: ShareModalProps) {
  const [activeTab, setActiveTab] = useState('social');
  const [copied, setCopied] = useState(false);
  const [emailForm, setEmailForm] = useState({
    to: '',
    subject: '',
    message: ''
  });
  const [showQR, setShowQR] = useState(false);

  // 共有用のURL（実際のプロジェクトでは動的に生成）
  const shareUrl = `https://adpon.app/video/${video.id}`;
  const embedCode = `<iframe src="${shareUrl}/embed" width="560" height="315" frameborder="0" allowfullscreen></iframe>`;

  const socialPlatforms = [
    {
      id: 'twitter',
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-blue-500 hover:bg-blue-600',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${video.title} - AI生成広告動画をチェック！`)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700 hover:bg-blue-800',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    },
    {
      id: 'line',
      name: 'LINE',
      icon: MessageCircle,
      color: 'bg-green-500 hover:bg-green-600',
      url: `https://line.me/R/msg/text/?${encodeURIComponent(`${video.title} ${shareUrl}`)}`
    }
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleCopyEmbed = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy embed code:', err);
    }
  };

  const handleSocialShare = (platform: any) => {
    window.open(platform.url, '_blank', 'width=600,height=400');
  };

  const handleEmailShare = () => {
    const subject = emailForm.subject || `${video.title} - AI生成広告動画`;
    const body = emailForm.message || `こんにちは！\n\nAIで生成した広告動画をシェアします。\n\n${video.title}\n${shareUrl}\n\nぜひご覧ください！`;
    const mailtoUrl = `mailto:${emailForm.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const handleDownloadVideo = () => {
    // 実際のプロジェクトでは動画ファイルのダウンロード処理
    console.log('Downloading video for sharing...');
    const link = document.createElement('a');
    link.href = video.thumbnail; // 実際は動画ファイルのURL
    link.download = `${video.title}.mp4`;
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30">
              <Share2 className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">動画を共有</h2>
              <p className="text-gray-400">{video.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-700">
          <div className="flex">
            <button
              onClick={() => setActiveTab('social')}
              className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'social'
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <Share2 className="h-4 w-4" />
              <span>SNS共有</span>
            </button>
            <button
              onClick={() => setActiveTab('link')}
              className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'link'
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <Link className="h-4 w-4" />
              <span>リンク</span>
            </button>
            <button
              onClick={() => setActiveTab('email')}
              className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'email'
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <Mail className="h-4 w-4" />
              <span>メール</span>
            </button>
            <button
              onClick={() => setActiveTab('embed')}
              className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'embed'
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <Globe className="h-4 w-4" />
              <span>埋め込み</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Video Preview */}
          <div className="bg-gray-800/50 rounded-xl p-4 mb-6 border border-gray-700/50">
            <div className="flex items-center space-x-4">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-white font-semibold">{video.title}</h3>
                <p className="text-gray-400 text-sm">{video.concept}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                  <span>{video.duration}</span>
                  <span>{video.aspectRatio}</span>
                  <span>{video.createdAt}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SNS Share Tab */}
          {activeTab === 'social' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-4">SNSで共有</h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialPlatforms.map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => handleSocialShare(platform)}
                      className={`flex items-center space-x-3 p-4 rounded-xl text-white transition-all duration-200 transform hover:scale-105 ${platform.color}`}
                    >
                      <platform.icon className="h-6 w-6" />
                      <span className="font-medium">{platform.name}で共有</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <h4 className="text-white font-semibold mb-4">その他のオプション</h4>
                <div className="space-y-3">
                  <button
                    onClick={handleDownloadVideo}
                    className="w-full flex items-center space-x-3 p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors"
                  >
                    <Download className="h-5 w-5 text-green-400" />
                    <span className="text-white">動画をダウンロードして共有</span>
                  </button>
                  <button
                    onClick={() => setShowQR(!showQR)}
                    className="w-full flex items-center space-x-3 p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors"
                  >
                    <QrCode className="h-5 w-5 text-purple-400" />
                    <span className="text-white">QRコードで共有</span>
                  </button>
                </div>

                {showQR && (
                  <div className="mt-4 p-4 bg-white rounded-xl text-center">
                    <div className="w-32 h-32 bg-gray-200 mx-auto mb-2 flex items-center justify-center">
                      <QrCode className="h-16 w-16 text-gray-600" />
                    </div>
                    <p className="text-gray-600 text-sm">QRコードをスキャンして動画を表示</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Link Share Tab */}
          {activeTab === 'link' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-4">リンクを共有</h3>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                  <label className="block text-sm text-gray-400 mb-2">共有URL</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={shareUrl}
                      readOnly
                      className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                    />
                    <button
                      onClick={handleCopyLink}
                      className={`px-4 py-2 rounded font-medium transition-all duration-200 ${
                        copied
                          ? 'bg-green-600 text-white'
                          : 'bg-cyan-600 text-white hover:bg-cyan-700'
                      }`}
                    >
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {copied && (
                    <p className="text-green-400 text-sm mt-2">リンクをコピーしました！</p>
                  )}
                </div>
              </div>

              <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30">
                <h4 className="text-white font-semibold mb-2">共有設定</h4>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-gray-300 text-sm">パスワード保護</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-300 text-sm">有効期限を設定</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-gray-300 text-sm">ダウンロードを許可</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Email Share Tab */}
          {activeTab === 'email' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white mb-4">メールで共有</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">宛先</label>
                  <input
                    type="email"
                    value={emailForm.to}
                    onChange={(e) => setEmailForm(prev => ({ ...prev, to: e.target.value }))}
                    placeholder="example@email.com"
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">件名</label>
                  <input
                    type="text"
                    value={emailForm.subject}
                    onChange={(e) => setEmailForm(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder={`${video.title} - AI生成広告動画`}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">メッセージ</label>
                  <textarea
                    value={emailForm.message}
                    onChange={(e) => setEmailForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder={`こんにちは！\n\nAIで生成した広告動画をシェアします。\n\n${video.title}\n${shareUrl}\n\nぜひご覧ください！`}
                    rows={6}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded text-white text-sm resize-none"
                  />
                </div>
                <button
                  onClick={handleEmailShare}
                  disabled={!emailForm.to}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 disabled:opacity-50 disabled:hover:shadow-none flex items-center justify-center space-x-2"
                >
                  <Mail className="h-5 w-5" />
                  <span>メールを送信</span>
                </button>
              </div>
            </div>
          )}

          {/* Embed Tab */}
          {activeTab === 'embed' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white mb-4">埋め込みコード</h3>
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                <label className="block text-sm text-gray-400 mb-2">HTMLコード</label>
                <div className="relative">
                  <textarea
                    value={embedCode}
                    readOnly
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm font-mono resize-none"
                  />
                  <button
                    onClick={handleCopyEmbed}
                    className={`absolute top-2 right-2 px-3 py-1 rounded text-xs font-medium transition-all duration-200 ${
                      copied
                        ? 'bg-green-600 text-white'
                        : 'bg-cyan-600 text-white hover:bg-cyan-700'
                    }`}
                  >
                    {copied ? 'コピー済み' : 'コピー'}
                  </button>
                </div>
              </div>

              <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30">
                <h4 className="text-white font-semibold mb-3">埋め込み設定</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">幅</label>
                      <input
                        type="number"
                        defaultValue="560"
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">高さ</label>
                      <input
                        type="number"
                        defaultValue="315"
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-gray-300 text-sm">自動再生</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-gray-300 text-sm">コントロール表示</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded" />
                      <span className="text-gray-300 text-sm">ループ再生</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                <h4 className="text-white font-semibold mb-2">プレビュー</h4>
                <div className="bg-black rounded-lg p-4">
                  <div className="aspect-video bg-gray-800 rounded flex items-center justify-center">
                    <img
                      src={video.thumbnail}
                      alt="Embed Preview"
                      className="max-w-full max-h-full object-contain rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}