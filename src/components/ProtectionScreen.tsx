import React, { useState } from 'react';
import { IMAGES } from '../data/agriData';
import { useLanguage } from '../context/LanguageContext';
import { ResilientImage } from './ResilientImage';

interface ProtectionScreenProps {
  onOpenHelplineModal: (number: string, title: string) => void;
}

type FilterCategory = 'all' | 'insecticide' | 'herbicide' | 'fungicide';

export const ProtectionScreen: React.FC<ProtectionScreenProps> = ({
  onOpenHelplineModal,
}) => {
  const { t, tn } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('all');
  const [selectedToxicityBand, setSelectedToxicityBand] = useState<
    string | null
  >(null);

  const FILTER_CHIPS: {
    id: FilterCategory;
    labelBn: string;
    labelEn: string;
    icon: string;
  }[] = [
    {
      id: 'all',
      labelBn: 'All (সব চিকিৎসা)',
      labelEn: 'All Treatments',
      icon: 'done_all',
    },
    {
      id: 'insecticide',
      labelBn: 'কীটনাশক (Insecticides)',
      labelEn: 'Insecticides',
      icon: 'pest_control',
    },
    {
      id: 'herbicide',
      labelBn: 'আগাছানাশক (Herbicides)',
      labelEn: 'Herbicides',
      icon: 'grass',
    },
    {
      id: 'fungicide',
      labelBn: 'ছত্রাকনাশক (Fungicides)',
      labelEn: 'Fungicides',
      icon: 'microbiology',
    },
  ];

  const showCategory = (cat: FilterCategory) =>
    selectedFilter === 'all' || selectedFilter === cat;

  return (
    <div className="flex flex-col w-full pb-6 space-y-space-md">
      {/* Interactive Field Header & Agro-Zone Badge */}
      <div className="flex flex-col space-y-space-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-fixed text-primary">
              <span className="material-symbols-outlined text-[16px]">
                verified
              </span>
            </span>
            <span className="font-label-md text-label-md text-primary tracking-wide uppercase font-semibold">
              CIB&amp;RC Regulated Guidelines
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
            {t('উত্তরবঙ্গ বলয়', 'North Bengal Zone')}
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-2">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              {t('ফসল সুরক্ষা সহায়িকা', 'Crop Protection Guide')}
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {t(
                'ফর্মুলেশন, অনুমোদিত মাত্রা ও নিরাপত্তা বিধি',
                'Formulation, Dosage & Safety Protocols'
              )}
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="font-label-sm text-label-sm text-secondary font-semibold">
              {t('আমন / চা / আলু', 'Aman / Tea / Potato')}
            </span>
          </div>
        </div>
      </div>

      {/* Statutory Toxicity Color Coding Quick Reference (CIB&RC Band) */}
      <section className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col space-y-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[18px] text-primary">
              warning
            </span>
            <h3 className="font-title-sm text-title-sm text-on-surface">
              {t(
                'বিষাক্ততার সংকেত (Toxicity Band Guide)',
                'Toxicity Band Guide (CIB&RC)'
              )}
            </h3>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            {t('ত্রিকোণ চিহ্ন', 'Statutory Diamond')}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-space-xs pt-1">
          {/* Red Band */}
          <button
            type="button"
            onClick={() =>
              setSelectedToxicityBand(
                selectedToxicityBand === 'red' ? null : 'red'
              )
            }
            className={`flex flex-col items-center text-center p-1.5 rounded-lg transition-colors cursor-pointer ${
              selectedToxicityBand === 'red'
                ? 'bg-error-container ring-1 ring-error'
                : 'bg-surface-container-low hover:bg-surface-container'
            }`}
          >
            <div className="relative w-5 h-5 mb-1.5 flex items-center justify-center">
              <div className="w-4 h-4 rotate-45 bg-[#ba1a1a] shadow-sm"></div>
              <span className="material-symbols-outlined text-[10px] text-white absolute">
                skull
              </span>
            </div>
            <span className="font-label-sm text-label-sm font-semibold text-[#ba1a1a]">
              Red
            </span>
            <span className="font-label-sm text-[10px] text-on-surface-variant leading-tight">
              {tn(
                <>
                  অত্যন্ত বিষাক্ত
                  <br />
                  (Extremely)
                </>,
                <>
                  Extremely
                  <br />
                  Toxic
                </>
              )}
            </span>
          </button>

          {/* Yellow Band */}
          <button
            type="button"
            onClick={() =>
              setSelectedToxicityBand(
                selectedToxicityBand === 'yellow' ? null : 'yellow'
              )
            }
            className={`flex flex-col items-center text-center p-1.5 rounded-lg transition-colors cursor-pointer ${
              selectedToxicityBand === 'yellow'
                ? 'bg-secondary-fixed ring-1 ring-[#eab308]'
                : 'bg-surface-container-low hover:bg-surface-container'
            }`}
          >
            <div className="relative w-5 h-5 mb-1.5 flex items-center justify-center">
              <div className="w-4 h-4 rotate-45 bg-[#eab308] shadow-sm"></div>
              <span className="material-symbols-outlined text-[10px] text-[#422006] absolute">
                warning
              </span>
            </div>
            <span className="font-label-sm text-label-sm font-semibold text-[#854d0e]">
              Yellow
            </span>
            <span className="font-label-sm text-[10px] text-on-surface-variant leading-tight">
              {tn(
                <>
                  তীব্র বিষাক্ত
                  <br />
                  (Highly Toxic)
                </>,
                <>
                  Highly
                  <br />
                  Toxic
                </>
              )}
            </span>
          </button>

          {/* Blue Band */}
          <button
            type="button"
            onClick={() =>
              setSelectedToxicityBand(
                selectedToxicityBand === 'blue' ? null : 'blue'
              )
            }
            className={`flex flex-col items-center text-center p-1.5 rounded-lg transition-colors cursor-pointer ${
              selectedToxicityBand === 'blue'
                ? 'bg-tertiary-fixed ring-1 ring-[#2563eb]'
                : 'bg-surface-container-low hover:bg-surface-container'
            }`}
          >
            <div className="relative w-5 h-5 mb-1.5 flex items-center justify-center">
              <div className="w-4 h-4 rotate-45 bg-[#2563eb] shadow-sm"></div>
              <span className="material-symbols-outlined text-[10px] text-white absolute">
                shield
              </span>
            </div>
            <span className="font-label-sm text-label-sm font-semibold text-[#1d4ed8]">
              Blue
            </span>
            <span className="font-label-sm text-[10px] text-on-surface-variant leading-tight">
              {tn(
                <>
                  মাঝারি বিষাক্ত
                  <br />
                  (Moderately)
                </>,
                <>
                  Moderately
                  <br />
                  Toxic
                </>
              )}
            </span>
          </button>

          {/* Green Band */}
          <button
            type="button"
            onClick={() =>
              setSelectedToxicityBand(
                selectedToxicityBand === 'green' ? null : 'green'
              )
            }
            className={`flex flex-col items-center text-center p-1.5 rounded-lg transition-colors cursor-pointer ${
              selectedToxicityBand === 'green'
                ? 'bg-primary-fixed ring-1 ring-[#16a34a]'
                : 'bg-surface-container-low hover:bg-surface-container'
            }`}
          >
            <div className="relative w-5 h-5 mb-1.5 flex items-center justify-center">
              <div className="w-4 h-4 rotate-45 bg-[#16a34a] shadow-sm"></div>
              <span className="material-symbols-outlined text-[10px] text-white absolute">
                eco
              </span>
            </div>
            <span className="font-label-sm text-label-sm font-semibold text-[#15803d]">
              Green
            </span>
            <span className="font-label-sm text-[10px] text-on-surface-variant leading-tight">
              {tn(
                <>
                  কম বিষাক্ত
                  <br />
                  (Slightly / Bio)
                </>,
                <>
                  Slightly /
                  <br />
                  Bio-Safe
                </>
              )}
            </span>
          </button>
        </div>

        {selectedToxicityBand && (
          <div className="p-2 rounded-lg bg-surface-container text-on-surface font-body-sm text-body-sm">
            {selectedToxicityBand === 'red' && (
              <span>
                <strong className="text-[#ba1a1a]">
                  Red Triangle (LD50 &lt; 50 mg/kg):
                </strong>{' '}
                {t(
                  'মনোক্রোটোফস ও রেড-ব্যান্ড কীটনাশক সবজি ও চা বাগানে সম্পূর্ণ নিষিদ্ধ।',
                  'Monocrotophos and Red-band chemicals are strictly prohibited in tea estates and vegetables.'
                )}
              </span>
            )}
            {selectedToxicityBand === 'yellow' && (
              <span>
                <strong className="text-[#854d0e]">
                  Yellow Triangle (Highly Toxic):
                </strong>{' '}
                {t(
                  'ফুল-হাতা পোশাক, N95 মাস্ক ও রাবার গ্লাভস পরে বাতাসের অনুকূলে স্প্রে করুন।',
                  'Wear full protective clothing, N95 mask, and nitrile gloves; spray strictly downwind.'
                )}
              </span>
            )}
            {selectedToxicityBand === 'blue' && (
              <span>
                <strong className="text-[#1d4ed8]">
                  Blue Triangle (Moderately Toxic):
                </strong>{' '}
                {t(
                  'নির্ধারিত মাত্রায় নিরাপদ; স্প্রে করার পর সাবান দিয়ে হাত-মুখ ধুয়ে ফেলুন।',
                  'Safe at recommended field dilutions; wash hands and face thoroughly with soap after spraying.'
                )}
              </span>
            )}
            {selectedToxicityBand === 'green' && (
              <span>
                <strong className="text-[#15803d]">
                  Green Triangle (Slightly Toxic / Bio):
                </strong>{' '}
                {t(
                  'সমন্বিত বালাই ব্যবস্থাপনা (IPM) ও জৈব কৃষির জন্য সর্বাপেক্ষা নিরাপদ।',
                  'Safest category for Integrated Pest Management (IPM) and natural predators.'
                )}
              </span>
            )}
          </div>
        )}
      </section>

      {/* Horizontal Scroll Filter Chips */}
      <div className="flex items-center gap-space-xs overflow-x-auto pb-1 -mx-margin px-margin no-scrollbar">
        {FILTER_CHIPS.map((chip) => {
          const isSelected = selectedFilter === chip.id;
          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => setSelectedFilter(chip.id)}
              className={
                isSelected
                  ? 'shrink-0 min-h-[38px] px-space-md py-1.5 rounded-full bg-primary text-on-primary font-title-sm text-title-sm flex items-center gap-1.5 shadow-sm transition-all cursor-pointer'
                  : 'shrink-0 min-h-[38px] px-space-md py-1.5 rounded-full bg-surface-container-lowest text-on-surface font-title-sm text-title-sm flex items-center gap-1.5 shadow-sm transition-all hover:bg-surface-container-low cursor-pointer'
              }
            >
              <span className="material-symbols-outlined text-[18px]">
                {chip.icon}
              </span>
              <span>{t(chip.labelBn, chip.labelEn)}</span>
            </button>
          );
        })}
      </div>

      {/* Chemical Formulation Cards */}
      <div className="flex flex-col space-y-space-md">
        {/* Card 1: Insecticide */}
        {showCategory('insecticide') && (
          <article className="rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden flex flex-col transition-all">
            <div className="p-space-md flex flex-col space-y-space-sm">
              <div className="flex items-start justify-between gap-space-sm">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-space-xs flex-wrap">
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
                      {t('কীটনাশক (Insecticide)', 'Insecticide')}
                    </span>
                    <span className="font-label-sm text-label-sm text-secondary font-medium">
                      {t('সিস্টেমিক অ্যাকশন', 'Systemic Action')}
                    </span>
                  </div>
                  <h4 className="font-title-lg text-title-lg text-on-surface mt-1 truncate">
                    Chlorantraniliprole 18.5% SC
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {t(
                      'কোরোজেন (Coragen) / Cartap Hydrochloride 50 SP',
                      'Coragen / Cartap Hydrochloride 50 SP'
                    )}
                  </p>
                </div>
                <div className="shrink-0 flex flex-col items-center bg-surface-container-low px-2 py-1.5 rounded-lg">
                  <div className="w-4 h-4 rotate-45 bg-[#2563eb] mb-1"></div>
                  <span className="font-label-sm text-[10px] text-[#1d4ed8] font-bold">
                    MODERATE
                  </span>
                </div>
              </div>

              {/* Target Pest visual breakdown */}
              <div className="grid grid-cols-2 gap-space-xs rounded-lg overflow-hidden bg-surface-container-low p-2">
                <div className="flex items-center gap-2">
                  <ResilientImage
                    className="w-11 h-11 rounded-lg object-cover shrink-0"
                    alt="Macro detailed close-up shot of yellow stem borer larva pest damage"
                    src={IMAGES.stemBorerPest}
                    fallbackIcon="bug_report"
                  />
                  <div className="min-w-0">
                    <p className="font-label-md text-label-md font-semibold text-on-surface truncate">
                      {t('মাজরা পোকা', 'Stem Borer')}
                    </p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant truncate">
                      Yellow Stem Borer
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ResilientImage
                    className="w-11 h-11 rounded-lg object-cover shrink-0"
                    alt="Close up photographic view of tea leaf infested with Helopeltis tea mosquito bug"
                    src={IMAGES.teaMosquitoBug}
                    fallbackIcon="pest_control"
                  />
                  <div className="min-w-0">
                    <p className="font-label-md text-label-md font-semibold text-on-surface truncate">
                      {t('হ্যালোপেলটিস (চা)', 'Helopeltis (Tea)')}
                    </p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant truncate">
                      Tea Mosquito Bug
                    </p>
                  </div>
                </div>
              </div>

              {/* Dosage & Water Metrics */}
              <div className="grid grid-cols-3 gap-space-xs rounded-lg bg-surface-container p-2.5">
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {t('মাত্রা (Dosage)', 'Dosage')}
                  </span>
                  <span className="font-title-sm text-title-sm text-primary font-semibold truncate">
                    60 ml / Acre
                  </span>
                  <span className="font-label-sm text-[10px] text-on-surface-variant">
                    ~20 ml / Bigha
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {t('জল (Water)', 'Water Vol.')}
                  </span>
                  <span className="font-title-sm text-title-sm text-on-surface font-semibold truncate">
                    150-200 Litres
                  </span>
                  <span className="font-label-sm text-[10px] text-on-surface-variant">
                    Knapsack Sprayer
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {t('অপেক্ষার সময়', 'Waiting Period')}
                  </span>
                  <span className="font-title-sm text-title-sm text-secondary font-semibold truncate">
                    14 Days
                  </span>
                  <span className="font-label-sm text-[10px] text-on-surface-variant">
                    Harvest Interval
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-space-xs pt-0.5">
                <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">
                  location_on
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  <strong className="text-on-surface font-semibold">
                    {t('উত্তরবঙ্গ বলয়:', 'North Bengal Zone:')}
                  </strong>{' '}
                  {t(
                    'মালদা, দিনাজপুর ও জলপাইগুড়ির ধান বলয়। সকালের শিশির শুকিয়ে গেলে স্প্রে করুন। স্প্রে করার পর ১০-১৪ দিন চা পাতা তোলা বিরত রাখুন।',
                    'Malda, Dinajpur, and Jalpaiguri paddy tracts. Spray early morning when leaf humidity dries out. Avoid overhead tea plucking for 10-14 days.'
                  )}
                </p>
              </div>
            </div>
          </article>
        )}

        {/* Card 2: Fungicide */}
        {showCategory('fungicide') && (
          <article className="rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden flex flex-col transition-all">
            <div className="p-space-md flex flex-col space-y-space-sm">
              <div className="flex items-start justify-between gap-space-sm">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-space-xs flex-wrap">
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
                      {t('ছত্রাকনাশক (Fungicide)', 'Fungicide')}
                    </span>
                    <span className="font-label-sm text-label-sm text-secondary font-medium">
                      Dual Broad Spectrum
                    </span>
                  </div>
                  <h4 className="font-title-lg text-title-lg text-on-surface mt-1 truncate">
                    Azoxystrobin 18.2% + Difenoconazole 11.4% SC
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {t(
                      'অ্যামিস্টার টপ (Amistar Top) / Mancozeb 75% WP (ইন্ডোফিল M-45)',
                      'Amistar Top / Mancozeb 75% WP (Indofil M-45)'
                    )}
                  </p>
                </div>
                <div className="shrink-0 flex flex-col items-center bg-surface-container-low px-2 py-1.5 rounded-lg">
                  <div className="w-4 h-4 rotate-45 bg-[#eab308] mb-1"></div>
                  <span className="font-label-sm text-[10px] text-[#854d0e] font-bold">
                    HIGH
                  </span>
                </div>
              </div>

              {/* Target Diseases visual breakdown */}
              <div className="grid grid-cols-2 gap-space-xs rounded-lg overflow-hidden bg-surface-container-low p-2">
                <div className="flex items-center gap-2">
                  <ResilientImage
                    className="w-11 h-11 rounded-lg object-cover shrink-0"
                    alt="Sheath blight and blast fungal disease symptoms on rice crops"
                    src={IMAGES.sheathBlight}
                    fallbackIcon="coronavirus"
                  />
                  <div className="min-w-0">
                    <p className="font-label-md text-label-md font-semibold text-on-surface truncate">
                      {t('শীথ ব্লাইট / ব্লাস্ট', 'Sheath Blight / Blast')}
                    </p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant truncate">
                      Paddy Blast / Blight
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ResilientImage
                    className="w-11 h-11 rounded-lg object-cover shrink-0"
                    alt="Potato late blight disease spots on potato plant leaves"
                    src={IMAGES.potatoLateBlight}
                    fallbackIcon="microbiology"
                  />
                  <div className="min-w-0">
                    <p className="font-label-md text-label-md font-semibold text-on-surface truncate">
                      {t('আলুর নাবি ধসা', 'Late Blight')}
                    </p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant truncate">
                      Potato Late Blight
                    </p>
                  </div>
                </div>
              </div>

              {/* Dosage & Water Metrics */}
              <div className="grid grid-cols-3 gap-space-xs rounded-lg bg-surface-container p-2.5">
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {t('মাত্রা (Dilution)', 'Dilution')}
                  </span>
                  <span className="font-title-sm text-title-sm text-primary font-semibold truncate">
                    1 ml / Litre
                  </span>
                  <span className="font-label-sm text-[10px] text-on-surface-variant">
                    Amistar Top SC
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {t('ম্যানকোজেব WP', 'Mancozeb WP')}
                  </span>
                  <span className="font-title-sm text-title-sm text-on-surface font-semibold truncate">
                    2.5 g / Litre
                  </span>
                  <span className="font-label-sm text-[10px] text-on-surface-variant">
                    Preventive Spray
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {t('ব্যবহারের ব্যবধান', 'Spray Interval')}
                  </span>
                  <span className="font-title-sm text-title-sm text-secondary font-semibold truncate">
                    10-12 Days
                  </span>
                  <span className="font-label-sm text-[10px] text-on-surface-variant">
                    Re-spray cycle
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-space-xs pt-0.5">
                <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">
                  location_on
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  <strong className="text-on-surface font-semibold">
                    {t('তরাই আলু বলয় পরামর্শ:', 'Terai Potato Belt Advisory:')}
                  </strong>{' '}
                  {t(
                    'শিলিগুড়ি, জলপাইগুড়ি ও কোচবিহার। একটানা কুয়াশা বা মেঘলা আবহাওয়ায় পাতায় দাগ আসার আগেই প্রতিরোধমূলক ম্যানকোজেব স্প্রে করুন।',
                    'Siliguri, Jalpaiguri, & Cooch Behar. In case of continuous fog or high humidity, apply prophylactic Mancozeb before the onset of water-soaked lesions.'
                  )}
                </p>
              </div>
            </div>
          </article>
        )}

        {/* Card 3: Herbicide (Paddy) */}
        {showCategory('herbicide') && (
          <article className="rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden flex flex-col transition-all">
            <div className="p-space-md flex flex-col space-y-space-sm">
              <div className="flex items-start justify-between gap-space-sm">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-space-xs flex-wrap">
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
                      {t('আগাছানাশক (Paddy Herbicide)', 'Paddy Herbicide')}
                    </span>
                    <span className="font-label-sm text-label-sm text-secondary font-medium">
                      Early Post-Emergence
                    </span>
                  </div>
                  <h4 className="font-title-lg text-title-lg text-on-surface mt-1 truncate">
                    Pretilachlor 50% EC / Bispyribac Sodium 10% SC
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {t(
                      'রিফিট (Rifit) / নমিনি গোল্ড (Nominee Gold)',
                      'Rifit / Nominee Gold'
                    )}
                  </p>
                </div>
                <div className="shrink-0 flex flex-col items-center bg-surface-container-low px-2 py-1.5 rounded-lg">
                  <div className="w-4 h-4 rotate-45 bg-[#2563eb] mb-1"></div>
                  <span className="font-label-sm text-[10px] text-[#1d4ed8] font-bold">
                    MODERATE
                  </span>
                </div>
              </div>

              <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between gap-2">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[20px] text-secondary">
                    water_drop
                  </span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md font-semibold text-on-surface">
                      {t(
                        'আমন ও বোরো ধান (Transplanted Paddy)',
                        'Transplanted Aman & Boro Paddy'
                      )}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      {t(
                        'Echinochloa grass, sedges (ঘাস ও মোথা আগাছা)',
                        'Echinochloa barnyard grass & sedges'
                      )}
                    </span>
                  </div>
                </div>
                <span className="px-2 py-1 rounded bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-semibold shrink-0">
                  3-5 DAT
                </span>
              </div>

              <div className="grid grid-cols-3 gap-space-xs rounded-lg bg-surface-container p-2.5">
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {t('বিঘা প্রতি মাত্রা', 'Dose / Bigha')}
                  </span>
                  <span className="font-title-sm text-title-sm text-primary font-semibold truncate">
                    80-100 ml / Bigha
                  </span>
                  <span className="font-label-sm text-[10px] text-on-surface-variant">
                    Pretilachlor 50%
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {t('নমিনি গোল্ড SC', 'Nominee Gold SC')}
                  </span>
                  <span className="font-title-sm text-title-sm text-on-surface font-semibold truncate">
                    10 ml / Bigha
                  </span>
                  <span className="font-label-sm text-[10px] text-on-surface-variant">
                    15-20 DAT Spray
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {t('জমি ব্যবস্থাপনা', 'Water Level')}
                  </span>
                  <span className="font-title-sm text-title-sm text-secondary font-semibold truncate">
                    {t('2-3 cm জল', '2-3 cm Water')}
                  </span>
                  <span className="font-label-sm text-[10px] text-on-surface-variant">
                    Keep water 48 hrs
                  </span>
                </div>
              </div>

              <div className="p-2 rounded bg-surface-container-high flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px] text-secondary shrink-0">
                  info
                </span>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  <span className="text-on-surface font-semibold">
                    {t('জল ব্যবস্থাপনা নিয়ম:', 'Water Management Rule:')}
                  </span>{' '}
                  {t(
                    'প্রিটিলাক্লোর প্রয়োগের সময় জমিতে ২-৩ ইঞ্চি জল থাকতে হবে এবং ৪৮ ঘণ্টা জল ধরে রাখা আবশ্যক। জমিতে খরা থাকলে আগাছানাশক কাজ করবে না।',
                    'Maintain 2–3 cm standing water during Pretilachlor application and retain water for 48 hours. Dry soil renders the herbicide ineffective.'
                  )}
                </p>
              </div>
            </div>
          </article>
        )}

        {/* Card 4: Herbicide (Tea & Maize) */}
        {showCategory('herbicide') && (
          <article className="rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden flex flex-col transition-all">
            <div className="p-space-md flex flex-col space-y-space-sm">
              <div className="flex items-start justify-between gap-space-sm">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-space-xs flex-wrap">
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
                      {t('চা বাগান ও ভুট্টা (Tea / Maize)', 'Tea & Maize Rows')}
                    </span>
                    <span className="font-label-sm text-label-sm text-secondary font-medium">
                      Non-Selective Directed
                    </span>
                  </div>
                  <h4 className="font-title-lg text-title-lg text-on-surface mt-1 truncate">
                    Glyphosate 41% SL / Glufosinate Ammonium 13.5%
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {t(
                      'রাউন্ডআপ (Roundup) / বাস্টা (Basta 13.5% SL)',
                      'Roundup / Basta 13.5% SL'
                    )}
                  </p>
                </div>
                <div className="shrink-0 flex flex-col items-center bg-surface-container-low px-2 py-1.5 rounded-lg">
                  <div className="w-4 h-4 rotate-45 bg-[#eab308] mb-1"></div>
                  <span className="font-label-sm text-[10px] text-[#854d0e] font-bold">
                    WARNING
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-space-sm bg-surface-container-low p-2 rounded-lg">
                <span className="material-symbols-outlined text-[24px] text-primary shrink-0">
                  nature_people
                </span>
                <div className="min-w-0">
                  <p className="font-label-md text-label-md font-semibold text-on-surface truncate">
                    {t(
                      'চা বাগানের সারি ও ভুট্টা চাষের জমি',
                      'Tea Estate Inter-Rows & Maize Furrows'
                    )}
                  </p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant truncate">
                    {t(
                      'বহুবর্ষজীবী আগাছা দমন (উলু ঘাস, বনকলা)',
                      'Directed application for stubborn perennial weeds'
                    )}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-space-xs rounded-lg bg-surface-container p-2.5">
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {t('মাত্রা (Glyphosate 41%)', 'Dose (Glyphosate 41%)')}
                  </span>
                  <span className="font-title-sm text-title-sm text-primary font-semibold truncate">
                    1.0 - 1.25 L / Acre
                  </span>
                  <span className="font-label-sm text-[10px] text-on-surface-variant">
                    Use flood jet nozzle with hood
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Glufosinate (Basta)
                  </span>
                  <span className="font-title-sm text-title-sm text-on-surface font-semibold truncate">
                    500 ml / Acre
                  </span>
                  <span className="font-label-sm text-[10px] text-on-surface-variant">
                    Contact action on Dooars weed
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-space-xs text-error">
                <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">
                  do_not_disturb_on
                </span>
                <p className="font-label-sm text-label-sm leading-tight text-on-surface-variant">
                  <strong className="text-error font-semibold">
                    {t('সতর্কতা:', 'Caution:')}
                  </strong>{' '}
                  {t(
                    'প্রধান ফসলের সবুজ পাতায় স্প্রে ছিটানো যাবে না। হুড (Spray Protective Hood) যুক্ত নোজল ব্যবহার করুন।',
                    'Never allow drift onto green crop foliage. Always fit a protective spray hood on the nozzle.'
                  )}
                </p>
              </div>
            </div>
          </article>
        )}
      </div>

      {/* Chemical Tank Mixing Compatibility Alert */}
      <section className="rounded-xl bg-surface-container p-space-md shadow-sm flex flex-col space-y-space-sm">
        <div className="flex items-center gap-space-xs text-secondary">
          <span className="material-symbols-outlined text-[20px]">science</span>
          <h3 className="font-title-sm text-title-sm font-semibold">
            {t(
              'রাসায়নিক মিশ্রণ ও জলের সতর্কতা (Tank Mix Safety)',
              'Chemical Tank-Mix & Water Safety'
            )}
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-space-xs">
          <div className="flex items-start gap-2 p-2 rounded-lg bg-surface-container-lowest">
            <span className="material-symbols-outlined text-[18px] text-error shrink-0 mt-0.5">
              block
            </span>
            <div className="min-w-0">
              <p className="font-label-md text-label-md font-semibold text-on-surface">
                {t(
                  'কপার ও অর্গানোফসফেট মেশাবেন না',
                  'Never Mix Copper & Organophosphates'
                )}
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {t(
                  'ক্ষারীয় কপার অক্সিক্লোরাইডের সাথে অর্গানোফসফেট কীটনাশক মেশালে রাসায়নিক বিক্রিয়ায় উভয়ই নষ্ট হয় এবং পাতায় বিষক্রিয়া ঘটায়।',
                  'Never mix alkaline Copper Oxychloride with organophosphate insecticides. Reaction neutralizes both ingredients and harms crop leaves.'
                )}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2 p-2 rounded-lg bg-surface-container-lowest">
            <span className="material-symbols-outlined text-[18px] text-primary shrink-0 mt-0.5">
              water_ph
            </span>
            <div className="min-w-0">
              <p className="font-label-md text-label-md font-semibold text-on-surface">
                {t(
                  'পরিষ্কার নলকূপ বা পুকুরের জল ব্যবহার করুন',
                  'Use Clean Borewell or Pond Water'
                )}
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {t(
                  'নদীর ঘোলা পলিযুক্ত জল বা ডুয়ার্সের তীব্র অম্ল জল ব্যবহার করবেন না। ঘোলা জলে গ্লাইফোসেট ও কার্টাপ নিষ্ক্রিয় হয়ে যায়।',
                  'Do not use turbid river sediment or acidic Dooars runoff water. Muddy water deactivates Glyphosate and Cartap.'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Poisoning First Aid & KVK Toll-Free Advisory */}
      <section className="rounded-xl bg-error-container text-on-error-container p-space-md shadow-sm flex flex-col space-y-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[22px] text-error">
              emergency
            </span>
            <div>
              <h3 className="font-title-sm text-title-sm font-bold text-on-error-container">
                {t(
                  'জরুরি বিষক্রিয়া প্রাথমিক চিকিৎসা',
                  'Emergency Poisoning First Aid'
                )}
              </h3>
              <p className="font-label-sm text-label-sm text-on-error-container/80">
                Chemical Accidental Poisoning Protocol
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-error text-on-error font-label-sm text-[10px] font-bold uppercase tracking-wider">
            Emergency
          </span>
        </div>
        <div className="p-2.5 rounded-lg bg-surface-container-lowest text-on-surface flex flex-col space-y-1">
          <p className="font-label-sm text-label-sm text-on-surface-variant leading-relaxed">
            {tn(
              <>
                ১. গায়ে বা চোখে লাগলে অবিলম্বে অন্তত ১৫ মিনিট পরিষ্কার প্রবাহমান
                জলে ধুয়ে ফেলুন।
                <br />
                ২. আক্রান্ত ব্যক্তিকে খোলা বাতাসে নিয়ে যান এবং রাসায়নিক ভেজা
                জামাকাপড় পরিবর্তন করুন।
                <br />
                ৩. বমি করানোর চেষ্টা করবেন না; অবিলম্বে স্থানীয় স্বাস্থ্যকেন্দ্রে
                বোতলসহ নিয়ে যান।
              </>,
              <>
                1. Rinse skin or eyes immediately with clean running water for
                at least 15 minutes.
                <br />
                2. Move the affected person to fresh air and remove contaminated
                clothing.
                <br />
                3. Do not induce vomiting; take the patient with the chemical
                container to the nearest hospital.
              </>
            )}
          </p>
        </div>

        {/* Quick Dial Buttons */}
        <div className="grid grid-cols-2 gap-space-xs pt-1">
          <button
            type="button"
            onClick={() =>
              onOpenHelplineModal(
                '1800-180-1551',
                'Kisan Call Centre & Emergency Poison Helpline'
              )
            }
            className="min-h-[46px] rounded-lg bg-error text-on-error font-title-sm text-title-sm font-semibold flex items-center justify-center gap-1.5 shadow-sm active:opacity-90 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span>1800-180-1551</span>
          </button>
          <button
            type="button"
            onClick={() =>
              onOpenHelplineModal(
                '03582-270588',
                t(
                  'উত্তরবঙ্গ কৃষি বিশ্ববিদ্যালয় (UBKV KVK) হেল্পলাইন',
                  'North Bengal UBKV KVK Helpline'
                )
              )
            }
            className="min-h-[46px] rounded-lg bg-surface-container-lowest text-primary font-title-sm text-title-sm font-semibold flex items-center justify-center gap-1.5 shadow-sm active:bg-surface-container-high cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">
              contact_phone
            </span>
            <span>{t('উত্তরবঙ্গ KVK হেল্প', 'North Bengal KVK')}</span>
          </button>
        </div>
      </section>
    </div>
  );
};
