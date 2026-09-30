import React, { useState } from 'react';
import { IMAGES } from '../data/agriData';
import { useLanguage } from '../context/LanguageContext';

interface AgroMapScreenProps {
  onOpenPdfModal: (title: string, subtitle: string) => void;
  onOpenHelplineModal: (number: string, title: string) => void;
}

type ZoneKey = 'z1' | 'z2' | 'z3' | 'z4';
type AlmanacSeasonKey = 'zaid' | 'kharif' | 'rabi';

const ZONES_DATA: Record<
  ZoneKey,
  {
    pillLabelBn: string;
    pillLabelEn: string;
    badgeBn: string;
    badgeEn: string;
    subtitleBn: string;
    subtitleEn: string;
    titleBn: string;
    titleEn: string;
    rainfall: string;
    rainfallSubBn: string;
    rainfallSubEn: string;
    soilBn: string;
    soilEn: string;
    soilSubBn: string;
    soilSubEn: string;
    districts: string[];
    cropsBn: string;
    cropsEn: string;
  }
> = {
  z1: {
    pillLabelBn: '১. তরাই বলয়',
    pillLabelEn: '1. Terai Zone',
    badgeBn: 'অঞ্চল ১ নির্বাচিত',
    badgeEn: 'Zone 1 Selected',
    subtitleBn: 'তরাই কৃষি-আবহাওয়া অঞ্চল',
    subtitleEn: 'Sub-Himalayan Terai Belt',
    titleBn: 'তরাই কৃষি-আবহাওয়া অঞ্চল',
    titleEn: 'Terai Agro-Climatic Zone',
    rainfall: '3,000 - 3,500 mm',
    rainfallSubBn: 'উচ্চ বর্ষা প্রবাহ',
    rainfallSubEn: 'High monsoon runoff',
    soilBn: 'আম্লিক বেলে-দোআঁশ',
    soilEn: 'Acidic Sandy-Loam',
    soilSubBn: 'pH 4.8 - 5.6 (চুন আবশ্যক)',
    soilSubEn: 'pH 4.8 - 5.6 (Needs Lime)',
    districts: [
      'Jalpaiguri (সদর)',
      'Siliguri Plains',
      'Alipurduar Foothills',
      'Maynaguri',
    ],
    cropsBn: 'আনারস (Giant Kew), আমন ধান, চা, আদা, হলুদ',
    cropsEn: 'Pineapple (Giant Kew), Aman Paddy, Black Tea, Ginger, Turmeric',
  },
  z2: {
    pillLabelBn: '২. তিস্তা-ব্রহ্মপুত্র',
    pillLabelEn: '2. Teesta-Brahmaputra',
    badgeBn: 'অঞ্চল ২ নির্বাচিত',
    badgeEn: 'Zone 2 Selected',
    subtitleBn: 'তিস্তা-ব্রহ্মপুত্র পলিমাটি সমভূমি অঞ্চল',
    subtitleEn: 'Riverine Alluvial Floodplains',
    titleBn: 'তিস্তা-ব্রহ্মপুত্র পলি সমভূমি',
    titleEn: 'Teesta-Brahmaputra Alluvial Plains',
    rainfall: '2,400 - 2,800 mm',
    rainfallSubBn: 'সক্রিয় নদী পলি প্রবাহ',
    rainfallSubEn: 'Active riverine silt',
    soilBn: 'নবীন পলি দোআঁশ',
    soilEn: 'Recent Alluvium / Silt Loam',
    soilSubBn: 'pH 5.8 - 6.5 (উর্বর)',
    soilSubEn: 'pH 5.8 - 6.5 (Fertile)',
    districts: [
      'Cooch Behar',
      'Dinhata',
      'Mathabhanga',
      'Tufanganj',
      'Mekhliganj',
    ],
    cropsBn: 'সোনালী পাট, মতিহারী তামাক, আমন ধান, শীতকালীন ফুলকপি',
    cropsEn:
      'Golden Fiber Jute (Pat), Motihari Tobacco, Aman Paddy, Winter Cauliflower',
  },
  z3: {
    pillLabelBn: '৩. বরিন্দ ও প্রাচীন পলি',
    pillLabelEn: '3. Barind & Old Alluvial',
    badgeBn: 'অঞ্চল ৩ নির্বাচিত',
    badgeEn: 'Zone 3 Selected',
    subtitleBn: 'প্রাচীন পলি ও বরিন্দ অঞ্চল',
    subtitleEn: 'Gangetic & Barind Clay Belt',
    titleBn: 'প্রাচীন পলি ও বরিন্দ ট্র্যাক্ট',
    titleEn: 'Old Alluvial & Barind Tract',
    rainfall: '1,400 - 1,750 mm',
    rainfallSubBn: 'পরিমিত বর্ষা বলয়',
    rainfallSubEn: 'Moderate monsoon',
    soilBn: 'এঁটেল দোআঁশ থেকে ভারী এঁটেল',
    soilEn: 'Neutral Clay-Loam to Heavy Clay',
    soilSubBn: 'pH 6.5 - 7.5 (পটাশ সমৃদ্ধ)',
    soilSubEn: 'pH 6.5 - 7.5 (High Potash)',
    districts: [
      'Malda',
      'Uttar Dinajpur (Islampur)',
      'Dakshin Dinajpur (Balurghat)',
      'Gazole',
    ],
    cropsBn: 'ফজলি/হিমসাগর আম, সরিষা, বোরো ধান, হাইব্রিড ভুট্টা, মসুর',
    cropsEn:
      'Fazli/Himsagar Mango, Mustard (Yellow Sarson), Boro Paddy, Hybrid Maize, Lentils',
  },
  z4: {
    pillLabelBn: '৪. পাদদেশ ও ডুয়ার্স',
    pillLabelEn: '4. Foothills & Dooars',
    badgeBn: 'অঞ্চল ৪ নির্বাচিত',
    badgeEn: 'Zone 4 Selected',
    subtitleBn: 'ডুয়ার্স ও তরাই বনভূমি সীমান্ত অঞ্চল',
    subtitleEn: 'Sub-Himalayan Forest Fringe',
    titleBn: 'পাহাড় পাদদেশ ও ডুয়ার্স বলয়',
    titleEn: 'Hill Foothills & Dooars Forest Fringe',
    rainfall: '3,600 - 4,200 mm',
    rainfallSubBn: 'সাব-হিমালয়ান অতি-বৃষ্টি বলয়',
    rainfallSubEn: 'Sub-Himalayan cloudburst belt',
    soilBn: 'নুড়িযুক্ত অম্ল দোআঁশ / লাল মাটি',
    soilEn: 'Gravelly Acid Loam / Red Earth',
    soilSubBn: 'pH 4.2 - 5.0 (উচ্চ হিউমাস)',
    soilSubEn: 'pH 4.2 - 5.0 (High Humus)',
    districts: [
      'Kalchini',
      'Madarihat',
      'Kumargram',
      'Nagrakata',
      'Birpara',
    ],
    cropsBn: 'সিটিসি চা, সুপারি, কমলালেবু, বড় এলাচ, গোলমরিচ',
    cropsEn:
      'CTC Export Tea, Arecanut (Supari), Mandarin Orange, Large Cardamom, Black Pepper',
  },
};

