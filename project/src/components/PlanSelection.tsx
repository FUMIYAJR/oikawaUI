import React from 'react';
import { Check, Zap, Crown, Rocket, Star, CreditCard, Lock, Shield, Globe, Clock } from 'lucide-react';

interface PlanSelectionProps {
  onPlanSelect: (plan: any) => void;
  currentPlan: string;
}

export default function PlanSelection({ onPlanSelect, currentPlan }: PlanSelectionProps) {
  const plans = [
    {
      id: 'basic',
      name: 'ベーシック',
      price: '無料',
      period: '',
      description: '個人利用に最適',
      icon: Zap,
      color: 'from-gray-600 to-gray-500',
      borderColor: 'border-gray-600',
      features: [
        '月5本まで動画生成',
        'HD品質（1080p）',
        '基本テンプレート',
        '標準サポート',
        'ウォーターマークあり'
      ],
      limitations: [
        '商用利用不可',
        'API利用不可'
      ]
    },
    {
      id: 'pro',
      name: 'プロ',
      price: '¥2,980',
      period: '/月',
      description: 'ビジネス利用におすすめ',
      icon: Crown,
      color: 'from-cyan-500 to-blue-600',
      borderColor: 'border-cyan-500',
      popular: true,
      features: [
        '月50本まで動画生成',
        '4K品質対応',
        'プレミアムテンプレート',
        '優先サポート',
        'ウォーターマークなし',
        '商用利用可能',
        '高度な編集機能',
        'チーム共有機能'
      ],
      limitations: []
    },
    {
      id: 'enterprise',
      name: 'エンタープライズ',
      price: '¥9,800',
      period: '/月',
      description: '大規模チーム向け',
      icon: Rocket,
      color: 'from-purple-600 to-pink-600',
      borderColor: 'border-purple-600',
      features: [
        '無制限動画生成',
        '8K品質対応',
        'カスタムテンプレート',
        '専任サポート',
        'ウォーターマークなし',
        '商用利用可能',
        'API利用可能',
        'チーム管理機能',
        'カスタムブランディング',
        'オンプレミス対応'
      ],
      limitations: []
    }
  ];

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
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          プラン選択・お支払い
        </h1>
        <p className="text-xl text-gray-400">
          あなたのニーズに合ったプランをお選びください
        </p>
        {currentPlan !== 'basic' && (
          <div className="mt-4 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl max-w-md mx-auto">
            <p className="text-cyan-400 text-sm">
              現在のプラン: <span className="font-semibold">
                {currentPlan === 'pro' ? 'プロプラン' : 'エンタープライズプラン'}
              </span>
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-gray-800/50 backdrop-blur-lg rounded-2xl border-2 p-8 hover:scale-105 transition-all duration-300 ${
              currentPlan === plan.id 
                ? 'border-green-500 ring-2 ring-green-500/30' 
                : plan.borderColor
            } ${
              plan.popular ? 'ring-2 ring-cyan-500/30' : ''
            }`}
          >
            {currentPlan === plan.id && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                  <Check className="h-4 w-4" />
                  <span>現在のプラン</span>
                </div>
              </div>
            )}

            {plan.popular && currentPlan !== plan.id && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                  <Star className="h-4 w-4" />
                  <span>人気プラン</span>
                </div>
              </div>
            )}

            <div className="text-center mb-8">
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${plan.color} mb-4`}>
                <plan.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 mb-4">{plan.description}</p>
              <div className="flex items-baseline justify-center">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                {plan.period && <span className="text-gray-400 ml-1">{plan.period}</span>}
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h4 className="text-white font-semibold">含まれる機能:</h4>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {plan.limitations.length > 0 && (
                <div className="pt-4 border-t border-gray-700">
                  <h4 className="text-gray-400 font-semibold text-sm mb-2">制限事項:</h4>
                  <ul className="space-y-2">
                    {plan.limitations.map((limitation, index) => (
                      <li key={index} className="text-gray-500 text-sm">
                        • {limitation}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button
              onClick={() => onPlanSelect(plan)}
              disabled={currentPlan === plan.id}
              className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:opacity-50 ${
                currentPlan === plan.id
                  ? 'bg-green-600 text-white cursor-not-allowed'
                  : plan.id === 'basic'
                  ? 'bg-gradient-to-r from-gray-600 to-gray-500 text-white hover:shadow-lg hover:shadow-gray-500/25'
                  : plan.popular
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/25'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {currentPlan === plan.id 
                ? '現在のプラン' 
                : plan.id === 'basic' 
                ? '無料で始める' 
                : 'プランを選択'}
            </button>
          </div>
        ))}
      </div>

      {/* Security Section */}
      <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700/50 mb-16">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">安全で信頼できる決済</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      {/* FAQ Section */}
      <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700/50">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">よくある質問</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-white font-semibold mb-2">プランの変更はできますか？</h4>
            <p className="text-gray-400 text-sm">はい、いつでもプランの変更が可能です。アップグレードは即座に反映され、ダウングレードは次回請求日から適用されます。</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">無料プランの制限はありますか？</h4>
            <p className="text-gray-400 text-sm">ベーシックプランは完全無料で、月5本まで動画生成が可能です。商用利用をご希望の場合は有料プランをご利用ください。</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">支払い方法は何がありますか？</h4>
            <p className="text-gray-400 text-sm">クレジットカード、デビットカード、銀行振込に対応しています。法人のお客様は請求書払いも可能です。</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">解約はいつでもできますか？</h4>
            <p className="text-gray-400 text-sm">はい、いつでも解約可能です。解約後も現在の請求期間終了まではサービスをご利用いただけます。</p>
          </div>
        </div>
      </div>
    </div>
  );
}