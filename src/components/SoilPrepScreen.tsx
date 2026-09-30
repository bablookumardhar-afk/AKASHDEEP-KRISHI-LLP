import React, { useState } from 'react';
import { IMAGES } from '../data/agriData';
import { useLanguage } from '../context/LanguageContext';
import { ResilientImage } from './ResilientImage';

interface SoilPrepScreenProps {
  onOpenPdfModal: (title: string, subtitle: string) => void;
}

type CalcCropKey = 'paddy' | 'potato' | 'jute' | 'maize' | 'tea';
type LandUnitKey = 'acre' | 'bigha' | 'katha';

const UNIT_MULTIPLIERS: Record<LandUnitKey, number> = {
  acre: 1.0,
  bigha: 0.33,
  katha: 0.0165,
};

const CROP_FORMULATIONS: Record<
  CalcCropKey,
  {
    dolomite: number;
    dap: number;
    potash: number;
    zinc: number;
    tricho: number;
    cartap: number;
  }
> = {
  paddy: {
    dolomite: 300,
    dap: 45,
    potash: 30,
    zinc: 10,
    tricho: 2.5,
    cartap: 8,
  },
  potato: {
    dolomite: 350,
    dap: 100,
    potash: 80,
    zinc: 12,
    tricho: 3.5,
    cartap: 10,
  },
  jute: {
    dolomite: 250,
    dap: 35,
    potash: 25,
    zinc: 8,
    tricho: 2.0,
    cartap: 6,
  },
  maize: {
    dolomite: 280,
    dap: 55,
    potash: 40,
    zinc: 10,
    tricho: 2.5,
    cartap: 8,
  },
  tea: {
    dolomite: 400,
    dap: 25,
    potash: 35,
    zinc: 15,
    tricho: 5.0,
    cartap: 12,
  },
};

const CROP_OPTIONS: { id: CalcCropKey; labelBn: string; labelEn: string }[] = [
  { id: 'paddy', labelBn: 'আমন/বোরো ধান (Paddy)', labelEn: 'Aman/Boro Paddy' },
  { id: 'potato', labelBn: 'আলু (Potato)', labelEn: 'Potato' },
  { id: 'jute', labelBn: 'পাট (Jute)', labelEn: 'Tossa Jute' },
  { id: 'maize', labelBn: 'ভুট্টা (Maize)', labelEn: 'Hybrid Maize' },
  { id: 'tea', labelBn: 'চা নার্সারি (Tea)', labelEn: 'Tea Nursery' },
];

