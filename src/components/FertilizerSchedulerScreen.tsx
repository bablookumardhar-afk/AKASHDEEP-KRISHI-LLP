import React, { useState, useEffect, useMemo } from 'react';
import { IMAGES, ScreenId } from '../data/agriData';
import { useLanguage } from '../context/LanguageContext';
import { ResilientImage } from './ResilientImage';

interface FertilizerSchedulerScreenProps {
  onNavigate?: (screen: ScreenId) => void;
  onOpenPdfModal?: (title: string, subtitle: string) => void;
}

export interface FertilizerInputItem {
  nameBn: string;
  nameEn: string;
  dosePerBighaKg: number;
  unitBn: string;
  unitEn: string;
  isFoliar?: boolean;
}

export interface FertilizerStage {
  id: string;
  dayOffset: number; // relative to planting date (can be negative for pre-planting lime)
  stageLabelBn: string;
  stageLabelEn: string;
  growthPhaseBn: string;
  growthPhaseEn: string;
  inputs: FertilizerInputItem[];
  methodBn: string;
  methodEn: string;
  moistureTipBn: string;
  moistureTipEn: string;
}

export interface CropFertilizerSchedule {
  id: string;
  nameBn: string;
  nameEn: string;
  varietyBn: string;
  varietyEn: string;
  seasonBn: string;
  seasonEn: string;
  durationDays: number;
  image: string;
  npkRatio: string;
  stages: FertilizerStage[];
}

