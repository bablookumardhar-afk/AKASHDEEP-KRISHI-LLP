import React, { useState } from 'react';
import { AgroMapScreen } from './components/AgroMapScreen';
import { BottomNav } from './components/BottomNav';
import { CropsScreen } from './components/CropsScreen';
import { DistrictCropsScreen } from './components/DistrictCropsScreen';
import { FertilizerSchedulerScreen } from './components/FertilizerSchedulerScreen';
import { Header } from './components/Header';
import {
  CropProtocolModal,
  HelplineModal,
  OfflineApkModal,
  PdfPreviewModal,
  PestScannerModal,
  ProfileModal,
} from './components/Modals';
import { ProtectionScreen } from './components/ProtectionScreen';
import { SoilPrepScreen } from './components/SoilPrepScreen';
import { LanguageProvider } from './context/LanguageContext';
import { CropGuideModalData, ScreenId } from './data/agriData';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('seasonal-crops');

  // Modal states
  const [selectedCropModal, setSelectedCropModal] =
    useState<CropGuideModalData | null>(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [apkModalMode, setApkModalMode] = useState<
    'download' | 'guide' | 'sync' | null
  >(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [pdfModalData, setPdfModalData] = useState<{
    title: string;
    subtitle: string;
  } | null>(null);
  const [helplineModalData, setHelplineModalData] = useState<{
    number: string;
    title: string;
  } | null>(null);

  const handleSelectScreen = (screen: ScreenId) => {
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen w-full bg-[#dce8df] flex justify-center">
      <div className="w-full max-w-[480px] min-h-screen bg-surface text-on-surface font-body-md flex flex-col relative shadow-[0_0_40px_rgba(0,54,34,0.12)]">
        <Header
          activeScreen={activeScreen}
          onOpenOfflineModal={() => setApkModalMode('sync')}
          onOpenProfileModal={() => setIsProfileOpen(true)}
        />

        <main className="flex flex-col relative w-full pt-3 pb-28 px-margin bg-surface flex-1">
          {activeScreen === 'seasonal-crops' && (
            <CropsScreen
              onNavigate={handleSelectScreen}
              onOpenCropModal={(crop) => setSelectedCropModal(crop)}
              onOpenScannerModal={() => setIsScannerOpen(true)}
              onOpenApkModal={(mode) => setApkModalMode(mode)}
            />
          )}

          {activeScreen === 'soil-and-pre-sow' && (
            <SoilPrepScreen
              onOpenPdfModal={(title, subtitle) =>
                setPdfModalData({ title, subtitle })
              }
            />
          )}

          {activeScreen === 'crop-protection' && (
            <ProtectionScreen
              onOpenHelplineModal={(number, title) =>
                setHelplineModalData({ number, title })
              }
            />
          )}

          {activeScreen === 'regional-map' && (
            <AgroMapScreen
              onOpenPdfModal={(title, subtitle) =>
                setPdfModalData({ title, subtitle })
              }
              onOpenHelplineModal={(number, title) =>
                setHelplineModalData({ number, title })
              }
            />
          )}

          {activeScreen === 'district-crops' && (
            <DistrictCropsScreen
              onOpenPdfModal={(title, subtitle) =>
                setPdfModalData({ title, subtitle })
              }
              onOpenHelplineModal={(number, title) =>
                setHelplineModalData({ number, title })
              }
            />
          )}

          {activeScreen === 'fertilizer-scheduler' && (
            <FertilizerSchedulerScreen
              onNavigate={handleSelectScreen}
              onOpenPdfModal={(title, subtitle) =>
                setPdfModalData({ title, subtitle })
              }
            />
          )}
        </main>

        <BottomNav
          activeScreen={activeScreen}
          onSelectScreen={handleSelectScreen}
        />

        {/* Interactive Modals & Bottom Sheets */}
        {selectedCropModal && (
          <CropProtocolModal
            crop={selectedCropModal}
            onClose={() => setSelectedCropModal(null)}
            onNavigate={handleSelectScreen}
          />
        )}

        {isScannerOpen && (
          <PestScannerModal
            onClose={() => setIsScannerOpen(false)}
            onNavigate={handleSelectScreen}
          />
        )}

        {apkModalMode && (
          <OfflineApkModal
            mode={apkModalMode}
            onClose={() => setApkModalMode(null)}
          />
        )}

        {isProfileOpen && (
          <ProfileModal onClose={() => setIsProfileOpen(false)} />
        )}

        {pdfModalData && (
          <PdfPreviewModal
            title={pdfModalData.title}
            subtitle={pdfModalData.subtitle}
            onClose={() => setPdfModalData(null)}
          />
        )}

        {helplineModalData && (
          <HelplineModal
            number={helplineModalData.number}
            title={helplineModalData.title}
            onClose={() => setHelplineModalData(null)}
          />
        )}
      </div>
    </div>
    </LanguageProvider>
  );
}
