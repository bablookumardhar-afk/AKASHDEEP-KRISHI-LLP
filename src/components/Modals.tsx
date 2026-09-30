import React, { useState } from 'react';
import { CropGuideModalData, IMAGES, ScreenId } from '../data/agriData';
import { useLanguage } from '../context/LanguageContext';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { ResilientImage } from './ResilientImage';

interface ModalWrapperProps {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  title,
  subtitle,
  onClose,
  children,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[480px] max-h-[88vh] bg-surface-container-lowest rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1.5 bg-surface-container-highest rounded-full mx-auto mt-2.5 sm:hidden"></div>
        <div className="px-space-md py-3.5 border-b border-surface-container-high flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-title-md text-title-md text-primary font-bold truncate">
              {title}
            </h3>
            {subtitle && (
              <p className="font-label-sm text-label-sm text-on-surface-variant truncate">
                {subtitle}
              </p>
            )}
          </div>
          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
        <div className="p-space-md overflow-y-auto space-y-space-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export const CropProtocolModal: React.FC<{
  crop: CropGuideModalData;
  onClose: () => void;
  onNavigate: (screen: ScreenId) => void;
}> = ({ crop, onClose, onNavigate }) => {
  const { t } = useLanguage();

  return (
    <ModalWrapper
      title={crop.title}
      subtitle={crop.bengaliTitle}
      onClose={onClose}
    >
      <div className="relative w-full h-36 rounded-xl overflow-hidden bg-surface-container">
        <ResilientImage
          src={crop.image}
          alt={crop.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent flex flex-col justify-end p-3">
          <span className="font-label-sm text-label-sm text-primary-fixed">
            {crop.scientificName}
          </span>
          <span className="font-title-sm text-title-sm text-on-primary font-bold">
            {crop.soilType} • {crop.duration}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-space-sm">
        {crop.protocolSteps.map((step, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-title-sm text-title-sm text-primary font-bold">
                {step.stage}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold shrink-0">
                {step.timing}
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              {step.instruction}
            </p>
            <div className="mt-1 pt-1.5 border-t border-surface-container-high flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {t('অনুমোদিত ডোজ:', 'Recommended Dose:')}
              </span>
              <span className="font-label-sm text-label-sm text-secondary font-bold">
                {step.dosage}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          type="button"
          onClick={() => {
            onClose();
            onNavigate('soil-and-pre-sow');
          }}
          className="h-11 rounded-lg bg-surface-container text-primary font-title-sm text-title-sm font-semibold flex items-center justify-center gap-1.5 hover:bg-surface-container-high cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">
            calculate
          </span>
          <span>{t('সার ক্যালকুলেটর', 'Dosage Calc')}</span>
        </button>
        <button
          type="button"
          onClick={() => {
            onClose();
            onNavigate('crop-protection');
          }}
          className="h-11 rounded-lg bg-primary text-on-primary font-title-sm text-title-sm font-semibold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">
            pest_control
          </span>
          <span>{t('ফসল সুরক্ষা ডোজ', 'Protection Guide')}</span>
        </button>
      </div>
    </ModalWrapper>
  );
};

export const PestScannerModal: React.FC<{
  onClose: () => void;
  onNavigate: (screen: ScreenId) => void;
}> = ({ onClose, onNavigate }) => {
  const { t } = useLanguage();

  const SAMPLES = [
    {
      id: 'stem-borer',
      nameBn: 'মাজরা পোকা (Yellow Stem Borer)',
      nameEn: 'Yellow Stem Borer (Paddy)',
      cropBn: 'আমন ও বোরো ধান (Paddy)',
      cropEn: 'Aman & Boro Paddy',
      image: IMAGES.stemBorerPest,
      symptomBn:
        'ধানের মাঝখানের ডগা শুকিয়ে সাদা হয়ে যায় (Dead Heart) এবং শীষ সাদাটে চিটে হয় (White Earhead)।',
      symptomEn:
        'Central shoot dries up (Dead Heart) during vegetative stage and panicles turn chaffy white (White Earhead).',
      remedyBn:
        'Chlorantraniliprole 18.5% SC (Coragen) @ 60 ml / Acre বা Cartap 4G @ 8 kg / Acre।',
      remedyEn:
        'Chlorantraniliprole 18.5% SC (Coragen) @ 60 ml / Acre or Cartap 4G @ 8 kg / Acre.',
      toxicity: 'Blue Band (Moderate)',
    },
    {
      id: 'helopeltis',
      nameBn: 'হ্যালোপেলটিস / চা মশা পোকা (Tea Mosquito Bug)',
      nameEn: 'Tea Mosquito Bug (Helopeltis)',
      cropBn: 'উত্তরবঙ্গ চা বাগান (Tea)',
      cropEn: 'North Bengal Tea Estates',
      image: IMAGES.teaMosquitoBug,
      symptomBn:
        'কচি দুটি পাতা ও কুঁড়িতে বাদামী-কালো বৃত্তাকার দাগ পড়ে এবং পাতা কুঁকড়ে কালো হয়ে যায়।',
      symptomEn:
        'Dark brown necrotic feeding punctures on tender two-leaves-and-a-bud causing curled shoots.',
      remedyBn:
        'ভোরবেলা আক্রান্ত ডগা ছাঁটাই এবং অনুমোদিত সিস্টেমিক কীটনাশক ১৫০-২০০ লিটার জলে স্প্রে।',
      remedyEn:
        'Early morning skiffing of affected shoots followed by systemic insecticide spray in 150–200 L water.',
      toxicity: 'Blue Band (Moderate)',
    },
    {
      id: 'sheath-blight',
      nameBn: 'শীথ ব্লাইট ও ব্লাস্ট (Paddy Blast & Sheath Blight)',
      nameEn: 'Paddy Blast & Sheath Blight',
      cropBn: 'আমন ধান (Paddy)',
      cropEn: 'Aman Paddy',
      image: IMAGES.sheathBlight,
      symptomBn:
        'পাতার ওপর চোখের মতো মাকু আকৃতির দাগ এবং জলের তলের খোলে গোখরো সাপের চামড়ার মতো ছোপ।',
      symptomEn:
        'Spindle-shaped eye lesions on leaf blades and snake-skin blotches on lower leaf sheaths.',
      remedyBn:
        'Azoxystrobin 18.2% + Difenoconazole 11.4% SC (Amistar Top) @ 1 ml / Litre জল।',
      remedyEn:
        'Azoxystrobin 18.2% + Difenoconazole 11.4% SC (Amistar Top) @ 1 ml / Litre water.',
      toxicity: 'Yellow Band (High)',
    },
    {
      id: 'late-blight',
      nameBn: 'আলুর নাবি ধসা (Potato Late Blight)',
      nameEn: 'Potato Late Blight',
      cropBn: 'আলু (Terai Potato Belt)',
      cropEn: 'Potato (Terai Belt)',
      image: IMAGES.potatoLateBlight,
      symptomBn:
        'ঘন কুয়াশা ও মেঘলা আবহাওয়ায় পাতার কিনারায় জলভেজা কালচে দাগ দ্রুত পুরো ক্ষেতে ছড়িয়ে পড়ে।',
      symptomEn:
        'Water-soaked dark brown lesions on leaf margins spreading rapidly during foggy winter weather.',
      remedyBn:
        'রোগ আসার আগে Mancozeb 75% WP @ 2.5 g/L এবং রোগ দেখা দিলে Cymoxanil + Mancozeb স্প্রে।',
      remedyEn:
        'Prophylactic Mancozeb 75% WP @ 2.5 g/L; curative Cymoxanil + Mancozeb upon lesion onset.',
      toxicity: 'Yellow Band (High)',
    },
  ];

  const [selectedId, setSelectedId] = useState<string>(SAMPLES[0].id);
  const current = SAMPLES.find((s) => s.id === selectedId) || SAMPLES[0];

  return (
    <ModalWrapper
      title={t(
        'রোগ ও পোকা ফিল্ড স্ক্যানার',
        'Pest & Disease Field Scanner'
      )}
      subtitle={t(
        'উত্তরবঙ্গের ফসলের লক্ষণ মিলিয়ে তাৎক্ষণিক CIB&RC সমাধান',
        'Match North Bengal crop symptoms for instant CIB&RC remedies'
      )}
      onClose={onClose}
    >
      <div className="grid grid-cols-2 gap-2">
        {SAMPLES.map((sample) => {
          const isSelected = sample.id === selectedId;
          return (
            <button
              key={sample.id}
              type="button"
              onClick={() => setSelectedId(sample.id)}
              className={`p-2 rounded-xl flex items-center gap-2 text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
              }`}
            >
              <ResilientImage
                src={sample.image}
                alt={sample.nameEn}
                className="w-10 h-10 rounded-lg object-cover shrink-0"
              />
              <div className="min-w-0">
                <p className="font-label-sm text-label-sm font-bold truncate">
                  {t(sample.nameBn, sample.nameEn)}
                </p>
                <p
                  className={`font-label-sm text-[10px] truncate ${
                    isSelected
                      ? 'text-primary-fixed'
                      : 'text-on-surface-variant'
                  }`}
                >
                  {t(sample.cropBn, sample.cropEn)}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="p-3.5 rounded-xl bg-surface-container-low space-y-2">
        <div className="flex items-center gap-3">
          <ResilientImage
            src={current.image}
            alt={current.nameEn}
            className="w-16 h-16 rounded-xl object-cover shrink-0"
          />
          <div>
            <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[10px] font-bold">
              {current.toxicity}
            </span>
            <h4 className="font-title-sm text-title-sm text-on-surface font-bold mt-1">
              {t(current.nameBn, current.nameEn)}
            </h4>
            <p className="font-label-sm text-label-sm text-primary font-medium">
              {t(`ফসল: ${current.cropBn}`, `Crop: ${current.cropEn}`)}
            </p>
          </div>
        </div>
        <div className="pt-1">
          <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold block">
            {t('মাঠের লক্ষণ (Field Symptom):', 'Field Symptom:')}
          </span>
          <p className="font-body-sm text-body-sm text-on-surface">
            {t(current.symptomBn, current.symptomEn)}
          </p>
        </div>
        <div className="p-2.5 rounded-lg bg-surface-container-lowest">
          <span className="font-label-sm text-label-sm text-primary font-bold block">
            {t(
              'অনুমোদিত চিকিৎসা ও মাত্রা (CIB&RC Remedy):',
              'CIB&RC Approved Remedy & Dosage:'
            )}
          </span>
          <p className="font-body-sm text-body-sm text-on-surface font-medium mt-0.5">
            {t(current.remedyBn, current.remedyEn)}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          onClose();
          onNavigate('crop-protection');
        }}
        className="w-full h-11 rounded-lg bg-primary text-on-primary font-title-sm text-title-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
      >
        <span className="material-symbols-outlined text-[18px]">
          pest_control
        </span>
        <span>
          {t(
            'সম্পূর্ণ ফসল সুরক্ষা তালিকা দেখুন',
            'View Complete Crop Protection Guide'
          )}
        </span>
      </button>
    </ModalWrapper>
  );
};

export const OfflineApkModal: React.FC<{
  mode: 'download' | 'guide' | 'sync';
  onClose: () => void;
}> = ({ mode, onClose }) => {
  const { t } = useLanguage();
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [buildTarget, setBuildTarget] = useState<
    'github-yaml' | 'capacitor' | 'react-native'
  >('github-yaml');
  const [copiedCmd, setCopiedCmd] = useState(false);

  const BUILD_COMMANDS: Record<
    'github-yaml' | 'capacitor' | 'react-native',
    { label: string; badge: string; descBn: string; descEn: string; cmd: string }
  > = {
    'github-yaml': {
      label: 'GitHub Action YAML',
      badge: 'Fixed (No setup-android)',
      descBn:
        'GitHub-এ .github/workflows/build-apk.yml ফাইলটি এডিট (Pencil আইকন) করে নিচের কোডটি পেস্ট করে Commit করুন:',
      descEn:
        'On GitHub.com, open .github/workflows/build-apk.yml, click the Pencil (Edit) icon, paste this fixed YAML (without setup-android@v3), and click Commit changes:',
      cmd: `name: Build Android APK (AKASHDEEP KRISHI LLP)

on:
  push:
    branches: [ main, master ]
  workflow_dispatch:

jobs:
  build-apk:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Set up JDK 17 for Android Gradle
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '17'

      - name: Install dependencies & build web bundle
        run: |
          npm install
          npm run build

      - name: Add Capacitor Android & Sync
        run: |
          npm install @capacitor/core@6 @capacitor/cli@6 @capacitor/android@6
          npx cap add android
          npx cap sync android

      - name: Build Debug APK with Gradle
        run: |
          cd android
          chmod +x gradlew
          ./gradlew assembleDebug --no-daemon

      - name: Upload AKASHDEEP KRISHI LLP APK Artifact
        uses: actions/upload-artifact@v4
        with:
          name: AKASHDEEP-KRISHI-LLP-apk
          path: android/app/build/outputs/apk/debug/app-debug.apk`,
    },
    capacitor: {
      label: 'Capacitor APK',
      badge: '100% Exact UI',
      descBn:
        'বর্তমান React + Tailwind প্রজেক্টটিকে কোনো কোড পরিবর্তন ছাড়াই সরাসরি নেটিভ Android APK-তে রূপান্তর করুন (capacitor.config.json সংযুক্ত আছে)।',
      descEn:
        'Wraps this exact React + Tailwind build into a native Android APK with zero UI rewrite (pre-configured via capacitor.config.json).',
      cmd: 'npm install && npm run build\nnpm run apk:cap:setup\nnpm run apk:cap:sync\ncd android && ./gradlew assembleDebug',
    },
    'react-native': {
      label: 'React Native (Expo)',
      badge: '/mobile-react-native',
      descBn:
        '/mobile-react-native ফোল্ডারে সম্পূর্ণ Expo SDK 52 ও EAS APK কনফিগারেশন তৈরি করা আছে।',
      descEn:
        'Standalone React Native (Expo SDK 52) project structured in /mobile-react-native with eas.json configured for direct APK output.',
      cmd: 'cd mobile-react-native\nnpm install\nnpx eas-cli build -p android --profile preview',
    },
  };

  const activeTarget = BUILD_COMMANDS[buildTarget];

  const handleCopyCommand = () => {
    navigator.clipboard?.writeText(activeTarget.cmd);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const triggerDownload = async () => {
    if (isInstallable) {
      await install();
      return;
    }
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
    }, 1000);
  };

  return (
    <ModalWrapper
      title={
        mode === 'guide'
          ? t(
              'APK বিল্ড স্টুডিও ও ক্লাউড গাইড',
              'Mobile APK Build Studio & Cloud Guide'
            )
          : 'AKASHDEEP KRISHI LLP — Online & APK'
      }
      subtitle={t(
        'লাইভ আবহাওয়া ও মোবাইল APK বিল্ড স্টুডিও',
        'Live Weather Sync & Mobile APK Build Studio'
      )}
      onClose={onClose}
    >
      <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">
              cloud_done
            </span>
          </div>
          <div>
            <p className="font-title-sm text-title-sm text-on-surface font-bold">
              {isInstalled
                ? t('অ্যাপ ইনস্টল করা আছে', 'App Installed (Standalone)')
                : t('অনলাইন কৃষি ডেটাবেস সক্রিয়', 'Online Agro-DB v2025.4 Connected')}
            </p>
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              {t(
                '৮টি জেলার লাইভ আবহাওয়া, সার ক্যালকুলেটর ও কীটনাশক ডোজ সক্রিয়',
                '8-district live weather, dosage calculator & CIB&RC rates active'
              )}
            </p>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold">
          {t('অনলাইন', 'Online')}
        </span>
      </div>

      {/* Interactive Mobile Project & APK Builder Tabs */}
      <div className="p-3 rounded-xl bg-surface-container flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="font-title-sm text-title-sm text-primary font-bold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px]">
              terminal
            </span>
            {t(
              'APK বিল্ড স্ট্রাকচার নির্বাচন করুন:',
              'Select Mobile APK Build Pipeline:'
            )}
          </span>
          <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-primary font-label-sm text-[10px] font-bold">
            {activeTarget.badge}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {(
            ['github-yaml', 'capacitor', 'react-native'] as (
              | 'github-yaml'
              | 'capacitor'
              | 'react-native'
            )[]
          ).map((key) => {
            const selected = buildTarget === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setBuildTarget(key)}
                className={`py-1.5 px-2 rounded-lg font-label-sm text-[11px] font-bold transition-colors cursor-pointer ${
                  selected
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-high'
                }`}
              >
                {BUILD_COMMANDS[key].label}
              </button>
            );
          })}
        </div>

        <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
          {t(activeTarget.descBn, activeTarget.descEn)}
        </p>

        <div className="relative rounded-lg bg-[#0d1f17] text-[#b4f0cd] p-2.5 font-mono text-[11px] leading-relaxed overflow-x-auto">
          <pre className="whitespace-pre-wrap">{activeTarget.cmd}</pre>
          <button
            type="button"
            onClick={handleCopyCommand}
            className="mt-2 w-full py-1.5 px-2.5 rounded bg-[#1b3b2b] hover:bg-[#254f3a] text-white font-sans font-label-sm text-label-sm font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[15px]">
              {copiedCmd ? 'check' : 'content_copy'}
            </span>
            <span>
              {copiedCmd
                ? t('টার্মিনাল কমান্ড কপি হয়েছে!', 'Build Commands Copied!')
                : t('APK বিল্ড কমান্ড কপি করুন', 'Copy APK Build Commands')}
            </span>
          </button>
        </div>
      </div>

      {isIOS && !isInstalled && (
        <div className="p-2.5 rounded-lg bg-secondary-fixed/60 text-on-secondary-fixed font-label-sm text-label-sm">
          <strong>{t('iPhone / iPad ইনস্টল:', 'Install on iOS:')}</strong>{' '}
          {t(
            'Safari-র Share বোতামে ট্যাপ করে "Add to Home Screen" নির্বাচন করুন।',
            'Tap the Share button in Safari and select "Add to Home Screen".'
          )}
        </div>
      )}

      <button
        type="button"
        onClick={triggerDownload}
        className="w-full h-11 rounded-lg bg-primary text-on-primary font-title-sm text-title-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
      >
        <span
          className={`material-symbols-outlined text-[20px] ${
            downloading ? 'animate-spin' : ''
          }`}
        >
          {downloading
            ? 'sync'
            : downloaded || isInstalled
            ? 'verified'
            : 'install_mobile'}
        </span>
        <span>
          {isInstallable
            ? t(
                'সরাসরি ফোনে অ্যাপ ইনস্টল করুন (Install App)',
                'Install App Directly on Device'
              )
            : downloading
            ? t('প্রস্তুত হচ্ছে (18.4 MB)...', 'Preparing Offline Pack (18.4 MB)...')
            : downloaded
            ? t(
                'AKASHDEEP KRISHI LLP অফলাইন ক্যাশ সক্রিয়',
                'AKASHDEEP KRISHI LLP Offline Cache Active'
              )
            : t(
                'অফলাইন ডেটাবেস সিঙ্ক ও মোবাইল ইনস্টল',
                'Sync Offline DB & Mobile Install'
              )}
        </span>
      </button>
    </ModalWrapper>
  );
};

export const ProfileModal: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const { t } = useLanguage();

  return (
    <ModalWrapper
      title={t(
        'কৃষক প্রোফাইল ও মৃত্তিকা কার্ড',
        'Farmer Profile & Soil Health Card'
      )}
      subtitle="North Bengal Soil Health Card & Field Profile"
      onClose={onClose}
    >
      <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low">
        <ResilientImage
          src={IMAGES.profileAvatar}
          alt="Farmer Profile"
          className="w-14 h-14 rounded-full object-cover ring-2 ring-primary"
        />
        <div>
          <h4 className="font-title-md text-title-md text-on-surface font-bold">
            {t('দেবাশিস বর্মন (Debashis Barman)', 'Debashis Barman')}
          </h4>
          <p className="font-label-sm text-label-sm text-primary font-semibold">
            {t(
              'ময়নাগুড়ি ব্লক, জলপাইগুড়ি • Zone II (Terai)',
              'Maynaguri Block, Jalpaiguri • Zone II (Terai)'
            )}
          </p>
          <p className="font-label-sm text-label-sm text-on-surface-variant">
            Soil Health ID: WB-JPG-2025-08941
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2.5 rounded-lg bg-surface-container-low">
          <span className="font-label-sm text-label-sm text-on-surface-variant block">
            {t('মোট জমি', 'Holding')}
          </span>
          <span className="font-title-sm text-title-sm text-primary font-bold">
            {t('৬.৫ বিঘা', '6.5 Bigha')}
          </span>
        </div>
        <div className="p-2.5 rounded-lg bg-surface-container-low">
          <span className="font-label-sm text-label-sm text-on-surface-variant block">
            {t('মাটির pH', 'Soil pH')}
          </span>
          <span className="font-title-sm text-title-sm text-secondary font-bold">
            5.1 (Acidic)
          </span>
        </div>
        <div className="p-2.5 rounded-lg bg-surface-container-low">
          <span className="font-label-sm text-label-sm text-on-surface-variant block">
            {t('ডলোমাইট চক্র', 'Dolomite Cycle')}
          </span>
          <span className="font-title-sm text-title-sm text-on-surface font-bold">
            {t('সক্রিয়', 'Active')}
          </span>
        </div>
      </div>
    </ModalWrapper>
  );
};

export const PdfPreviewModal: React.FC<{
  title: string;
  subtitle: string;
  onClose: () => void;
}> = ({ title, subtitle, onClose }) => {
  const { t } = useLanguage();

  return (
    <ModalWrapper title={title} subtitle={subtitle} onClose={onClose}>
      <div className="p-3.5 rounded-xl bg-surface-container-low space-y-2">
        <div className="flex items-center justify-between border-b border-surface-container-high pb-2">
          <span className="font-title-sm text-title-sm text-primary font-bold">
            {t(
              'উত্তরবঙ্গ কৃষি নির্দেশিকা চার্ট (UBKV Standard)',
              'North Bengal Agronomy Chart (UBKV Standard)'
            )}
          </span>
          <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold">
            PDF Ready
          </span>
        </div>
        <div className="space-y-1.5 font-body-sm text-body-sm text-on-surface">
          <p>
            •{' '}
            <strong>
              {t('তরাই ও ডুয়ার্স (pH 4.5–5.5):', 'Terai & Dooars (pH 4.5–5.5):')}
            </strong>{' '}
            {t(
              'বপনের ২১ দিন পূর্বে একর প্রতি ৩০০ কেজি (বিঘাপ্রতি ১০০ কেজি) ডলোমাইট।',
              '300 kg Dolomite per Acre (100 kg/Bigha) 21 days prior to sowing.'
            )}
          </p>
          <p>
            •{' '}
            <strong>
              {t('আমন ধান বেসাল ডোজ:', 'Aman Paddy Basal Dose:')}
            </strong>{' '}
            {t(
              'বিঘাপ্রতি ১৫ কেজি DAP + ১০ কেজি MOP + ৩.৫ কেজি জিংক সালফেট ২১%।',
              '15 kg DAP + 10 kg MOP + 3.5 kg Zinc Sulphate 21% per Bigha.'
            )}
          </p>
          <p>
            • <strong>{t('জৈব শোধন:', 'Bio-Disinfection:')}</strong>{' '}
            {t(
              'একর প্রতি ২.৫ কেজি ট্রাইকোডার্মা ভিরিডি ১০০ কেজি গোবর সারের সাথে ৭ দিন ছায়ায় রেখে প্রয়োগ।',
              '2.5 kg Trichoderma viride incubated for 7 days in 100 kg moist FYM per Acre.'
            )}
          </p>
          <p>
            • <strong>{t('পাট রেটিং:', 'Jute Retting:')}</strong>{' '}
            {t(
              'ক্রাইপাফ সোনা (CRIJAF Sona) ১ কেজি/বিঘা ব্যবহারে ১২-১৫ দিনে সোনালী আঁশ।',
              'CRIJAF Sona @ 1 kg/Bigha yields golden fiber within 12–15 days.'
            )}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => window.print()}
        className="w-full h-11 rounded-lg bg-primary text-on-primary font-title-sm text-title-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
      >
        <span className="material-symbols-outlined text-[18px]">print</span>
        <span>
          {t('প্রিন্ট / PDF হিসেবে সেভ করুন', 'Print / Save as PDF')}
        </span>
      </button>
    </ModalWrapper>
  );
};

