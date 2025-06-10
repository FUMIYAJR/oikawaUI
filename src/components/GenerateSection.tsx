import React, { useState } from 'react';
import { Zap, MessageSquare, Settings, Sparkles, Play, Check, Download, Edit3, Share2, Volume2, VolumeX, Pause, ArrowLeft, FileDown, Palette, RotateCcw, Brain, Target, Lightbulb, Users, TrendingUp, Award, Plus, Upload, Image, Video, X, File, Lock, Crown, Star, Gem, Edit2, Save } from 'lucide-react';
import ShareModal from './ShareModal';

interface GenerateSectionProps {
  onVideoGenerated: (video: any) => void;
  onEditVideo: (video: any) => void;
  currentPlan: string;
  selectedModel: string;
}

export default function GenerateSection({ onVideoGenerated, onEditVideo, currentPlan, selectedModel }: GenerateSectionProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [generationData, setGenerationData] = useState<any>(null);
  const [selectedConcept, setSelectedConcept] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<any>(null);
  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isEditingScript, setIsEditingScript] = useState(false);
  const [editedScript, setEditedScript] = useState('');

  // Step 1: Generate form data
  const [message, setMessage] = useState('');
  const [duration, setDuration] = useState('30');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [targetAudience, setTargetAudience] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Step 2: Concept selection
  const [selectedConceptId, setSelectedConceptId] = useState<number | null>(null);

  const getModelInfo = () => {
    switch (selectedModel) {
      case 'pro-model':
        return { name: 'プロモデル', icon: Crown, color: 'text-cyan-400' };
      case 'enterprise-model':
        return { name: 'エンタープライズモデル', icon: Gem, color: 'text-purple-400' };
      case 'premium-model':
        return { name: 'プレミアムモデル', icon: Sparkles, color: 'text-pink-400' };
      default:
        return { name: 'ベーシックモデル', icon: Star, color: 'text-gray-400' };
    }
  };

  const canGenerate = () => {
    if (currentPlan === 'basic') {
      // 無課金ユーザーは月5本まで（ここでは簡単に3本残りとする）
      return true; // 実際はAPI呼び出しで残り回数をチェック
    }
    return true;
  };

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

  // Company introduction content for generation waiting time
  const companyFeatures = [
    {
      icon: Brain,
      title: '最先端AI技術',
      description: '独自開発のAIエンジンが、あなたのメッセージを魅力的な映像に変換します。'
    },
    {
      icon: Target,
      title: 'ターゲット最適化',
      description: 'ターゲット層に合わせた最適な広告スタイルを自動で選択・調整します。'
    },
    {
      icon: Lightbulb,
      title: '創造性の向上',
      description: 'プロのクリエイターのノウハウを学習したAIが、創造的なアイデアを提案します。'
    },
    {
      icon: Users,
      title: 'チーム連携',
      description: 'チームでの共同作業や承認フローに対応した協働機能を提供します。'
    },
    {
      icon: TrendingUp,
      title: '効果測定',
      description: '生成した動画の効果を分析し、より良い広告作成をサポートします。'
    },
    {
      icon: Award,
      title: '品質保証',
      description: '業界標準を上回る高品質な動画を、短時間で安定して生成します。'
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      const isValidSize = file.size <= 100 * 1024 * 1024; // 100MB制限
      return (isImage || isVideo) && isValidSize;
    });
    
    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return Image;
    if (file.type.startsWith('video/')) return Video;
    return File;
  };

  const handleGenerate = () => {
    if (!canGenerate()) {
      alert('動画生成回数の上限に達しました。プランをアップグレードしてください。');
      return;
    }

    if (message.trim()) {
      setGenerationData({ 
        message, 
        duration, 
        aspectRatio, 
        targetAudience,
        uploadedFiles: uploadedFiles.map(file => ({
          name: file.name,
          type: file.type,
          size: file.size,
          url: URL.createObjectURL(file)
        }))
      });
      setCurrentStep(1);
    }
  };

  const handleEditScript = () => {
    setEditedScript(generationData?.message || '');
    setIsEditingScript(true);
  };

  const handleSaveScript = () => {
    setGenerationData(prev => ({
      ...prev,
      message: editedScript
    }));
    setIsEditingScript(false);
  };

  const handleCancelEditScript = () => {
    setEditedScript('');
    setIsEditingScript(false);
  };

  const handleConceptSelect = () => {
    if (selectedConceptId !== null) {
      setIsGenerating(true);
      setTimeout(() => {
        const concept = concepts.find(c => c.id === selectedConceptId);
        setSelectedConcept(concept);
        setIsGenerating(false);
        setCurrentStep(2);
        
        // 生成された動画オブジェクトを作成
        const newVideo = {
          id: Date.now(),
          title: generationData.message.substring(0, 20) + '...',
          concept: concept?.title,
          thumbnail: concept?.thumbnail,
          duration: generationData.duration + '秒',
          aspectRatio: generationData.aspectRatio,
          createdAt: new Date().toLocaleDateString('ja-JP'),
          status: 'completed',
          // 編集用の追加データ
          originalMessage: generationData.message,
          targetAudience: generationData.targetAudience,
          conceptData: concept,
          uploadedFiles: generationData.uploadedFiles || [],
          model: selectedModel
        };
        
        setGeneratedVideo(newVideo);
        
        // 履歴に追加
        onVideoGenerated(newVideo);
      }, 5000); // 5秒に延長して会社紹介を表示
    }
  };

  const handleStartOver = () => {
    setCurrentStep(0);
    setGenerationData(null);
    setSelectedConcept(null);
    setSelectedConceptId(null);
    setGeneratedVideo(null);
    setMessage('');
    setTargetAudience('');
    setUploadedFiles([]);
    setIsGenerating(false);
    setShowDownloadOptions(false);
    setShowDownloadSuccess(false);
    setIsEditingScript(false);
    setEditedScript('');
  };

  const handleDownload = (format: any) => {
    console.log(`Downloading in ${format.format}`);
    setShowDownloadOptions(false);
    setShowDownloadSuccess(true);
    setTimeout(() => {
      setShowDownloadSuccess(false);
    }, 3000);
  };

  const handleEdit = () => {
    if (generatedVideo) {
      onEditVideo(generatedVideo);
    }
  };

  const handleShare = () => {
    if (generatedVideo) {
      setShowShareModal(true);
    }
  };

  const modelInfo = getModelInfo();
  const ModelIcon = modelInfo.icon;

  // ダウンロード成功モーダル
  if (showDownloadSuccess) {
    return (
      <div className="max-w-6xl mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-12 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Download className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">ダウンロード完了！</h2>
          <p className="text-gray-400 mb-8">
            動画のダウンロードが完了しました。ダウンロードした動画をご確認ください。
          </p>
          <div className="space-y-4">
            <button
              onClick={handleStartOver}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>新しい広告を作成</span>
            </button>
            <button
              onClick={() => setShowDownloadSuccess(false)}
              className="w-full bg-gray-700 text-gray-300 py-3 px-6 rounded-xl hover:bg-gray-600 transition-colors"
            >
              動画画面に戻る
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          AI広告動画ジェネレーター
        </h1>
        <p className="text-xl text-gray-400 mb-4">
          あなたのメッセージを魅力的な広告動画に変換
        </p>
        
        {/* Current Model Display */}
        <div className="flex items-center justify-center space-x-2 text-sm">
          <ModelIcon className={`h-4 w-4 ${modelInfo.color}`} />
          <span className="text-gray-400">使用中:</span>
          <span className={`font-medium ${modelInfo.color}`}>
            {modelInfo.name}
          </span>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center space-x-8 mb-12">
        {['メッセージ入力', '広告案選択', '動画完成'].map((step, index) => (
          <div key={index} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                index < currentStep 
                  ? 'bg-cyan-500 border-cyan-500 text-white' 
                  : index === currentStep
                  ? 'bg-gray-800 border-cyan-500 text-cyan-400'
                  : 'bg-gray-800 border-gray-600 text-gray-500'
              }`}>
                {index < currentStep ? (
                  <Check className="h-6 w-6" />
                ) : (
                  <span className="text-sm font-semibold">{index + 1}</span>
                )}
              </div>
              <span className={`mt-2 text-sm font-medium ${
                index <= currentStep ? 'text-cyan-400' : 'text-gray-500'
              }`}>
                {step}
              </span>
            </div>
            {index < 2 && (
              <div className={`w-16 h-0.5 mx-4 ${
                index < currentStep ? 'bg-cyan-500' : 'bg-gray-600'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Generate Form */}
      {currentStep === 0 && (
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

          {/* Plan Limitation Warning */}
          {currentPlan === 'basic' && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-yellow-400" />
                <span className="text-yellow-400 font-medium">ベーシックプラン制限</span>
              </div>
              <p className="text-yellow-300 text-sm mt-1">
                月5本まで動画生成が可能です。残り3本の生成が可能です。
              </p>
            </div>
          )}

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

            {/* File Upload Section */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-3">
                <Upload className="h-4 w-4" />
                <span>画像・動画素材をアップロード（任意）</span>
              </label>
              <div className="border-2 border-dashed border-gray-600 rounded-xl p-6 hover:border-cyan-500 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center space-y-3"
                >
                  <div className="p-3 bg-gray-700 rounded-full">
                    <Upload className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-white font-medium">ファイルをドラッグ&ドロップ</p>
                    <p className="text-gray-400 text-sm">または クリックして選択</p>
                    <p className="text-gray-500 text-xs mt-2">
                      対応形式: JPG, PNG, GIF, MP4, MOV, AVI (最大100MB)
                    </p>
                  </div>
                </label>
              </div>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-3">
                  <h4 className="text-white font-medium">アップロード済みファイル:</h4>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => {
                      const FileIcon = getFileIcon(file);
                      return (
                        <div key={index} className="flex items-center justify-between bg-gray-900/50 rounded-lg p-3 border border-gray-600">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gray-700 rounded-lg">
                              <FileIcon className="h-4 w-4 text-cyan-400" />
                            </div>
                            <div>
                              <p className="text-white text-sm font-medium">{file.name}</p>
                              <p className="text-gray-400 text-xs">
                                {file.type.split('/')[0]} • {formatFileSize(file.size)}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile(index)}
                            className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
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
              disabled={!message.trim() || !canGenerate()}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none disabled:hover:shadow-none flex items-center justify-center space-x-2"
            >
              <Zap className="h-5 w-5" />
              <span>広告案を生成する</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Concept Selection */}
      {currentStep === 1 && !isGenerating && (
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

          {/* 入力内容の確認と編集 */}
          <div className="bg-gray-900/30 rounded-xl p-4 mb-8 border border-gray-600/30">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-semibold">入力内容</h3>
              <button
                onClick={handleEditScript}
                className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
              >
                <Edit2 className="h-4 w-4" />
                <span>台本を編集</span>
              </button>
            </div>
            
            {isEditingScript ? (
              <div className="space-y-4">
                <textarea
                  value={editedScript}
                  onChange={(e) => setEditedScript(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm resize-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
                <div className="flex space-x-3">
                  <button
                    onClick={handleSaveScript}
                    className="flex items-center space-x-1 bg-cyan-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-cyan-700 transition-colors"
                  >
                    <Save className="h-3 w-3" />
                    <span>保存</span>
                  </button>
                  <button
                    onClick={handleCancelEditScript}
                    className="flex items-center space-x-1 bg-gray-600 text-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-700 transition-colors"
                  >
                    <X className="h-3 w-3" />
                    <span>キャンセル</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-gray-300 text-sm mb-2">{generationData?.message}</p>
                <div className="flex flex-wrap gap-4 text-xs text-gray-400 mb-2">
                  <span>長さ: {generationData?.duration}秒</span>
                  <span>比率: {generationData?.aspectRatio}</span>
                  {generationData?.targetAudience && <span>ターゲット: {generationData.targetAudience}</span>}
                  {generationData?.uploadedFiles?.length > 0 && (
                    <span>アップロード素材: {generationData.uploadedFiles.length}件</span>
                  )}
                  <span>モデル: {modelInfo.name}</span>
                </div>
                {generationData?.uploadedFiles?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {generationData.uploadedFiles.map((file: any, index: number) => (
                      <div key={index} className="bg-gray-700 rounded px-2 py-1 text-xs text-gray-300">
                        {file.name}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {concepts.map((concept) => (
              <div
                key={concept.id}
                onClick={() => setSelectedConceptId(concept.id)}
                className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  selectedConceptId === concept.id
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
                  
                  {selectedConceptId === concept.id && (
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
              onClick={() => setCurrentStep(0)}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-700 text-gray-300 rounded-xl hover:bg-gray-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>戻る</span>
            </button>
            <button
              onClick={handleConceptSelect}
              disabled={selectedConceptId === null}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-8 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none disabled:hover:shadow-none flex items-center space-x-2"
            >
              <Sparkles className="h-5 w-5" />
              <span>この案で動画を生成</span>
            </button>
          </div>
        </div>
      )}

      {/* Generating State with Company Introduction */}
      {isGenerating && (
        <div className="space-y-8">
          {/* Generation Progress */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-12 text-center">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
                <Sparkles className="h-8 w-8 text-cyan-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">広告動画を生成中...</h2>
                <p className="text-gray-400">AIがあなたの広告動画を作成しています</p>
                <p className="text-cyan-400 text-sm mt-2">使用モデル: {modelInfo.name}</p>
              </div>
              <div className="w-full max-w-md bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
              </div>
              <p className="text-sm text-gray-500">通常30秒〜1分程度で完了します</p>
            </div>
          </div>

          {/* Company Introduction */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">adponについて</h2>
              <p className="text-xl text-gray-400">
                AI技術で広告制作を革新する次世代プラットフォーム
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companyFeatures.map((feature, index) => (
                <div key={index} className="bg-gray-900/30 rounded-xl p-6 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30">
                      <feature.icon className="h-6 w-6 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl p-6 border border-cyan-500/20">
                <h3 className="text-xl font-bold text-white mb-2">なぜadponを選ぶのか？</h3>
                <p className="text-gray-400 mb-4">
                  従来の動画制作には数日から数週間かかっていましたが、adponなら数分で高品質な広告動画を生成できます。
                  プロのクリエイターが作成したような仕上がりを、誰でも簡単に実現できます。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-cyan-400">99%</div>
                    <div className="text-sm text-gray-400">時間短縮</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-cyan-400">10,000+</div>
                    <div className="text-sm text-gray-400">生成動画数</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-cyan-400">4.9/5</div>
                    <div className="text-sm text-gray-400">ユーザー評価</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Video Result */}
      {currentStep === 2 && (
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
                      <span className="text-sm">0:00 / 0:{generationData?.duration}</span>
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
                  <button 
                    onClick={handleEdit}
                    className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
                  >
                    <Edit3 className="h-5 w-5" />
                    <span>編集する</span>
                  </button>
                  <button 
                    onClick={handleShare}
                    className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-200"
                  >
                    <Share2 className="h-5 w-5" />
                    <span>共有</span>
                  </button>
                </div>

                {/* Download Options */}
                {showDownloadOptions && (
                  <div className="mt-6 bg-gray-900/50 rounded-xl p-4 border border-gray-600/30">
                    <h3 className="text-white font-semibold mb-4">ダウンロード形式を選択</h3>
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
                  <span className="text-white">{generationData?.duration}秒</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">アスペクト比:</span>
                  <span className="text-white">{generationData?.aspectRatio}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">品質:</span>
                  <span className="text-white">
                    {selectedModel === 'enterprise-model' || selectedModel === 'premium-model' ? '8K' :
                     selectedModel === 'pro-model' ? '4K' : 'HD'} 
                    ({selectedModel === 'enterprise-model' || selectedModel === 'premium-model' ? '7680x4320' :
                      selectedModel === 'pro-model' ? '3840x2160' : '1920x1080'})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">使用モデル:</span>
                  <span className={`${modelInfo.color}`}>{modelInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">生成日時:</span>
                  <span className="text-white">今日</span>
                </div>
                {generationData?.uploadedFiles?.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">使用素材:</span>
                    <span className="text-white">{generationData.uploadedFiles.length}件</span>
                  </div>
                )}
              </div>
            </div>

            {/* Edit Options */}
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-4">編集オプション</h3>
              <div className="space-y-3">
                {editOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={handleEdit}
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
                  onClick={handleStartOver}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200"
                >
                  <Plus className="h-5 w-5" />
                  <span>新しい動画を作成</span>
                </button>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="w-full flex items-center justify-center space-x-2 text-gray-400 hover:text-white transition-colors py-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>広告案選択に戻る</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && generatedVideo && (
        <ShareModal
          video={generatedVideo}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
}