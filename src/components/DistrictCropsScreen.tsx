import React, { useState } from 'react';
import { IMAGES } from '../data/agriData';
import { useLanguage } from '../context/LanguageContext';

interface DistrictCropsScreenProps {
  onOpenPdfModal: (title: string, subtitle: string) => void;
  onOpenHelplineModal: (number: string, title: string) => void;
}

type SeasonFilterKey = 'all' | 'kharif' | 'rabi' | 'zaid';

interface SpotlightTerritory {
  id: string;
  pillLabelBn: string;
  pillLabelEn: string;
  nameBn: string;
  nameEn: string;
  zoneBadge: string;
  subtitleBn: string;
  subtitleEn: string;
  soilType: string;
  soilPh: string;
  rainfall: string;
  climateNoteBn: string;
  climateNoteEn: string;
  alertTitleBn: string;
  alertTitleEn: string;
  alertBodyBn: React.ReactNode;
  alertBodyEn: React.ReactNode;
}

const TERRITORIES: SpotlightTerritory[] = [
  {
    id: 'jalpaiguri',
    pillLabelBn: 'জলপাইগুড়ি (Jalpaiguri)',
    pillLabelEn: 'Jalpaiguri',
    nameBn: 'জলপাইগুড়ি (Jalpaiguri)',
    nameEn: 'Jalpaiguri (Terai & Dooars)',
    zoneBadge: 'Zone II (Terai)',
    subtitleBn:
      'তরাই ও ডুয়ার্স উপত্যকা • সাব-হিমালয়ান পলি ও অম্ল মৃত্তিকা বলয়',
    subtitleEn:
      'Terai & Dooars Valley • Sub-Himalayan Alluvial & Acid Soil Belt',
    soilType: 'Sandy Loam',
    soilPh: 'pH 4.8 – 5.5 (Acidic)',
    rainfall: '3,200 – 3,800 mm',
    climateNoteBn: 'উচ্চ আর্দ্রতা জলবায়ু',
    climateNoteEn: 'High Humidity Microclimate',
    alertTitleBn: 'বিশেষ মৃত্তিকা শোধন পরামর্শ (Soil Acidity Alert)',
    alertTitleEn: 'Special Soil Conditioning Advisory (Acid Soil Alert)',
    alertBodyBn: (
      <>
        তীব্র অ্যাসিডিক মৃত্তিকার কারণে ফসফরাস আটকে যায়। বপনের ১৫-২০ দিন পূর্বে
        বিঘাপ্রতি <strong>৪০-৫০ কেজি কৃষি ডলোমাইট</strong> (Agricultural
        Dolomite) বা চুন প্রয়োগ বাধ্যতামূলক।
      </>
    ),
    alertBodyEn: (
      <>
        Severe soil acidity locks up phosphorus. Broadcast{' '}
        <strong>40–50 kg Agricultural Dolomite per Bigha</strong> (15–20 days
        prior to sowing) to restore nutrient availability.
      </>
    ),
  },
  {
    id: 'coochbehar',
    pillLabelBn: 'কোচবিহার',
    pillLabelEn: 'Cooch Behar',
    nameBn: 'কোচবিহার (Cooch Behar)',
    nameEn: 'Cooch Behar (Teesta Plains)',
    zoneBadge: 'Zone II (Teesta Basin)',
    subtitleBn: 'তিস্তা-তোর্সা পলি সমভূমি • সোনালী পাট, রবি ভুট্টা ও আলু বলয়',
    subtitleEn: 'Teesta-Torsa Alluvial Plains • Jute, Winter Maize & Potato Hub',
    soilType: 'Alluvial Silt Loam',
    soilPh: 'pH 5.6 – 6.4 (Slightly Acidic)',
    rainfall: '2,600 – 3,100 mm',
    climateNoteBn: 'নদীবিধৌত আর্দ্র সমভূমি',
    climateNoteEn: 'Riverine Humid Floodplain',
    alertTitleBn: 'বোরন ও অনুখাদ্য ব্যবস্থাপনা (Micronutrient Alert)',
    alertTitleEn: 'Boron & Micronutrient Management',
    alertBodyBn: (
      <>
        হালকা বেলে-দোআঁশ মাটিতে বোরনের ঘাটতি প্রকট। রবি ভুট্টা, আলু ও তামাক চাষে
        বিঘাপ্রতি <strong>১.৫ কেজি বোরাক্স বা ১ গ্রাম/লিটার বোরন ২০%</strong>{' '}
        স্প্রে আবশ্যক।
      </>
    ),
    alertBodyEn: (
      <>
        Acute Boron deficiency in leached sandy-loam beds. Apply{' '}
        <strong>1.5 kg Borax/Bigha or 1g/L Boron 20% foliar spray</strong> for
        hybrid maize, potato, and tobacco.
      </>
    ),
  },
  {
    id: 'malda',
    pillLabelBn: 'মালদা (বরিন্দ)',
    pillLabelEn: 'Malda (Barind)',
    nameBn: 'মালদা (Malda - বরিন্দ ও দিয়ারা)',
    nameEn: 'Malda (Barind & Diara Tract)',
    zoneBadge: 'Zone III (Old Alluvium)',
    subtitleBn: 'গঙ্গাতীরবর্তী দিয়ারা ও বরিন্দ বলয় • জি আই আম, রেশম ও ডালশস্য',
    subtitleEn: 'Gangetic Diara & Barind Clay • GI Mango, Silk & Pulses',
    soilType: 'Clay Loam to Heavy Clay',
    soilPh: 'pH 6.5 – 7.5 (Neutral)',
    rainfall: '1,450 – 1,650 mm',
    climateNoteBn: 'উষ্ণ ও মধ্যম আর্দ্রতা',
    climateNoteEn: 'Warm Moderate Sub-Humid',
    alertTitleBn: 'আম বাগান ও রবি সরিষা পরিচর্যা (Orchard & Oilseed SOP)',
    alertTitleEn: 'Orchard Sanitation & Mustard Sulphur Protocol',
    alertBodyBn: (
      <>
        মুকুল আসার পূর্বে বাগানে <strong>কপার অক্সিক্লোরাইড (৩ গ্রাম/লি)</strong>{' '}
        ও হপার দমনে ইমিডাক্লোপ্রিড স্প্রে করুন। সরিষায় সালফার প্রয়োগে তেলের
        মাত্রা বৃদ্ধি পায়।
      </>
    ),
    alertBodyEn: (
      <>
        Spray <strong>Copper Oxychloride (3g/L)</strong> and Imidacloprid prior
        to mango panicle emergence. Apply Bentonite Sulphur in mustard for
        higher oil content.
      </>
    ),
  },
  {
    id: 'darjeeling',
    pillLabelBn: 'দার্জিলিং ও কালিম্পং',
    pillLabelEn: 'Darjeeling & Kalimpong',
    nameBn: 'দার্জিলিং ও কালিম্পং (Hill Zone)',
    nameEn: 'Darjeeling & Kalimpong (Hill Zone)',
    zoneBadge: 'Zone I (Hill Agro)',
    subtitleBn: 'পার্বত্য ধাপ চাষ • অর্থোডক্স চা, বড় এলাচ, আদা ও কমলালেবু',
    subtitleEn:
      'Terrace Hill Farming • Orthodox Tea, Large Cardamom & Mandarin',
    soilType: 'Humus Mountain Loam',
    soilPh: 'pH 4.5 – 5.2 (Acidic)',
    rainfall: '2,800 – 3,500 mm',
    climateNoteBn: 'নাতিশীতোষ্ণ পার্বত্য আবহাওয়া',
    climateNoteEn: 'Temperate Sub-Alpine',
    alertTitleBn: 'পার্বত্য মৃত্তিকা ক্ষয় ও ছত্রাক নিয়ন্ত্রণ',
    alertTitleEn: 'Terrace Erosion & Root Rot Bio-Control',
    alertBodyBn: (
      <>
        পাহাড়ি ঢালে কন্টুর পদ্ধতিতে চাষ করুন এবং বড় এলাচ ও কমলালেবুর গোড়া পচা
        রোগ রোধে <strong>ট্রাইকোডার্মা ভিরিডি সমৃদ্ধ গোবর সার</strong> ব্যবহার
        করুন।
      </>
    ),
    alertBodyEn: (
      <>
        Maintain contour terrace bunds and apply{' '}
        <strong>Trichoderma viride enriched organic manure</strong> to prevent
        collar rot in Mandarin orange and Large Cardamom.
      </>
    ),
  },
  {
    id: 'dinajpur',
    pillLabelBn: 'উঃ ও দঃ দিনাজপুর',
    pillLabelEn: 'U. & D. Dinajpur',
    nameBn: 'উত্তর ও দক্ষিণ দিনাজপুর',
    nameEn: 'Uttar & Dakshin Dinajpur',
    zoneBadge: 'Zone III (Grain Bowl)',
    subtitleBn: 'কুলিক-আত্রাই অববাহিকা • জি আই তুলাইপাঞ্জি ধান, ভুট্টা ও সরিষা',
    subtitleEn: 'Kulik-Atrai Basin • GI Tulaipanji Rice, Maize & Oilseeds',
    soilType: 'Loamy to Clay Loam',
    soilPh: 'pH 5.8 – 6.8 (Optimal)',
    rainfall: '1,650 – 1,950 mm',
    climateNoteBn: 'শস্য ভাণ্ডার কৃষি বলয়',
    climateNoteEn: 'Primary Grain Bowl Belt',
    alertTitleBn: 'তুলাইপাঞ্জি সুগন্ধি ধান ও ভুট্টা পরামর্শ',
    alertTitleEn: 'Tulaipanji Aromatic Paddy & Maize Advisory',
    alertBodyBn: (
      <>
        তুলাইপাঞ্জি ধানে সুগন্ধ অটুট রাখতে রাসায়নিক ইউরিয়ার বদলে{' '}
        <strong>কেঁচো সার ও পটাশ</strong> ব্যবহার করুন। ভুট্টার ফল আর্মি ওয়ার্ম
        দমনে ফেরোমন ট্র্যাপ বসান।
      </>
    ),
    alertBodyEn: (
      <>
        Avoid excess chemical urea in GI Tulaipanji paddy to preserve aroma and
        prevent lodging; use <strong>vermicompost & MOP</strong>. Install
        pheromone traps in maize.
      </>
    ),
  },
  {
    id: 'alipurduar',
    pillLabelBn: 'আলিপুরদুয়ার (ডুয়ার্স)',
    pillLabelEn: 'Alipurduar (Dooars)',
    nameBn: 'আলিপুরদুয়ার (Alipurduar - Dooars)',
    nameEn: 'Alipurduar (Eastern Dooars)',
    zoneBadge: 'Zone II (Eastern Dooars)',
    subtitleBn: 'ভুটান পাদদেশ ও ডুয়ার্স বনভূমি বলয় • চা, সুপারি ও মসলা ফসল',
    subtitleEn: 'Bhutan Foothills & Dooars Belt • Tea, Arecanut & Spices',
    soilType: 'Gravelly Sandy Loam',
    soilPh: 'pH 4.4 – 5.3 (Highly Acidic)',
    rainfall: '3,500 – 4,100 mm',
    climateNoteBn: 'অতি-বৃষ্টিপাত ডুয়ার্স বলয়',
    climateNoteEn: 'High-Rainfall Dooars Belt',
    alertTitleBn: 'জল নিকাশ ও ডলোমাইট চুন প্রয়োগ',
    alertTitleEn: 'Sub-Surface Drainage & Dolomite Application',
    alertBodyBn: (
      <>
        অতি-বৃষ্টিপাতে ক্যালসিয়াম ও ম্যাগনেসিয়াম ধুয়ে যায়। চা ও সুপারি
        বাগানে নিকাশি নালা গভীর রাখুন এবং নিয়মিত{' '}
        <strong>ডলোমাইট ও জিংক</strong> প্রয়োগ করুন।
      </>
    ),
    alertBodyEn: (
      <>
        Heavy monsoon leaches Calcium and Magnesium. Deepen drainage trenches in
        tea and arecanut gardens and broadcast{' '}
        <strong>Dolomite & Zinc Sulphate</strong>.
      </>
    ),
  },
  {
    id: 'siliguri',
    pillLabelBn: 'শিলিগুড়ি (তরাই)',
    pillLabelEn: 'Siliguri (Terai)',
    nameBn: 'শিলিগুড়ি মহকুমা (Siliguri Terai)',
    nameEn: 'Siliguri Subdivision (Terai Hub)',
    zoneBadge: 'Zone II (Terai Hub)',
    subtitleBn: 'মহানন্দা-বালাসন সমভূমি • আনারস (Giant Kew), চা ও শীতকালীন সবজি',
    subtitleEn:
      'Mahananda-Balason Plains • Giant Kew Pineapple, Tea & Vegetables',
    soilType: 'Terai Sandy Loam',
    soilPh: 'pH 4.8 – 5.5 (Acidic)',
    rainfall: '3,200 – 3,600 mm',
    climateNoteBn: 'আর্দ্র তরাই পাদদেশ',
    climateNoteEn: 'Humid Terai Piedmont',
    alertTitleBn: 'আনারস ও আগাম সবজি চাষ নির্দেশিকা',
    alertTitleEn: 'Pineapple Sucker Treatment & Early Vegetables',
    alertBodyBn: (
      <>
        ফাঁসিদেওয়া ও খড়িবাড়ি ব্লকে জায়ান্ট কিউ আনারসের হার্ট রট (Heart Rot)
        রোধে চারা রোপণের পূর্বে <strong>ম্যানকোজেব + মেটালাক্সিল</strong> দ্রবণে
        শোধন করুন।
      </>
    ),
    alertBodyEn: (
      <>
        Dip Giant Kew pineapple suckers in{' '}
        <strong>Mancozeb + Metalaxyl solution</strong> prior to planting in
        Phansidewa & Kharibari blocks to prevent Heart Rot.
      </>
    ),
  },
];

