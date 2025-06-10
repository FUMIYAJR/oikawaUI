import React, { useState } from 'react';
import { User, Bell, Shield, CreditCard, Download, Trash2, Eye, EyeOff, Save, Check, Crown, Star, Gem, Mail, Phone, MapPin, Building, Calendar, Globe } from 'lucide-react';

interface SettingsPageProps {
  currentPlan: string;
  onPlanChange: (plan: string) => void;
}

export default function SettingsPage({ currentPlan, onPlanChange }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '田中 太郎',
    email: 'tanaka@example.com',
    phone: '090-1234-5678',
    company: '株式会社サンプル',
    address: '東京都渋谷区...',
    website: 'https://example.com'
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: true,
    updates: true
  });
  const [privacy, setPrivacy] = useState({
    profilePublic: false,
    analyticsTracking: true,
    dataSharing: false
  });

  const tabs = [
    { id: 'profile', label: 'プロフィール', icon: User },
    { id: 'notifications', label: '通知設定', icon: Bell },
    { id: 'privacy', label: 'プライバシー', icon: Shield },
    { id: 'billing', label: '請求・プラン', icon: CreditCard },
    { id: 'data', label: 'データ管理', icon: Download }
  ];

  const getPlanInfo = () => {
    switch (currentPlan) {
      case 'pro':
        return { 
          name: 'プロプラン', 
          icon: Crown, 
          color: 'text-cyan-400',
          price: '¥2,980/月',
          nextBilling: '2024年2月15日',
          features: ['月50本まで動画生成', '4K品質対応', 'プレミアムテンプレート']
        };
      case 'enterprise':
        return { 
          name: 'エンタープライズプラン', 
          icon: Gem, 
          color: 'text-purple-400',
          price: '¥9,800/月',
          nextBilling: '2024年2月15日',
          features: ['無制限動画生成', '8K品質対応', 'カスタムテンプレート']
        };
      default:
        return { 
          name: 'ベーシックプラン', 
          icon: Star, 
          color: 'text-gray-400',
          price: '無料',
          nextBilling: null,
          features: ['月5本まで動画生成', 'HD品質', '基本テンプレート']
        };
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleInputChange = (section: string, field: string, value: any) => {
    if (section === 'profile') {
      setProfileData(prev => ({ ...prev, [field]: value }));
    } else if (section === 'notifications') {
      setNotifications(prev => ({ ...prev, [field]: value }));
    } else if (section === 'privacy') {
      setPrivacy(prev => ({ ...prev, [field]: value }));
    }
  };

  const planInfo = getPlanInfo();
  const PlanIcon = planInfo.icon;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">設定</h1>
        <p className="text-xl text-gray-400">アカウント設定とプリファレンスを管理</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-6">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                    activeTab === tab.id
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-8">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">プロフィール設定</h2>
                  <button
                    onClick={handleSave}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      saved
                        ? 'bg-green-600 text-white'
                        : 'bg-cyan-600 text-white hover:bg-cyan-700'
                    }`}
                  >
                    {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                    <span>{saved ? '保存済み' : '保存'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <User className="h-4 w-4 inline mr-2" />
                      氏名
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => handleInputChange('profile', 'name', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Mail className="h-4 w-4 inline mr-2" />
                      メールアドレス
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Phone className="h-4 w-4 inline mr-2" />
                      電話番号
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Building className="h-4 w-4 inline mr-2" />
                      会社名
                    </label>
                    <input
                      type="text"
                      value={profileData.company}
                      onChange={(e) => handleInputChange('profile', 'company', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <MapPin className="h-4 w-4 inline mr-2" />
                      住所
                    </label>
                    <input
                      type="text"
                      value={profileData.address}
                      onChange={(e) => handleInputChange('profile', 'address', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Globe className="h-4 w-4 inline mr-2" />
                      ウェブサイト
                    </label>
                    <input
                      type="url"
                      value={profileData.website}
                      onChange={(e) => handleInputChange('profile', 'website', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <h3 className="text-lg font-semibold text-white mb-4">パスワード変更</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">現在のパスワード</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">新しいパスワード</label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">通知設定</h2>
                
                <div className="space-y-6">
                  <div className="bg-gray-900/30 rounded-xl p-6 border border-gray-700/30">
                    <h3 className="text-lg font-semibold text-white mb-4">メール通知</h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between">
                        <div>
                          <span className="text-white font-medium">動画生成完了通知</span>
                          <p className="text-gray-400 text-sm">動画の生成が完了したときに通知</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.email}
                          onChange={(e) => handleInputChange('notifications', 'email', e.target.checked)}
                          className="rounded"
                        />
                      </label>
                      <label className="flex items-center justify-between">
                        <div>
                          <span className="text-white font-medium">マーケティング情報</span>
                          <p className="text-gray-400 text-sm">新機能やキャンペーン情報</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.marketing}
                          onChange={(e) => handleInputChange('notifications', 'marketing', e.target.checked)}
                          className="rounded"
                        />
                      </label>
                      <label className="flex items-center justify-between">
                        <div>
                          <span className="text-white font-medium">アップデート通知</span>
                          <p className="text-gray-400 text-sm">システムアップデートやメンテナンス情報</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.updates}
                          onChange={(e) => handleInputChange('notifications', 'updates', e.target.checked)}
                          className="rounded"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="bg-gray-900/30 rounded-xl p-6 border border-gray-700/30">
                    <h3 className="text-lg font-semibold text-white mb-4">プッシュ通知</h3>
                    <label className="flex items-center justify-between">
                      <div>
                        <span className="text-white font-medium">ブラウザ通知を有効にする</span>
                        <p className="text-gray-400 text-sm">ブラウザでのプッシュ通知を受け取る</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.push}
                        onChange={(e) => handleInputChange('notifications', 'push', e.target.checked)}
                        className="rounded"
                      />
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200"
                >
                  設定を保存
                </button>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">プライバシー設定</h2>
                
                <div className="space-y-6">
                  <div className="bg-gray-900/30 rounded-xl p-6 border border-gray-700/30">
                    <h3 className="text-lg font-semibold text-white mb-4">プロフィール公開設定</h3>
                    <label className="flex items-center justify-between">
                      <div>
                        <span className="text-white font-medium">プロフィールを公開する</span>
                        <p className="text-gray-400 text-sm">他のユーザーがあなたのプロフィールを閲覧できます</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={privacy.profilePublic}
                        onChange={(e) => handleInputChange('privacy', 'profilePublic', e.target.checked)}
                        className="rounded"
                      />
                    </label>
                  </div>

                  <div className="bg-gray-900/30 rounded-xl p-6 border border-gray-700/30">
                    <h3 className="text-lg font-semibold text-white mb-4">データ利用設定</h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between">
                        <div>
                          <span className="text-white font-medium">利用状況の分析を許可</span>
                          <p className="text-gray-400 text-sm">サービス改善のための匿名データ収集</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={privacy.analyticsTracking}
                          onChange={(e) => handleInputChange('privacy', 'analyticsTracking', e.target.checked)}
                          className="rounded"
                        />
                      </label>
                      <label className="flex items-center justify-between">
                        <div>
                          <span className="text-white font-medium">第三者とのデータ共有</span>
                          <p className="text-gray-400 text-sm">パートナー企業との匿名データ共有</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={privacy.dataSharing}
                          onChange={(e) => handleInputChange('privacy', 'dataSharing', e.target.checked)}
                          className="rounded"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200"
                >
                  設定を保存
                </button>
              </div>
            )}

            {/* Billing Tab */}
            {activeTab === 'billing' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">請求・プラン管理</h2>
                
                {/* Current Plan */}
                <div className="bg-gray-900/30 rounded-xl p-6 border border-gray-700/30">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <PlanIcon className={`h-6 w-6 ${planInfo.color}`} />
                      <div>
                        <h3 className="text-lg font-semibold text-white">{planInfo.name}</h3>
                        <p className="text-gray-400">{planInfo.price}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('plans')}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200"
                    >
                      プラン変更
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">プラン特典</h4>
                      <ul className="space-y-1 text-sm text-gray-400">
                        {planInfo.features.map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                    {planInfo.nextBilling && (
                      <div>
                        <h4 className="text-white font-medium mb-2">次回請求日</h4>
                        <p className="text-gray-400 text-sm flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {planInfo.nextBilling}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Billing History */}
                <div className="bg-gray-900/30 rounded-xl p-6 border border-gray-700/30">
                  <h3 className="text-lg font-semibold text-white mb-4">請求履歴</h3>
                  <div className="space-y-3">
                    {currentPlan !== 'basic' && (
                      <>
                        <div className="flex items-center justify-between py-3 border-b border-gray-700">
                          <div>
                            <p className="text-white font-medium">2024年1月 - {planInfo.name}</p>
                            <p className="text-gray-400 text-sm">2024年1月15日</p>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-medium">{planInfo.price}</p>
                            <button className="text-cyan-400 text-sm hover:text-cyan-300">
                              領収書をダウンロード
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-gray-700">
                          <div>
                            <p className="text-white font-medium">2023年12月 - {planInfo.name}</p>
                            <p className="text-gray-400 text-sm">2023年12月15日</p>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-medium">{planInfo.price}</p>
                            <button className="text-cyan-400 text-sm hover:text-cyan-300">
                              領収書をダウンロード
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                    {currentPlan === 'basic' && (
                      <p className="text-gray-400 text-center py-8">
                        無料プランのため請求履歴はありません
                      </p>
                    )}
                  </div>
                </div>

                {/* Payment Method */}
                {currentPlan !== 'basic' && (
                  <div className="bg-gray-900/30 rounded-xl p-6 border border-gray-700/30">
                    <h3 className="text-lg font-semibold text-white mb-4">支払い方法</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-6 w-6 text-gray-400" />
                        <div>
                          <p className="text-white font-medium">**** **** **** 1234</p>
                          <p className="text-gray-400 text-sm">有効期限: 12/26</p>
                        </div>
                      </div>
                      <button className="text-cyan-400 hover:text-cyan-300">
                        変更
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Data Management Tab */}
            {activeTab === 'data' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">データ管理</h2>
                
                <div className="space-y-6">
                  <div className="bg-gray-900/30 rounded-xl p-6 border border-gray-700/30">
                    <h3 className="text-lg font-semibold text-white mb-4">データエクスポート</h3>
                    <p className="text-gray-400 mb-4">
                      あなたのアカウントデータをダウンロードできます。動画ファイル、プロフィール情報、設定が含まれます。
                    </p>
                    <button className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200">
                      <Download className="h-5 w-5" />
                      <span>データをエクスポート</span>
                    </button>
                  </div>

                  <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
                    <h3 className="text-lg font-semibold text-red-400 mb-4">アカウント削除</h3>
                    <p className="text-gray-400 mb-4">
                      アカウントを削除すると、すべてのデータが永久に失われます。この操作は取り消すことができません。
                    </p>
                    <button className="flex items-center space-x-2 bg-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-red-700 transition-colors">
                      <Trash2 className="h-5 w-5" />
                      <span>アカウントを削除</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}