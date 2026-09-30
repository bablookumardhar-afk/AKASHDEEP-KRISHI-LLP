import React, { useState, useCallback } from 'react';
import {
  CropGuideModalData,
  DISTRICT_ADVISORIES,
  IMAGES,
  SEASONAL_CROPS,
  ScreenId,
} from '../data/agriData';
import { useLanguage } from '../context/LanguageContext';
import { ResilientImage } from './ResilientImage';
import {
  LiveWeatherPayload,
  WeatherForecastCard,
} from './WeatherForecastCard';

interface CropsScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenCropModal: (crop: CropGuideModalData) => void;
  onOpenScannerModal: () => void;
  onOpenApkModal: (mode: 'download' | 'guide') => void;
}

const SEASONS = [
  {
    id: 'kharif',
    labelBn: 'খরিফ (বর্ষা)',
    labelEn: 'Kharif (Monsoon)',
    shortBn: 'খরিফ',
    shortEn: 'Kharif',
  },
  {
    id: 'rabi',
    labelBn: 'রবি (শীতকালীন)',
    labelEn: 'Rabi (Winter)',
    shortBn: 'রবি',
    shortEn: 'Rabi',
  },
  {
    id: 'zaid',
    labelBn: 'জায়েদ / প্রাক-খরিফ (গ্রীষ্ম)',
    labelEn: 'Zaid / Pre-Kharif (Summer)',
    shortBn: 'জায়েদ',
    shortEn: 'Zaid',
  },
];

const DISTRICTS: { id: string; labelBn: string; labelEn: string }[] = [
  { id: 'Jalpaiguri', labelBn: 'জলপাইগুড়ি', labelEn: 'Jalpaiguri' },
  { id: 'Cooch Behar', labelBn: 'কোচবিহার', labelEn: 'Cooch Behar' },
  {
    id: 'Siliguri / Terai',
    labelBn: 'শিলিগুড়ি / তরাই',
    labelEn: 'Siliguri / Terai',
  },
  { id: 'Malda', labelBn: 'মালদা', labelEn: 'Malda' },
  {
    id: 'Uttar Dinajpur',
    labelBn: 'উত্তর দিনাজপুর',
    labelEn: 'Uttar Dinajpur',
  },
  {
    id: 'Dakshin Dinajpur',
    labelBn: 'দক্ষিণ দিনাজপুর',
    labelEn: 'Dakshin Dinajpur',
  },
  { id: 'Alipurduar', labelBn: 'আলিপুরদুয়ার', labelEn: 'Alipurduar' },
];