const CROP_SCHEDULES: CropFertilizerSchedule[] = [
  {
    id: 'aman-paddy',
    nameBn: 'আমন ধান',
    nameEn: 'Aman Paddy',
    varietyBn: 'স্বর্ণা সাব-১ / ব্রি ধান ৫২',
    varietyEn: 'Swarna Sub-1 / MTU-7029',
    seasonBn: 'খরিফ (বর্ষা)',
    seasonEn: 'Kharif (Monsoon)',
    durationDays: 135,
    image: IMAGES.paddyField,
    npkRatio: 'N:P:K 80:40:40 kg/ha',
    stages: [
      {
        id: 'paddy-pre',
        dayOffset: -15,
        stageLabelBn: 'রোপণের ১৫ দিন পূর্বে (মাটি শোধন)',
        stageLabelEn: '15 Days Pre-Planting (Acid Soil Conditioning)',
        growthPhaseBn: 'জমি প্রস্তুতি ও অম্লত্ব সংশোধন',
        growthPhaseEn: 'Land Preparation & pH Correction',
        inputs: [
          {
            nameBn: 'কৃষি ডলোমাইট চুন (Dolomite Lime)',
            nameEn: 'Agricultural Dolomite Lime',
            dosePerBighaKg: 45,
            unitBn: 'কেজি',
            unitEn: 'kg',
          },
          {
            nameBn: 'পচা গোবর সার / কম্পোস্ট (FYM)',
            nameEn: 'Enriched Farmyard Manure (FYM)',
            dosePerBighaKg: 350,
            unitBn: 'কেজি',
            unitEn: 'kg',
          },
        ],
        methodBn:
          'প্রথম চাষের সময় শুকনো বা হালকা ভেজা মাটিতে সমানভাবে ছিটিয়ে মই দিন। রাসায়নিক সারের সাথে চুন মেশাবেন না।',
        methodEn:
          'Broadcast uniformly during primary ploughing in moist soil. Keep a 15-day gap before applying chemical NPK.',
        moistureTipBn: 'মাটিতে হালকা রস থাকা অবস্থায় প্রয়োগ করুন।',
        moistureTipEn: 'Apply in moist topsoil before deep puddling.',
      },
      {
        id: 'paddy-basal',
        dayOffset: 0,
        stageLabelBn: 'রোপণের দিন (মূল সার / Basal Dose)',
        stageLabelEn: 'Day 0 — Transplanting Basal Dose',
        growthPhaseBn: 'চারা রোপণ ও মূল স্থাপন',
        growthPhaseEn: 'Root Establishment Phase',
        inputs: [
          {
            nameBn: 'ডিএপি (DAP 18:46:0)',
            nameEn: 'DAP (18:46:0)',
            dosePerBighaKg: 12,
            unitBn: 'কেজি',
            unitEn: 'kg',
          },
          {
            nameBn: 'মিউরিয়েট অফ পটাশ (MOP)',
            nameEn: 'Muriate of Potash (MOP)',
            dosePerBighaKg: 8,
            unitBn: 'কেজি',
            unitEn: 'kg',
          },
          {
            nameBn: 'জিঙ্ক সালফেট ২১% (Zinc Sulphate)',
            nameEn: 'Zinc Sulphate Heptahydrate (21%)',
            dosePerBighaKg: 3.5,
            unitBn: 'কেজি',
            unitEn: 'kg',
          },
        ],
        methodBn:
          'শেষ কাদা চাষের (Final Puddling) সময় মাটির সাথে মিশিয়ে দিন। জিঙ্ক সালফেট সরাসরি ডিএপি-র সাথে না মিশিয়ে বালির সাথে মিশিয়ে আলাদা ছিটিয়ে দিন।',
        methodEn:
          'Incorporate into puddled mud before transplanting. Mix Zinc Sulphate with dry sand and broadcast separately from DAP.',
        moistureTipBn: 'জমিতে ২–৩ সেমি ছিপছিপে জল রাখুন।',
        moistureTipEn: 'Maintain a thin 2–3 cm water film during application.',
      },
      {
        id: 'paddy-split-1',
        dayOffset: 21,
        stageLabelBn: '২১তম দিন — প্রথম চাপান সার (1st Top Dress)',
        stageLabelEn: 'Day 21 — 1st Top Dressing (Active Tillering)',
        growthPhaseBn: 'পাশকাঠি ছাড়ার পর্যায় (Active Tillering)',
        growthPhaseEn: 'Active Tillering Stage',
        inputs: [
          {
            nameBn: 'নিম কোটেড ইউরিয়া (Neem Coated Urea)',
            nameEn: 'Neem Coated Urea (46% N)',
            dosePerBighaKg: 11,
            unitBn: 'কেজি',
            unitEn: 'kg',
          },
          {
            nameBn: 'দানাদার অনুখাদ্য / সিউইড জাইম',
            nameEn: 'Seaweed Bio-Zyme Granules',
            dosePerBighaKg: 2,
            unitBn: 'কেজি',
            unitEn: 'kg',
          },
        ],
        methodBn:
          'আগাছা পরিষ্কার করার পর বিকেলে জমির অতিরিক্ত জল বের করে ছিপছিপে জলে ইউরিয়া ছিটিয়ে দিন।',
        methodEn:
          'Weed the plot first, drain excess standing water to 2 cm, and broadcast Neem Coated Urea in late afternoon.',
        moistureTipBn: 'ভারী বৃষ্টির পূর্বাভাস থাকলে ২ দিন অপেক্ষা করুন।',
        moistureTipEn: 'Postpone by 48 hours if heavy Dooars downpour is forecast.',
      },
      {
        id: 'paddy-split-2',
        dayOffset: 42,
        stageLabelBn: '৪২তম দিন — দ্বিতীয় চাপান সার (2nd Top Dress)',
        stageLabelEn: 'Day 42 — 2nd Top Dressing (Panicle Initiation)',
        growthPhaseBn: 'থোড় আসার প্রাক্কালে (Panicle Initiation)',
        growthPhaseEn: 'Panicle Initiation (PI) Stage',
        inputs: [
          {
            nameBn: 'নিম কোটেড ইউরিয়া (Neem Coated Urea)',
            nameEn: 'Neem Coated Urea (46% N)',
            dosePerBighaKg: 11,
            unitBn: 'কেজি',
            unitEn: 'kg',
          },
          {
            nameBn: 'মিউরিয়েট অফ পটাশ (MOP)',
            nameEn: 'Muriate of Potash (MOP)',
            dosePerBighaKg: 5,
            unitBn: 'কেজি',
            unitEn: 'kg',
          },
        ],
        methodBn:
          'কাণ্ডের ভেতর কচি শীষ তৈরি হওয়ার সময় ইউরিয়া ও পটাশ একসাথে ছিটিয়ে দিন—এতে ধানের দানার সংখ্যা ও ওজন বৃদ্ধি পায়।',
        methodEn:
          'Apply Urea + MOP together at panicle initiation to maximize spikelet fertility and grain weight.',
        moistureTipBn: 'প্রয়োগের ৪৮ ঘণ্টা পর জমিতে ৫ সেমি জল ধরে রাখুন।',
        moistureTipEn: 'Restore 5 cm standing water 48 hours after application.',
      },
      {
        id: 'paddy-foliar',
        dayOffset: 65,
        stageLabelBn: '৬৫তম দিন — দানা পুষ্টি স্প্রে (Foliar Booster)',
        stageLabelEn: 'Day 65 — Booting & Grain Filling Foliar Spray',
        growthPhaseBn: 'থোড় থেকে দুধ আসা পর্যায় (Booting Stage)',
        growthPhaseEn: 'Booting to Milk Stage',
        inputs: [
          {
            nameBn: 'এনপিকে ০০:৫২:৩৪ (NPK 00:52:34)',
            nameEn: 'Water Soluble NPK 00:52:34',
            dosePerBighaKg: 0.6,
            unitBn: 'কেজি (স্প্রে)',
            unitEn: 'kg (Foliar)',
            isFoliar: true,
          },
          {
            nameBn: 'বোরন ২০% (Solubor / Boron 20%)',
            nameEn: 'Boron 20% Foliar Grade',
            dosePerBighaKg: 0.12,
            unitBn: 'কেজি (১২০ গ্রাম)',
            unitEn: 'kg (120g)',
            isFoliar: true,
          },
        ],
        methodBn:
          'বিঘাপ্রতি ১২০ লিটার জলে গুলে সকাল ৬:৩০–৯:৩০ এর মধ্যে পাতায় স্প্রে করুন। এতে চিটা ধান কমে ও দানা পুষ্ট হয়।',
        methodEn:
          'Dissolve in 120 L water per Bigha and spray on foliage between 6:30–9:30 AM to prevent chaffy grains.',
        moistureTipBn: 'সকালের রোদে পাতা শুকনো থাকা অবস্থায় স্প্রে করুন।',
        moistureTipEn: 'Spray on dry foliage during calm morning hours.',
      },
    ],
  },
  {
    id: 'rabi-maize',
    nameBn: 'হাইব্রিড ভুট্টা',
    nameEn: 'Hybrid Maize',
    varietyBn: 'পায়োনিয়ার ৩৩৯৬ / ডিকাল্ব ৯০০এম',
    varietyEn: 'Pioneer 3396 / DKC 9108',
    seasonBn: 'রবি (শীতকালীন)',
    seasonEn: 'Rabi (Winter)',
    durationDays: 140,
    image: IMAGES.soilConditioningHero,
    npkRatio: 'N:P:K 150:75:75 kg/ha',
    stages: [
      {
        id: 'maize-pre',
        dayOffset: -15,
        stageLabelBn: 'বপনের ১৫ দিন পূর্বে (ডলোমাইট চুন)',
        stageLabelEn: '15 Days Pre-Sowing (Dolomite Conditioning)',
        growthPhaseBn: 'অম্ল মাটি শোধন',
        growthPhaseEn: 'Acid Soil Neutralization',
        inputs: [
          {
            nameBn: 'কৃষি ডলোমাইট (Dolomite Lime)',
            nameEn: 'Agricultural Dolomite Lime',
            dosePerBighaKg: 50,
            unitBn: 'কেজি',
            unitEn: 'kg',
          },
        ],
        methodBn:
          'তরাই ও তিস্তা অববাহিকার অম্ল মাটিতে ফসফরাসের কার্যকারিতা বাড়াতে বপনের ১৫ দিন আগে ডলোমাইট মেশান।',
        methodEn:
          'Incorporate into acidic Terai/Teesta soil 15 days before sowing to unlock phosphorus availability.',
        moistureTipBn: 'হালকা চাষ দিয়ে মাটির সাথে মিশিয়ে দিন।',
        moistureTipEn: 'Mix thoroughly with rotavator in moist soil.',
      },
      {
        id: 'maize-basal',
        dayOffset: 0,
        stageLabelBn: 'বপনের দিন (মূল সার / Basal Furrow)',
        stageLabelEn: 'Day 0 — Sowing Basal Furrow Dose',
        growthPhaseBn: 'বীজ বপন ও অঙ্কুরোদগম',
        growthPhaseEn: 'Seedling Emergence Phase',
        inputs: [
          {
            nameBn: 'এনপিকে ১০:২৬:২৬ (NPK 10:26:26)',
            nameEn: 'NPK 10:26:26 Complex',
            dosePerBighaKg: 22,
            unitBn: 'কেজি',
            unitEn: 'kg',
          },
          {
            nameBn: 'জিঙ্ক সালফেট ২১% (Zinc Sulphate)',
            nameEn: 'Zinc Sulphate 21%',
            dosePerBighaKg: 4,
            unitBn: 'কেজি',
            unitEn: 'kg',
          },
          {
            nameBn: 'বোরাক্স ১০.৫% (Borax)',
            nameEn: 'Agricultural Borax (10.5% B)',
            dosePerBighaKg: 1.5,
            unitBn: 'কেজি',
            unitEn: 'kg',
          },
        ],
        methodBn:
          'বীজ বপনের নালায় ৫ সেমি গভীরে সার দিয়ে হালকা মাটি চাপা দিন, তারপর বীজ বপন করুন।',
        methodEn:
          'Place in furrows 5 cm below seed depth and cover with a thin layer of soil before dibbling seeds.',
        moistureTipBn: 'বপনের পর হালকা অঙ্কুরোদগম সেচ দিন।',
        moistureTipEn: 'Provide light germination irrigation if topsoil is dry.',
      },
      {
        id: 'maize-split-1',
        dayOffset: 28,
        stageLabelBn: '২৮তম দিন — প্রথম চাপান (হাঁটু সমান উচ্চতা / V6)',
        stageLabelEn: 'Day 28 — 1st Top Dressing (Knee-High V6 Stage)',
        growthPhaseBn: 'হাঁটু সমান গাছ ও গোড়ায় মাটি দেওয়া',
        growthPhaseEn: 'Knee-High Vegetative & Earthing Up',
        inputs: [
          {
            nameBn: 'নিম কোটেড ইউরিয়া (Urea)',
            nameEn: 'Neem Coated Urea',
            dosePerBighaKg: 15,
            unitBn: 'কেজি',
            unitEn: 'kg',
          },
        ],
        methodBn:
          'গাছের সারি বরাবর গোড়া থেকে ৬ ইঞ্চি দূরে ইউরিয়া দিয়ে গোড়ায় মাটি তুলে দিন এবং হালকা সেচ দিন।',
        methodEn:
          'Band-place Urea 15 cm away from stalks, perform earthing-up, and irrigate lightly.',
        moistureTipBn: 'সার দেওয়ার ২৪ ঘণ্টার মধ্যে হালকা সেচ আবশ্যক।',
        moistureTipEn: 'Light furrow irrigation within 24 hours prevents nitrogen loss.',
      },
      {
        id: 'maize-split-2',
        dayOffset: 50,
        stageLabelBn: '৫০তম দিন — দ্বিতীয় চাপান (পুরুষ ফুল আসার আগে)',
        stageLabelEn: 'Day 50 — 2nd Top Dressing (Pre-Tasseling)',
        growthPhaseBn: 'পুরুষ মঞ্জরি (Tassel) নির্গমন পর্যায়',
        growthPhaseEn: 'Pre-Tasseling Rapid Growth Stage',
        inputs: [
          {
            nameBn: 'নিম কোটেড ইউরিয়া (Urea)',
            nameEn: 'Neem Coated Urea',
            dosePerBighaKg: 15,
            unitBn: 'কেজি',
            unitEn: 'kg',
          },
          {
            nameBn: 'মিউরিয়েট অফ পটাশ (MOP)',
            nameEn: 'Muriate of Potash (MOP)',
            dosePerBighaKg: 8,
            unitBn: 'কেজি',
            unitEn: 'kg',
          },
        ],
        methodBn:
          'মোচা ও পুরুষ ফুল আসার ঠিক আগে ইউরিয়া ও পটাশ প্রয়োগ করলে ভুট্টার মোচা বড় ও দানা ভরাট হয়।',
        methodEn:
          'Side-dress Urea + MOP prior to tassel emergence to support heavy cob formation.',
        moistureTipBn: 'এই পর্যায়ে মাটিতে রসের ঘাটতি হতে দেবেন না।',
        moistureTipEn: 'Critical moisture stage—irrigate immediately after dressing.',
      },
      {
        id: 'maize-foliar',
        dayOffset: 68,
        stageLabelBn: '৬৮তম দিন — মোচার দানা ভরাট বোরন স্প্রে',
        stageLabelEn: 'Day 68 — Silking & Cob Fill Boron Spray',
        growthPhaseBn: 'মোচায় রেশম (Silking) ও দানা গঠন',
        growthPhaseEn: 'Silking & Kernel Setting Stage',
        inputs: [
          {
            nameBn: 'বোরন ২০% স্প্রে (Boron 20%)',
            nameEn: 'Soluble Boron 20%',
            dosePerBighaKg: 0.18,
            unitBn: 'কেজি (১৮০ গ্রাম)',
            unitEn: 'kg (180g)',
            isFoliar: true,
          },
          {
            nameBn: 'এনপিকে ১৩:০০:৪৫ (Potassium Nitrate)',
            nameEn: 'NPK 13:00:45 (Potassium Nitrate)',
            dosePerBighaKg: 0.6,
            unitBn: 'কেজি (স্প্রে)',
            unitEn: 'kg (Foliar)',
            isFoliar: true,
          },
        ],
        methodBn:
          'উত্তরবঙ্গে ভুট্টার মোচার ডগা ফাঁকা থাকা (Hollow Cob) রোধ করতে ১২০ লিটার জলে গুলে পাতায় স্প্রে করুন।',
        methodEn:
          'Foliar spray in 120 L water/Bigha during silking to eliminate tip-blanking and hollow cobs.',
        moistureTipBn: 'সকালবেলা শান্ত আবহাওয়ায় স্প্রে করুন।',
        moistureTipEn: 'Apply in calm morning weather for maximum leaf uptake.',
      },
    ],
  },
  {
    id: 'potato-rabi',
    nameBn: 'জ্যোতি ও পোখরাজ আলু',
    nameEn: 'Jyoti & Pukhraj Potato',
    varietyBn: 'কুফরি জ্যোতি / কুফরি পোখরাজ',
    varietyEn: 'Kufri Jyoti / Kufri Pukhraj',
    seasonBn: 'রবি (শীতকালীন)',
    seasonEn: 'Rabi (Winter)',
    durationDays: 95,
    image: IMAGES.potatoLateBlight,
    npkRatio: 'N:P:K 180:150:150 kg/ha',
    stages: [
      {
        id: 'potato-basal',
        dayOffset: 0,
        stageLabelBn: 'বপনের দিন — মূল সার (Furrow Basal)',
        stageLabelEn: 'Day 0 — Tuber Planting Basal Dose',
        growthPhaseBn: 'কন্দ রোপণ ও অঙ্কুরোদগম',
        growthPhaseEn: 'Tuber Sprouting Phase',
        inputs: [
          {
            nameBn: 'এনপিকে ১০:২৬:২৬ (NPK 10:26:26)',
            nameEn: 'NPK 10:26:26 Complex',
            dosePerBighaKg: 35,
            unitBn: 'কেজি',
            unitEn: 'kg',
          },
          {
            nameBn: 'মিউরিয়েট অফ পটাশ (MOP)',
            nameEn: 'Muriate of Potash (MOP)',
            dosePerBighaKg: 12,
            unitBn: 'কেজি',
            unitEn: 'kg',
          },
          {
            nameBn: 'বোরাক্স (Borax 10.5%)',
            nameEn: 'Agricultural Borax',
            dosePerBighaKg: 1.5,
            unitBn: 'কেজি',
            unitEn: 'kg',
          },
        ],
        methodBn:
          'আলু বসানোর নালায় সার মিশিয়ে হালকা মাটি দিয়ে ঢেকে দিন যাতে বীজ আলু সরাসরি রাসায়নিক সারের সংস্পর্শে না আসে।',
        methodEn:
          'Apply in planting furrows and cover with 2 cm soil layer so cut seed tubers do not touch raw fertilizer.',
        moistureTipBn: 'মাটিতে পরিমিত জো থাকা অবস্থায় আলু বসান।',
        moistureTipEn: 'Plant in well-aerated, friable moist ridges.',
      },
      {
        id: 'potato-split-1',
        dayOffset: 24,
        stageLabelBn: '২৪তম দিন — প্রথম ভেলি তোলা ও চাপান সার',
        stageLabelEn: 'Day 24 — 1st Earthing Up & Top Dressing',
        growthPhaseBn: 'স্টোলন গঠন (Stolon Initiation)',
        growthPhaseEn: 'Stolon Formation Stage',
        inputs: [
          {
            nameBn: 'নিম কোটেড ইউরিয়া (Urea)',
            nameEn: 'Neem Coated Urea',
            dosePerBighaKg: 12,
            unitBn: 'কেজি',
            unitEn: 'kg',
          },
          {
            nameBn: 'ম্যাগনেসিয়াম সালফেট (MgSO4)',
            nameEn: 'Magnesium Sulphate',
            dosePerBighaKg: 4,
            unitBn: 'কেজি',
            unitEn: 'kg',
          },
        ],
        methodBn:
          'গাছের দুই পাশের নালায় সার দিয়ে প্রথমবার উঁচু করে ভেলি (Earthing Up) তুলে দিন এবং হালকা সেচ দিন।',
        methodEn:
          'Apply along furrow sides, complete first ridge earthing-up, and irrigate up to half ridge height.',
        moistureTipBn: 'ভেলির অর্ধেক উচ্চতা পর্যন্ত সেচ দিন, ভেলি ডোবাবেন না।',
        moistureTipEn: 'Irrigate only up to 2/3 of ridge height; never submerge ridges.',
      },
      {
        id: 'potato-split-2',
        dayOffset: 42,
        stageLabelBn: '৪২তম দিন — কন্দ স্ফীতি ও পটাশ বুস্টার',
        stageLabelEn: 'Day 42 — Tuber Bulking Top Dressing',
        growthPhaseBn: 'আলুর আকার ও ওজন বৃদ্ধি (Tuber Bulking)',
        growthPhaseEn: 'Rapid Tuber Bulking Phase',
        inputs: [
          {
            nameBn: 'নিম কোটেড ইউরিয়া (Urea)',
            nameEn: 'Neem Coated Urea',
            dosePerBighaKg: 8,
            unitBn: 'কেজি',
            unitEn: 'kg',
          },
          {
            nameBn: 'সালফেট অফ পটাশ (SOP 00:00:50)',
            nameEn: 'Sulphate of Potash (SOP)',
            dosePerBighaKg: 6,
            unitBn: 'কেজি',
            unitEn: 'kg',
          },
        ],
        methodBn:
          'দ্বিতীয়বার মাটি দেওয়ার সময় প্রয়োগ করুন। পটাশ আলুর ওজন, চামড়ার উজ্জ্বলতা ও সংরক্ষণ ক্ষমতা বাড়ায়।',
        methodEn:
          'Apply during final ridge shaping to accelerate starch translocation and tuber size.',
        moistureTipBn: 'মাটিতে সমান আর্দ্রতা বজায় রাখলে আলু ফাটে না।',
        moistureTipEn: 'Uniform soil moisture prevents hollow heart and growth cracks.',
      },
      {
        id: 'potato-foliar',
        dayOffset: 58,
        stageLabelBn: '৫৮তম দিন — আলু পুষ্টি ও চামড়া শক্ত করার স্প্রে',
        stageLabelEn: 'Day 58 — Tuber Maturation SOP + Boron Spray',
        growthPhaseBn: 'কন্দ পরিপক্কতা (Maturation Stage)',
        growthPhaseEn: 'Tuber Maturation & Skin Set',
        inputs: [
          {
            nameBn: 'এনপিকে ০০:০০:৫০ (SOP Soluble)',
            nameEn: 'Water Soluble NPK 00:00:50',
            dosePerBighaKg: 0.6,
            unitBn: 'কেজি (স্প্রে)',
            unitEn: 'kg (Foliar)',
            isFoliar: true,
          },
          {
            nameBn: 'বোরন ২০% (Boron 20%)',
            nameEn: 'Soluble Boron 20%',
            dosePerBighaKg: 0.12,
            unitBn: 'কেজি (১২০ গ্রাম)',
            unitEn: 'kg (120g)',
            isFoliar: true,
          },
        ],
        methodBn:
          '১২০ লিটার জলে গুলে স্প্রে করুন—এতে আলুর ওজন ১০–১৫% বাড়ে এবং কোল্ড স্টোরেজে পচন রোধ হয়।',
        methodEn:
          'Spray in 120 L water/Bigha to boost dry matter content and cold-storage keeping quality.',
        moistureTipBn: 'আলু তোলার ১২ দিন আগে সেচ বন্ধ করুন।',
        moistureTipEn: 'Stop irrigation 12 days prior to harvesting for firm skin set.',
      },
    ],
  },
  {
    id: 'estate-tea',
    nameBn: 'ডুয়ার্স ও তরাই চা',
    nameEn: 'Dooars & Terai Tea',
    varietyBn: 'টিভি-২৫ / টিভি-২৬ ক্লোনাল চা',
    varietyEn: 'TV-25 / TV-26 Estate Clonal Tea',
    seasonBn: 'বহুবর্ষজীবী (৩ কিস্তি)',
    seasonEn: 'Perennial (3-Split Cycle)',
    durationDays: 180,
    image: IMAGES.teaEstate,
    npkRatio: 'YTD 120:30:120 kg/ha',
    stages: [
      {
        id: 'tea-spring',
        dayOffset: 0,
        stageLabelBn: 'দিন ০ — প্রুনিং পরবর্তী প্রথম কিস্তি (1st Split)',
        stageLabelEn: 'Day 0 — Post-Pruning Spring Flush Basal',
        growthPhaseBn: 'বসন্তকালীন কুঁড়ি নির্গমন (First Flush)',
        growthPhaseEn: 'Spring Flush Shoot Emergence',
        inputs: [
          {
            nameBn: 'ইউরিয়া + রক ফসফেট + পটাশ (YTD Mix)',
            nameEn: 'YTD NPK Mixture (Urea + Rock Phosphate + MOP)',
            dosePerBighaKg: 24,
            unitBn: 'কেজি',
            unitEn: 'kg',
          },
          {
            nameBn: 'ডলোমাইট চুন (Dolomite)',
            nameEn: 'Dolomite Soil Conditioner',
            dosePerBighaKg: 35,
            unitBn: 'কেজি',
            unitEn: 'kg',
          },
        ],
        methodBn:
          'চা গাছের গোড়া থেকে ১৫–২০ সেমি দূরে রিং পদ্ধতিতে (Ring Placement) প্রয়োগ করুন।',
        methodEn:
          'Apply in crescent/ring bands 15–20 cm away from tea bush collars after light skiffing.',
        moistureTipBn: 'প্রথম বসন্ত বৃষ্টির পর মাটিতে রস থাকলে প্রয়োগ করুন।',
        moistureTipEn: 'Apply immediately after early spring showers.',
      },
      {
        id: 'tea-foliar-zinc',
        dayOffset: 35,
        stageLabelBn: '৩৫তম দিন — দুটি পাতা একটি কুঁড়ি অনুখাদ্য স্প্রে',
        stageLabelEn: 'Day 35 — Second Flush Zinc-Magnesium Foliar',
        growthPhaseBn: 'দ্বিতীয় ফ্লাশ পাতা চয়ন (Second Flush)',
        growthPhaseEn: 'Second Flush Active Plucking',
        inputs: [
          {
            nameBn: 'জিঙ্ক সালফেট + ম্যাগনেসিয়াম সালফেট',
            nameEn: 'Zinc Sulphate (1%) + MgSO4 (1%)',
            dosePerBighaKg: 1.2,
            unitBn: 'কেজি (স্প্রে)',
            unitEn: 'kg (Foliar)',
            isFoliar: true,
          },
        ],
        methodBn:
          'পাতা তোলার পরের দিন সকালে পাতায় স্প্রে করুন, এতে নতুন কুঁড়ির ঘনত্ব ও চায়ের গুণমান বৃদ্ধি পায়।',
        methodEn:
          'Spray on maintenance foliage immediately after plucking round to stimulatedormant banjhi buds.',
        moistureTipBn: 'বৃষ্টির কমপক্ষে ৪ ঘণ্টা আগে স্প্রে সম্পন্ন করুন।',
        moistureTipEn: 'Ensure 4 rain-free hours after foliar misting.',
      },
      {
        id: 'tea-monsoon',
        dayOffset: 75,
        stageLabelBn: '৭৫তম দিন — বর্ষাকালীন দ্বিতীয় কিস্তি (2nd Split)',
        stageLabelEn: 'Day 75 — Monsoon Peak 2nd Split YTD',
        growthPhaseBn: 'বর্ষাকালীন দ্রুত পাতা বৃদ্ধি',
        growthPhaseEn: 'Peak Monsoon Flush Phase',
        inputs: [
          {
            nameBn: 'ইউরিয়া (Urea 46% N)',
            nameEn: 'Neem Coated Urea',
            dosePerBighaKg: 16,
            unitBn: 'কেজি',
            unitEn: 'kg',
          },
          {
            nameBn: 'মিউরিয়েট অফ পটাশ (MOP)',
            nameEn: 'Muriate of Potash (MOP)',
            dosePerBighaKg: 10,
            unitBn: 'কেজি',
            unitEn: 'kg',
          },
        ],
        methodBn:
          'জল নিকাশি নালা পরিষ্কার রেখে রোদেলা দিনে চা গাছের সারির মাঝে ছিটিয়ে দিন।',
        methodEn:
          'Broadcast between bush rows during a sunny break in monsoon; ensure sub-surface drains are clear.',
        moistureTipBn: 'জল জমে থাকা অবস্থায় সার দেবেন না।',
        moistureTipEn: 'Avoid broadcasting during heavy runoff events.',
      },
    ],
  },
  {
    id: 'tossa-jute',
    nameBn: 'সোনালী পাট (তোষা)',
    nameEn: 'Tossa Jute (Pat)',
    varietyBn: 'জেআরও ২০৪ (Suren) / নবীন',
    varietyEn: 'JRO-204 (Suren) / JRO-524',
    seasonBn: 'প্রাক-খরিফ (গ্রীষ্ম)',
    seasonEn: 'Pre-Kharif (Summer)',
    durationDays: 115,
    image: IMAGES.juteCrop,
    npkRatio: 'N:P:K 60:30:30 kg/ha',
    stages: [
      {
        id: 'jute-basal',
        dayOffset: 0,
        stageLabelBn: 'বপনের দিন — মূল সার (Basal Dose)',
        stageLabelEn: 'Day 0 — Sowing Basal Dose',
        growthPhaseBn: 'বীজ বপন ও চারা গজানো',
        growthPhaseEn: 'Sowing & Germination',
        inputs: [
          {
            nameBn: 'সিঙ্গেল সুপার ফসফেট (SSP)',
            nameEn: 'Single Super Phosphate (SSP 16%)',
            dosePerBighaKg: 20,
            unitBn: 'কেজি',
            unitEn: 'kg',
          },
          {
            nameBn: 'মিউরিয়েট অফ পটাশ (MOP)',
            nameEn: 'Muriate of Potash (MOP)',
            dosePerBighaKg: 6,
            unitBn: 'কেজি',
            unitEn: 'kg',
          },
        ],
        methodBn:
          'পাটের আঁশের শক্তি ও উজ্জ্বলতা বাড়াতে ফসফেট হিসেবে এসএসপি (যাতে সালফার আছে) শেষ চাষে মাটিতে মেশান।',
        methodEn:
          'Incorporate SSP (rich in Sulphur) and MOP during final land preparation for tensile golden fiber.',
        moistureTipBn: 'প্রাক-বর্ষা বৃষ্টির পর জো মাটিতে বপন করুন।',
        moistureTipEn: 'Sow immediately after Norwester (Kalbaishakhi) showers.',
      },
      {
        id: 'jute-split-1',
        dayOffset: 21,
        stageLabelBn: '২১তম দিন — চারা পাতলাকরণ ও ১ম চাপান',
        stageLabelEn: 'Day 21 — Thinning & 1st Top Dressing',
        growthPhaseBn: 'প্রথম নিড়ানি ও চারা পাতলাকরণ',
        growthPhaseEn: 'First Weeding & Plant Thinning',
        inputs: [
          {
            nameBn: 'নিম কোটেড ইউরিয়া (Urea)',
            nameEn: 'Neem Coated Urea',
            dosePerBighaKg: 8,
            unitBn: 'কেজি',
            unitEn: 'kg',
          },
        ],
        methodBn:
          'ঘন চারা তুলে পাতলা করার পর এবং আগাছা পরিষ্কার করে ভেজা মাটিতে ইউরিয়া ছিটিয়ে দিন।',
        methodEn:
          'Complete hand weeding and plant thinning to 5–7 cm spacing before broadcasting Urea.',
        moistureTipBn: 'মাটিতে পর্যাপ্ত রস থাকা জরুরি।',
        moistureTipEn: 'Ensure moist topsoil for rapid nitrogen uptake.',
      },
      {
        id: 'jute-split-2',
        dayOffset: 42,
        stageLabelBn: '৪২তম দিন — দ্রুত কাণ্ড বৃদ্ধির ২য় চাপান',
        stageLabelEn: 'Day 42 — Stem Elongation 2nd Top Dressing',
        growthPhaseBn: 'পাট গাছের দ্রুত উচ্চতা বৃদ্ধি',
        growthPhaseEn: 'Rapid Bast Fiber Elongation',
        inputs: [
          {
            nameBn: 'নিম কোটেড ইউরিয়া (Urea)',
            nameEn: 'Neem Coated Urea',
            dosePerBighaKg: 8,
            unitBn: 'কেজি',
            unitEn: 'kg',
          },
        ],
        methodBn:
          'গাছের দ্রুত লম্বা হওয়ার সময় দ্বিতীয় কিস্তির ইউরিয়া প্রয়োগ করুন; এতে আঁশ লম্বা ও পুরু হয়।',
        methodEn:
          'Apply second split nitrogen at 42 DAS to maximize stalk height and bast fiber yield.',
        moistureTipBn: 'জল জমে থাকলে নিকাশের ব্যবস্থা করুন।',
        moistureTipEn: 'Prevent waterlogging in young jute plots.',
      },
    ],
  },
];