export const HelplineModal: React.FC<{
  number: string;
  title: string;
  onClose: () => void;
}> = ({ number, title, onClose }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ModalWrapper
      title={t(
        'জরুরি কৃষি ও স্বাস্থ্য হেল্পলাইন',
        'Emergency Agri & Health Helpline'
      )}
      subtitle={title}
      onClose={onClose}
    >
      <div className="p-4 rounded-xl bg-surface-container-low text-center space-y-2">
        <span className="material-symbols-outlined text-primary text-[32px]">
          support_agent
        </span>
        <p className="font-headline-md text-headline-md text-on-surface font-bold tabular-nums">
          {number}
        </p>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          {t(
            'সকাল ৯টা থেকে সন্ধ্যা ৬টা (জরুরি বিষক্রিয়া হেল্পলাইন ২৪ ঘণ্টা খোলা)',
            '9:00 AM – 6:00 PM (Emergency Poison Helpline open 24/7)'
          )}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <a
          href={`tel:${number.replace(/[^0-9+]/g, '')}`}
          className="h-11 rounded-lg bg-primary text-on-primary font-title-sm text-title-sm font-semibold flex items-center justify-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[18px]">call</span>
          <span>{t('কল করুন', 'Call Now')}</span>
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="h-11 rounded-lg bg-surface-container text-on-surface font-title-sm text-title-sm font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">
            {copied ? 'check' : 'content_copy'}
          </span>
          <span>
            {copied
              ? t('কপি হয়েছে', 'Copied')
              : t('নম্বর কপি', 'Copy Number')}
          </span>
        </button>
      </div>
    </ModalWrapper>
  );
};
