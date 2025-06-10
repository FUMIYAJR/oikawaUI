import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TopPage from './components/TopPage';
import GenerateSection from './components/GenerateSection';
import PlanSelection from './components/PlanSelection';
import PaymentPage from './components/PaymentPage';
import VideoEditor from './components/VideoEditor';
import PaymentModal from './components/PaymentModal';
import SettingsPage from './components/SettingsPage';
import ModelSelector from './components/ModelSelector';

function App() {
  const [currentView, setCurrentView] = useState('top');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [currentPlan, setCurrentPlan] = useState('basic'); // basic, pro, enterprise
  const [selectedModel, setSelectedModel] = useState('basic-model');
  const [videoHistory, setVideoHistory] = useState([
    {
      id: 1,
      title: 'スマートフォンアプリ広告',
      concept: 'エモーショナル・ストーリー',
      thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '30秒',
      aspectRatio: '16:9',
      createdAt: '2024年1月15日',
      status: 'completed'
    },
    {
      id: 2,
      title: 'ECサイト商品紹介',
      concept: 'プロダクト・フォーカス',
      thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '60秒',
      aspectRatio: '9:16',
      createdAt: '2024年1月14日',
      status: 'completed'
    },
    {
      id: 3,
      title: 'ライフスタイルブランド',
      concept: 'ライフスタイル・アプローチ',
      thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '45秒',
      aspectRatio: '1:1',
      createdAt: '2024年1月13日',
      status: 'completed'
    }
  ]);

  const addToHistory = (newVideo: any) => {
    setVideoHistory([newVideo, ...videoHistory]);
  };

  const handlePlanSelect = (plan: any) => {
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = (plan: any) => {
    setShowPaymentModal(false);
    setCurrentPlan(plan.id);
    console.log('Payment completed for plan:', plan);
  };

  const handleEditVideo = (video: any) => {
    setEditingVideo(video);
    setCurrentView('editor');
  };

  const handleGetStarted = () => {
    setCurrentView('generate');
  };

  const handleViewPlans = () => {
    setCurrentView('plans');
  };

  const handleGoToPayment = () => {
    setCurrentView('payment');
  };

  const handleLogoClick = () => {
    if (currentPlan === 'basic') {
      // 無課金ユーザーは何もできない
      return;
    }
    setShowModelSelector(true);
  };

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId);
    setShowModelSelector(false);
  };

  // トップページの場合はサイドバーを表示しない
  const showSidebar = currentView !== 'top';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex">
      {/* Sidebar */}
      {showSidebar && (
        <Sidebar 
          videoHistory={videoHistory}
          currentView={currentView}
          onViewChange={setCurrentView}
          onEditVideo={handleEditVideo}
          onLogoClick={handleLogoClick}
          currentPlan={currentPlan}
        />
      )}
      
      {/* Main Content */}
      <div className={`flex-1 flex flex-col ${!showSidebar ? 'w-full' : ''}`}>
        {showSidebar && (
          <Header 
            onLogoClick={handleLogoClick}
            currentPlan={currentPlan}
            selectedModel={selectedModel}
          />
        )}
        
        <main className={`flex-1 ${showSidebar ? 'p-8' : ''}`}>
          {currentView === 'top' && (
            <TopPage 
              onGetStarted={handleGetStarted}
              onViewPlans={handleViewPlans}
            />
          )}
          
          {currentView === 'generate' && (
            <GenerateSection 
              onVideoGenerated={addToHistory}
              onEditVideo={handleEditVideo}
              currentPlan={currentPlan}
              selectedModel={selectedModel}
            />
          )}
          
          {currentView === 'plans' && (
            <PlanSelection 
              onPlanSelect={handlePlanSelect}
              currentPlan={currentPlan}
            />
          )}

          {currentView === 'payment' && (
            <PaymentPage />
          )}

          {currentView === 'settings' && (
            <SettingsPage 
              currentPlan={currentPlan}
              onPlanChange={setCurrentPlan}
            />
          )}

          {currentView === 'editor' && editingVideo && (
            <VideoEditor 
              video={editingVideo}
              onClose={() => setCurrentView('generate')}
            />
          )}
        </main>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          plan={selectedPlan}
          onClose={() => setShowPaymentModal(false)}
          onPaymentComplete={handlePaymentComplete}
        />
      )}

      {/* Model Selector Modal */}
      {showModelSelector && (
        <ModelSelector
          currentPlan={currentPlan}
          selectedModel={selectedModel}
          onModelSelect={handleModelSelect}
          onClose={() => setShowModelSelector(false)}
        />
      )}
    </div>
  );
}

export default App;