interface SavedReminderConfig {
  cropId: string;
  plantingDate: string;
  areaSize: number;
  areaUnit: 'bigha' | 'acre';
  notificationsEnabled: boolean;
  reminderTiming: '1day-before' | 'same-day' | 'both';
  completedStages: string[];
  mutedStages: string[];
}

const STORAGE_KEY = 'akashdeep_fertilizer_scheduler_v1';

function getDefaultPlantingDate(): string {
  // Default to 16 days ago so the user immediately sees Basal completed and 1st Top Dressing coming up in 5 days!
  const d = new Date();
  d.setDate(d.getDate() - 16);
  return d.toISOString().split('T')[0];
}

function addDays(isoDate: string, offsetDays: number): Date {
  const [y, m, d] = isoDate.split('-').map(Number);
  const dt = new Date(y, (m || 1) - 1, d || 1);
  dt.setDate(dt.getDate() + offsetDays);
  return dt;
}

function diffDaysFromToday(targetDate: Date): number {
  const now = new Date();
  const todayMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const targetMidnight = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate()
  );
  return Math.round(
    (targetMidnight.getTime() - todayMidnight.getTime()) / (1000 * 60 * 60 * 24)
  );
}

export const FertilizerSchedulerScreen: React.FC<
  FertilizerSchedulerScreenProps