export const CropsScreen: React.FC<CropsScreenProps> = ({
  onNavigate,
  onOpenCropModal,
  onOpenScannerModal,
  onOpenApkModal,
}) => {
  const { t } = useLanguage();
  const [showApkBanner, setShowApkBanner] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState<string>('kharif');
  const [filterBySeasonOnly, setFilterBySeasonOnly] = useState<boolean>(false);
  const [selectedDistrict, setSelectedDistrict] =
    useState<string>('Jalpaiguri');
  const [liveWeather, setLiveWeather] = useState<LiveWeatherPayload | null>(
    null
  );

  const handleWeatherLoaded = useCallback((payload: LiveWeatherPayload) => {
    setLiveWeather(payload);
  }, []);

  const advisory =
    DISTRICT_ADVISORIES[selectedDistrict] || DISTRICT_ADVISORIES['Jalpaiguri'];

  const activeSeasonObj =
    SEASONS.find((s) => s.id === selectedSeason) || SEASONS[0];

  const displayedCrops = filterBySeasonOnly
    ? SEASONAL_CROPS.filter((c) => c.seasons.includes(selectedSeason))
    : SEASONAL_CROPS;

  const handleSeasonClick = (seasonId: string) => {
    if (seasonId === selectedSeason) {
      setFilterBySeasonOnly((prev) => !prev);
    } else {
      setSelectedSeason(seasonId);
      setFilterBySeasonOnly(seasonId !== 'kharif');
    }
  };

  return (
    <div className="flex flex-col w-full gap-space-md">
      {/* Native Android APK Download Banner */}
      {showApkBanner && (
        <section className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm relative overflow-hidden">
          <div className="flex items-start justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm min-w-0">
              <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center shrink-0 shadow-sm text-on-primary-container">
                <span className="material-symbols-outlined text-[28px] icon-filled">
                  apk_install
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-title-sm text-title-sm text-on-surface">
                    {t(
                      'Akashdeep Krishi LLP অ্যাপ ইনস্টল করুন',
                      'Install Akashdeep Krishi LLP APK'
                    )}
                  </span>
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[13px] icon-filled">
                      verified
                    </span>
                    Play Protect
                  </span>
                </div>
                <p className="font-label-sm text-label-sm text-on-surface-variant truncate">
                  {t(
                    'লাইভ আবহাওয়া ও সম্পূর্ণ উত্তরবঙ্গ শস্য ডেটাবেস',
                    'Live Weather & Full North Bengal Crop DB'
                  )}
                </p>
              </div>
            </div>
            <button
              aria-label="Dismiss banner"
              onClick={() => setShowApkBanner(false)}
              className="text-on-surface-variant p-1 -mr-1 rounded-full hover:bg-surface-container-high transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                close
              </span>
            </button>
          </div>
          <div className="flex items-center gap-2 bg-surface-container-low px-2.5 py-1.5 rounded-lg text-primary">
            <span className="material-symbols-outlined text-[18px] shrink-0">
              cloud_done
            </span>
            <p className="font-label-sm text-label-sm leading-tight text-on-surface-variant">
              <strong className="font-medium text-primary">
                {t('অনলাইন ও লো-নেটওয়ার্ক সক্রিয়', 'Online & Low-Network Ready')}
              </strong>{' '}
              {t(
                'চা বাগান, ডুয়ার্স ও নদীর চরের জমির জন্য।',
                'for tea estates, Dooars & riverside fields.'
              )}
            </p>
          </div>
          <div className="flex items-center gap-space-sm pt-1">
            <button
              onClick={() => onOpenApkModal('download')}
              className="flex-1 bg-primary text-on-primary min-h-[44px] px-space-md py-2 rounded-lg font-title-sm text-title-sm flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                download
              </span>
              <span>
                {t('APK ডাউনলোড (১৮.৪ MB)', 'Download APK (18.4 MB)')}
              </span>
            </button>
            <button
              aria-label="Installation Guide"
              onClick={() => onOpenApkModal('guide')}
              className="min-h-[44px] px-3 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md flex items-center justify-center hover:bg-surface-container-high transition-colors cursor-pointer"
              type="button"
            >
              <span>{t('গাইড', 'Guide')}</span>
            </button>
          </div>
        </section>
      )}

      {/* Region & Season Filter Carousel */}
      <section className="w-full flex flex-col gap-space-xs">
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
            {t('শস্য ঋতু / মরশুম', 'Crop Season')}
          </span>
          <span className="font-label-sm text-label-sm text-primary font-medium flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-secondary inline-block animate-pulse"></span>
            {t(
              `সক্রিয়: ${activeSeasonObj.shortBn}`,
              `Active: ${activeSeasonObj.shortEn}`
            )}
          </span>
        </div>

        {/* Active Season Selection Chips */}
        <div
          aria-label="Agri Seasons"
          className="flex items-center gap-2 overflow-x-auto pb-1 -mx-margin px-margin no-scrollbar"
          role="tablist"
        >
          {SEASONS.map((season) => {
            const isSelected = selectedSeason === season.id;
            return (
              <button
                key={season.id}
                aria-selected={isSelected}
                onClick={() => handleSeasonClick(season.id)}
                className={
                  isSelected
                    ? 'shrink-0 h-9 px-3.5 rounded-full bg-primary text-on-primary font-label-md text-label-md flex items-center gap-1.5 shadow-sm cursor-pointer transition-colors'
                    : 'shrink-0 h-9 px-3.5 rounded-full bg-surface-container-lowest text-on-surface font-label-md text-label-md flex items-center gap-1.5 hover:bg-surface-container transition-colors cursor-pointer'
                }
                role="tab"
                type="button"
              >
                {isSelected && (
                  <span className="material-symbols-outlined text-[16px] icon-filled">
                    check
                  </span>
                )}
                <span>{t(season.labelBn, season.labelEn)}</span>
              </button>
            );
          })}
        </div>

        {/* North Bengal District Micro-Zone Pills */}
        <div
          aria-label="North Bengal Districts"
          className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 -mx-margin px-margin no-scrollbar"
        >
          <span className="material-symbols-outlined text-[16px] text-on-surface-variant shrink-0">
            pin_drop
          </span>
          {DISTRICTS.map((district) => {
            const isSelected = selectedDistrict === district.id;
            return (
              <button
                key={district.id}
                type="button"
                onClick={() => setSelectedDistrict(district.id)}
                className={
                  isSelected
                    ? 'shrink-0 h-7 px-2.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold flex items-center gap-1 cursor-pointer transition-colors'
                    : 'shrink-0 h-7 px-2.5 rounded-full bg-surface-container-lowest text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-container transition-colors cursor-pointer'
                }
              >
                <span>{t(district.labelBn, district.labelEn)}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Real-time Agro-Advisory & Terai Microclimate Card */}
      <section className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm relative overflow-hidden">
        <div className="flex items-center justify-between border-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
            <span className="font-title-sm text-title-sm text-on-surface">
              {t(
                'উত্তরবঙ্গ মাইক্রোক্লাইমেট পরামর্শ',
                'North Bengal Microclimate Advisory'
              )}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]">
              thunderstorm
            </span>
            {t(advisory.alertLabelBn, advisory.alertLabel)}
          </span>
        </div>

        {/* Telemetry Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 py-1">
          <div className="bg-surface-container-low rounded-lg p-2 flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-secondary">
                thermostat
              </span>{' '}
              {t('তাপমাত্রা', 'Temp')}
            </span>
            <span className="font-title-lg text-title-lg text-on-surface font-bold mt-0.5 tabular-nums">
              {liveWeather?.isLive
                ? `${liveWeather.currentTemp}°C`
                : advisory.temp}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
              {t(advisory.tempSubBn, advisory.tempSub)}
            </span>
          </div>
          <div className="bg-surface-container-low rounded-lg p-2 flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-tertiary">
                water_drop
              </span>{' '}
              {t('আর্দ্রতা', 'Humidity')}
            </span>
            <span className="font-title-lg text-title-lg text-on-surface font-bold mt-0.5 tabular-nums">
              {liveWeather?.isLive
                ? `${liveWeather.currentHumidity}%`
                : advisory.humidity}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
              {t(advisory.humiditySubBn, advisory.humiditySub)}
            </span>
          </div>
          <div className="bg-surface-container-low rounded-lg p-2 flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-primary">
                eco
              </span>{' '}
              {t('মাটির রস', 'Soil Moist.')}
            </span>
            <span className="font-title-lg text-title-lg text-primary font-bold mt-0.5 tabular-nums">
              {advisory.soilMoist}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
              {t(advisory.soilMoistSubBn, advisory.soilMoistSub)}
            </span>
          </div>
        </div>

        {/* Active Advisory Box */}
        <div className="bg-surface-container p-space-sm rounded-lg flex items-start gap-2.5">
          <span className="material-symbols-outlined text-[20px] text-primary shrink-0 mt-0.5 icon-filled">
            recommend
          </span>
          <div className="flex flex-col min-w-0">
            <span className="font-label-md text-label-md text-primary font-semibold">
              {t(
                `মাঠের জরুরি পরামর্শ (${advisory.nameBn})`,
                `Actionable Field Advisory (${advisory.name})`
              )}
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-snug">
              {t('উপযুক্ত কাজ:', 'Ideal for')}{' '}
              <strong className="text-on-surface font-medium">
                {t(advisory.advisoryHighlightBn, advisory.advisoryHighlight)}
              </strong>
              . {t(advisory.advisoryTextBn, advisory.advisoryText)}
            </p>
          </div>
        </div>
      </section>

      {/* Live 3-Day Agricultural Weather Forecast & Spray Timing */}
      <WeatherForecastCard
        selectedDistrict={selectedDistrict}
        onWeatherLoaded={handleWeatherLoaded}
      />

      {/* Quick Actions Floating Grid */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
        <button
          onClick={() => onNavigate('fertilizer-scheduler')}
          className="bg-surface-container-lowest p-2.5 rounded-xl flex flex-col items-center justify-center text-center gap-1.5 shadow-sm hover:bg-surface-container-low active:bg-surface-container transition-colors cursor-pointer"
          type="button"
        >
          <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
            <span className="material-symbols-outlined text-[20px] icon-filled">
              event_upcoming
            </span>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface font-medium leading-tight">
            {t('সার সূচী ও রিমাইন্ডার', 'Fertilizer Scheduler')}
          </span>
        </button>
        <button
          onClick={() => onNavigate('soil-and-pre-sow')}
          className="bg-surface-container-lowest p-2.5 rounded-xl flex flex-col items-center justify-center text-center gap-1.5 shadow-sm hover:bg-surface-container-low active:bg-surface-container transition-colors cursor-pointer"
          type="button"
        >
          <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[20px]">
              calculate
            </span>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface font-medium leading-tight">
            {t('মাটি ও সার ডোজ ক্যালকুলেটর', 'Soil Dosage Calculator')}
          </span>
        </button>
        <button
          onClick={onOpenScannerModal}
          className="bg-surface-container-lowest p-2.5 rounded-xl flex flex-col items-center justify-center text-center gap-1.5 shadow-sm hover:bg-surface-container-low active:bg-surface-container transition-colors cursor-pointer"
          type="button"
        >
          <div className="w-9 h-9 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-[20px]">
              camera
            </span>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface font-medium leading-tight">
            {t('রোগ ও পোকা স্ক্যানার', 'Pest AI Scanner')}
          </span>
        </button>
        <button
          onClick={() => onNavigate('district-crops')}
          className="bg-surface-container-lowest p-2.5 rounded-xl flex flex-col items-center justify-center text-center gap-1.5 shadow-sm hover:bg-surface-container-low active:bg-surface-container transition-colors cursor-pointer"
          type="button"
        >
          <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[20px]">
              picture_as_pdf
            </span>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface font-medium leading-tight">
            {t('জেলা ফসল পঞ্জিকা', 'District Crop Calendar')}
          </span>
        </button>
      </section>

      {/* Seasonal Crops Grid Section Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface tracking-tight">
            {t('মরশুমি ফসল সমূহ', 'Crops in Season')}
          </h2>
          <p className="font-label-sm text-label-sm text-on-surface-variant">
            {t(
              'উত্তরবঙ্গের চলতি মরশুমের উপযোগী ফসল ও পরিচর্যা',
              'Recommended seasonal crops & agronomic care for North Bengal'
            )}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setFilterBySeasonOnly((prev) => !prev)}
          className="font-label-md text-label-md text-primary font-semibold hover:underline cursor-pointer"
        >
          {t(
            `${displayedCrops.length}টি নির্বাচিত`,
            `${displayedCrops.length} Selected`
          )}
        </button>
      </div>

      {/* Crop Cards List */}
      <div className="flex flex-col gap-space-md w-full">
        {/* Card 1: Aman Paddy */}
        {displayedCrops.some((c) => c.id === 'paddy') && (
          <article className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col">
            <div className="relative w-full h-40 bg-surface-container">
              <ResilientImage
                className="w-full h-full object-cover"
                alt="Lush green Aman paddy seedling fields in Cooch Behar North Bengal"
                src={IMAGES.paddyField}
                fallbackIcon="grass"
              />
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/90 backdrop-blur-sm text-on-primary font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[13px]">
                  schedule
                </span>
                <span>
                  {t('চারা রোপণ পর্যায়', 'Transplantation Phase')}
                </span>
              </div>
              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm font-semibold">
                {t('খরিফ ২০২৪', 'Kharif 2024')}
              </div>
            </div>
            <div className="p-space-md flex flex-col gap-space-sm">
              <div className="flex items-start justify-between gap-space-sm">
                <div className="flex flex-col min-w-0">
                  <h3 className="font-title-md text-title-md text-on-surface font-bold truncate">
                    {t(
                      'আমন ও বোরো ধান (Aman & Boro Paddy)',
                      'Aman & Boro Paddy (ধান)'
                    )}
                  </h3>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Oryza sativa • Swarna Sub-1, MTU 7029
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-surface-container-low text-primary font-label-sm text-label-sm font-medium shrink-0">
                  {t('১২০–১৪৫ দিন', '120–145 Days')}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 bg-surface-container-low p-space-sm rounded-lg">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {t('উপযুক্ত মাটি', 'Recommended Soil')}
                  </span>
                  <span className="font-title-sm text-title-sm text-on-surface">
                    {t('এঁটেল দোআঁশ (Clay Loam)', 'Clay Loam (এঁটেল দোআঁশ)')}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {t('প্রধান জেলা', 'Key Districts')}
                  </span>
                  <span className="font-title-sm text-title-sm text-on-surface truncate">
                    {t(
                      'মালদা, দিনাজপুর, কোচবিহার',
                      'Malda, Dinajpur, Cooch Behar'
                    )}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-secondary">
                    warning
                  </span>
                  <span className="font-label-sm text-label-sm">
                    {t(
                      'ব্লাস্ট ও মাজরা পোকা সতর্কতা সক্রিয়',
                      'Blast & Stem Borer alert active'
                    )}
                  </span>
                </div>
                <button
                  onClick={() => onOpenCropModal(SEASONAL_CROPS[0])}
                  className="text-primary font-title-sm text-title-sm flex items-center gap-0.5 hover:underline cursor-pointer"
                  type="button"
                >
                  <span>{t('বপন চার্ট দেখুন', 'View Sowing Chart')}</span>
                  <span className="material-symbols-outlined text-[18px]">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          </article>
        )}

        {/* Card 2: North Bengal Tea */}
        {displayedCrops.some((c) => c.id === 'tea') && (
          <article className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col">
            <div className="relative w-full h-40 bg-surface-container">
              <ResilientImage
                className="w-full h-full object-cover"
                alt="Tea estate plucking in Dooars foothills near Jalpaiguri North Bengal"
                src={IMAGES.teaEstate}
                fallbackIcon="local_florist"
              />
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[13px]">
                  local_florist
                </span>
                <span>{t('বর্ষা ফ্লাশ', 'Monsoon Flush')}</span>
              </div>
              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm font-semibold">
                {t('উচ্চমূল্য বাগান ফসল', 'High Value Plantation')}
              </div>
            </div>
            <div className="p-space-md flex flex-col gap-space-sm">
              <div className="flex items-start justify-between gap-space-sm">
                <div className="flex flex-col min-w-0">
                  <h3 className="font-title-md text-title-md text-on-surface font-bold truncate">
                    {t(
                      'উত্তরবঙ্গ চা পাতা (North Bengal Tea)',
                      'North Bengal Tea (চা পাতা)'
                    )}
                  </h3>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Camellia sinensis • Clone TV-23, TV-25
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-surface-container-low text-primary font-label-sm text-label-sm font-medium shrink-0">
                  {t('নিরবচ্ছিন্ন চয়ন', 'Continuous Harvest')}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 bg-surface-container-low p-space-sm rounded-lg">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {t('মাটির অম্লতা (pH)', 'Soil pH Requirement')}
                  </span>
                  <span className="font-title-sm text-title-sm text-on-surface">
                    {t('আম্লিক (pH 4.5 – 5.5)', 'Acidic (pH 4.5 – 5.5)')}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {t('প্রধান বলয়', 'Target Agro-Tracts')}
                  </span>
                  <span className="font-title-sm text-title-sm text-on-surface truncate">
                    {t(
                      'তরাই, জলপাইগুড়ি, আলিপুরদুয়ার',
                      'Terai, Jalpaiguri, Alipurduar'
                    )}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    science
                  </span>
                  <span className="font-label-sm text-label-sm">
                    {t(
                      'সালফার ও জিংক ফোলিয়ার সূচি',
                      'Sulphur & Zinc foliar schedule'
                    )}
                  </span>
                </div>
                <button
                  onClick={() => onOpenCropModal(SEASONAL_CROPS[1])}
                  className="text-primary font-title-sm text-title-sm flex items-center gap-0.5 hover:underline cursor-pointer"
                  type="button"
                >
                  <span>{t('চা পরিচর্যা গাইড', 'Tea Care Guide')}</span>
                  <span className="material-symbols-outlined text-[18px]">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          </article>
        )}

        {/* Card 3: Jute / Paat */}
        {displayedCrops.some((c) => c.id === 'jute') && (
          <article className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col">
            <div className="relative w-full h-40 bg-surface-container">
              <ResilientImage
                className="w-full h-full object-cover"
                alt="Golden green jute plant stalks standing tall along alluvial silt riverbank in Cooch Behar"
                src={IMAGES.juteCrop}
                fallbackIcon="water"
              />
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[13px]">
                  water
                </span>
                <span>
                  {t('পচন সময়: ১৮ দিন', 'Retting Window: 18 Days')}
                </span>
              </div>
              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm font-semibold">
                {t('প্রাক-বর্ষা বপন', 'Pre-Monsoon Sown')}
              </div>
            </div>
            <div className="p-space-md flex flex-col gap-space-sm">
              <div className="flex items-start justify-between gap-space-sm">
                <div className="flex flex-col min-w-0">
                  <h3 className="font-title-md text-title-md text-on-surface font-bold truncate">
                    {t('তোষা পাট (Tossa Jute)', 'Tossa Jute (পাট)')}
                  </h3>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Corchorus olitorius • JRO-524 (Navin)
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-surface-container-low text-primary font-label-sm text-label-sm font-medium shrink-0">
                  {t('১১০–১২০ দিন', '110–120 Days')}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 bg-surface-container-low p-space-sm rounded-lg">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {t('মাটির ধরন', 'Soil Type')}
                  </span>
                  <span className="font-title-sm text-title-sm text-on-surface">
                    {t(
                      'পলি দোআঁশ (Alluvial Silt Loam)',
                      'Alluvial Silt Loam (পলি দোআঁশ)'
                    )}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {t('প্রধান জেলা', 'Key Districts')}
                  </span>
                  <span className="font-title-sm text-title-sm text-on-surface truncate">
                    {t(
                      'কোচবিহার, জলপাইগুড়ি, দিনাজপুর',
                      'Cooch Behar, Jalpaiguri, Dinajpur'
                    )}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    biotech
                  </span>
                  <span className="font-label-sm text-label-sm">
                    {t(
                      'ক্রাইপাফ সোনা অনুজীব পচন প্রযুক্তি উপলব্ধ',
                      'CRIJAF Sona microbial retting available'
                    )}
                  </span>
                </div>
                <button
                  onClick={() => onOpenCropModal(SEASONAL_CROPS[2])}
                  className="text-primary font-title-sm text-title-sm flex items-center gap-0.5 hover:underline cursor-pointer"
                  type="button"
                >
                  <span>{t('রেটিং প্রোটোকল', 'Retting Protocol')}</span>
                  <span className="material-symbols-outlined text-[18px]">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          </article>
        )}

        {/* Card 4: Yellow Mustard / Sarson (Rabi Preview) */}
        {displayedCrops.some((c) => c.id === 'mustard') && (
          <article className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col">
            <div className="relative w-full h-40 bg-surface-container">
              <ResilientImage
                className="w-full h-full object-cover"
                alt="Blooming yellow mustard field in North Bengal plains during soft winter sunlight"
                src={IMAGES.mustardField}
                fallbackIcon="wb_sunny"
              />
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-medium">
                <span className="material-symbols-outlined text-[13px]">
                  ac_unit
                </span>
                <span>{t('আসন্ন: রবি প্রস্তুতি', 'Upcoming: Rabi Prep')}</span>
              </div>
              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm font-semibold">
                {t('অক্টোবর – নভেম্বর বপন', 'Oct – Nov Sowing')}
              </div>
            </div>
            <div className="p-space-md flex flex-col gap-space-sm">
              <div className="flex items-start justify-between gap-space-sm">
                <div className="flex flex-col min-w-0">
                  <h3 className="font-title-md text-title-md text-on-surface font-bold truncate">
                    {t(
                      'হলুদ সরিষা / রাই (Yellow Mustard)',
                      'Yellow Mustard / Rai Sarson (সরিষা)'
                    )}
                  </h3>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Brassica campestris • Pusa Bold, Binoy (B-9)
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-surface-container-low text-primary font-label-sm text-label-sm font-medium shrink-0">
                  {t('৮৫–১০০ দিন', '85–100 Days')}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 bg-surface-container-low p-space-sm rounded-lg">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {t('বীজের হার / বিঘা', 'Seed Rate / Bigha')}
                  </span>
                  <span className="font-title-sm text-title-sm text-on-surface">
                    1.0 – 1.25 kg / Bigha
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {t('প্রধান অঞ্চল', 'Prominent Belts')}
                  </span>
                  <span className="font-title-sm text-title-sm text-on-surface truncate">
                    {t(
                      'মালদা, উত্তর ও দক্ষিণ দিনাজপুর',
                      'Malda, Uttar & Dakshin Dinajpur'
                    )}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">
                    inventory_2
                  </span>
                  <span className="font-label-sm text-label-sm">
                    {t(
                      'ভর্তুকিযুক্ত শংসাপত্রিত বীজ বুকিং চলছে',
                      'Subsidized certified seeds booking open'
                    )}
                  </span>
                </div>
                <button
                  onClick={() => onOpenCropModal(SEASONAL_CROPS[3])}
                  className="text-primary font-title-sm text-title-sm flex items-center gap-0.5 hover:underline cursor-pointer"
                  type="button"
                >
                  <span>{t('প্রাক-বপন গাইড', 'Pre-Sow Guide')}</span>
                  <span className="material-symbols-outlined text-[18px]">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          </article>
        )}

        {/* Card 5: Malda Mango */}
        {displayedCrops.some((c) => c.id === 'mango') && (
          <article className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col">
            <div className="relative w-full h-40 bg-surface-container">
              <ResilientImage
                className="w-full h-full object-cover"
                alt="Historic mango orchard in Malda North Bengal with mature Fazli and Langra mango trees"
                src={IMAGES.mangoOrchard}
                fallbackIcon="yard"
              />
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[13px]">
                  yard
                </span>
                <span>
                  {t('বর্ষা-পরবর্তী অঙ্গ ছাঁটাই', 'Post-Monsoon Pruning')}
                </span>
              </div>
              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm font-semibold">
                {t('মালদা জি আই অঞ্চল', 'Malda GI Tract')}
              </div>
            </div>
            <div className="p-space-md flex flex-col gap-space-sm">
              <div className="flex items-start justify-between gap-space-sm">
                <div className="flex flex-col min-w-0">
                  <h3 className="font-title-md text-title-md text-on-surface font-bold truncate">
                    {t(
                      'মালদা আম - ফজলী ও ল্যাংড়া (Malda Mango)',
                      'Malda Mango (আম - ফজলী ও ল্যাংড়া)'
                    )}
                  </h3>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Mangifera indica • Fazli, Langra, Himsagar
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-surface-container-low text-primary font-label-sm text-label-sm font-medium shrink-0">
                  {t('বহুবর্ষজীবী বাগান', 'Perennial Orchard')}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 bg-surface-container-low p-space-sm rounded-lg">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {t('বর্তমান পর্যায়', 'Current Stage')}
                  </span>
                  <span className="font-title-sm text-title-sm text-on-surface">
                    {t('গাছের গোড়া পরিষ্কার', 'Sanitary Basin Cleaning')}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {t('ছত্রাকনাশক সূচি', 'Fungicide Regimen')}
                  </span>
                  <span className="font-title-sm text-title-sm text-on-surface truncate">
                    {t('কপার অক্সিক্লোরাইড স্প্রে', 'Copper Oxychloride Spray')}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    eco
                  </span>
                  <span className="font-label-sm text-label-sm">
                    {t(
                      'মুকুল-পূর্ব প্যাক্লোবুট্রাজল পরামর্শ',
                      'Pre-flowering paclobutrazol advisory'
                    )}
                  </span>
                </div>
                <button
                  onClick={() => onOpenCropModal(SEASONAL_CROPS[4])}
                  className="text-primary font-title-sm text-title-sm flex items-center gap-0.5 hover:underline cursor-pointer"
                  type="button"
                >
                  <span>{t('বাগান প্ল্যানার', 'Orchard Planner')}</span>
                  <span className="material-symbols-outlined text-[18px]">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          </article>
        )}
      </div>
    </div>
  );
};