export const SoilPrepScreen: React.FC<SoilPrepScreenProps> = ({
  onOpenPdfModal,
}) => {
  const { t, tn } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState<CalcCropKey>('paddy');
  const [landArea, setLandArea] = useState<string>('1');
  const [landUnit, setLandUnit] = useState<LandUnitKey>('acre');
  const [downloadState, setDownloadState] = useState<
    'idle' | 'loading' | 'done'
  >('idle');

  const areaValue = Math.max(0, parseFloat(landArea) || 0);
  const totalAcres = areaValue * UNIT_MULTIPLIERS[landUnit];
  const formula = CROP_FORMULATIONS[selectedCrop];

  const roundDose = (val: number) => Math.round(val * totalAcres * 10) / 10;

  const unitLabel =
    landUnit === 'acre'
      ? t('একর', 'Acre')
      : landUnit === 'bigha'
      ? t('বিঘা', 'Bigha')
      : t('কাঠা', 'Katha');

  const handleDownloadClick = () => {
    if (downloadState !== 'idle') return;
    setDownloadState('loading');
    setTimeout(() => {
      setDownloadState('done');
      onOpenPdfModal(
        t(
          'উত্তরবঙ্গ মৃত্তিকা শোধন চার্ট (Pre-Sow PDF)',
          'North Bengal Soil Chart (Pre-Sow PDF)'
        ),
        t(
          'দ্বিভাষিক চার্ট: দিনাজপুর, জলপাইগুড়ি ও কোচবিহার স্পেশাল (UBKV Verified)',
          'Bilingual Chart: Dinajpur, Jalpaiguri & Cooch Behar Special (UBKV Verified)'
        )
      );
      setTimeout(() => {
        setDownloadState('idle');
      }, 2200);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full gap-space-md">
      {/* Microclimate Context Pill & Quick Selector */}
      <div className="flex items-center justify-between gap-space-sm bg-surface-container-low p-space-sm rounded-xl">
        <div className="flex items-center gap-space-xs min-w-0">
          <span className="material-symbols-outlined text-primary text-[20px] shrink-0 icon-filled">
            landscape
          </span>
          <span className="font-title-sm text-title-sm text-primary truncate">
            {t(
              'উত্তরবঙ্গ মৃত্তিকা অঞ্চল (Zone: Terai-Alluvial)',
              'North Bengal Soil Zone (Terai-Alluvial)'
            )}
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm shrink-0 font-semibold">
          {t('প্রাক-বপন চক্র', 'Pre-Sow Cycle')}
        </span>
      </div>

      {/* Hero Visual / Soil Acidity Context */}
      <div className="relative w-full rounded-xl overflow-hidden bg-surface-container shadow-sm">
        <ResilientImage
          className="w-full h-36 object-cover"
          alt="Close-up macro photography of rich moist reddish-brown Terai loam soil mixed with finely powdered white agricultural dolomite"
          src={IMAGES.soilConditioningHero}
          fallbackIcon="science"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent flex flex-col justify-end p-space-md">
          <div className="flex items-center gap-space-xs text-primary-fixed mb-1">
            <span className="material-symbols-outlined text-[18px]">
              science
            </span>
            <span className="font-label-md text-label-md uppercase tracking-wide">
              {t('কৃষিতাত্ত্বিক মাঠ প্রোটোকল', 'Agronomic Field Protocol')}
            </span>
          </div>
          <h2 className="font-headline-sm text-headline-sm text-on-primary font-bold leading-tight">
            {t(
              'প্রাক-চাষ রাসায়নিক ও মৃত্তিকা শোধন',
              'Pre-Cultivation Chemical & Soil Conditioning'
            )}
          </h2>
          <p className="font-body-sm text-body-sm text-primary-fixed-dim line-clamp-1">
            {t(
              'বীজ বোনার পূর্বে বৈজ্ঞানিক মৃত্তিকা শোধন নির্দেশিকা',
              'Scientific soil conditioning protocol prior to seed sowing'
            )}
          </p>
        </div>
      </div>

      {/* Soil Health & Acidity Warning Alert Banner */}
      <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col gap-space-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary-container"></div>
        <div className="flex items-start gap-space-sm">
          <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-secondary text-[22px] icon-filled">
              warning
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-title-sm text-title-sm text-on-surface font-bold">
                {t(
                  'উত্তরবঙ্গ অম্ল মৃত্তিকা সতর্কতা',
                  'North Bengal Acid Soil Alert'
                )}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
                pH 4.2 - 5.2
              </span>
            </div>
            <p className="font-label-sm text-label-sm text-secondary font-medium">
              Terai, Dooars &amp; Sub-Himalayan Acid Belt
            </p>
          </div>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          {tn(
            <>
              তরাই ও ডুয়ার্সের তীব্র আম্লিক মাটিতে ফসফরাস এবং
              মাইক্রোনিউট্রিয়েন্ট আবদ্ধ (fixated) হয়ে যায়। চুন বা ডলোমাইট
              প্রয়োগ না করে রাসায়নিক সার দিলে তার{' '}
              <strong className="text-on-surface">
                ৪০-৬০% কার্যকারিতা নষ্ট হয়
              </strong>
              । তাই সার প্রয়োগের ২১ দিন আগে পিএইচ (pH) সংশোধন অপরিহার্য।
            </>,
            <>
              In the strongly acidic soils of Terai and Dooars, phosphorus and
              micronutrients become chemically locked. Applying NPK fertilizers
              without lime or dolomite causes{' '}
              <strong className="text-on-surface">
                40–60% fertilizer efficiency loss
              </strong>
              . Correct soil pH 21 days prior to basal fertilization.
            </>
          )}
        </p>

        {/* pH Meter Visual Gauge */}
        <div className="bg-surface-container-low rounded-lg p-space-sm flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm">
            <span className="text-error font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-error inline-block"></span>{' '}
              {t('4.2 (তীব্র আম্লিক)', '4.2 (Highly Acidic)')}
            </span>
            <span className="text-on-surface-variant">
              {t('আদর্শ: 6.2 - 6.8', 'Optimal: 6.2 - 6.8')}
            </span>
            <span>{t('7.5 (ক্ষারীয়)', '7.5 (Alkaline)')}</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-surface-container-high overflow-hidden relative">
            <div className="h-full bg-gradient-to-r from-error via-secondary-container to-primary rounded-full w-full"></div>
            <div className="absolute top-0 bottom-0 left-[28%] w-1.5 bg-surface-container-lowest shadow-sm rounded-full transform -translate-x-1/2"></div>
          </div>
          <div className="flex justify-between text-on-surface-variant font-label-sm text-label-sm pt-0.5">
            <span className="text-error font-medium">
              {t('ডুয়ার্স/তরাই রিজিওন', 'Dooars / Terai Belt')}
            </span>
            <span className="text-primary font-medium">
              {t('লক্ষ্যমাত্রা (ডলোমাইট প্রয়োগের পর)', 'Target (After Dolomite)')}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Pre-Sowing Dosage Calculator Card */}
      <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">
                calculate
              </span>
            </div>
            <div>
              <h3 className="font-title-md text-title-md text-on-surface font-bold">
                {t('প্রাক-বপন ডোজ ক্যালকুলেটর', 'Pre-Sow Dosage Calculator')}
              </h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                {t(
                  'জমির মাপ অনুযায়ী ডোজ হিসাব',
                  'Calculate exact soil conditioning dose by land area'
                )}
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold">
            {t('সক্রিয় হিসাব', 'Active Calc')}
          </span>
        </div>

        {/* Crop Selection Horizontal Chips */}
        <div className="flex flex-col gap-1.5">
          <label className="font-label-md text-label-md text-on-surface-variant font-medium">
            {t('১. ফসল নির্বাচন করুন:', '1. Select Target Crop:')}
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 no-scrollbar">
            {CROP_OPTIONS.map((crop) => {
              const isSelected = selectedCrop === crop.id;
              return (
                <button
                  key={crop.id}
                  type="button"
                  onClick={() => setSelectedCrop(crop.id)}
                  className={
                    isSelected
                      ? 'px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm shrink-0 flex items-center gap-1 shadow-sm cursor-pointer transition-colors'
                      : 'px-3 py-1.5 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm shrink-0 flex items-center gap-1 hover:bg-surface-container-high cursor-pointer transition-colors'
                  }
                >
                  {isSelected && (
                    <span className="material-symbols-outlined text-[16px]">
                      check
                    </span>
                  )}
                  {t(crop.labelBn, crop.labelEn)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Unit & Quantity Input Module */}
        <div className="grid grid-cols-2 gap-space-sm">
          <div className="flex flex-col gap-1">
            <label
              className="font-label-md text-label-md text-on-surface-variant font-medium"
              htmlFor="land-area-input"
            >
              {t('জমির পরিমাণ:', 'Land Area:')}
            </label>
            <div className="relative flex items-center">
              <input
                id="land-area-input"
                type="number"
                min="0.1"
                step="0.1"
                value={landArea}
                onChange={(e) => setLandArea(e.target.value)}
                className="w-full h-12 bg-surface-container-low rounded-lg px-3 text-on-surface font-title-md text-title-md font-bold focus:outline-none focus:bg-surface-container-high transition-colors tabular-nums"
              />
              <span className="material-symbols-outlined absolute right-2 text-on-surface-variant text-[20px] pointer-events-none">
                edit
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label
              className="font-label-md text-label-md text-on-surface-variant font-medium"
              htmlFor="land-unit-select"
            >
              {t('পরিমাপের একক:', 'Measurement Unit:')}
            </label>
            <div className="relative flex items-center">
              <select
                id="land-unit-select"
                value={landUnit}
                onChange={(e) => setLandUnit(e.target.value as LandUnitKey)}
                className="w-full h-12 bg-surface-container-low rounded-lg px-3 text-on-surface font-title-sm text-title-sm font-semibold appearance-none focus:outline-none focus:bg-surface-container-high transition-colors cursor-pointer"
              >
                <option value="bigha">{t('বিঘা (Bigha)', 'Bigha (বিঘা)')}</option>
                <option value="acre">{t('একর (Acre)', 'Acre (একর)')}</option>
                <option value="katha">{t('কাঠা (Katha)', 'Katha (কাঠা)')}</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 pointer-events-none text-on-surface-variant text-[20px]">
                arrow_drop_down
              </span>
            </div>
          </div>
        </div>

        {/* Live Calculation Output Panel */}
        <div className="bg-surface-container rounded-xl p-space-sm flex flex-col gap-space-sm">
          <div className="flex items-center justify-between border-b border-surface-container-high pb-2">
            <span className="font-title-sm text-title-sm text-on-surface font-bold">
              {t('প্রয়োজনীয় শোধন উপাদান', 'Required Conditioning Inputs')}
            </span>
            <span className="font-label-sm text-label-sm text-primary font-semibold">
              {t(
                `${areaValue} ${unitLabel} জমির জন্য`,
                `For ${areaValue} ${unitLabel}`
              )}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-on-surface">
            {/* Dolomite */}
            <div className="bg-surface-container-lowest p-2 rounded-lg flex flex-col justify-between">
              <div className="flex items-center gap-1 text-secondary">
                <span className="material-symbols-outlined text-[16px]">
                  science
                </span>
                <span className="font-label-sm text-label-sm font-medium">
                  {t('ডলোমাইট (Dolomite)', 'Dolomite Lime')}
                </span>
              </div>
              <p className="font-title-lg text-title-lg font-bold text-on-surface mt-1 tabular-nums">
                {roundDose(formula.dolomite)}{' '}
                <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">
                  {t('কেজি (kg)', 'kg')}
                </span>
              </p>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {t('২১ দিন পূর্বে', '21 days pre-sow')}
              </span>
            </div>

            {/* Basal DAP */}
            <div className="bg-surface-container-lowest p-2 rounded-lg flex flex-col justify-between">
              <div className="flex items-center gap-1 text-primary">
                <span className="material-symbols-outlined text-[16px]">
                  grain
                </span>
                <span className="font-label-sm text-label-sm font-medium">
                  {t('ডিএপি (DAP)', 'Basal DAP')}
                </span>
              </div>
              <p className="font-title-lg text-title-lg font-bold text-on-surface mt-1 tabular-nums">
                {roundDose(formula.dap)}{' '}
                <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">
                  {t('কেজি (kg)', 'kg')}
                </span>
              </p>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {t('চূড়ান্ত চাষের সময়', 'During final plough')}
              </span>
            </div>

            {/* MOP (Potash) */}
            <div className="bg-surface-container-lowest p-2 rounded-lg flex flex-col justify-between">
              <div className="flex items-center gap-1 text-primary">
                <span className="material-symbols-outlined text-[16px]">
                  compost
                </span>
                <span className="font-label-sm text-label-sm font-medium">
                  {t('এমওপি পটাশ (MOP)', 'MOP Potash')}
                </span>
              </div>
              <p className="font-title-lg text-title-lg font-bold text-on-surface mt-1 tabular-nums">
                {roundDose(formula.potash)}{' '}
                <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">
                  {t('কেজি (kg)', 'kg')}
                </span>
              </p>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {t('বেসাল প্রয়োগ', 'Basal dressing')}
              </span>
            </div>

            {/* Micronutrient (Zn/Boron) */}
            <div className="bg-surface-container-lowest p-2 rounded-lg flex flex-col justify-between">
              <div className="flex items-center gap-1 text-tertiary">
                <span className="material-symbols-outlined text-[16px]">
                  water_drop
                </span>
                <span className="font-label-sm text-label-sm font-medium">
                  {t('জিংক সালফেট ২১%', 'Zinc Sulphate 21%')}
                </span>
              </div>
              <p className="font-title-lg text-title-lg font-bold text-on-surface mt-1 tabular-nums">
                {roundDose(formula.zinc)}{' '}
                <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">
                  {t('কেজি (kg)', 'kg')}
                </span>
              </p>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {t('অথবা বোরন ২ কেজি', 'Or Boron 2 kg')}
              </span>
            </div>

            {/* Bio-Fungicide */}
            <div className="bg-surface-container-lowest p-2 rounded-lg flex flex-col justify-between">
              <div className="flex items-center gap-1 text-primary">
                <span className="material-symbols-outlined text-[16px]">
                  coronavirus
                </span>
                <span className="font-label-sm text-label-sm font-medium">
                  {t('ট্রাইকোডার্মা ভিরিডি', 'Trichoderma Viride')}
                </span>
              </div>
              <p className="font-title-lg text-title-lg font-bold text-on-surface mt-1 tabular-nums">
                {roundDose(formula.tricho)}{' '}
                <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">
                  {t('কেজি (kg)', 'kg')}
                </span>
              </p>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {t('১০০ কেজি গোবরের সাথে', 'Mixed with 100 kg FYM')}
              </span>
            </div>

            {/* Soil Granules */}
            <div className="bg-surface-container-lowest p-2 rounded-lg flex flex-col justify-between">
              <div className="flex items-center gap-1 text-secondary">
                <span className="material-symbols-outlined text-[16px]">
                  pest_control
                </span>
                <span className="font-label-sm text-label-sm font-medium">
                  {t('কার্টাপ ৪জি দানা', 'Cartap 4G Granules')}
                </span>
              </div>
              <p className="font-title-lg text-title-lg font-bold text-on-surface mt-1 tabular-nums">
                {roundDose(formula.cartap)}{' '}
                <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">
                  {t('কেজি (kg)', 'kg')}
                </span>
              </p>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {t('উইপোকা ও নেমাটোড দমন', 'Termite & Nematode control')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pre-Cultivation Timeline Stepper Header */}
      <div className="flex items-center justify-between pt-space-xs">
        <div className="flex flex-col">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
            {t(
              'চারটি শোধন পর্যায় (Application Timeline)',
              '4-Stage Conditioning Timeline'
            )}
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {t(
              'বপনের পূর্বে বৈজ্ঞানিক ধারাবাহিকতা মেনে চলুন',
              'Follow the chronological pre-sowing sequence'
            )}
          </p>
        </div>
        <span className="material-symbols-outlined text-primary text-[24px]">
          timeline
        </span>
      </div>

      {/* Stage 1 Card: Soil Acidity Correction */}
      <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col gap-space-sm relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="w-6 h-6 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-bold flex items-center justify-center">
              {t('১', '1')}
            </span>
            <span className="font-title-sm text-title-sm text-on-surface font-bold">
              {t('মৃত্তিকা সংশোধন (pH Correction)', 'Soil pH Correction')}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
            T-21 Days
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-title-sm text-title-sm text-primary font-bold">
            {t(
              'কৃষি চুন / ডলোমাইট - Agricultural Dolomite [CaMg(CO₃)₂]',
              'Agricultural Dolomite Lime [CaMg(CO₃)₂]'
            )}
          </span>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            {t(
              'উত্তরবঙ্গের মাটি অ্যাসিডিক হওয়ায় ম্যাগনেসিয়াম সমৃদ্ধ ডলোমাইট প্রতি ৩ বছর অন্তর জমিতে প্রয়োগ করা আবশ্যক। এতে পিএইচ মাত্রা স্বাভাবিক হয়ে ফসলের সার গ্রহণ ক্ষমতা বৃদ্ধি পায়।',
              'Because North Bengal soils are acidic, magnesium-rich dolomite must be broadcast once every 3 years to neutralize acidity and unlock nutrient uptake.'
            )}
          </p>
        </div>
        <div className="rounded-lg bg-surface-container-low p-space-sm grid grid-cols-2 gap-2">
          <div>
            <span className="font-label-sm text-label-sm text-on-surface-variant block">
              {t('অনুমোদিত মাত্রা (Dose)', 'Recommended Dose')}
            </span>
            <span className="font-title-sm text-title-sm text-primary font-bold">
              {t('২৫০-৩৫০ কেজি / একর', '250–350 kg / Acre')}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant block">
              {t('(৮০-১০০ কেজি / বিঘা)', '(80–100 kg / Bigha)')}
            </span>
          </div>
          <div>
            <span className="font-label-sm text-label-sm text-on-surface-variant block">
              {t('প্রয়োগ পদ্ধতি (Protocol)', 'Application Protocol')}
            </span>
            <span className="font-title-sm text-title-sm text-on-surface font-semibold block">
              {t('প্রথম চাষে জমিতে মিশিয়ে দিন', 'Incorporate on first plough')}
            </span>
            <span className="font-label-sm text-label-sm text-secondary font-medium">
              {t('সার প্রয়োগের ২১ দিন আগে', '21 days before NPK')}
            </span>
          </div>
        </div>
      </div>

      {/* Stage 2 Card: Basal NPK & Micronutrients */}
      <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="w-6 h-6 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-bold flex items-center justify-center">
              {t('২', '2')}
            </span>
            <span className="font-title-sm text-title-sm text-on-surface font-bold">
              {t(
                'বেসাল সার ও মাইক্রোনিউট্রিয়েন্ট',
                'Basal NPK & Micronutrients'
              )}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold">
            T-0 Days (Final Plough)
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-title-sm text-title-sm text-primary font-bold">
            {t(
              'DAP, MOP, ইউরিয়া ও জিংক/বোরন সমন্বয়',
              'DAP, MOP, Urea & Zinc/Boron Integration'
            )}
          </span>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            {t(
              'উত্তরবঙ্গের পলি ও তরাই মাটিতে দস্তা (Zinc) ও বোরনের (Boron) তীব্র ঘাটতি দেখা যায়। শেষ চাষের সময় ডিএপি ও পটাশের সাথে অনুখাদ্য মাটিতে মিশ্রিত করুন।',
              'Alluvial and Terai soils show acute Zinc and Boron deficiency. Incorporate micronutrients during the final ploughing stage alongside basal fertilizers.'
            )}
          </p>
        </div>
        <div className="rounded-lg bg-surface-container-low p-space-sm flex flex-col gap-2">
          <div className="flex justify-between items-center text-on-surface">
            <span className="font-label-md text-label-md font-semibold">
              Zinc Sulphate (ZnSO₄ 21%)
            </span>
            <span className="font-title-sm text-title-sm text-primary font-bold">
              {t('১০ কেজি / একর', '10 kg / Acre')}
            </span>
          </div>
          <div className="flex justify-between items-center text-on-surface border-t border-surface-container-high pt-1.5">
            <span className="font-label-md text-label-md font-semibold">
              Disodium Octaborate (Boron 20%)
            </span>
            <span className="font-title-sm text-title-sm text-primary font-bold">
              {t('১.৫ - ২ কেজি / একর', '1.5 – 2 kg / Acre')}
            </span>
          </div>
          <p className="font-label-sm text-label-sm text-secondary font-medium">
            {t(
              '⚠️ দ্রষ্টব্য: জিংক ও ফসফেট সার (DAP/SSP) কখনোই সরাসরি একসঙ্গে মেশাবেন না; আলাদা প্রয়োগ করুন।',
              '⚠️ Note: Never mix Zinc Sulphate directly with phosphate fertilizers (DAP/SSP); broadcast separately.'
            )}
          </p>
        </div>
      </div>

      {/* Stage 3 Card: Bio-Fungicide & Soil Disinfection */}
      <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="w-6 h-6 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-bold flex items-center justify-center">
              {t('৩', '3')}
            </span>
            <span className="font-title-sm text-title-sm text-on-surface font-bold">
              {t(
                'জৈব ছত্রাকনাশক ও মাটি শোধন',
                'Bio-Fungicide & Soil Disinfection'
              )}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold">
            T-7 Days
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-title-sm text-title-sm text-primary font-bold">
            Trichoderma viride 1% WP &amp; Pseudomonas fluorescens
          </span>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            {t(
              'গোড়া পচা (Root Rot), কলার রট ও ঢলে পড়া (Damping-off) রোগ প্রতিরোধে অত্যন্ত কার্যকরী।',
              'Highly effective biological shield against Root Rot, Collar Rot, and seedling Damping-off.'
            )}
          </p>
        </div>
        <div className="rounded-lg bg-surface-container-low p-space-sm flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-primary">
            <span className="material-symbols-outlined text-[18px]">
              biotech
            </span>
            <span className="font-label-md text-label-md font-bold">
              {t(
                'জৈব সমৃদ্ধিকরণ পদ্ধতি (Incubation Technique):',
                'FYM Bio-Enrichment Incubation Technique:'
              )}
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {t(
              'প্রতি একরের জন্য ২.৫ কেজি ট্রাইকোডার্মা ও ১০০ কেজি আধা-পচা গোবর সার বা কেঁচো সারের সাথে হালকা জল ছিটিয়ে ছায়াযুক্ত স্থানে চটের বস্তা দিয়ে ৭-১০ দিন ঢেকে রাখুন। এরপর শেষ চাষের পূর্বে ভেজা মাটিতে সমানভাবে ছড়িয়ে দিন।',
              'Mix 2.5 kg Trichoderma with 100 kg moist farmyard manure or vermicompost per acre under shade covered with gunny bags for 7–10 days, then broadcast before final ploughing.'
            )}
          </p>
        </div>
      </div>

      {/* Stage 4 Card: Soil Insecticide & Nematicide */}
      <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="w-6 h-6 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm font-bold flex items-center justify-center">
              {t('৪', '4')}
            </span>
            <span className="font-title-sm text-title-sm text-on-surface font-bold">
              {t(
                'কীট ও কৃমিনাশক প্রয়োগ (Soil Protection)',
                'Soil Pest & Nematode Protection'
              )}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
            Last Furrow
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <span className="font-title-sm text-title-sm text-secondary font-bold">
              Cartap Hydrochloride 4G / Chlorpyrifos 10G
            </span>
            <span className="px-1.5 py-0.5 rounded bg-[#FEF08A] text-[#854D0E] font-label-sm text-label-sm font-bold shrink-0">
              Caution (Blue/Yellow)
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            {t(
              'মাটির ভেতরের উইপোকা, কাটুই পোকা (Cutworm), সাদা শুঁয়োপোকা (White Grub) ও রুট-নট নেমাটোড নির্মূল করতে দানা বিষ ব্যবহার করা হয়।',
              'Granular soil treatment to eliminate subterranean termites, cutworms, white grubs, and root-knot nematodes.'
            )}
          </p>
        </div>
        <div className="rounded-lg bg-surface-container-low p-space-sm grid grid-cols-2 gap-2">
          <div>
            <span className="font-label-sm text-label-sm text-on-surface-variant block">
              {t('কার্টাপ হাইড্রোক্লোরাইড ৪জি', 'Cartap Hydrochloride 4G')}
            </span>
            <span className="font-title-sm text-title-sm text-on-surface font-bold">
              {t('৭-৮ কেজি / একর', '7–8 kg / Acre')}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant block">
              {t('শুকনো বালির সাথে মিশিয়ে প্রয়োগ', 'Broadcast with dry sand')}
            </span>
          </div>
          <div>
            <span className="font-label-sm text-label-sm text-on-surface-variant block">
              {t('ক্লোরপাইরিফস ২০% ইসি', 'Chlorpyrifos 20% EC')}
            </span>
            <span className="font-title-sm text-title-sm text-on-surface font-bold">
              {t('১ লিটার / একর', '1 Litre / Acre')}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant block">
              {t('সেচের জলে ড্রপ পদ্ধতি', 'Drip in irrigation water')}
            </span>
          </div>
        </div>
      </div>

      {/* Product Application Safety & Handling Checklist */}
      <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col gap-space-sm">
        <div className="flex items-center gap-space-xs text-error">
          <span className="material-symbols-outlined text-[20px] icon-filled">
            health_and_safety
          </span>
          <h3 className="font-title-md text-title-md font-bold">
            {t(
              'নিরাপত্তা ও প্রয়োগ সতর্কতা (Safety SOP)',
              'Safety & Handling SOP'
            )}
          </h3>
        </div>
        <p className="font-label-sm text-label-sm text-on-surface-variant">
          {t(
            'রাসায়নিক ও কীটনাশক ব্যবহারের সময় বাধ্যতামূলক নিয়মাবলী:',
            'Mandatory field safety precautions during chemical handling:'
          )}
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-surface-container-low p-2.5 rounded-lg flex items-start gap-2">
            <span className="material-symbols-outlined text-primary text-[22px] shrink-0">
              masks
            </span>
            <div className="flex flex-col">
              <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                {t('মাস্ক ও গ্লাভস', 'Mask & Gloves')}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {t(
                  'ধূলিকণা ও ঘ্রাণ থেকে সুরক্ষা',
                  'Protect from dust & fumes'
                )}
              </span>
            </div>
          </div>
          <div className="bg-surface-container-low p-2.5 rounded-lg flex items-start gap-2">
            <span className="material-symbols-outlined text-primary text-[22px] shrink-0">
              wb_sunny
            </span>
            <div className="flex flex-col">
              <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                {t('সকাল/বিকেলের রোদ', 'Mild Sunlight')}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {t(
                  'তীব্র রোদে বায়ো-এজেন্ট নষ্ট হয়',
                  'Avoid harsh noon UV for bio-agents'
                )}
              </span>
            </div>
          </div>
          <div className="bg-surface-container-low p-2.5 rounded-lg flex items-start gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px] shrink-0">
              thunderstorm
            </span>
            <div className="flex flex-col">
              <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                {t('বৃষ্টির পূর্বানুমান', 'Rain Forecast')}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {t(
                  'ভারী বৃষ্টিতে চুন ধুয়ে যাওয়া রোধ',
                  'Prevent lime runoff in heavy rain'
                )}
              </span>
            </div>
          </div>
          <div className="bg-surface-container-low p-2.5 rounded-lg flex items-start gap-2">
            <span className="material-symbols-outlined text-error text-[22px] shrink-0">
              pets
            </span>
            <div className="flex flex-col">
              <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                {t('গবাদি পশু থেকে দূরে', 'Keep Livestock Away')}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {t(
                  'কীটনাশক যুক্ত মাটি ও খাদ্য পৃথক',
                  'Isolate treated plots & fodder'
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Downloadable Soil Treatment Chart Callout */}
      <div className="rounded-xl bg-primary-container text-on-primary p-space-md shadow-sm flex flex-col gap-space-sm">
        <div className="flex items-start justify-between gap-space-sm">
          <div className="flex flex-col">
            <span className="font-title-md text-title-md font-bold">
              {t(
                'উত্তরবঙ্গ মৃত্তিকা চার্ট (PDF)',
                'North Bengal Soil Chart (PDF)'
              )}
            </span>
            <span className="font-body-sm text-body-sm text-primary-fixed-dim">
              {t(
                'দ্বিভাষিক চার্ট: দিনাজপুর, জলপাইগুড়ি ও কোচবিহার স্পেশাল',
                'Bilingual Chart: Dinajpur, Jalpaiguri & Cooch Behar Special'
              )}
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">
              picture_as_pdf
            </span>
          </div>
        </div>
        <div className="flex items-center gap-space-xs text-primary-fixed font-label-sm text-label-sm">
          <span className="material-symbols-outlined text-[16px]">
            verified
          </span>
          <span>
            Verified by Uttar Banga Krishi Viswavidyalaya (UBKV)
          </span>
        </div>
        <button
          onClick={handleDownloadClick}
          className="w-full h-12 rounded-lg bg-surface-container-lowest text-primary font-title-sm text-title-sm font-bold flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors active:scale-[0.98] cursor-pointer"
          type="button"
        >
          {downloadState === 'loading' && (
            <>
              <span className="material-symbols-outlined text-[20px] animate-spin">
                sync
              </span>
              <span>{t('প্রস্তুত হচ্ছে...', 'Preparing PDF...')}</span>
            </>
          )}
          {downloadState === 'done' && (
            <>
              <span className="material-symbols-outlined text-[20px]">
                check_circle
              </span>
              <span>
                {t('ডাউনলোড সফল (PDF Saved)', 'Download Complete (PDF Saved)')}
              </span>
            </>
          )}
          {downloadState === 'idle' && (
            <>
              <span className="material-symbols-outlined text-[20px]">
                download
              </span>
              <span>
                {t(
                  'ডাউনলোড নির্দেশিকা চার্ট (Pre-Sow PDF)',
                  'Download Conditioning Chart (Pre-Sow PDF)'
                )}
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