const SEASONS_ALMANAC: Record<
  AlmanacSeasonKey,
  {
    tabLabelBn: string;
    tabLabelEn: string;
    titleBn: string;
    titleEn: string;
    subtitleBn: string;
    subtitleEn: string;
    badgeBn: string;
    badgeEn: string;
    items: {
      dotColor: string;
      nameBn: string;
      nameEn: string;
      window: string;
      stageBn: string;
      stageEn: string;
      stat: string;
      bars: { color: string; w: string }[];
    }[];
  }
> = {
  zaid: {
    tabLabelBn: 'জায়েদ / আউশ',
    tabLabelEn: 'Zaid / Pre-Kharif',
    titleBn: 'জায়েদ ও প্রাক-খরিফ (March – May)',
    titleEn: 'Zaid & Pre-Kharif (March – May)',
    subtitleBn: 'গ্রীষ্মকালীন সেচনির্ভর ও প্রাক-বর্ষা বপন',
    subtitleEn: 'Summer irrigated & pre-monsoon sowing window',
    badgeBn: 'বর্তমানে সক্রিয়',
    badgeEn: 'Active Now',
    items: [
      {
        dotColor: 'bg-secondary',
        nameBn: 'পাট বপন (Jute Sowing - Olitorius/Capsularis)',
        nameEn: 'Tossa & White Jute Sowing (Olitorius/Capsularis)',
        window: 'March 15 - April 30',
        stageBn: 'পর্যায়: জমি তৈরি ও বীজবপন (পলি মাটিতে গভীর চাষ)',
        stageEn: 'Stage: Deep ploughing & line sowing in alluvial beds',
        stat: 'Harvest: July',
        bars: [
          { color: 'bg-secondary-container', w: 'w-[25%]' },
          { color: 'bg-primary', w: 'w-[50%]' },
          { color: 'bg-primary-fixed-dim', w: 'w-[25%]' },
        ],
      },
      {
        dotColor: 'bg-primary',
        nameBn: 'বোরো ধান কর্তন (Boro Harvest & Drying)',
        nameEn: 'Boro Paddy Harvest & Post-Harvest Drying',
        window: 'April 20 - May 25',
        stageBn: 'পর্যায়: কালবৈশাখী ঝড়ের পূর্বে ধান কাটা ও মাড়াই',
        stageEn: 'Stage: Harvest & threshing before Kalbaishakhi storms',
        stat: 'Yield: 22-26 Q/ha',
        bars: [
          { color: 'bg-surface-container-highest', w: 'w-[40%]' },
          { color: 'bg-primary', w: 'w-[60%]' },
        ],
      },
      {
        dotColor: 'bg-secondary-container',
        nameBn: 'গ্রীষ্মকালীন মুগ ডাল (Summer Moong)',
        nameEn: 'Summer Green Gram (Moong Pulse)',
        window: 'March 01 - May 10',
        stageBn: 'পর্যায়: পড গঠন ও মাটিতে নাইট্রোজেন সংবন্ধন',
        stageEn: 'Stage: Pod maturity & biological nitrogen fixation',
        stat: 'Soil Fixation: High N₂',
        bars: [
          { color: 'bg-primary', w: 'w-[80%]' },
          { color: 'bg-secondary', w: 'w-[20%]' },
        ],
      },
    ],
  },
  kharif: {
    tabLabelBn: 'খরিফ / আমন',
    tabLabelEn: 'Kharif / Monsoon',
    titleBn: 'খরিফ মরশুম (June – October)',
    titleEn: 'Kharif Season (June – October)',
    subtitleBn: 'প্রধান বর্ষাকালীন আবাদ ও রোপণ চক্র',
    subtitleEn: 'Primary monsoon cultivation & transplanting cycle',
    badgeBn: 'আসন্ন প্রস্তুতি',
    badgeEn: 'Upcoming Prep',
    items: [
      {
        dotColor: 'bg-primary',
        nameBn: 'আমন ধান রোপণ (Aman Paddy - Swarna, MTU 7029)',
        nameEn: 'Aman Paddy Transplanting (Swarna Sub-1, MTU 7029)',
        window: 'June 20 - July 30',
        stageBn: 'পর্যায়: বীজতলা তৈরি ও ২১-২৫ দিনের চারা রোপণ',
        stageEn: 'Stage: Wet nursery bed & 21–25 day seedling transplant',
        stat: 'Harvest: Nov - Dec',
        bars: [
          { color: 'bg-primary', w: 'w-[35%]' },
          { color: 'bg-primary-container', w: 'w-[65%]' },
        ],
      },
      {
        dotColor: 'bg-secondary',
        nameBn: 'পাট জাগ দেওয়া ও আঁশ নিষ্কাশন (Jute Retting)',
        nameEn: 'Microbial Jute Retting & Fiber Extraction',
        window: 'July 15 - August 30',
        stageBn: 'পর্যায়: ক্রাইপাফ সোনা অনুজীব জাক ও আঁশ শুকানো',
        stageEn: 'Stage: CRIJAF Sona microbial water retting & drying',
        stat: 'Fiber: TD5 Grade',
        bars: [
          { color: 'bg-secondary', w: 'w-[50%]' },
          { color: 'bg-secondary-container', w: 'w-[50%]' },
        ],
      },
      {
        dotColor: 'bg-primary',
        nameBn: 'আদা ও হলুদ পরিচর্যা (Ginger & Turmeric Mounding)',
        nameEn: 'Ginger & Turmeric Earthing-Up & Drainage',
        window: 'June 01 - August 15',
        stageBn: 'পর্যায়: মাটি তোলা ও ডুয়ার্সে জল নিকাশ',
        stageEn: 'Stage: Ridge elevation & mulch application in Dooars',
        stat: 'Curcumin: 4.8%',
        bars: [
          { color: 'bg-primary-fixed-dim', w: 'w-[60%]' },
          { color: 'bg-primary', w: 'w-[40%]' },
        ],
      },
    ],
  },
  rabi: {
    tabLabelBn: 'রবি / শীতকালীন',
    tabLabelEn: 'Rabi / Winter',
    titleBn: 'রবি মরশুম (November – March)',
    titleEn: 'Rabi Season (November – March)',
    subtitleBn: 'শীতকালীন অর্থকরী ফসল ও সবজি চাষ',
    subtitleEn: 'Winter cash crops, oilseeds & cole vegetables',
    badgeBn: 'শীতকালীন ফসল',
    badgeEn: 'Winter Crop',
    items: [
      {
        dotColor: 'bg-secondary',
        nameBn: 'সরিষা ও আলু আবাদ (Yellow Sarson & Kufri Jyoti Potato)',
        nameEn: 'Yellow Mustard (Binoy B-9) & Kufri Jyoti Potato',
        window: 'Nov 01 - Dec 10',
        stageBn: 'পর্যায়: আমন পরবর্তী রসে দ্রুত বীজবপন',
        stageEn: 'Stage: Rapid sowing utilizing post-Aman soil moisture',
        stat: 'Harvest: Feb',
        bars: [
          { color: 'bg-secondary-container', w: 'w-[45%]' },
          { color: 'bg-primary', w: 'w-[55%]' },
        ],
      },
      {
        dotColor: 'bg-primary',
        nameBn: 'বোরো ধানের বীজতলা (Winter Boro Nursery Beds)',
        nameEn: 'Winter Boro Paddy Cold-Protected Nursery',
        window: 'Nov 25 - Jan 05',
        stageBn: 'পর্যায়: পলিথিন ঢাকা শৈত্য সুরক্ষা বীজতলা',
        stageEn: 'Stage: Low-tunnel polythene cold protection nursery',
        stat: 'Transplant: Jan',
        bars: [
          { color: 'bg-surface-container-highest', w: 'w-[30%]' },
          { color: 'bg-primary', w: 'w-[70%]' },
        ],
      },
      {
        dotColor: 'bg-primary',
        nameBn: 'শীতকালীন ফুলকপি ও বাঁধাকপি (Winter Cole Crops)',
        nameEn: 'Winter Cauliflower, Cabbage & Leafy Vegetables',
        window: 'Oct 15 - Dec 20',
        stageBn: 'পর্যায়: চারা বসানো ও বোরন-মলিবডেনাম প্রয়োগ',
        stageEn: 'Stage: Transplanting & Boron/Molybdenum foliar care',
        stat: 'High Profit Yield',
        bars: [
          { color: 'bg-primary', w: 'w-[75%]' },
          { color: 'bg-secondary-fixed-dim', w: 'w-[25%]' },
        ],
      },
    ],
  },
};

