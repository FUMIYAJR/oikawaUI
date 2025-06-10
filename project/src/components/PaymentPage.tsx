import React, { useState } from 'react';
import { CreditCard, Lock, Check, ArrowLeft, Shield, Globe, Clock } from 'lucide-react';

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    email: '',
    billingAddress: '',
    company: '',
    taxId: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // 支払い処理のシミュレーション
    setTimeout(() => {
      setIsProcessing(false);
      alert('支払いが完了しました！');
    }, 2000);
  };

  const securityFeatures = [
    {
      icon: Shield,
      title: 'SSL暗号化',
      description: '256bit SSL暗号化により、お客様の情報を完全に保護'
    },
    {
      icon: Lock,
      title: 'PCI DSS準拠',
      description: '国際的なセキュリティ基準に完全準拠'
    },
    {
      icon: Globe,
      title: '世界基準',
      description: 'Stripe社の決済システムを採用し、世界レベルのセキュリティを実現'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span>プラン選択に戻る</span>
        </button>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          お支払い情報
        </h1>
        <p className="text-xl text-gray-400">
          安全で簡単な決済プロセス
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-8">
            {/* Payment Method Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-6">支払い方法を選択</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    paymentMethod === 'card'
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <CreditCard className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
                  <div className="text-white text-sm font-medium">クレジットカード</div>
                  <div className="text-gray-400 text-xs">即座に利用開始</div>
                </button>
                <button
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    paymentMethod === 'bank'
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <div className="w-6 h-6 bg-gray-400 rounded mx-auto mb-2"></div>
                  <div className="text-white text-sm font-medium">銀行振込</div>
                  <div className="text-gray-400 text-xs">1-2営業日で開始</div>
                </button>
                <button
                  onClick={() => setPaymentMethod('invoice')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    paymentMethod === 'invoice'
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <div className="w-6 h-6 bg-gray-400 rounded mx-auto mb-2"></div>
                  <div className="text-white text-sm font-medium">請求書払い</div>
                  <div className="text-gray-400 text-xs">法人向け</div>
                </button>
              </div>
            </div>

            {/* Payment Form */}
            {paymentMethod === 'card' && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      カード番号
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      有効期限
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      カード名義
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      placeholder="TARO YAMADA"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <h4 className="text-white font-semibold mb-4">請求先情報</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        メールアドレス
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="example@email.com"
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        会社名（任意）
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="株式会社サンプル"
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        請求先住所
                      </label>
                      <input
                        type="text"
                        name="billingAddress"
                        value={formData.billingAddress}
                        onChange={handleInputChange}
                        placeholder="東京都渋谷区..."
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none disabled:hover:shadow-none flex items-center justify-center space-x-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>処理中...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-5 w-5" />
                      <span>安全に支払いを完了</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {paymentMethod === 'bank' && (
              <div className="bg-gray-900/30 rounded-xl p-6 border border-gray-700/50">
                <h4 className="text-white font-semibold mb-4">銀行振込情報</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">銀行名:</span>
                    <span className="text-white">三菱UFJ銀行</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">支店名:</span>
                    <span className="text-white">渋谷支店</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">口座種別:</span>
                    <span className="text-white">普通</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">口座番号:</span>
                    <span className="text-white">1234567</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">口座名義:</span>
                    <span className="text-white">カブシキガイシャアドポン</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-yellow-400 text-sm">
                    <Clock className="h-4 w-4 inline mr-2" />
                    振込確認後、1-2営業日でサービスが有効化されます。
                  </p>
                </div>
              </div>
            )}

            {paymentMethod === 'invoice' && (
              <div className="bg-gray-900/30 rounded-xl p-6 border border-gray-700/50">
                <h4 className="text-white font-semibold mb-4">請求書払いについて</h4>
                <div className="space-y-4">
                  <p className="text-gray-400 text-sm">
                    法人のお客様向けの請求書払いです。月末締め翌月末払いとなります。
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300">月末締め翌月末払い</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300">PDF請求書の発行</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300">銀行振込対応</span>
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200">
                    請求書払いを申し込む
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary & Security */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-6">
            <h3 className="text-xl font-bold text-white mb-6">注文内容</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">プロプラン</span>
                <span className="text-white">¥2,980</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">消費税</span>
                <span className="text-white">¥298</span>
              </div>
              <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-between">
                  <span className="text-white font-semibold">合計</span>
                  <span className="text-white font-bold text-xl">¥3,278</span>
                </div>
                <p className="text-gray-400 text-sm mt-1">/月（税込）</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
              <h4 className="text-cyan-400 font-semibold mb-2">プロプランに含まれる内容</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• 月50本まで動画生成</li>
                <li>• 4K品質対応</li>
                <li>• プレミアムテンプレート</li>
                <li>• 優先サポート</li>
                <li>• 商用利用可能</li>
              </ul>
            </div>
          </div>

          {/* Security Features */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-6">
            <h3 className="text-xl font-bold text-white mb-6">セキュリティ</h3>
            <div className="space-y-4">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <feature.icon className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{feature.title}</h4>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Support */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-6">
            <h3 className="text-xl font-bold text-white mb-4">サポート</h3>
            <p className="text-gray-400 text-sm mb-4">
              ご不明な点がございましたら、お気軽にお問い合わせください。
            </p>
            <button className="w-full bg-gray-700 text-gray-300 py-3 rounded-xl hover:bg-gray-600 transition-colors">
              サポートに連絡
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}