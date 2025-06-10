import React, { useState } from 'react';
import { X, CreditCard, Lock, Check, Shield, Globe, Clock } from 'lucide-react';

interface PaymentModalProps {
  plan: any;
  onClose: () => void;
  onPaymentComplete: (plan: any) => void;
}

export default function PaymentModal({ plan, onClose, onPaymentComplete }: PaymentModalProps) {
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
      onPaymentComplete(plan);
    }, 2000);
  };

  if (!plan) return null;

  // 無料プランの場合は即座に完了
  if (plan.id === 'basic') {
    onPaymentComplete(plan);
    return null;
  }

  const securityFeatures = [
    {
      icon: Shield,
      title: 'SSL暗号化',
      description: '256bit SSL暗号化により保護'
    },
    {
      icon: Lock,
      title: 'PCI DSS準拠',
      description: '国際セキュリティ基準準拠'
    },
    {
      icon: Globe,
      title: 'Stripe決済',
      description: '世界レベルのセキュリティ'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-white">お支払い情報</h2>
            <p className="text-gray-400">{plan.name}プランの購入</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            {/* Plan Summary */}
            <div className="bg-gray-800/50 rounded-xl p-4 mb-6 border border-gray-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">{plan.name}プラン</h3>
                  <p className="text-gray-400 text-sm">{plan.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{plan.price}</div>
                  <div className="text-gray-400 text-sm">{plan.period}</div>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-4">支払い方法</h3>
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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    カード番号
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
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
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    カード名義
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    placeholder="TARO YAMADA"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    required
                  />
                </div>

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
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Submit Button */}
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
                      <Check className="h-5 w-5" />
                      <span>{plan.price}で購入する</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {paymentMethod === 'bank' && (
              <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
                <h4 className="text-white font-semibold mb-4">銀行振込情報</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">銀行名:</span>
                    <span className="text-white">三菱UFJ銀行</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">支店名:</span>
                    <span className="text-white">渋谷支店</span>
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
                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-yellow-400 text-sm flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    振込確認後、1-2営業日でサービスが有効化されます。
                  </p>
                </div>
              </div>
            )}

            {paymentMethod === 'invoice' && (
              <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
                <h4 className="text-white font-semibold mb-4">請求書払い</h4>
                <p className="text-gray-400 text-sm mb-4">
                  法人のお客様向けの請求書払いです。月末締め翌月末払いとなります。
                </p>
                <button
                  onClick={() => onPaymentComplete(plan)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
                >
                  請求書払いを申し込む
                </button>
              </div>
            )}
          </div>

          {/* Order Summary & Security */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-6">注文内容</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">{plan.name}プラン</span>
                  <span className="text-white">{plan.price}</span>
                </div>
                {plan.price !== '無料' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-400">消費税</span>
                      <span className="text-white">¥{Math.floor(parseInt(plan.price.replace(/[¥,]/g, '')) * 0.1)}</span>
                    </div>
                    <div className="border-t border-gray-700 pt-4">
                      <div className="flex justify-between">
                        <span className="text-white font-semibold">合計</span>
                        <span className="text-white font-bold text-xl">
                          ¥{Math.floor(parseInt(plan.price.replace(/[¥,]/g, '')) * 1.1).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">/月（税込）</p>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                <h4 className="text-cyan-400 font-semibold mb-2">{plan.name}プランに含まれる内容</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  {plan.features.slice(0, 5).map((feature: string, index: number) => (
                    <li key={index}>• {feature}</li>
                  ))}
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
          </div>
        </div>
      </div>
    </div>
  );
}