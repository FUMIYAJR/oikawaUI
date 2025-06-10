import React from 'react';
import { Play, Zap, Code, ArrowRight, Star, Users, TrendingUp, Award, Brain, Target, Lightbulb, Clock, Shield, Globe } from 'lucide-react';

interface TopPageProps {
  onGetStarted: () => void;
  onViewPlans: () => void;
}

export default function TopPage({ onGetStarted, onViewPlans }: TopPageProps) {
  const features = [
    {
      icon: Brain,
      title: '最先端AI技術',
      description: '独自開発のAIエンジンが、あなたのメッセージを魅力的な映像に変換します。'
    },
    {
      icon: Clock,
      title: '高速生成',
      description: '従来数日かかっていた動画制作を、わずか数分で完了できます。'
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
      icon: Shield,
      title: '高品質保証',
      description: '業界標準を上回る高品質な動画を、短時間で安定して生成します。'
    },
    {
      icon: Globe,
      title: 'マルチプラットフォーム',
      description: 'YouTube、Instagram、TikTokなど、各プラットフォームに最適化された動画を生成。'
    }
  ];

  const stats = [
    { value: '10,000+', label: '生成動画数', icon: Play },
    { value: '99%', label: '時間短縮', icon: Clock },
    { value: '4.9/5', label: 'ユーザー評価', icon: Star },
    { value: '500+', label: '企業導入', icon: Users }
  ];

  const testimonials = [
    {
      name: '田中 太郎',
      company: 'スタートアップ CEO',
      content: 'adponのおかげで、限られた予算でも高品質な広告動画を作成できるようになりました。売上が30%向上しました。',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      name: '佐藤 花子',
      company: 'マーケティング部長',
      content: '従来の制作プロセスと比べて、圧倒的に早く、しかも品質の高い動画が作れます。チーム全体の生産性が向上しました。',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      name: '山田 次郎',
      company: 'フリーランス',
      content: 'クライアントへの提案スピードが格段に上がりました。adponは私のビジネスに欠かせないツールです。',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gray-900/95 backdrop-blur-lg border-b border-cyan-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <Code className="h-5 w-5 text-white" />
                </div>
                <Zap className="h-3 w-3 text-cyan-400 absolute -top-1 -right-1" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                adpon
              </h1>
            </div>
            <nav className="flex items-center space-x-6">
              <button className="text-gray-400 hover:text-cyan-400 transition-colors">
                機能
              </button>
              <button 
                onClick={onViewPlans}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                料金
              </button>
              <button className="text-gray-400 hover:text-cyan-400 transition-colors">
                事例
              </button>
              <button 
                onClick={onGetStarted}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200"
              >
                無料で始める
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              AI で広告動画を
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                瞬時に生成
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              あなたのメッセージを入力するだけで、プロ品質の広告動画を数分で作成。
              従来の制作時間を99%短縮し、コストを大幅に削減します。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={onGetStarted}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
              >
                <Play className="h-6 w-6" />
                <span>無料で動画を作成</span>
              </button>
              <button className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                <span>デモを見る</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Hero Video Preview */}
          <div className="mt-16 relative">
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-8 max-w-4xl mx-auto">
              <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Demo Video"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button className="bg-white/20 backdrop-blur-sm text-white p-6 rounded-full hover:bg-white/30 transition-colors">
                    <Play className="h-12 w-12" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                  デモ動画: AIが生成した広告動画
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30">
                    <stat.icon className="h-8 w-8 text-cyan-400" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              なぜadponが選ばれるのか
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              最先端のAI技術と直感的なインターフェースで、誰でも簡単にプロ品質の広告動画を作成できます
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-8 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30">
                    <feature.icon className="h-8 w-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                </div>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              3ステップで完成
            </h2>
            <p className="text-xl text-gray-400">
              シンプルなプロセスで、誰でも簡単に広告動画を作成
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">メッセージ入力</h3>
              <p className="text-gray-400">
                伝えたい内容とターゲット層を入力。AIが最適な動画スタイルを提案します。
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">スタイル選択</h3>
              <p className="text-gray-400">
                AIが生成した3つの広告案から、お気に入りのスタイルを選択します。
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">動画完成</h3>
              <p className="text-gray-400">
                数分でプロ品質の動画が完成。ダウンロードや編集も可能です。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              お客様の声
            </h2>
            <p className="text-xl text-gray-400">
              adponを使って成果を上げているお客様の声をご紹介
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            今すぐ始めましょう
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            無料プランで今すぐadponを体験。クレジットカード不要で始められます。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onGetStarted}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 transform hover:scale-105"
            >
              無料で始める
            </button>
            <button 
              onClick={onViewPlans}
              className="bg-gray-800 text-gray-300 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-700 transition-colors"
            >
              プランを見る
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <Code className="h-5 w-5 text-white" />
                  </div>
                  <Zap className="h-3 w-3 text-cyan-400 absolute -top-1 -right-1" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  adpon
                </h3>
              </div>
              <p className="text-gray-400 text-sm">
                AI技術で広告制作を革新する次世代プラットフォーム
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">プロダクト</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">機能</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">料金</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">API</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">統合</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">サポート</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">ヘルプセンター</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">お問い合わせ</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">チュートリアル</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">コミュニティ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">会社</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">会社概要</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">採用情報</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">プライバシー</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">利用規約</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700/50 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 adpon. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}