> = ({ onOpenPdfModal }) => {
  const { lang, t } = useLanguage();

  const [config, setConfig] = useState<SavedReminderConfig>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as SavedReminderConfig;
        if (parsed.cropId && parsed.plantingDate) {
          return parsed;
        }
      }
    } catch {
      // ignore storage errors
    }
    return {
      cropId: 'aman-paddy',
      plantingDate: getDefaultPlantingDate(),
      areaSize: 3,
      areaUnit: 'bigha',
      notificationsEnabled: true,
      reminderTiming: 'both',
      completedStages: ['paddy-pre', 'paddy-basal'],
      mutedStages: [],
    };
  });

  const [pushBanner, setPushBanner] = useState<{
    title: string;
    body: string;
    dateStr: string;
  } | null>(null);
  const [permissionState, setPermissionState] = useState<string>(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return 'default';
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      // ignore quota errors
    }
  }, [config]);

  const activeCrop = useMemo(
    () =>
      CROP_SCHEDULES.find((c) => c.id === config.cropId) || CROP_SCHEDULES[0],
    [config.cropId]
  );

  // Convert area to Bigha multiplier (1 Acre = 3 Bigha in West Bengal standard)
  const bighaMultiplier =
    config.areaUnit === 'acre' ? config.areaSize * 3 : config.areaSize;

  const calculatedStages = useMemo(() => {
    return activeCrop.stages.map((stage) => {
      const targetDate = addDays(config.plantingDate, stage.dayOffset);
      const daysDiff = diffDaysFromToday(targetDate);
      const isCompleted = config.completedStages.includes(stage.id);
      const isMuted = config.mutedStages.includes(stage.id);

      const formattedDate = targetDate.toLocaleDateString(
        lang === 'bn' ? 'bn-IN' : 'en-IN',
        {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }
      );

      const scaledInputs = stage.inputs.map((inp) => ({
        ...inp,
        totalKg:
          Math.round(inp.dosePerBighaKg * bighaMultiplier * 100) / 100,
      }));

      return {
        ...stage,
        targetDate,
        formattedDate,
        daysDiff,
        isCompleted,
        isMuted,
        scaledInputs,
      };
    });
  }, [
    activeCrop,
    config.plantingDate,
    config.completedStages,
    config.mutedStages,
    bighaMultiplier,
    lang,
  ]);

  // Identify the next upcoming uncompleted stage
  const nextUpcomingStage = useMemo(() => {
    const uncompleted = calculatedStages.filter((s) => !s.isCompleted);
    const futureOrToday = uncompleted.filter((s) => s.daysDiff >= 0);
    if (futureOrToday.length > 0) {
      return futureOrToday[0];
    }
    return uncompleted[0] || calculatedStages[calculatedStages.length - 1];
  }, [calculatedStages]);

  const triggerPushNotification = async (
    stageTitle: string,
    inputsSummary: string,
    dateLabel: string
  ) => {
    const notifTitle = t(
      `সার প্রয়োগের রিমাইন্ডার • ${activeCrop.nameBn}`,
      `Fertilizer Reminder • ${activeCrop.nameEn}`
    );
    const notifBody = `${stageTitle} (${dateLabel}) — ${inputsSummary}`;

    // Always display rich in-app push notification toast banner so it works inside mobile/iframe/desktop
    setPushBanner({
      title: notifTitle,
      body: notifBody,
      dateStr: dateLabel,
    });

    // Also fire native browser / Service Worker push notification if supported
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        let perm = Notification.permission;
        if (perm === 'default') {
          perm = await Notification.requestPermission();
          setPermissionState(perm);
        }
        if (perm === 'granted') {
          if ('serviceWorker' in navigator) {
            const reg = await navigator.serviceWorker.getRegistration();
            if (reg && 'showNotification' in reg) {
              await reg.showNotification(notifTitle, {
                body: notifBody,
                icon: '/pwa-192x192.png',
                badge: '/pwa-192x192.png',
              });
              return;
            }
          }
          new Notification(notifTitle, {
            body: notifBody,
            icon: '/pwa-192x192.png',
          });
        }
      } catch {
        // Fallback banner is already shown above
      }
    }
  };

  const handleToggleNotificationMaster = async () => {
    const nextState = !config.notificationsEnabled;
    setConfig((prev) => ({ ...prev, notificationsEnabled: nextState }));
    if (nextState && nextUpcomingStage) {
      const summary = nextUpcomingStage.scaledInputs
        .map(
          (i) =>
            `${i.totalKg} ${t(i.unitBn, i.unitEn)} ${t(i.nameBn, i.nameEn)}`
        )
        .join(' + ');
      await triggerPushNotification(
        t(nextUpcomingStage.stageLabelBn, nextUpcomingStage.stageLabelEn),
        summary,
        nextUpcomingStage.formattedDate
      );
    }
  };

  const handleToggleStageComplete = (stageId: string) => {
    setConfig((prev) => {
      const exists = prev.completedStages.includes(stageId);
      return {
        ...prev,
        completedStages: exists
          ? prev.completedStages.filter((id) => id !== stageId)
          : [...prev.completedStages, stageId],
      };
    });
  };

  const handleToggleStageReminder = async (
    stage: (typeof calculatedStages)[number]
  ) => {
    const wasMuted = config.mutedStages.includes(stage.id);
    setConfig((prev) => ({
      ...prev,
      mutedStages: wasMuted
        ? prev.mutedStages.filter((id) => id !== stage.id)
        : [...prev.mutedStages, stage.id],
    }));

    if (wasMuted) {
      const summary = stage.scaledInputs
        .map(
          (i) =>
            `${i.totalKg} ${t(i.unitBn, i.unitEn)} ${t(i.nameBn, i.nameEn)}`
        )
        .join(' + ');
      await triggerPushNotification(
        t(stage.stageLabelBn, stage.stageLabelEn),
        summary,
        stage.formattedDate
      );
    }
  };

  const handleQuickDateOffset = (daysAgo: number) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    const iso = d.toISOString().split('T')[0];
    // Auto-mark stages strictly in the past as completed so the user sees the next upcoming stage
    const autoCompleted = activeCrop.stages
      .filter((s) => s.dayOffset < daysAgo)
      .map((s) => s.id);
    setConfig((prev) => ({
      ...prev,
      plantingDate: iso,
      completedStages: autoCompleted,
    }));
  };

  const handleSelectCrop = (cropId: string) => {
    const newCrop =
      CROP_SCHEDULES.find((c) => c.id === cropId) || CROP_SCHEDULES[0];
    const plantDt = addDays(config.plantingDate, 0);
    const daysSincePlanting = -diffDaysFromToday(plantDt);
    const autoCompleted = newCrop.stages
      .filter((s) => s.dayOffset < daysSincePlanting)
      .map((s) => s.id);
    setConfig((prev) => ({
      ...prev,
      cropId,
      completedStages: autoCompleted,
    }));
  };

  const completedCount = calculatedStages.filter((s) => s.isCompleted).length;
  const progressPercent = Math.round(
    (completedCount / calculatedStages.length) * 100
  );

  return (
    <div className="flex flex-col w-full gap-space-md">
      {/* Live Push Notification Preview Toast Banner */}
      {pushBanner && (
        <div
          role="status"
          aria-live="polite"
          className="w-full bg-primary text-on-primary rounded-2xl p-space-md shadow-md flex items-start justify-between gap-3 transition-opacity"
        >
          <div className="flex items-start gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px] icon-filled">
                notifications_active
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-xs text-primary-fixed">
                <span className="font-semibold">AKASHDEEP KRISHI LLP</span>
                <span aria-hidden="true">·</span>
                <span>{t('পুশ রিমাইন্ডার সক্রিয়', 'Push Reminder Active')}</span>
              </div>
              <p className="font-title-sm text-title-sm font-bold text-on-primary mt-0.5">
                {pushBanner.title}
              </p>
              <p className="font-body-sm text-body-sm text-primary-fixed leading-snug mt-0.5">
                {pushBanner.body}
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Dismiss notification"
            onClick={() => setPushBanner(null)}
            className="min-h-[44px] min-w-[44px] -mr-2 -mt-2 flex items-center justify-center rounded-full text-primary-fixed hover:bg-primary-container/40 transition-colors cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
      )}

      {/* Hero Title & Input Card */}
      <section className="w-full bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-md">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-label-sm text-label-sm text-primary font-semibold">
              {t('উত্তরবঙ্গ ফসল পুষ্টি ক্যালেন্ডার', 'North Bengal Crop Nutrition Planner')}
            </p>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight mt-0.5">
              {t(
                'সার প্রয়োগের সময়সূচী ও রিমাইন্ডার',
                'Fertilizer Scheduler & Reminders'
              )}
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              {t(
                'রোপণের তারিখ ও জমির পরিমাণ দিন—স্বয়ংক্রিয়ভাবে পরবর্তী সার প্রয়োগের তারিখ ও পুশ নোটিফিকেশন সেট হবে।',
                'Enter your planting date and plot size to calculate exact split-fertilizer dates and push alerts.'
              )}
            </p>
          </div>
        </div>

        {/* Step 1: Select Crop */}
        <div className="flex flex-col gap-1.5">
          <label className="font-label-md text-label-md text-on-surface font-semibold">
            {t('১. ফসল নির্বাচন করুন (Select Crop)', '1. Select Your Crop')}
          </label>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1 no-scrollbar">
            {CROP_SCHEDULES.map((crop) => {
              const isSelected = crop.id === config.cropId;
              return (
                <button
                  key={crop.id}
                  type="button"
                  onClick={() => handleSelectCrop(crop.id)}
                  className={`min-h-[44px] px-3.5 py-2 rounded-xl font-label-md text-label-md font-semibold flex items-center gap-2 shrink-0 whitespace-nowrap transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <ResilientImage
                    src={crop.image}
                    alt={crop.nameEn}
                    className="w-6 h-6 rounded-full object-cover shrink-0"
                    fallbackIcon="eco"
                  />
                  <span>{t(crop.nameBn, crop.nameEn)}</span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2 text-xs text-on-surface-variant pt-0.5">
            <span>{t(activeCrop.varietyBn, activeCrop.varietyEn)}</span>
            <span aria-hidden="true">·</span>
            <span>{t(activeCrop.seasonBn, activeCrop.seasonEn)}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{activeCrop.npkRatio}</span>
          </div>
        </div>

        {/* Step 2: Planting Date & Land Area Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-outline-variant/25">
          {/* Planting Date Picker */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="planting-date-input"
              className="font-label-md text-label-md text-on-surface font-semibold"
            >
              {t(
                '২. বীজ বপন / চারা রোপণের তারিখ',
                '2. Planting / Sowing Date'
              )}
            </label>
            <input
              id="planting-date-input"
              type="date"
              value={config.plantingDate}
              onChange={(e) => {
                if (e.target.value) {
                  const newDate = e.target.value;
                  const daysSince = -diffDaysFromToday(addDays(newDate, 0));
                  const autoCompleted = activeCrop.stages
                    .filter((s) => s.dayOffset < daysSince)
                    .map((s) => s.id);
                  setConfig((prev) => ({
                    ...prev,
                    plantingDate: newDate,
                    completedStages: autoCompleted,
                  }));
                }
              }}
              className="min-h-[44px] w-full px-3 py-2 rounded-xl bg-surface-container-low text-on-surface font-title-sm text-title-sm font-semibold tabular-nums border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {/* Quick Date Presets */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { labelBn: 'আজ রোপণ', labelEn: 'Planted Today', daysAgo: 0 },
                { labelBn: '১৬ দিন আগে', labelEn: '16 Days Ago', daysAgo: 16 },
                { labelBn: '৩৫ দিন আগে', labelEn: '35 Days Ago', daysAgo: 35 },
              ].map((preset) => (
                <button
                  key={preset.daysAgo}
                  type="button"
                  onClick={() => handleQuickDateOffset(preset.daysAgo)}
                  className="min-h-[36px] px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant hover:text-primary hover:bg-primary-fixed font-label-sm text-label-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
                >
                  {t(preset.labelBn, preset.labelEn)}
                </button>
              ))}
            </div>
          </div>

          {/* Plot Area Size Stepper */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="font-label-md text-label-md text-on-surface font-semibold">
                {t('৩. জমির পরিমাণ (Plot Size)', '3. Land Area')}
              </label>
              <div className="flex items-center bg-surface-container rounded-lg p-0.5">
                {(['bigha', 'acre'] as const).map((unit) => (
                  <button
                    key={unit}
                    type="button"
                    onClick={() =>
                      setConfig((prev) => ({ ...prev, areaUnit: unit }))
                    }
                    className={`px-2.5 py-1 rounded-md font-label-sm text-label-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      config.areaUnit === unit
                        ? 'bg-primary text-on-primary'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {unit === 'bigha'
                      ? t('বিঘা (Bigha)', 'Bigha')
                      : t('একর (Acre)', 'Acre')}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease plot area"
                onClick={() =>
                  setConfig((prev) => ({
                    ...prev,
                    areaSize: Math.max(0.5, prev.areaSize - 0.5),
                  }))
                }
                className="min-h-[44px] min-w-[44px] rounded-xl bg-surface-container-low hover:bg-surface-container-high text-primary font-title-md font-bold flex items-center justify-center transition-colors cursor-pointer"
              >
                −
              </button>
              <div className="flex-1 min-h-[44px] rounded-xl bg-surface-container-low flex items-center justify-center px-3 font-title-md text-title-md font-bold text-on-surface tabular-nums">
                {config.areaSize}{' '}
                <span className="font-label-sm text-label-sm text-on-surface-variant font-normal ml-1.5">
                  {config.areaUnit === 'bigha'
                    ? t('বিঘা', 'Bigha')
                    : t('একর', 'Acre')}
                </span>
              </div>
              <button
                type="button"
                aria-label="Increase plot area"
                onClick={() =>
                  setConfig((prev) => ({
                    ...prev,
                    areaSize: Math.min(50, prev.areaSize + 0.5),
                  }))
                }
                className="min-h-[44px] min-w-[44px] rounded-xl bg-surface-container-low hover:bg-surface-container-high text-primary font-title-md font-bold flex items-center justify-center transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
            <p className="font-label-sm text-label-sm text-on-surface-variant tabular-nums">
              {t(
                `মোট হিসাব: ${bighaMultiplier} বিঘা জমির অনুপাতে সার নির্ধারিত`,
                `Calculated for ${bighaMultiplier} Bigha (${(
                  bighaMultiplier / 3
                ).toFixed(2)} Acre) plot`
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Dominant Visual Anchor: Next Fertilizer Application Due & Push Reminder Control */}
      {nextUpcomingStage && (
        <section className="w-full bg-primary text-on-primary rounded-2xl p-space-md shadow-sm flex flex-col gap-space-sm">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs text-primary-fixed">
                <span className="font-semibold">
                  {t('পরবর্তী সার প্রয়োগের তারিখ', 'Next Scheduled Application')}
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums font-bold">
                  {nextUpcomingStage.daysDiff === 0
                    ? t('আজ প্রয়োগ করুন', 'Due Today')
                    : nextUpcomingStage.daysDiff > 0
                    ? t(
                        `${nextUpcomingStage.daysDiff} দিন বাকি`,
                        `In ${nextUpcomingStage.daysDiff} Days`
                      )
                    : t(
                        `${Math.abs(nextUpcomingStage.daysDiff)} দিন অতিক্রান্ত`,
                        `${Math.abs(nextUpcomingStage.daysDiff)} Days Overdue`
                      )}
                </span>
              </div>
              <h3 className="font-title-lg text-title-lg font-bold text-on-primary mt-1 tabular-nums">
                {nextUpcomingStage.formattedDate}
              </h3>
              <p className="font-label-md text-label-md text-primary-fixed font-medium">
                {t(
                  nextUpcomingStage.stageLabelBn,
                  nextUpcomingStage.stageLabelEn
                )}
              </p>
            </div>

            <button
              type="button"
              onClick={handleToggleNotificationMaster}
              className={`min-h-[44px] px-3 py-2 rounded-xl font-label-sm text-label-sm font-bold flex items-center gap-1.5 shrink-0 whitespace-nowrap transition-colors cursor-pointer ${
                config.notificationsEnabled
                  ? 'bg-primary-fixed text-on-primary-fixed'
                  : 'bg-primary-container text-primary-fixed'
              }`}
            >
              <span className="material-symbols-outlined text-[18px] icon-filled">
                {config.notificationsEnabled
                  ? 'notifications_active'
                  : 'notifications_off'}
              </span>
              <span>
                {config.notificationsEnabled
                  ? t('রিমাইন্ডার চালু', 'Alerts On')
                  : t('রিমাইন্ডার চালু করুন', 'Enable Alerts')}
              </span>
            </button>
          </div>

          {/* Required Fertilizer Quantities for Next Stage */}
          <div className="bg-primary-container/60 rounded-xl p-3 flex flex-col gap-1.5">
            <span className="font-label-sm text-label-sm text-primary-fixed">
              {t(
                `প্রয়োজনীয় সারের পরিমাণ (${config.areaSize} ${
                  config.areaUnit === 'bigha' ? 'বিঘা' : 'একর'
                }):`,
                `Required Inputs for ${config.areaSize} ${config.areaUnit}:`
              )}
            </span>
            <div className="flex flex-col gap-1">
              {nextUpcomingStage.scaledInputs.map((inp, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-2 text-sm text-on-primary"
                >
                  <span className="font-medium truncate">
                    {t(inp.nameBn, inp.nameEn)}
                  </span>
                  <span className="font-title-sm font-bold text-primary-fixed tabular-nums shrink-0">
                    {inp.totalKg} {t(inp.unitBn, inp.unitEn)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reminder Timing Selector + Instant Test Push Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-1 bg-primary-container/50 p-1 rounded-xl">
              {(
                [
                  {
                    id: '1day-before',
                    labelBn: '১ দিন আগে',
                    labelEn: '1 Day Prior',
                  },
                  {
                    id: 'same-day',
                    labelBn: 'সকাল ৬টায়',
                    labelEn: '6 AM Same Day',
                  },
                  { id: 'both', labelBn: 'উভয় সময়', labelEn: 'Both Alerts' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() =>
                    setConfig((prev) => ({ ...prev, reminderTiming: opt.id }))
                  }
                  className={`min-h-[36px] px-2.5 py-1 rounded-lg font-label-sm text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    config.reminderTiming === opt.id
                      ? 'bg-surface-container-lowest text-primary'
                      : 'text-primary-fixed hover:text-on-primary'
                  }`}
                >
                  {t(opt.labelBn, opt.labelEn)}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                const summary = nextUpcomingStage.scaledInputs
                  .map(
                    (i) =>
                      `${i.totalKg} ${t(i.unitBn, i.unitEn)} ${t(
                        i.nameBn,
                        i.nameEn
                      )}`
                  )
                  .join(' + ');
                triggerPushNotification(
                  t(
                    nextUpcomingStage.stageLabelBn,
                    nextUpcomingStage.stageLabelEn
                  ),
                  summary,
                  nextUpcomingStage.formattedDate
                );
              }}
              className="min-h-[44px] px-3.5 py-2 rounded-xl bg-surface-container-lowest text-primary font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 hover:bg-primary-fixed transition-colors cursor-pointer whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[18px]">
                send_to_mobile
              </span>
              <span>
                {t('টেস্ট পুশ রিমাইন্ডার পাঠান', 'Test Push Notification')}
              </span>
            </button>
          </div>
          {permissionState === 'Granted' || permissionState === 'granted' ? (
            <p className="font-label-sm text-[11px] text-primary-fixed">
              {t(
                'ব্রাউজার ও মোবাইল পুশ নোটিফিকেশন অনুমোদিত এবং সক্রিয়।',
                'Browser & mobile push notifications granted and active.'
              )}
            </p>
          ) : null}
        </section>
      )}

      {/* Crop-Specific Split-Fertilization Timeline */}
      <section className="w-full bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-md">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h3 className="font-title-md text-title-md text-on-surface font-bold">
              {t(
                `${activeCrop.nameBn} — সম্পূর্ণ সার প্রয়োগ সূচী`,
                `${activeCrop.nameEn} — Complete Fertilization Timeline`
              )}
            </h3>
            <p className="font-label-sm text-label-sm text-on-surface-variant tabular-nums">
              {t(
                `সম্পন্ন: ${completedCount}/${calculatedStages.length} ধাপ (${progressPercent}%)`,
                `Completed: ${completedCount}/${calculatedStages.length} Stages (${progressPercent}%)`
              )}
            </p>
          </div>

          {onOpenPdfModal && (
            <button
              type="button"
              onClick={() =>
                onOpenPdfModal(
                  t(
                    `${activeCrop.nameBn} সার প্রয়োগ ক্যালেন্ডার`,
                    `${activeCrop.nameEn} Fertilizer Schedule`
                  ),
                  t(
                    `রোপণের তারিখ: ${config.plantingDate} • জমি: ${config.areaSize} ${config.areaUnit}`,
                    `Planting Date: ${config.plantingDate} • Plot: ${config.areaSize} ${config.areaUnit}`
                  )
                )
              }
              className="min-h-[44px] px-3 py-2 rounded-xl bg-surface-container text-primary font-label-sm text-label-sm font-semibold flex items-center gap-1.5 hover:bg-primary-fixed transition-colors cursor-pointer shrink-0 whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[18px]">
                download
              </span>
              <span>{t('পিডিএফ সূচী', 'PDF Schedule')}</span>
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-200"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Stage List with Hairline Dividers */}
        <div className="flex flex-col divide-y divide-outline-variant/25">
          {calculatedStages.map((stage, idx) => {
            const isNext = nextUpcomingStage?.id === stage.id;
            const statusText = stage.isCompleted
              ? t('প্রয়োগ সম্পন্ন', 'Completed')
              : stage.daysDiff === 0
              ? t('আজ প্রয়োগের দিন', 'Due Today')
              : stage.daysDiff > 0
              ? t(`${stage.daysDiff} দিন পর`, `Due in ${stage.daysDiff}d`)
              : t(
                  `${Math.abs(stage.daysDiff)} দিন পূর্বে নির্ধারিত`,
                  `${Math.abs(stage.daysDiff)}d ago`
                );

            return (
              <div
                key={stage.id}
                className={`py-4 first:pt-1 last:pb-1 flex flex-col gap-2.5 ${
                  isNext
                    ? 'bg-primary-fixed/25 -mx-space-md px-space-md rounded-xl'
                    : ''
                }`}
              >
                {/* Top Row: Step Number + Date Metadata + Actions */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <button
                      type="button"
                      aria-label={
                        stage.isCompleted
                          ? 'Mark stage incomplete'
                          : 'Mark stage completed'
                      }
                      onClick={() => handleToggleStageComplete(stage.id)}
                      className={`min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                        stage.isCompleted
                          ? 'bg-primary text-on-primary'
                          : isNext
                          ? 'bg-secondary-container text-on-secondary-container font-bold'
                          : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                      }`}
                    >
                      {stage.isCompleted ? (
                        <span className="material-symbols-outlined text-[20px]">
                          check
                        </span>
                      ) : (
                        <span className="font-title-sm tabular-nums">
                          0{idx + 1}
                        </span>
                      )}
                    </button>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 text-xs text-on-surface-variant tabular-nums flex-wrap">
                        <span className="font-bold text-primary">
                          {stage.formattedDate}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{statusText}</span>
                        <span aria-hidden="true">·</span>
                        <span>
                          {stage.dayOffset < 0
                            ? t(
                                `রোপণের ${Math.abs(stage.dayOffset)} দিন আগে`,
                                `${Math.abs(stage.dayOffset)}d Pre-Plant`
                              )
                            : stage.dayOffset === 0
                            ? t('রোপণের দিন (Day 0)', 'Planting Day 0')
                            : `Day +${stage.dayOffset}`}
                        </span>
                      </div>

                      <h4
                        className={`font-title-sm text-title-sm font-bold mt-0.5 ${
                          stage.isCompleted
                            ? 'line-through text-on-surface-variant'
                            : 'text-on-surface'
                        }`}
                      >
                        {t(stage.stageLabelBn, stage.stageLabelEn)}
                      </h4>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">
                        {t(stage.growthPhaseBn, stage.growthPhaseEn)}
                      </p>
                    </div>
                  </div>

                  {/* Per-Stage Push Reminder Bell Toggle */}
                  <button
                    type="button"
                    aria-label={
                      stage.isMuted
                        ? 'Enable reminder for this stage'
                        : 'Mute reminder for this stage'
                    }
                    onClick={() => handleToggleStageReminder(stage)}
                    className={`min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                      !stage.isMuted && config.notificationsEnabled
                        ? 'bg-surface-container text-primary hover:bg-primary-fixed'
                        : 'bg-surface-container-low text-on-surface-variant'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {!stage.isMuted && config.notificationsEnabled
                        ? 'notifications_active'
                        : 'notifications_off'}
                    </span>
                  </button>
                </div>

                {/* Scaled Fertilizer Dose List */}
                <div className="pl-[54px] flex flex-col gap-1.5">
                  <div className="bg-surface-container-low rounded-xl p-2.5 flex flex-col gap-1">
                    {stage.scaledInputs.map((inp, iIdx) => (
                      <div
                        key={iIdx}
                        className="flex items-center justify-between gap-2 text-xs sm:text-sm"
                      >
                        <span className="text-on-surface font-medium">
                          {t(inp.nameBn, inp.nameEn)}
                        </span>
                        <span className="font-title-sm font-bold text-primary tabular-nums shrink-0">
                          {inp.totalKg} {t(inp.unitBn, inp.unitEn)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Application Method & Moisture Advice */}
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                    <strong className="text-on-surface font-semibold">
                      {t('প্রয়োগ পদ্ধতি:', 'Method:')}
                    </strong>{' '}
                    {t(stage.methodBn, stage.methodEn)}
                  </p>
                  <p className="font-label-sm text-label-sm text-primary">
                    {t('মাটির রস ও আবহাওয়া:', 'Moisture Note:')}{' '}
                    <span className="text-on-surface-variant font-normal">
                      {t(stage.moistureTipBn, stage.moistureTipEn)}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
