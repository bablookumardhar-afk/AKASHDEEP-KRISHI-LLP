import React from 'react';
import { IMAGES, ScreenId } from '../data/agriData';
import { useLanguage } from '../context/LanguageContext';
import { ResilientImage } from './ResilientImage';

interface HeaderProps {
  activeScreen: ScreenId;
  onOpenOfflineModal: () => void;
  onOpenProfileModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  onOpenOfflineModal,
  onOpenProfileModal,
}) => {
  const { lang, toggleLang, t } = useLanguage();
  const isDistrictScreen = activeScreen === 'district-crops';

  const LanguageSwitchButton = (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t('Switch language to English', 'বাংলায় পরিবর্তন করুন')}
      className="min-h-[38px] px-2.5 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-bold flex items-center gap-1 hover:bg-primary-fixed transition-colors cursor-pointer shrink-0"
    >
      <span className="material-symbols-outlined text-[15px]">translate</span>
      <span
        className={
          lang === 'bn'
            ? 'text-primary underline underline-offset-2'
            : 'text-on-surface-variant font-normal'
        }
      >
        বাং
      </span>
      <span className="text-outline">/</span>
      <span
        className={
          lang === 'en'
            ? 'text-primary underline underline-offset-2'
            : 'text-on-surface-variant font-normal'
        }
      >
        EN
      </span>
    </button>
  );

  if (isDistrictScreen) {
    return (
      <header className="sticky top-0 inset-x-0 z-40 bg-surface/90 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 px-margin flex items-center justify-between gap-space-xs">
          <div className="flex items-center gap-space-sm min-w-0 flex-1">
            <ResilientImage
              alt="Akashdeep Krishi LLP Logo"
              className="h-8 w-8 rounded-md object-contain flex-shrink-0"
              src={IMAGES.akashdeepLogo}
              fallbackIcon="psychiatry"
            />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-space-xs">
                <h1 className="font-title-sm text-title-sm text-primary tracking-tight truncate leading-tight">
                  Akashdeep Krishi LLP
                </h1>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-[10px] leading-none flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
                  {t('অফলাইন প্রস্তুত', 'Offline Ready')}
                </span>
              </div>
              <p className="font-label-sm text-label-sm text-on-surface-variant truncate">
                {t('উত্তরবঙ্গ কৃষি দিশা', 'North Bengal Agri-Compass')} •{' '}
                <span className="text-primary font-medium">
                  {t('জেলা শস্য', 'District Crops')}
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            {LanguageSwitchButton}
            <button
              aria-label="Offline Sync Status"
              onClick={onOpenOfflineModal}
              className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                cloud_done
              </span>
            </button>
            <button
              aria-label="Farmer Profile"
              onClick={onOpenProfileModal}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors cursor-pointer"
              type="button"
            >
              <ResilientImage
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-container/20"
                src={IMAGES.profileAvatar}
                fallbackIcon="person"
              />
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 inset-x-0 z-40 bg-surface/90 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 px-margin flex items-center justify-between gap-space-xs">
        <div className="flex items-center gap-space-sm min-w-0 flex-1">
          <ResilientImage
            alt="Akashdeep Krishi LLP Logo"
            className="h-8 w-8 rounded-md object-contain shrink-0"
            src={IMAGES.akashdeepLogo}
            fallbackIcon="eco"
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-space-xs">
              <span className="font-title-md text-title-md text-primary truncate tracking-tight">
                Akashdeep Krishi LLP
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm shrink-0">
                WB
              </span>
            </div>
            <p className="font-label-sm text-label-sm text-on-surface-variant truncate">
              {t(
                'উত্তরবঙ্গ কৃষি সহায়ক (North Bengal Agri-Guide)',
                'North Bengal Agronomy & Field Guide'
              )}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {LanguageSwitchButton}
          <button
            aria-label="Offline Ready status and sync options"
            onClick={onOpenOfflineModal}
            className="min-h-[38px] px-2 py-1 rounded-full bg-surface-container-low text-primary flex items-center gap-1 hover:bg-surface-container-high transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">
              cloud_done
            </span>
            <span className="font-label-sm text-label-sm font-semibold hidden sm:inline">
              {t('অফলাইন', 'Offline')}
            </span>
          </button>
          <button
            aria-label="User Profile"
            onClick={onOpenProfileModal}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center p-1 rounded-full hover:bg-surface-container-high transition-colors cursor-pointer"
            type="button"
          >
            <ResilientImage
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              src={IMAGES.profileAvatar}
              fallbackIcon="person"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