export const AgroMapScreen: React.FC<AgroMapScreenProps> = ({
  onOpenPdfModal,
  onOpenHelplineModal,
}) => {
  const { t } = useLanguage();
  const [selectedZone, setSelectedZone] = useState<ZoneKey>('z1');
  const [selectedSeason, setSelectedSeason] =
    useState<AlmanacSeasonKey>('zaid');
  const [showSoilLayer, setShowSoilLayer] = useState<boolean>(false);
  const [syncState, setSyncState] = useState<'idle' | 'syncing' | 'updated'>(
    'idle'
  );

  const currentZone = ZONES_DATA[selectedZone];
  const currentSeason = SEASONS_ALMANAC[selectedSeason];

  const handleSyncCache = () => {
    if (syncState === 'syncing') return;
    setSyncState('syncing');
    setTimeout(() => {
      setSyncState('updated');
    }, 900);
  };

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* Header Banner & Regional Status Pill */}
      <div className="flex flex-col gap-space-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px] icon-filled">
              public
            </span>
            <span className="font-label-md text-label-md text-primary uppercase tracking-wider font-semibold">
              {t('কৃষি-আবহাওয়া বুদ্ধিমত্তা', 'Agro-Climatic Intelligence')}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
            {t('প্রাক-খরিফ চক্র সক্রিয়', 'Pre-Kharif Cycle Active')}
          </span>
        </div>
        <h1 className="font-headline-md text-headline-md text-on-surface">
          {t(
            'উত্তরবঙ্গ কৃষি মানচিত্র ও পঞ্জিকা',
            'North Bengal Agro-Map & Almanac'
          )}
        </h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          {t(
            'উত্তরবঙ্গের মাইক্রোক্লাইমেট মানচিত্র, মৃত্তিকা বিন্যাস ও শস্য পঞ্জিকা',
            'North Bengal Microclimate Map, Soil Matrix & Seasonal Cropping Almanac'
          )}
        </p>
      </div>

      {/* Interactive Map View with Visual District Anchors */}
      <div className="flex flex-col bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
        <div
          className="relative w-full h-56 bg-surface-container-high bg-cover bg-center overflow-hidden"
          style={{ backgroundImage: `url('${IMAGES.northBengalMap}')` }}
        >
          <div
            className={`absolute inset-0 transition-colors duration-300 ${
              showSoilLayer
                ? 'bg-gradient-to-t from-secondary/85 via-primary/45 to-primary/20'
                : 'bg-gradient-to-t from-primary/85 via-primary/30 to-transparent'
            }`}
          ></div>

          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-surface-container-lowest/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-ping"></span>
            <span className="font-label-sm text-label-sm text-primary font-semibold">
              {t('শিলিগুড়ি - ডুয়ার্স হাব', 'Siliguri - Dooars Hub')}
            </span>
          </div>

          <div className="absolute top-12 right-4 flex items-center gap-1 bg-surface-container-lowest/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
            <span className="material-symbols-outlined text-secondary text-[14px]">
              water_drop
            </span>
            <span className="font-label-sm text-label-sm text-on-surface font-semibold">
              {showSoilLayer
                ? t('অম্ল মাটি pH 4.8–5.6', 'Soil pH 4.8–5.6 (Acidic Belt)')
                : t('তরাই বলয় (৩২০০ মিমি)', 'Terai Zone (3200mm)')}
            </span>
          </div>

          {showSoilLayer && (
            <div className="absolute top-24 left-4 flex items-center gap-1 bg-secondary-fixed/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
              <span className="material-symbols-outlined text-secondary text-[14px]">
                science
              </span>
              <span className="font-label-sm text-label-sm text-on-secondary-fixed font-semibold">
                {t(
                  'জিআইএস স্তর: ডলোমাইট ও বোরন ঘাটতি অঞ্চল',
                  'GIS Layer: Dolomite & Boron Deficit Active'
                )}
              </span>
            </div>
          )}

          <div className="absolute bottom-4 inset-x-3 flex items-center justify-between text-on-primary">
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-label-sm text-on-primary-container truncate">
                {t('ভৌগোলিক অক্ষাংশ পরিসর', 'Geo-Coordinate Range')}
              </span>
              <span className="font-title-sm text-title-sm font-bold text-on-primary">
                24°40&apos; N to 27°13&apos; N •{' '}
                {t('৮টি জেলা', '8 Districts')}
              </span>
            </div>
            <button
              onClick={() => setShowSoilLayer((prev) => !prev)}
              className={`px-3 py-1.5 rounded-lg font-label-md text-label-md font-semibold flex items-center gap-1 shadow-sm active:scale-95 transition-all cursor-pointer ${
                showSoilLayer
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-lowest text-primary'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">
                layers
              </span>
              <span>{t('মৃত্তিকা স্তর', 'Soil Layers')}</span>
            </button>
          </div>
        </div>

        {/* Zone Filter Pills */}
        <div className="p-space-md flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <span className="font-title-sm text-title-sm text-on-surface">
              {t(
                'আঞ্চলিক কৃষি এলাকা (৪টি মাইক্রো-জোন)',
                'Regional Agro-Zones (4 Micro-Zones)'
              )}
            </span>
            <span className="font-label-sm text-label-sm text-primary font-medium">
              {t('পরিদর্শন করতে বাছুন', 'Select to Inspect')}
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-space-md px-space-md no-scrollbar">
            {(['z1', 'z2', 'z3', 'z4'] as ZoneKey[]).map((zKey) => {
              const isSelected = selectedZone === zKey;
              return (
                <button
                  key={zKey}
                  type="button"
                  onClick={() => setSelectedZone(zKey)}
                  className={
                    isSelected
                      ? 'shrink-0 px-3 py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer'
                      : 'shrink-0 px-3 py-2 rounded-xl bg-surface-container-low text-on-surface font-label-md text-label-md font-medium flex items-center gap-1.5 hover:bg-surface-container transition-colors cursor-pointer'
                  }
                >
                  {isSelected && (
                    <span className="material-symbols-outlined text-[16px]">
                      check_circle
                    </span>
                  )}
                  <span>
                    {t(
                      ZONES_DATA[zKey].pillLabelBn,
                      ZONES_DATA[zKey].pillLabelEn
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dynamic Zone Detail Card */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md flex flex-col gap-space-md shadow-sm">
        <div className="flex items-start justify-between gap-space-sm">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold">
                {t(currentZone.badgeBn, currentZone.badgeEn)}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {t(currentZone.subtitleBn, currentZone.subtitleEn)}
              </span>
            </div>
            <h2 className="font-title-lg text-title-lg text-primary mt-1">
              {t(currentZone.titleBn, currentZone.titleEn)}
            </h2>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary text-[22px]">
              rainy
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-space-sm">
          <div className="bg-surface-container-low rounded-lg p-space-sm flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              {t('বার্ষিক বৃষ্টিপাত (Rainfall)', 'Annual Rainfall')}
            </span>
            <span className="font-title-md text-title-md text-primary font-bold mt-0.5 tabular-nums">
              {currentZone.rainfall}
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              {t(currentZone.rainfallSubBn, currentZone.rainfallSubEn)}
            </span>
          </div>
          <div className="bg-surface-container-low rounded-lg p-space-sm flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              {t('মাটির ধরন (Soil Profile)', 'Soil Profile')}
            </span>
            <span className="font-title-md text-title-md text-primary font-bold mt-0.5">
              {t(currentZone.soilBn, currentZone.soilEn)}
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              {t(currentZone.soilSubBn, currentZone.soilSubEn)}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
            {t('আওতাভুক্ত জেলাসমূহ:', 'Target Districts:')}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {currentZone.districts.map((dist) => (
              <span
                key={dist}
                className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm"
              >
                {dist}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-surface-container-high rounded-lg p-space-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">
              psychiatry
            </span>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {t('প্রধান ফসল (Key Crops)', 'Key Crops')}
              </span>
              <span className="font-title-sm text-title-sm text-on-surface">
                {t(currentZone.cropsBn, currentZone.cropsEn)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pest & Disease Vulnerability Forecast */}
      <div className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-secondary text-[20px]">
              warning
            </span>
            <h2 className="font-title-md text-title-md text-on-surface">
              {t(
                'পোকামাকড় ও রোগবালাই পূর্বাভাস (Risk Matrix)',
                'Pest & Disease Risk Matrix'
              )}
            </h2>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            {t('রিয়েল-টাইম সিঙ্ক', 'Real-time sync')}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-space-sm">
          {/* Alert Card 1 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md flex flex-col gap-space-xs shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-title-sm text-title-sm text-on-surface font-bold">
                Jalpaiguri &amp; Alipurduar
              </span>
              <span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
                HIGH ALERT
              </span>
            </div>
            <div className="flex items-start gap-2 mt-1">
              <span className="material-symbols-outlined text-error text-[18px] shrink-0 mt-0.5">
                pest_control
              </span>
              <div className="flex flex-col">
                <p className="font-label-md text-label-md text-on-surface font-semibold">
                  {t(
                    'চা গাছে মশা পোকা (Tea Mosquito Bug) ও ধানের খোল পচা (Sheath Rot)',
                    'Tea Mosquito Bug (Helopeltis) & Paddy Sheath Rot'
                  )}
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  {t(
                    'সাব-হিমালয়ান কুয়াশা ও একটানা আর্দ্রতায় ছত্রাক দ্রুত ছড়ায়। ছায়াহীন নিকাশি নালা পরিষ্কার রাখুন।',
                    'Sub-Himalayan mist and continuous moisture accelerate foliar spore germination. Maintain unshaded drainage channels.'
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Alert Card 2 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md flex flex-col gap-space-xs shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-title-sm text-title-sm text-on-surface font-bold">
                Malda &amp; English Bazar
              </span>
              <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                MEDIUM WATCH
              </span>
            </div>
            <div className="flex items-start gap-2 mt-1">
              <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                bug_report
              </span>
              <div className="flex flex-col">
                <p className="font-label-md text-label-md text-on-surface font-semibold">
                  {t(
                    'আমের মুকুলে শোষক পোকা ও ছাতা রোগ (Mango Hopper & Powdery Mildew)',
                    'Mango Hopper & Powdery Mildew on Panicles'
                  )}
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  {t(
                    'হঠাৎ তাপমাত্রা বৃদ্ধিতে হপার নিম্ফ সক্রিয় হয়। ফুল সম্পূর্ণ ফোটার পূর্বে পাউডার সালফার (২ গ্রাম/লি) স্প্রে করুন।',
                    'Sudden temperature rises trigger hopper nymphs. Spray Soluble Sulphur (2g/L) prior to complete floret opening.'
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Alert Card 3 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md flex flex-col gap-space-xs shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-title-sm text-title-sm text-on-surface font-bold">
                Uttar &amp; Dakshin Dinajpur
              </span>
              <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                MODERATE WATCH
              </span>
            </div>
            <div className="flex items-start gap-2 mt-1">
              <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                coronavirus
              </span>
              <div className="flex flex-col">
                <p className="font-label-md text-label-md text-on-surface font-semibold">
                  {t(
                    'ভুট্টায় ফল আর্মি ওয়ার্ম (Fall Armyworm) ও বোরো ধানের মাজরা পোকা',
                    'Maize Fall Armyworm & Boro Paddy Stem Borer'
                  )}
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  {t(
                    'ভুট্টার মাঝখানের পাতায় পোকার উপস্থিতি পরীক্ষা করুন। বিঘাপ্রতি ৫টি ফেরোমন ট্র্যাপ স্থাপন করুন।',
                    'Check central whorl for frass. Deploy Pheromone Traps @ 5 traps/bigha across Barind clay belts.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Planting-to-Harvest Almanac Matrix */}
      <div className="flex flex-col bg-surface-container-lowest rounded-xl p-space-md shadow-sm gap-space-md">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <h2 className="font-title-lg text-title-lg text-primary">
              {t(
                'মৌসুমি শস্য পঞ্জিকা (Cropping Calendar)',
                'Seasonal Cropping Calendar'
              )}
            </h2>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
              {t('দ্বিভাষিক পঞ্জিকা', 'Bilingual Almanac')}
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {t(
              'উত্তরবঙ্গের মৌসুমি বায়ু পরিবর্তন অনুযায়ী নির্ধারিত বপন সূচি',
              'Staggered planting windows calibrated for North Bengal monsoon shifts'
            )}
          </p>
        </div>

        <div className="flex rounded-lg bg-surface-container p-1 gap-1">
          {(['zaid', 'kharif', 'rabi'] as AlmanacSeasonKey[]).map((sKey) => {
            const isSelected = selectedSeason === sKey;
            return (
              <button
                key={sKey}
                type="button"
                onClick={() => setSelectedSeason(sKey)}
                className={
                  isSelected
                    ? 'flex-1 py-1.5 rounded-md font-label-md text-label-md font-semibold text-center transition-all bg-surface-container-lowest text-primary shadow-sm cursor-pointer'
                    : 'flex-1 py-1.5 rounded-md font-label-md text-label-md font-medium text-center transition-all text-on-surface-variant hover:text-on-surface cursor-pointer'
                }
              >
                {t(
                  SEASONS_ALMANAC[sKey].tabLabelBn,
                  SEASONS_ALMANAC[sKey].tabLabelEn
                )}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-space-sm">
          <div className="flex items-center justify-between bg-surface-container-low px-3 py-2 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">
                sunny
              </span>
              <div className="flex flex-col">
                <span className="font-title-sm text-title-sm text-primary font-bold">
                  {t(currentSeason.titleBn, currentSeason.titleEn)}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {t(currentSeason.subtitleBn, currentSeason.subtitleEn)}
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-primary text-on-primary font-label-sm text-label-sm font-semibold">
              {t(currentSeason.badgeBn, currentSeason.badgeEn)}
            </span>
          </div>

          <div className="flex flex-col gap-space-xs">
            {currentSeason.items.map((item) => (
              <div
                key={item.nameEn}
                className="p-space-sm rounded-lg bg-surface flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span
                      className={`w-2.5 h-2.5 rounded-full shrink-0 ${item.dotColor}`}
                    ></span>
                    <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                      {t(item.nameBn, item.nameEn)}
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-primary font-semibold shrink-0">
                    {item.window}
                  </span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden flex">
                  {item.bars.map((bar, idx) => (
                    <div
                      key={idx}
                      className={`${bar.color} h-full ${bar.w}`}
                    ></div>
                  ))}
                </div>
                <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant gap-2">
                  <span>{t(item.stageBn, item.stageEn)}</span>
                  <span className="shrink-0">{item.stat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Offline Download Center Card */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md flex flex-col gap-space-md shadow-sm">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[24px]">
            offline_pin
          </span>
          <div className="flex flex-col">
            <h2 className="font-title-md text-title-md text-on-surface">
              {t(
                'অফলাইন স্টোরেজ সেন্টার (Download Hub)',
                'Offline Storage Center (Download Hub)'
              )}
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {t(
                'চা বাগান ও প্রত্যন্ত চরাঞ্চলে মোবাইল নেটওয়ার্ক ছাড়াই ব্যবহার করুন',
                'Access without cellular reception in remote tea gardens and floodplains'
              )}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-space-sm">
          <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low">
            <div className="flex items-center gap-space-sm min-w-0">
              <span className="material-symbols-outlined text-secondary text-[24px] shrink-0">
                picture_as_pdf
              </span>
              <div className="flex flex-col min-w-0">
                <span className="font-title-sm text-title-sm text-on-surface truncate">
                  {t(
                    'সম্পূর্ণ কৃষি-অঞ্চল ভেক্টর মানচিত্র',
                    'Full Agro-Zone Vector Map'
                  )}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  High-Res GIS PDF • 4.2 MB
                </span>
              </div>
            </div>
            <button
              aria-label="Download Agro-Zone PDF"
              onClick={() =>
                onOpenPdfModal(
                  t(
                    'সম্পূর্ণ কৃষি-অঞ্চল ভেক্টর মানচিত্র (GIS PDF)',
                    'Full Agro-Zone Vector Map (GIS PDF)'
                  ),
                  'High-Res North Bengal 8-District Agro-Climatic & Soil Map (4.2 MB)'
                )
              }
              className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-semibold shrink-0 hover:bg-primary-container active:scale-95 transition-transform flex items-center gap-1 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">
                download
              </span>
              <span>{t('ডাউনলোড', 'Download')}</span>
            </button>
          </div>

          <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low">
            <div className="flex items-center gap-space-sm min-w-0">
              <span className="material-symbols-outlined text-primary text-[24px] shrink-0">
                sync_saved_locally
              </span>
              <div className="flex flex-col min-w-0">
                <span className="font-title-sm text-title-sm text-on-surface truncate">
                  {t(
                    'শস্য ম্যাট্রিক্স অফলাইন ক্যাশে',
                    'Crop Matrix Offline Cache'
                  )}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {syncState === 'updated'
                    ? t('এইমাত্র সিঙ্ক হয়েছে • SQLite', 'Synchronized just now • SQLite')
                    : t('১৮ মিনিট আগে সিঙ্ক হয়েছে • SQLite', 'Synchronized 18m ago • SQLite')}
                </span>
              </div>
            </div>
            <button
              aria-label="Sync Crop Matrix"
              onClick={handleSyncCache}
              className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold shrink-0 active:scale-95 transition-all flex items-center gap-1 cursor-pointer ${
                syncState === 'updated'
                  ? 'bg-primary-fixed text-on-primary-fixed'
                  : 'bg-surface-container-high text-on-surface hover:bg-surface-dim'
              }`}
              type="button"
            >
              <span
                className={`material-symbols-outlined text-[16px] ${
                  syncState === 'syncing' ? 'animate-spin' : ''
                }`}
              >
                refresh
              </span>
              <span>
                {syncState === 'syncing'
                  ? t('সিঙ্ক হচ্ছে...', 'Syncing...')
                  : syncState === 'updated'
                  ? t('আপডেটেড', 'Up to Date')
                  : t('আপডেট', 'Update')}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Government Testing Labs & Depots List */}
      <div className="flex flex-col gap-space-sm mb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">
              science
            </span>
            <h2 className="font-title-md text-title-md text-on-surface">
              {t(
                'মাটি পরীক্ষা ও সার কেন্দ্র (Soil Labs & Depots)',
                'Govt. Soil Testing Labs & Depots'
              )}
            </h2>
          </div>
          <span className="font-label-sm text-label-sm text-primary font-medium">
            {t('সরকার অনুমোদিত', 'Govt. Verified')}
          </span>
        </div>

        <div className="flex flex-col gap-space-sm">
          {/* Lab 1 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md flex flex-col gap-space-xs shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm font-medium">
                    District Central Lab
                  </span>
                  <span className="font-label-sm text-label-sm text-primary font-semibold">
                    14 km away
                  </span>
                </div>
                <h3 className="font-title-sm text-title-sm text-on-surface font-bold mt-1">
                  Jalpaiguri District Soil Testing Laboratory
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Department of Agriculture, Mohitnagar Farm Campus, Jalpaiguri
                </p>
              </div>
              <button
                aria-label="Call Jalpaiguri Lab"
                onClick={() =>
                  onOpenHelplineModal(
                    '03561-255412',
                    'Jalpaiguri District Soil Testing Laboratory (Mohitnagar)'
                  )
                }
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary active:scale-95 transition-transform shrink-0 cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  call
                </span>
              </button>
            </div>
            <div className="flex items-center justify-between mt-2 bg-surface-container-low px-2.5 py-1.5 rounded-lg">
              <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  verified
                </span>
                <span>
                  {t(
                    'সয়েল হেলথ কার্ডের অধীনে বিনামূল্যে NPK ও অনুখাদ্য পরীক্ষা',
                    'Free NPK + Micronutrient Test under Soil Health Card'
                  )}
                </span>
              </div>
              <span className="font-label-sm text-label-sm font-bold text-primary shrink-0">
                Open 10 AM - 5 PM
              </span>
            </div>
          </div>

          {/* Lab 2 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md flex flex-col gap-space-xs shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm font-medium">
                    UBKV Campus
                  </span>
                  <span className="font-label-sm text-label-sm text-primary font-semibold">
                    Pundibari
                  </span>
                </div>
                <h3 className="font-title-sm text-title-sm text-on-surface font-bold mt-1">
                  Cooch Behar Krishi Vigyan Kendra (KVK)
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Uttar Banga Krishi Viswavidyalaya, Pundibari, Cooch Behar
                </p>
              </div>
              <button
                aria-label="Call Cooch Behar KVK"
                onClick={() =>
                  onOpenHelplineModal(
                    '03582-270588',
                    'Cooch Behar Krishi Vigyan Kendra (UBKV Pundibari)'
                  )
                }
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary active:scale-95 transition-transform shrink-0 cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  call
                </span>
              </button>
            </div>
            <div className="flex items-center justify-between mt-2 bg-surface-container-low px-2.5 py-1.5 rounded-lg">
              <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[16px] text-secondary">
                  inventory_2
                </span>
                <span>
                  {t(
                    'ভর্তুকিযুক্ত কৃষি চুন ও বোরন ডিপো উপলব্ধ',
                    'Subsidized Lime & Boron Depot available'
                  )}
                </span>
              </div>
              <span className="font-label-sm text-label-sm font-bold text-primary shrink-0">
                Testing: 48h turnaround
              </span>
            </div>
          </div>

          {/* Lab 3 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md flex flex-col gap-space-xs shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm font-medium">
                    Specialized Lab
                  </span>
                  <span className="font-label-sm text-label-sm text-primary font-semibold">
                    Mokdumpur
                  </span>
                </div>
                <h3 className="font-title-sm text-title-sm text-on-surface font-bold mt-1">
                  Malda Mango &amp; Horticultural Research Station
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Barind Alluvial Soil Diagnostic &amp; Organic Depot, Malda
                  Town
                </p>
              </div>
              <button
                aria-label="Call Malda Research Station"
                onClick={() =>
                  onOpenHelplineModal(
                    '03512-252819',
                    'Malda Mango & Horticultural Research Station (Mokdumpur)'
                  )
                }
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary active:scale-95 transition-transform shrink-0 cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  call
                </span>
              </button>
            </div>
            <div className="flex items-center justify-between mt-2 bg-surface-container-low px-2.5 py-1.5 rounded-lg">
              <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  eco
                </span>
                <span>
                  {t(
                    'জৈব কার্বন (SOC) বিশ্লেষক যন্ত্র স্থাপিত',
                    'Soil Organic Carbon (SOC) Analyzer Installed'
                  )}
                </span>
              </div>
              <span className="font-label-sm text-label-sm font-bold text-primary shrink-0">
                Mon - Sat
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
