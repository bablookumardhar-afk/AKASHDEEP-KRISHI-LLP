import React from 'react';
import { ScreenId } from '../data/agriData';
import { useLanguage } from '../context/LanguageContext';

interface BottomNavProps {
  activeScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
}

const NAV_ITEMS: {
  id: ScreenId;
  labelBn: string;
  labelEn: string;
  icon: string;
}[] = [
  {
    id: 'seasonal-crops',
    labelBn: 'ফসল',
    labelEn: 'Crops',
    icon: 'agriculture',
  },
  {
    id: 'district-crops',
    labelBn: 'জেলা শস্য',
    labelEn: 'District Crops',
    icon: 'potted_plant',
  },
  {
    id: 'soil-and-pre-sow',
    labelBn: 'মাটি শোধন',
    labelEn: 'Soil Prep',
    icon: 'compost',
  },
  {
    id: 'fertilizer-scheduler',
    labelBn: 'সার সূচী',
    labelEn: 'Scheduler',
    icon: 'event_upcoming',
  },
  {
    id: 'crop-protection',
    labelBn: 'সুরক্ষা',
    labelEn: 'Protection',
    icon: 'pest_control',
  },
  {
    id: 'regional-map',
    labelBn: 'মানচিত্র',
    labelEn: 'Agro-Map',
    icon: 'map',
  },
];

export const BottomNav: React.FC<BottomNavProps> = ({
  activeScreen,
  onSelectScreen,
}) => {
  const { t } = useLanguage();

  return (
    <nav
      aria-label="Primary Bottom Navigation"
      className="fixed bottom-0 inset-x-0 z-40 pb-safe bg-surface/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(19,78,53,0.08)] border-t border-outline-variant/25"
    >
      <div className="max-w-[480px] mx-auto flex justify-around items-stretch h-16 px-space-xs">
        {NAV_ITEMS.map((item) => {
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onSelectScreen(item.id)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 min-h-[44px] min-w-[44px] transition-all cursor-pointer ${
                isActive
                  ? 'text-primary font-title-sm font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <div
                className={`px-3 py-0.5 rounded-full flex items-center justify-center transition-colors ${
                  isActive
                    ? 'bg-primary-fixed text-on-primary-fixed'
                    : 'bg-transparent'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[21px] ${
                    isActive ? 'icon-filled' : ''
                  }`}
                >
                  {item.icon}
                </span>
              </div>
              <span className="font-label-sm text-[10px] text-center leading-tight truncate max-w-[76px]">
                {t(item.labelBn, item.labelEn)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