export const DistrictCropsScreen: React.FC<DistrictCropsScreenProps> = ({
  onOpenPdfModal,
  onOpenHelplineModal,
}) => {
  const { t, tn } = useLanguage();
  const [selectedTerritoryId, setSelectedTerritoryId] =
    useState<string>('jalpaiguri');
  const [selectedSeason, setSelectedSeason] = useState<SeasonFilterKey>('all');
  const [expandedAccordion, setExpandedAccordion] = useState<
    Record<string, boolean>
  >({
    coochbehar: false,
    malda: false,
    darjeeling: false,
    dinajpur: false,
  });

  const activeTerritory =
    TERRITORIES.find((item) => item.id === selectedTerritoryId) ||
    TERRITORIES[0];

  const toggleAccordion = (id: string) => {
    setExpandedAccordion((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDistrictTabClick = (id: string) => {
    setSelectedTerritoryId(id);
    if (['coochbehar', 'malda', 'darjeeling', 'dinajpur'].includes(id)) {
      setExpandedAccordion((prev) => ({ ...prev, [id]: true }));
    }
  };

  const showCrop = (seasons: SeasonFilterKey[]) =>
    selectedSeason === 'all' || seasons.includes(selectedSeason);

  return (
    <div className="flex flex-col w-full -mx-margin">
      {/* District Directory Hero & Selector */}
      <div className="px-margin pt-space-md pb-space-sm">
        <div className="flex items-center justify-between gap-space-xs mb-space-xs">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-[16px] text-primary icon-filled">
              eco
            </span>
            {t('উত্তরবঙ্গ ৮ জেলা শস্য পঞ্জিকা', 'North Bengal 8-District Almanac')}
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-primary-container"></span>
            {t('লাইভ ফিল্ড ডেটা', 'Live Field Data')}
          </span>
        </div>
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight">
          {t('জেলা ভিত্তিক ফসল নির্দেশিকা', 'District-Wise Crop Directory')}
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
          {t(
            'উত্তরবঙ্গের মৃত্তিকা অনুপাত, উপ-হিমালয় আবহাওয়া ও সর্বাধিক লাভজনক জাত বিন্যাস',
            'Soil ratios, sub-Himalayan microclimates & highest-yielding crop varieties'
          )}
        </p>
      </div>

      {/* District Carousel Tabs */}
      <div className="w-full overflow-x-auto no-scrollbar px-margin py-space-xs flex items-center gap-space-xs scroll-smooth">
        {TERRITORIES.map((territory) => {
          const isSelected = selectedTerritoryId === territory.id;
          return (
            <button
              key={territory.id}
              type="button"
              onClick={() => handleDistrictTabClick(territory.id)}
              className={
                isSelected
                  ? 'flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md shadow-sm cursor-pointer transition-colors'
                  : 'flex-shrink-0 flex items-center gap-1 px-3.5 py-2 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors font-label-md text-label-md cursor-pointer'
              }
            >
              {isSelected && (
                <span className="material-symbols-outlined text-[16px]">
                  check_circle
                </span>
              )}
              <span>{t(territory.pillLabelBn, territory.pillLabelEn)}</span>
            </button>
          );
        })}
      </div>

      {/* Selected District Profile Bento */}
      <section className="px-margin mt-space-md">
        <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
          <div className="flex items-start justify-between gap-space-sm mb-space-sm">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-primary-fixed text-primary font-headline-sm text-headline-sm">
                  <span className="material-symbols-outlined text-[18px]">
                    nature
                  </span>
                </span>
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold block">
                    {t('সক্রিয় অঞ্চল', 'Active Territory')}
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-primary leading-tight">
                    {t(activeTerritory.nameBn, activeTerritory.nameEn)}
                  </h3>
                </div>
              </div>
              <p className="font-label-md text-label-md text-on-surface-variant mt-1">
                {t(activeTerritory.subtitleBn, activeTerritory.subtitleEn)}
              </p>
            </div>
            <span className="inline-flex px-2.5 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm text-right flex-shrink-0">
              {activeTerritory.zoneBadge}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-space-xs mt-space-sm mb-space-md">
            <div className="p-2.5 rounded-lg bg-surface-container-low flex flex-col justify-between">
              <div className="flex items-center gap-1 text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  landslide
                </span>
                <span className="font-label-sm text-label-sm">
                  {t('মৃত্তিকা ধরন ও অম্লতা', 'Soil Type & pH')}
                </span>
              </div>
              <div className="mt-1">
                <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                  {activeTerritory.soilType}
                </span>
                <span className="block font-label-sm text-label-sm text-primary font-medium">
                  {activeTerritory.soilPh}
                </span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-surface-container-low flex flex-col justify-between">
              <div className="flex items-center gap-1 text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px] text-secondary">
                  rainy
                </span>
                <span className="font-label-sm text-label-sm">
                  {t('বার্ষিক গড় বৃষ্টিপাত', 'Mean Annual Rainfall')}
                </span>
              </div>
              <div className="mt-1">
                <span className="font-title-sm text-title-sm text-on-surface font-semibold tabular-nums">
                  {activeTerritory.rainfall}
                </span>
                <span className="block font-label-sm text-label-sm text-secondary font-medium">
                  {t(
                    activeTerritory.climateNoteBn,
                    activeTerritory.climateNoteEn
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-secondary-fixed/50 p-space-sm flex items-start gap-space-sm">
            <span className="material-symbols-outlined text-[20px] text-on-secondary-fixed-variant flex-shrink-0 mt-0.5">
              warning
            </span>
            <div className="min-w-0">
              <p className="font-label-sm text-label-sm text-on-secondary-fixed-variant font-semibold">
                {t(activeTerritory.alertTitleBn, activeTerritory.alertTitleEn)}
              </p>
              <p className="font-body-sm text-body-sm text-on-secondary-fixed-variant mt-0.5 leading-snug">
                {tn(activeTerritory.alertBodyBn, activeTerritory.alertBodyEn)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Season Switcher */}
      <section className="px-margin mt-space-lg">
        <div className="flex items-center justify-between mb-space-sm">
          <h3 className="font-title-md text-title-md text-primary flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[20px] text-primary">
              calendar_month
            </span>
            {t('প্রধান ফসল পঞ্জিকা', 'Primary Crop Portfolio')}
          </h3>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            {t('৪টি মূল ফসল', '4 Key Crops')}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-surface-container mb-space-md">
          {(
            [
              { id: 'all', labelBn: 'সব ঋতু', labelEn: 'All Seasons' },
              { id: 'kharif', labelBn: 'খরিফ', labelEn: 'Kharif' },
              { id: 'rabi', labelBn: 'রবি', labelEn: 'Rabi' },
              { id: 'zaid', labelBn: 'জায়েদ', labelEn: 'Zaid' },
            ] as { id: SeasonFilterKey; labelBn: string; labelEn: string }[]
          ).map((btn) => {
            const isSelected = selectedSeason === btn.id;
            return (
              <button
                key={btn.id}
                type="button"
                onClick={() => setSelectedSeason(btn.id)}
                className={
                  isSelected
                    ? 'py-2 px-1 rounded-lg text-center font-label-sm text-label-sm font-medium bg-primary text-on-primary shadow-sm transition-all cursor-pointer'
                    : 'py-2 px-1 rounded-lg text-center font-label-sm text-label-sm font-medium bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-all cursor-pointer'
                }
              >
                {t(btn.labelBn, btn.labelEn)}
              </button>
            );
          })}
        </div>

        {/* Crop Cards List */}
        <div className="flex flex-col gap-space-md">
          {/* Crop 1: Tea */}
          {showCrop(['zaid', 'kharif']) && (
            <article className="rounded-xl bg-surface-container-lowest overflow-hidden shadow-sm transition-all">
              <div className="p-space-md">
                <div className="flex items-start justify-between gap-space-sm mb-space-xs">
                  <div className="min-w-0">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm">
                      {t('ডুয়ার্স অর্থকরী শস্য', 'Dooars Cash Plantation')}
                    </span>
                    <h4 className="font-title-lg text-title-lg text-on-surface mt-1">
                      {t(
                        'উত্তরবঙ্গ চা (CTC & Green Tea)',
                        'North Bengal Tea (CTC & Green Tea)'
                      )}
                    </h4>
                    <p className="font-label-md text-label-md text-on-surface-variant">
                      {t(
                        'Camellia sinensis • নিরবচ্ছিন্ন উত্তোলন (March – Nov)',
                        'Camellia sinensis • Continuous Plucking (March – Nov)'
                      )}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[24px] text-primary">
                      energy_savings_leaf
                    </span>
                  </div>
                </div>

                <div className="mt-space-sm grid grid-cols-2 gap-space-xs">
                  <div className="p-2 rounded bg-surface-container-low">
                    <span className="font-label-sm text-label-sm text-on-surface-variant block">
                      {t('প্রধান বাগান এলাকা', 'Primary Estate Belts')}
                    </span>
                    <span className="font-label-md text-label-md text-primary font-medium">
                      {t(
                        'মালবাজার, ময়নাগুড়ি, ধূপগুড়ি',
                        'Malbazar, Maynaguri, Dhupguri'
                      )}
                    </span>
                  </div>
                  <div className="p-2 rounded bg-surface-container-low">
                    <span className="font-label-sm text-label-sm text-on-surface-variant block">
                      {t('প্রস্তাবিত ক্লোন ও ফলন', 'Recommended Clones & Yield')}
                    </span>
                    <span className="font-label-md text-label-md text-on-surface font-medium">
                      {t(
                        'TV-23, TV-25 (১৮০০-২৪০০ কেজি/হেক্টর)',
                        'TV-23, TV-25 (1800–2400 kg/ha)'
                      )}
                    </span>
                  </div>
                </div>

                <div className="mt-space-sm p-space-sm rounded-lg bg-surface-container">
                  <div className="flex items-center gap-1 text-primary mb-1">
                    <span className="material-symbols-outlined text-[16px]">
                      science
                    </span>
                    <span className="font-label-sm text-label-sm font-semibold">
                      {t(
                        'আকাশদীপ প্রিসিশন নিউট্রিশন ও রোগ নিয়ন্ত্রণ',
                        'Akashdeep Precision Nutrition & Disease Control'
                      )}
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface">
                    {tn(
                      <>
                        ছাঁটাইয়ের পর অণুখাদ্য স্প্রে:{' '}
                        <strong>জিঙ্ক ০.৫% + বোরন ০.২%</strong>। ডুয়ার্সের
                        বৃষ্টিবহুল ছায়াযুক্ত ব্লকে ব্লিস্টার ব্লাইট (Blister
                        Blight) দমনে{' '}
                        <strong>
                          Copper Oxychloride 50 WP (২.৫ গ্রাম/লিটার)
                        </strong>{' '}
                        স্প্রে আবশ্যক।
                      </>,
                      <>
                        Post-pruning foliar spray:{' '}
                        <strong>Zinc 0.5% + Boron 0.2%</strong>. Spray{' '}
                        <strong>Copper Oxychloride 50 WP (2.5 g/L)</strong> to
                        control Blister Blight in shaded Dooars blocks.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </article>
          )}

          {/* Crop 2: Aman & Boro Paddy */}
          {showCrop(['kharif', 'rabi']) && (
            <article className="rounded-xl bg-surface-container-lowest overflow-hidden shadow-sm transition-all">
              <div className="p-space-md">
                <div className="flex items-start justify-between gap-space-sm mb-space-xs">
                  <div className="min-w-0">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">
                      {t('প্রধান খাদ্যশস্য', 'Primary Staple Cereal')}
                    </span>
                    <h4 className="font-title-lg text-title-lg text-on-surface mt-1">
                      {t(
                        'আমন ও বোরো ধান (Paddy Matrix)',
                        'Aman & Boro Paddy Matrix'
                      )}
                    </h4>
                    <p className="font-label-md text-label-md text-on-surface-variant">
                      {t(
                        'Kharif (জুন-নভেম্বর) / Boro (ডিসেম্বর-এপ্রিল)',
                        'Kharif (June–Nov) / Boro (Dec–April)'
                      )}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[24px] text-secondary">
                      grain
                    </span>
                  </div>
                </div>

                <div className="mt-space-sm grid grid-cols-2 gap-space-xs">
                  <div className="p-2 rounded bg-surface-container-low">
                    <span className="font-label-sm text-label-sm text-on-surface-variant block">
                      {t(
                        'জলমগ্নতা সহনশীল জাত',
                        'Submergence-Tolerant Varieties'
                      )}
                    </span>
                    <span className="font-label-md text-label-md text-on-surface font-medium">
                      {t(
                        'স্বর্ণ সাব-১, MTU ১০১০, গোবিন্দভোগ',
                        'Swarna Sub-1, MTU 1010, Gobindobhog'
                      )}
                    </span>
                  </div>
                  <div className="p-2 rounded bg-surface-container-low">
                    <span className="font-label-sm text-label-sm text-on-surface-variant block">
                      {t('জমি ও সেচ ব্যবস্থাপনা', 'Soil & Water Regimen')}
                    </span>
                    <span className="font-label-md text-label-md text-primary font-medium">
                      {t(
                        'পলি দোআঁশ; কুশি অবস্থায় ৫-১০ সেমি জল',
                        'Silt loam; 5–10 cm water at tillering'
                      )}
                    </span>
                  </div>
                </div>

                <div className="mt-space-sm p-space-sm rounded-lg bg-surface-container">
                  <div className="flex items-center gap-1 text-primary mb-1">
                    <span className="material-symbols-outlined text-[16px]">
                      compost
                    </span>
                    <span className="font-label-sm text-label-sm font-semibold">
                      {t(
                        'মূল সার মাত্রা (বিঘা প্রতি বেসাল ডোজ)',
                        'Basal Fertilizer Dose (Per Bigha)'
                      )}
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface">
                    {t(
                      'DAP ১৫ কেজি + MOP ১০ কেজি + জিঙ্ক সালফেট (হেপ্টাহাইড্রেট) ৩.৫ কেজি শেষ চাষে মাটিতে সমহারে মেশাতে হবে।',
                      'Incorporate DAP 15 kg + MOP 10 kg + Zinc Sulphate Heptahydrate 3.5 kg uniformly during final puddling.'
                    )}
                  </p>
                </div>
              </div>
            </article>
          )}

          {/* Crop 3: Tossa Jute */}
          {showCrop(['zaid']) && (
            <article className="rounded-xl bg-surface-container-lowest overflow-hidden shadow-sm transition-all">
              <div className="p-space-md">
                <div className="flex items-start justify-between gap-space-sm mb-space-xs">
                  <div className="min-w-0">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm">
                      {t('প্রাক-খরিফ অর্থকরী আঁশ', 'Pre-Kharif Golden Fiber')}
                    </span>
                    <h4 className="font-title-lg text-title-lg text-on-surface mt-1">
                      {t(
                        'তোষা পাট (Tossa Jute - সোনালী আঁশ)',
                        'Tossa Jute (Golden Fiber)'
                      )}
                    </h4>
                    <p className="font-label-md text-label-md text-on-surface-variant">
                      {t(
                        'বপন: মার্চ-এপ্রিল • কর্তন: জুলাই-আগস্ট',
                        'Sowing: March–April • Harvest: July–August'
                      )}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[24px] text-primary">
                      psychiatry
                    </span>
                  </div>
                </div>

                <div className="mt-space-sm grid grid-cols-2 gap-space-xs">
                  <div className="p-2 rounded bg-surface-container-low">
                    <span className="font-label-sm text-label-sm text-on-surface-variant block">
                      {t('প্রমাণিত উচ্চফলনশীল জাত', 'Certified High-Yield Seeds')}
                    </span>
                    <span className="font-label-md text-label-md text-on-surface font-medium">
                      JRO-524 (Navin), JRO-204
                    </span>
                  </div>
                  <div className="p-2 rounded bg-surface-container-low">
                    <span className="font-label-sm text-label-sm text-on-surface-variant block">
                      {t('শস্য আবর্তন সুবিধা', 'Crop Rotation Benefit')}
                    </span>
                    <span className="font-label-md text-label-md text-primary font-medium">
                      {t(
                        'আমন রোপণের পূর্বে পাতার জৈব সার বৃদ্ধি',
                        'Enriches soil organic matter pre-Aman'
                      )}
                    </span>
                  </div>
                </div>

                <div className="mt-space-sm p-space-sm rounded-lg bg-surface-container">
                  <p className="font-body-sm text-body-sm text-on-surface">
                    <strong className="text-primary">
                      {t('আঁশ পচানোর আধুনিক পদ্ধতি:', 'Modern Retting Protocol:')}
                    </strong>{' '}
                    {t(
                      'ক্রাইপাফ সোনা (CRIJAF Sona) অনুজীব কালচার প্রয়োগে মাত্র ১২-১৫ দিনে উজ্জ্বল চকচকে উচ্চমানের সোনালী আঁশ তৈরি হয়।',
                      'Applying CRIJAF Sona microbial consortium completes retting in 12–15 days with lustrous TD5 grade golden fiber.'
                    )}
                  </p>
                </div>
              </div>
            </article>
          )}

          {/* Crop 4: Ginger & Turmeric */}
          {showCrop(['kharif', 'zaid']) && (
            <article className="rounded-xl bg-surface-container-lowest overflow-hidden shadow-sm transition-all">
              <div className="p-space-md">
                <div className="flex items-start justify-between gap-space-sm mb-space-xs">
                  <div className="min-w-0">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">
                      {t('উচ্চমূল্য মসলা ফসল', 'High-Value Spice Intercrop')}
                    </span>
                    <h4 className="font-title-lg text-title-lg text-on-surface mt-1">
                      {t(
                        'হলুদ ও আদা (Turmeric & Ginger)',
                        'Turmeric & Ginger (Rhizome Spices)'
                      )}
                    </h4>
                    <p className="font-label-md text-label-md text-on-surface-variant">
                      {t(
                        'ডুয়ার্সের ছায়াযুক্ত বাগানের সাথী ফসল হিসেবে আদর্শ',
                        'Ideal companion intercrop in shaded Dooars plantations'
                      )}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[24px] text-secondary">
                      spa
                    </span>
                  </div>
                </div>

                <div className="mt-space-sm grid grid-cols-2 gap-space-xs">
                  <div className="p-2 rounded bg-surface-container-low">
                    <span className="font-label-sm text-label-sm text-on-surface-variant block">
                      {t('উন্নত প্রজাতি', 'Improved Varieties')}
                    </span>
                    <span className="font-label-md text-label-md text-on-surface font-medium">
                      {t(
                        'সুরঞ্জনা (হলুদ), নদীয়া (আদা)',
                        'Suranjana (Turmeric), Nadia (Ginger)'
                      )}
                    </span>
                  </div>
                  <div className="p-2 rounded bg-surface-container-low">
                    <span className="font-label-sm text-label-sm text-on-surface-variant block">
                      {t('কন্দ পচন প্রতিরোধ', 'Rhizome Rot Defense')}
                    </span>
                    <span className="font-label-md text-label-md text-primary font-medium">
                      {t(
                        'ট্রাইকোডার্মা ভিরিডি শোধন',
                        'Trichoderma Viride Seed Dip'
                      )}
                    </span>
                  </div>
                </div>

                <div className="mt-space-sm p-space-sm rounded-lg bg-surface-container">
                  <p className="font-body-sm text-body-sm text-on-surface">
                    <strong className="text-secondary">
                      {t(
                        'বীজ কন্দ শোধন প্রোটোকল:',
                        'Rhizome Seed Treatment SOP:'
                      )}
                    </strong>{' '}
                    {t(
                      'রোপণের পূর্বে প্রতি কেজি বীজে ট্রাইকোডার্মা ভিরিডি ১০ গ্রাম বা কার্বেনডাজিম ২ গ্রাম মিশিয়ে ৩০ মিনিট ছায়ায় শুকিয়ে রোপণ করুন।',
                      'Treat seed rhizomes with 10g Trichoderma viride or 2g Carbendazim per kg of seed, shade-dry for 30 minutes before planting.'
                    )}
                  </p>
                </div>
              </div>
            </article>
          )}
        </div>
      </section>

      {/* Visual Photo Gallery Divider */}
      <section className="px-margin mt-space-lg">
        <div className="relative overflow-hidden rounded-xl h-44 shadow-sm">
          <div
            className="bg-cover bg-center w-full h-full flex flex-col justify-end p-space-md"
            style={{ backgroundImage: `url('${IMAGES.dooarsTeaBanner}')` }}
          >
            <div className="bg-inverse-surface/80 backdrop-blur-md rounded-lg p-space-sm text-inverse-on-surface">
              <p className="font-label-sm text-label-sm text-primary-fixed uppercase tracking-wider font-semibold">
                {t('ডুয়ার্স ও তরাই কৃষিক্ষেত্র', 'Dooars & Terai Agro-Belt')}
              </p>
              <p className="font-title-sm text-title-sm leading-snug">
                {t(
                  'উঁচু বৃষ্টিপাত ও আর্দ্রতার নিবিড় সমন্বয়: চা এবং ধান-পাটের নিবিড় চাষচক্র',
                  'High-rainfall sub-Himalayan synergy: Intensive tea, paddy, and golden jute cropping cycles'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-District Comprehensive Comparison Grid */}
      <section className="px-margin mt-space-xl">
        <div className="flex items-center justify-between mb-space-sm">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-primary">
              {t(
                'উত্তরবঙ্গের অন্যান্য জেলার বিশেষ ফসল',
                'Specialized Crops Across North Bengal Districts'
              )}
            </h3>
            <p className="font-label-md text-label-md text-on-surface-variant">
              {t(
                'মৃত্তিকা গঠন ও বিশেষ কৃষিবৈশিষ্ট্য অনুযায়ী তুলনামূলক বিশ্লেষণ',
                'Comparative breakdown by soil structure and regional agronomy'
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-space-sm">
          {/* District 1: Cooch Behar */}
          <div className="rounded-xl bg-surface-container-lowest overflow-hidden shadow-sm">
            <button
              className="w-full p-space-md flex items-center justify-between text-left hover:bg-surface-container-low transition-colors cursor-pointer"
              onClick={() => toggleAccordion('coochbehar')}
              type="button"
            >
              <div className="flex items-center gap-space-sm">
                <span className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary font-bold shrink-0">
                  {t('০২', '02')}
                </span>
                <div>
                  <h4 className="font-title-md text-title-md text-on-surface">
                    {t('কোচবিহার (Cooch Behar)', 'Cooch Behar')}
                  </h4>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    {t(
                      'তরাই পলি দোআঁশ • তামাক, রবি ভুট্টা ও আলু প্রধান কেন্দ্র',
                      'Terai Silt Loam • Tobacco, Winter Maize & Potato Hub'
                    )}
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant">
                {expandedAccordion.coochbehar
                  ? 'keyboard_arrow_up'
                  : 'keyboard_arrow_down'}
              </span>
            </button>
            {expandedAccordion.coochbehar && (
              <div className="px-space-md pb-space-md pt-0">
                <div className="p-space-sm rounded-lg bg-surface-container-low space-y-space-xs text-on-surface">
                  <div>
                    <span className="font-label-sm text-label-sm text-secondary font-semibold">
                      {t('অনুকূল প্রধান ফসল:', 'Primary Crops:')}
                    </span>
                    <p className="font-body-sm text-body-sm">
                      {t(
                        'মতিহারী ও জাতি তামাক, রবি হাইব্রিড ভুট্টা (Maize), কুফরী জ্যোতি ও পোখরাজ আলু, প্রাক-খরিফ পাট।',
                        'Motihari & Jati Tobacco, Rabi Hybrid Maize, Kufri Jyoti & Pukhraj Potato, Pre-Kharif Tossa Jute.'
                      )}
                    </p>
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm text-primary font-semibold">
                      {t('মৃত্তিকা ও জলবায়ু বৈশিষ্ট্য:', 'Soil & Climate:')}
                    </span>
                    <p className="font-body-sm text-body-sm">
                      {t(
                        'হালকা বেলে দোআঁশ, জল নিষ্কাশন অত্যন্ত দ্রুত। জৈব কার্বনের অভাব রোধে ট্রানজিট সার গুরুত্বপূর্ণ।',
                        'Light sandy-silt loam with rapid drainage. Green manuring and organic FYM are vital to maintain organic carbon.'
                      )}
                    </p>
                  </div>
                  <div className="p-2 rounded bg-surface-container">
                    <p className="font-label-sm text-label-sm text-primary font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">
                        verified
                      </span>
                      <span>
                        {t(
                          'পরামর্শ: রবি ভুট্টার মোচা পুষ্ট করতে এবং তামাক পাতায় বোরন ২০% (১ গ্রাম/লি) স্প্রে অপরিহার্য।',
                          'Advisory: Foliar spray of Boron 20% (1 g/L) is essential for cob filling in winter maize and leaf quality in tobacco.'
                        )}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* District 2: Malda */}
          <div className="rounded-xl bg-surface-container-lowest overflow-hidden shadow-sm">
            <button
              className="w-full p-space-md flex items-center justify-between text-left hover:bg-surface-container-low transition-colors cursor-pointer"
              onClick={() => toggleAccordion('malda')}
              type="button"
            >
              <div className="flex items-center gap-space-sm">
                <span className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary font-bold shrink-0">
                  {t('০৩', '03')}
                </span>
                <div>
                  <h4 className="font-title-md text-title-md text-on-surface">
                    {t(
                      'মালদা (Malda - বরিন্দ ও দিয়ারা)',
                      'Malda (Barind & Diara)'
                    )}
                  </h4>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    {t(
                      'গঙ্গাতীরবর্তী উর্বর পলি • জি আই আম, রেশম ও মাখনা হাব',
                      'Fertile Gangetic Alluvium • GI Mango, Mulberry Silk & Makhana'
                    )}
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant">
                {expandedAccordion.malda
                  ? 'keyboard_arrow_up'
                  : 'keyboard_arrow_down'}
              </span>
            </button>
            {expandedAccordion.malda && (
              <div className="px-space-md pb-space-md pt-0">
                <div className="p-space-sm rounded-lg bg-surface-container-low space-y-space-xs text-on-surface">
                  <div>
                    <span className="font-label-sm text-label-sm text-secondary font-semibold">
                      {t('অনুকূল প্রধান ফসল:', 'Primary Crops:')}
                    </span>
                    <p className="font-body-sm text-body-sm">
                      {t(
                        'মালদা জি আই আম (ফজলি, হিমসাগর, ল্যাংড়া, লক্ষ্মণভোগ), রেশম তুঁত চাষ, তাল অঞ্চলের মাখনা (Foxnut), রবি সরিষা।',
                        'Malda GI Mangoes (Fazli, Himsagar, Langra, Lakshmanbhog), Mulberry Sericulture, Tal-belt Foxnut (Makhana), Mustard.'
                      )}
                    </p>
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm text-primary font-semibold">
                      {t('মৃত্তিকা বৈশিষ্ট্য:', 'Soil Profile:')}
                    </span>
                    <p className="font-body-sm text-body-sm">
                      {t(
                        'গঙ্গীয় পুরোনো অ্যালুভিয়াম ও এঁটেল পলি (pH ৬.৫ - ৭.৮)। অত্যন্ত উর্বর এবং পটাশ সমৃদ্ধ।',
                        'Gangetic old alluvium and clay-silt loams (pH 6.5–7.8). Naturally rich in potash and high moisture retention.'
                      )}
                    </p>
                  </div>
                  <div className="p-2 rounded bg-surface-container">
                    <p className="font-label-sm text-label-sm text-primary font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">
                        verified
                      </span>
                      <span>
                        {t(
                          'পোকামাকড় সতর্কবার্তা: আমের মুকুলে হপার পোকা দমনে ইমিডাক্লোপ্রিড ১৭.৮% SL এবং পাউডারি মিলডিউয়ে হেক্সাকোনাজোল আগাম স্প্রে করুন।',
                          'Pest Advisory: Prophylactic spray of Imidacloprid 17.8% SL against Mango Hopper and Hexaconazole against Powdery Mildew.'
                        )}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* District 3: Darjeeling & Kalimpong */}
          <div className="rounded-xl bg-surface-container-lowest overflow-hidden shadow-sm">
            <button
              className="w-full p-space-md flex items-center justify-between text-left hover:bg-surface-container-low transition-colors cursor-pointer"
              onClick={() => toggleAccordion('darjeeling')}
              type="button"
            >
              <div className="flex items-center gap-space-sm">
                <span className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary font-bold shrink-0">
                  {t('০৪', '04')}
                </span>
                <div>
                  <h4 className="font-title-md text-title-md text-on-surface">
                    {t(
                      'দার্জিলিং ও কালিম্পং (Hill Agro-System)',
                      'Darjeeling & Kalimpong (Hill Agro-System)'
                    )}
                  </h4>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    {t(
                      'পাহাড় ও পাদদেশ • অর্থোডক্স জি আই চা, এলাচ ও কমলালেবু',
                      'Mountain Terraces • Orthodox GI Tea, Large Cardamom & Mandarin'
                    )}
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant">
                {expandedAccordion.darjeeling
                  ? 'keyboard_arrow_up'
                  : 'keyboard_arrow_down'}
              </span>
            </button>
            {expandedAccordion.darjeeling && (
              <div className="px-space-md pb-space-md pt-0">
                <div className="p-space-sm rounded-lg bg-surface-container-low space-y-space-xs text-on-surface">
                  <div>
                    <span className="font-label-sm text-label-sm text-secondary font-semibold">
                      {t('অনুকূল প্রধান ফসল:', 'Primary Crops:')}
                    </span>
                    <p className="font-body-sm text-body-sm">
                      {t(
                        'দার্জিলিং অর্থোডক্স চা, বড় এলাচ (Large Cardamom), মান্দারিন পাহাড়ি কমলালেবু, জি আই ডাল্লে খোরসানি লঙ্কা (Dalle Khursani)।',
                        'Darjeeling Orthodox Tea, Large Cardamom, Mandarin Hill Orange, GI Dalle Khursani Chili, Ginger.'
                      )}
                    </p>
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm text-primary font-semibold">
                      {t('মৃত্তিকা ও আবহাওয়া:', 'Soil & Climate:')}
                    </span>
                    <p className="font-body-sm text-body-sm">
                      {t(
                        'নাতিশীতোষ্ণ পার্বত্য ঢালু মৃত্তিকা, উচ্চ হিউমাসযুক্ত, সুনিষ্কাশিত অম্ল মাটি (pH ৪.৫ - ৫.২)।',
                        'Temperate sloping forest loam, rich in organic humus, well-drained acidic soil (pH 4.5–5.2).'
                      )}
                    </p>
                  </div>
                  <div className="p-2 rounded bg-surface-container">
                    <p className="font-label-sm text-label-sm text-primary font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">
                        verified
                      </span>
                      <span>
                        {t(
                          'পরামর্শ: পাহাড়ি ধস রোধ ও বড় এলাচে চিরকে-ফোড়কে ভাইরাস প্রতিরোধে নিয়মিত ছায়াতরু ও পরিমিত তামাঘটিত ছত্রাকনাশক ব্যবহার্য।',
                          'Advisory: Maintain Alnus shade trees and apply copper fungicides to manage Chirke & Foorkey viral/fungal complexes in cardamom.'
                        )}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* District 4: Uttar & Dakshin Dinajpur */}
          <div className="rounded-xl bg-surface-container-lowest overflow-hidden shadow-sm">
            <button
              className="w-full p-space-md flex items-center justify-between text-left hover:bg-surface-container-low transition-colors cursor-pointer"
              onClick={() => toggleAccordion('dinajpur')}
              type="button"
            >
              <div className="flex items-center gap-space-sm">
                <span className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary font-bold shrink-0">
                  {t('০৫', '05')}
                </span>
                <div>
                  <h4 className="font-title-md text-title-md text-on-surface">
                    {t(
                      'উত্তর ও দক্ষিণ দিনাজপুর (শস্য ভাণ্ডার)',
                      'Uttar & Dakshin Dinajpur (Grain Bowl)'
                    )}
                  </h4>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    {t(
                      'বরিন্দ লালচে এঁটেল মাটি • সুগন্ধি তুলাইপাঞ্জি ও রবি ডালশস্য',
                      'Barind Reddish Clay Loam • GI Tulaipanji Rice & Winter Pulses'
                    )}
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant">
                {expandedAccordion.dinajpur
                  ? 'keyboard_arrow_up'
                  : 'keyboard_arrow_down'}
              </span>
            </button>
            {expandedAccordion.dinajpur && (
              <div className="px-space-md pb-space-md pt-0">
                <div className="p-space-sm rounded-lg bg-surface-container-low space-y-space-xs text-on-surface">
                  <div>
                    <span className="font-label-sm text-label-sm text-secondary font-semibold">
                      {t('অনুকূল প্রধান ফসল:', 'Primary Crops:')}
                    </span>
                    <p className="font-body-sm text-body-sm">
                      {t(
                        'তুলাইপাঞ্জি সুগন্ধি চাল (GI Tulaipanji Rice), তুলসীভোগ, রবি সরিষা (Pusa Bold), মসুর ও ছোলার সুষম ডাল শস্যচক্র।',
                        'GI Tulaipanji Aromatic Rice, Tulsibhog, Rabi Mustard (Pusa Bold), Lentil & Chickpea pulse rotation.'
                      )}
                    </p>
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm text-primary font-semibold">
                      {t('মৃত্তিকা বৈশিষ্ট্য:', 'Soil Profile:')}
                    </span>
                    <p className="font-body-sm text-body-sm">
                      {t(
                        'বরিন্দ বলয়ের শক্ত লালচে-হলুদ ভারী এঁটেল দোআঁশ; পটাশ স্বাভাবিক থাকলেও ফসফেটের ঘাটতি সুস্পষ্ট।',
                        'Firm reddish-yellow Barind clay loam; adequate potash but noticeable phosphate deficiency.'
                      )}
                    </p>
                  </div>
                  <div className="p-2 rounded bg-surface-container">
                    <p className="font-label-sm text-label-sm text-primary font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">
                        verified
                      </span>
                      <span>
                        {t(
                          'সুপারিশ: তুলাইপাঞ্জি ধানে অতিরিক্ত নাইট্রোজেন সার বর্জনীয়, অন্যথায় সুগন্ধ নষ্ট হয় ও গাছ ঢলে পড়ে।',
                          'Recommendation: Avoid excess nitrogen in Tulaipanji rice to prevent lodging and preserve natural grain aroma.'
                        )}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Utility: Download & KVK Directory */}
      <section className="px-margin mt-space-xl mb-space-md">
        <div className="rounded-xl bg-primary text-on-primary p-space-md shadow-md relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-secondary-fixed text-[22px]">
                download_for_offline
              </span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary-fixed font-semibold">
                Offline Krishi Kit
              </span>
            </div>
            <h3 className="font-title-lg text-title-lg font-bold text-on-primary">
              {t(
                'সম্পূর্ণ উত্তরবঙ্গ শস্য ডিরেক্টরি ডাউনলোড করুন',
                'Download Complete North Bengal Crop Directory'
              )}
            </h3>
            <p className="font-body-sm text-body-sm text-on-primary-container mt-1">
              {t(
                'ইন্টারনেট সংযোগ ছাড়াই মাঠপর্যায়ে ব্যবহারের জন্য ৮টি জেলার পূর্ণাঙ্গ ডোজ ও বীজ তালিকা সমৃদ্ধ PDF গাইড।',
                'Complete 8-district offline PDF guide with verified fertilizer dosages and certified seed varieties.'
              )}
            </p>
            <div className="mt-space-md flex flex-col gap-space-xs">
              <button
                onClick={() =>
                  onOpenPdfModal(
                    t(
                      'অফলাইন শস্য পঞ্জিকা PDF (৮.৪ MB)',
                      'Offline District Crop Almanac PDF (8.4 MB)'
                    ),
                    t(
                      'উত্তরবঙ্গ ৮টি জেলার পূর্ণাঙ্গ সার ডোজ, অনুমোদিত বীজ ও শস্য পঞ্জিকা',
                      'Complete 8-District Fertilizer Dosage, Certified Seed & Cropping Almanac'
                    )
                  )
                }
                className="w-full py-3 px-4 rounded-lg bg-secondary text-on-secondary font-title-sm text-title-sm font-semibold flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">
                  picture_as_pdf
                </span>
                {t(
                  'অফলাইন শস্য পঞ্জিকা PDF (৮.৪ MB)',
                  'Download Offline Crop Almanac PDF (8.4 MB)'
                )}
              </button>
              <button
                onClick={() =>
                  onOpenHelplineModal(
                    '1800-345-5505',
                    t(
                      'জেলা কৃষি আধিকারিক (North Bengal KVK & ADA) হেল্পলাইন',
                      'District Agriculture Officer (KVK & ADA) Helpline'
                    )
                  )
                }
                className="w-full py-2.5 px-4 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm font-medium flex items-center justify-center gap-2 hover:bg-surface-container-high hover:text-primary transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  call
                </span>
                {t(
                  'জেলা কৃষি আধিকারিক (KVK & ADA) হেল্পলাইন',
                  'District Agri-Officer (KVK & ADA) Helpline'
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Farmer Assistance Footnote */}
      <div className="px-margin py-space-sm text-center">
        <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center justify-center gap-1">
          <span className="material-symbols-outlined text-[14px] text-primary">
            verified_user
          </span>
          {t(
            'আকাশদীপ কৃষি এলএলপি মৃত্তিকা বিজ্ঞান ও বিশেষজ্ঞ গবেষক দল দ্বারা অনুমোদিত',
            'Verified by Akashdeep Krishi LLP Soil Science & Agronomy Research Team'
          )}
        </p>
      </div>
    </div>
  );
};
