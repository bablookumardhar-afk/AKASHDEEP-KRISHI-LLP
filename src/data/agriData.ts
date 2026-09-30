export type ScreenId =
  | 'seasonal-crops'
  | 'soil-and-pre-sow'
  | 'crop-protection'
  | 'regional-map'
  | 'district-crops';

export const IMAGES = {
  akashdeepLogo:
    'https://lh3.googleusercontent.com/aida/AEtjO1WOKIQNa6aVk9ijV5L17eHDEWSeYAEWM1bMjpVqhXqZsvz2uRT6tp2Ojli5Re10GnPBcdD0z9kW9Vs-EqwV11NWoacTSE5oR5Vxwfi6bV_o32O0X4S6YBxqm0cj0vxdTYyFVz0taGRIIv9TAijzAp_D8X2ak1-50H6SVPluOo1PLWbu8m9RDaju0FUAfSZZ9j1SmcjdW95AcL-INtDDX35mHQ4X4-UDrPWSKtmwgGh1cRuxVOfaCiKv5uw',
  profileAvatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAorXH9_kVVKxiisliwhyisXBJ7bJiykJA_LLvnXqLVl2b4vvggN-blUmlO8so4MJAfmD2L0iFSTf38U9CLA0_WpgwWOeUaNFhaKJe7P7rQBFL7jOd2QQiScedyaWb9cW1TOWHhMOdqnnUL9bcXbTHgLM0D3jGVqs6PDNa9Q-XRwtpQLFhnNWvrePr9sl5heeMWK78fD8B30UX00RfoI5FqBJydi_HOSRxC2oR9Z206xglvaRZyFtPO',
  paddyField:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAg7qByemQyQBR8b7qmipKTTu5AIYjX4L1A8UnDJBvFPPCpdSRNrsJbWJImpYq6mXwDWtigNF9M46qmYyQh0qGcFq6YqCmfXxe_qzy0yJdeudHWCCFXxRrSW5N88QMiG_Px8n7r54SgYVCmTi7TBZ2IY5R7NFqg24_vNCqck8Bx4pb4me0NFtjt1qpL_HCbHS5S0wu03skbGWyvj26S1BX6nFmKqAXA4qooQuuJRJk3gC_BOt9Y_1G5',
  teaEstate:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBuWUVgetUI70BdpoPHHaHHya76hCH4DnH6onr-9LrDWA3Sv_YZqAZ-oUAFt81UUBFRyQOHu4MulKGFagBL37QqAcSWipOGn1ucRIrjFCc1eW3IqnXIbMyQ1ias08351HVNGqeAKcyLRkQfwvGvyz88xJMvkFwq_r6sTqym8kNEmkdThakU5XnCbjMOHIcw8ceLAkH3cQ_nflBcA4Qh-Nkx4yP6prbaRN55zkK0gtwQ5KPi8mxwRqHK',
  juteCrop:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB44n8uPmuYUZmoYgu3HvuZ282Hl7_0GTgNQvsgisvuwSQj0dbDsBe9NKm9RdWe6EyKKr7V_6jJpbfC4SLYpmD2Ql_N3GjUY63pVVN5lVyacUMR7qjkkhsPR2_ldK3F001RDj0Ct4nyyF3peqTrXGONX8jRSephrcriFUc8wmCie5GFjo0MRGckAI49w_Pa8iywPuovPc1yzqzTNYwAr4iFPAPWTTd4Np1pPvBOqqokOc34bzk2VYy3',
  mustardField:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuApHFVmrMCq2ajIjZHyLP3rHhEsrujjx4PI-U-LE2fvnL0IY8IL3YHypVFakIVBZ34T-_jsh7RfdKvgB7OZrLwtaiz-Pewb_O4N5XlNP7FUW-QFeuQPKm4jJAbloeFvKz4niKV0PNPAbCGpTG042XBRy5iUQuGWBRsENGCObGyk4phqfiy_G-44jeOmCpO5RqX6L-3vMs8__zpsmWzf_LQ8pUfv87ZC6Up9ESSHYl-a_8k9jIE-4SZg',
  mangoOrchard:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC2uNN_WLUaaCGObAS2dTeWBneE4JlsOQK7INMttv3VSMiGaPcIT8yKeIqJyawMDbOi56zqn3hx4fPi-39YC5xqRkzD_rKB6G4otMTTvTCyi7-UrDtpLcUlCIyaD3M3o4L6z0f9SC1C2lWn2IEUKG_Vgd4kWmkBvE0VtHg5sgQcS9yvcPoiofGWiJPVSySYcVAA84WSpaWVbMt-Z9OKRUE7oOreAz1aKaiER_O_BxjA0qPq-kQz53wq',
  soilConditioningHero:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBuP99IqR31v6Dc9-gvH7I6iptJgt8RRajD81WnjUPXVN8GrpovxT5ECWHTb8APyhAAbEXEjO2iJaWz6Q38w9VWaD8rd1zGF_ZMPzGn3UyZFyOTRd_Fwz98WgSGCeLDMx__P0bT_mDy4q3JkfUDg7QnXyaxJOZgujqqz7ZRbiwUnKStGs2h6QXioi4d_9QkRbc1Xy3pR4MmKSc3jU3DAsT18i5QwxjxT_CuUVumsYfzfJkaJjhEBz5m',
  stemBorerPest:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDa5dthqh66hWJ8SiRgf7-BouXLfVhy3O6fICvooHtphP_Xnk0UEuHFpJmnZCuk_o-3VvbfUl0TSKdwhWuoiYJr9FPlGWMNJRIB84r-XqUrmTiFlvDADFPHxiuPBY9Wdph5benUtGTGtJbbqZiuCVZH-fGOWTqmXpZMK_cFDkrQm4o4wAqswbyol360ieuBqu4oo3A2ucAAqRMODRbWu3hIiJK9XOwK0RGzhBwgNKn7uTe5vefCHJ6t',
  teaMosquitoBug:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC9EDR_a8pTilRrFnwyxRnTG94r5onBhVbDhSJjkzcEDXYpspZWSx67nZLld0WmaCyDBFzqo5pcURkxlz3weIl4ktSD2g3YTVBN2Z_gGbcuY3FRxGYz6RyFyFYC5g_mK0OW29f4etgzwX8p6hdErLvn_CIClNHyexCcULKEoKadHvGf3j3Yz6GLeebj4TFXD3N0-kVZ3P_RJq4ZR_7KPqn15FxRTAl6yJ_f3WB1boNFZXmyZMyptAP6',
  sheathBlight:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuChjvWUzRFDhwLXw5luVxSRV0ktF8lwDA35yvPbZNapSlAezPTrZSoksOVPlxmUTCNehi3LQmmbnB6-Ecb37XJKhgSj5iE0Ymo1mA-j-nURCMY6RYVpWAjdhqqkp3D_7qgkDsUaO89NS8MPLYhDAGjLyH9Ka4y5zHufInawOP2fOFhJfJhKlDZJ1VnAM-rRIasUJOKM4p7-Y4X4m_dfcAPQYV50BgD2zExQJGImWjjxsKEwhjB8Fka6',
  potatoLateBlight:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDBC7iG8FZ0h99y2tk_99A57Ybwg_Af0-qiS3caMSczqV3zUtQWSTq_QGnWg1l8iTGV0cFi2ws5SOR21yZaizPBkNgljUVewt7iftvV-oaWI1VIbFdvcpffpPd5AMySBrVPA03bhCraNsNQMZWOeGRrff3O99ighRMGTyKfJ6jGdAuUQaK0QDhibIk92jDeGdBYLDD92s4xfHZxnXIcNGxMRZSUxospekTFOBSPSbo8LKVoF-LaHymg',
  northBengalMap:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDZfrIwXpHmczA7WvMXVhCuyZKnmyfMX9pKniyz7iT7MXLiZTWH1FS9QZqbMRKk_R9ooKdOBwyaQFSDIT3bPnlQ-W-ZMzMfBRly1_qdzZYWytn2MpKND_1UpFUbKPZ5DGLjOQnMnW9p0tOv5fdSo36BaiHJ53UL9nBWWyclhxfZKiQQo_C4qZraOv4rEVuFwlgpyWwqHnihtKSaZW4tGpK7J7hhGRqcrO4hRqliR9Sfy409HhAb_2yH',
  dooarsTeaBanner:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDwgVRzIkdQV5UHBa583VPyNedFIPfbhAtZCsUdDl7YLxHyHiFrUZI2WAN817_UnRI_X8jBx_s8Zu8AqawJmmiY475CbHuihj3nuQNjGMyATr_gm2LMCHXNsLfhdKbo23BDm-dnJFmKyV7DKe3BtTGBEWBvNA80-lsKSiqEqQahaG-pmWPVmNG1hOMi8unSGv-eZed-j9p1PahzcyYRYY0u4ndkKcvxSUQvuDXKcF46t4ge0jwg3btV',
};

export interface DistrictMicroclimate {
  name: string;
  nameBn: string;
  temp: string;
  tempSub: string;
  tempSubBn: string;
  humidity: string;
  humiditySub: string;
  humiditySubBn: string;
  soilMoist: string;
  soilMoistSub: string;
  soilMoistSubBn: string;
  alertLabel: string;
  alertLabelBn: string;
  advisoryHighlight: string;
  advisoryHighlightBn: string;
  advisoryText: string;
  advisoryTextBn: string;
}

export const DISTRICT_ADVISORIES: Record<string, DistrictMicroclimate> = {
  Jalpaiguri: {
    name: 'Jalpaiguri',
    nameBn: 'জলপাইগুড়ি',
    temp: '28°C',
    tempSub: 'Terai Foothills',
    tempSubBn: 'তরাই পাদদেশ',
    humidity: '84%',
    humiditySub: 'High (Dooars)',
    humiditySubBn: 'উচ্চ (ডুয়ার্স)',
    soilMoist: 'Sat. 92%',
    soilMoistSub: 'Optimal Puddle',
    soilMoistSubBn: 'কাদা চাষের উপযোগী',
    alertLabel: 'Monsoon Alert',
    alertLabelBn: 'বর্ষা সতর্কতা',
    advisoryHighlight: 'Aman paddy transplantation',
    advisoryHighlightBn: 'আমন ধানের চারা রোপণ',
    advisoryText:
      'Broadcast dolomite lime in acidic Terai loam blocks (pH 4.8 - 5.2) before standing water depth exceeds 5 cm.',
    advisoryTextBn:
      'জমিতে জলের গভীরতা ৫ সেমি ছাড়ানোর আগে অম্লীয় তরাই দোআঁশ মাটিতে (pH 4.8 - 5.2) ডলোমাইট চুন ছড়িয়ে দিন।',
  },
  'Cooch Behar': {
    name: 'Cooch Behar',
    nameBn: 'কোচবিহার',
    temp: '29°C',
    tempSub: 'Teesta Basin',
    tempSubBn: 'তিস্তা অববাহিকা',
    humidity: '82%',
    humiditySub: 'Alluvial Belt',
    humiditySubBn: 'পলিমাটি বলয়',
    soilMoist: 'Sat. 89%',
    soilMoistSub: 'Silt Loam Ready',
    soilMoistSubBn: 'পলি দোআঁশ প্রস্তুত',
    alertLabel: 'Retting Active',
    alertLabelBn: 'পাট পচন সক্রিয়',
    advisoryHighlight: 'Tossa Jute CRIJAF Sona Retting',
    advisoryHighlightBn: 'তোষা পাটের ক্রাইপাফ সোনা পচন',
    advisoryText:
      'Utilize slow-moving clean canal water with CRIJAF Sona microbial consortium (1 kg/bigha) to finish retting in 13-15 days.',
    advisoryTextBn:
      'স্বচ্ছ মৃদু প্রবাহমান জলে বিঘাপ্রতি ১ কেজি ক্রাইপাফ সোনা পাউডার ব্যবহার করে ১৩-১৫ দিনে উন্নত মানের পাট পচন সম্পন্ন করুন।',
  },
  'Siliguri / Terai': {
    name: 'Siliguri / Terai',
    nameBn: 'শিলিগুড়ি / তরাই',
    temp: '27°C',
    tempSub: 'Piedmont Tract',
    tempSubBn: 'পাদদেশীয় অঞ্চল',
    humidity: '86%',
    humiditySub: 'Misty Morning',
    humiditySubBn: 'কুয়াশাচ্ছন্ন সকাল',
    soilMoist: 'Sat. 94%',
    soilMoistSub: 'High Runoff',
    soilMoistSubBn: 'উচ্চ জলপ্রবাহ',
    alertLabel: 'Drainage Watch',
    alertLabelBn: 'নিকাশি সতর্কতা',
    advisoryHighlight: 'Tea Flush & Pineapple Ridges',
    advisoryHighlightBn: 'চা বাগান ও আনারসের নিকাশি',
    advisoryText:
      'Clear sub-surface drainage channels in tea estates and Giant Kew pineapple blocks to prevent collar rot.',
    advisoryTextBn:
      'গোড়া পচা (Collar Rot) রোগ রোধে চা বাগান ও জায়ান্ট কিউ আনারসের জমির জল নিকাশি নালা পরিষ্কার রাখুন।',
  },
  Malda: {
    name: 'Malda',
    nameBn: 'মালদা',
    temp: '31°C',
    tempSub: 'Barind & Diara',
    tempSubBn: 'বরিন্দ ও দিয়ারা',
    humidity: '74%',
    humiditySub: 'Moderate Humid',
    humiditySubBn: 'মাঝারি আর্দ্রতা',
    soilMoist: 'Sat. 78%',
    soilMoistSub: 'Heavy Clay-Loam',
    soilMoistSubBn: 'ভারী এঁটেল-দোআঁশ',
    alertLabel: 'Orchard Care',
    alertLabelBn: 'আম বাগান পরিচর্যা',
    advisoryHighlight: 'Post-Monsoon Mango Pruning',
    advisoryHighlightBn: 'বর্ষা-পরবর্তী আম গাছের ছাঁটাই',
    advisoryText:
      'Complete sanitary basin cleaning and Copper Oxychloride (3g/L) spray on Fazli & Langra orchards after pruning.',
    advisoryTextBn:
      'ফজলি ও ল্যাংড়া আম বাগানে মরা ডাল ছাঁটাইয়ের পর গাছের গোড়া পরিষ্কার করে কপার অক্সিক্লোরাইড (৩ গ্রাম/লি) স্প্রে করুন।',
  },
  'Uttar Dinajpur': {
    name: 'Uttar Dinajpur',
    nameBn: 'উত্তর দিনাজপুর',
    temp: '30°C',
    tempSub: 'Kulik Plains',
    tempSubBn: 'কুলিক সমভূমি',
    humidity: '78%',
    humiditySub: 'Warm Humid',
    humiditySubBn: 'উষ্ণ ও আর্দ্র',
    soilMoist: 'Sat. 85%',
    soilMoistSub: 'Loamy Basin',
    soilMoistSubBn: 'দোআঁশ অববাহিকা',
    alertLabel: 'Kharif Active',
    alertLabelBn: 'খরিফ সক্রিয়',
    advisoryHighlight: 'Tulaipanji & Swarna Sub-1 Paddy',
    advisoryHighlightBn: 'তুলাইপাঞ্জি ও স্বর্ণ সাব-১ ধান',
    advisoryText:
      'Maintain 3-5 cm standing water during active tillering stage; apply Zinc Sulphate if lower leaves show rusty spots.',
    advisoryTextBn:
      'পাশকাঠি ছাড়ার সময় জমিতে ৩-৫ সেমি জল ধরে রাখুন; নিচের পাতায় মরচে দাগ দেখা দিলে জিংক সালফেট প্রয়োগ করুন।',
  },
  'Dakshin Dinajpur': {
    name: 'Dakshin Dinajpur',
    nameBn: 'দক্ষিণ দিনাজপুর',
    temp: '30°C',
    tempSub: 'Atrai-Punarbhaba',
    tempSubBn: 'আত্রাই-পুনর্ভবা',
    humidity: '77%',
    humiditySub: 'Old Alluvium',
    humiditySubBn: 'প্রাচীন পলিমাটি',
    soilMoist: 'Sat. 83%',
    soilMoistSub: 'Clay Terrace',
    soilMoistSubBn: 'এঁটেল সমভূমি',
    alertLabel: 'Seed Booking',
    alertLabelBn: 'বীজ বুকিং',
    advisoryHighlight: 'Aman Top-Dressing & Rabi Prep',
    advisoryHighlightBn: 'আমন চাপান সার ও রবি প্রস্তুতি',
    advisoryText:
      'Install 5 pheromone traps per bigha against Yellow Stem Borer and register for certified Binoy (B-9) mustard seeds.',
    advisoryTextBn:
      'মাজরা পোকা দমনে বিঘাপ্রতি ৫টি ফেরোমন ট্র্যাপ বসান এবং শংসাপত্রিত বিনয় (B-9) সরিষা বীজের জন্য নাম নথিভুক্ত করুন।',
  },
  Alipurduar: {
    name: 'Alipurduar',
    nameBn: 'আলিপুরদুয়ার',
    temp: '26°C',
    tempSub: 'Eastern Dooars',
    tempSubBn: 'পূর্ব ডুয়ার্স',
    humidity: '88%',
    humiditySub: 'Sub-Himalayan',
    humiditySubBn: 'সাব-হিমালয়ান',
    soilMoist: 'Sat. 95%',
    soilMoistSub: 'Acid Gravel Loam',
    soilMoistSubBn: 'অম্ল নুড়ি দোআঁশ',
    alertLabel: 'Heavy Rain Alert',
    alertLabelBn: 'ভারী বৃষ্টির সতর্কতা',
    advisoryHighlight: 'Helopeltis & Blister Blight Watch',
    advisoryHighlightBn: 'হ্যালোপেলটিস ও ব্লিস্টার ব্লাইট সতর্কতা',
    advisoryText:
      'High humidity favors Tea Mosquito Bug and Blister Blight. Conduct early-morning foliar check in unshaded estate sections.',
    advisoryTextBn:
      'অধিক আর্দ্রতায় চা বাগানে হ্যালোপেলটিস ও ব্লিস্টার ব্লাইটের প্রকোপ বাড়ে। সকালে কচি পাতা পরীক্ষা করুন।',
  },
};

export interface CropGuideModalData {
  id: string;
  title: string;
  bengaliTitle: string;
  scientificName: string;
  badgeLeft: string;
  badgeRight: string;
  duration: string;
  soilType: string;
  districts: string;
  alertText: string;
  ctaLabel: string;
  image: string;
  seasons: string[];
  protocolSteps: {
    stage: string;
    timing: string;
    instruction: string;
    dosage: string;
  }[];
}

export const SEASONAL_CROPS: CropGuideModalData[] = [
  {
    id: 'paddy',
    title: 'Aman & Boro Paddy (ধান)',
    bengaliTitle: 'আমন ও বোরো ধান চাষের সম্পূর্ণ নির্দেশিকা',
    scientificName: 'Oryza sativa • Swarna Sub-1, MTU 7029',
    badgeLeft: 'Transplantation Phase',
    badgeRight: 'Kharif 2024',
    duration: '120–145 Days',
    soilType: 'Clay Loam (এঁটেল দোআঁশ)',
    districts: 'Malda, Dinajpur, Cooch Behar',
    alertText: 'Blast & Stem Borer alert active',
    ctaLabel: 'View Sowing Chart',
    image: IMAGES.paddyField,
    seasons: ['kharif', 'rabi'],
    protocolSteps: [
      {
        stage: '১. বীজ শোধন ও বীজতলা (Seed Treatment & Nursery)',
        timing: 'Day 1 – 21',
        instruction:
          'প্রতি কেজি বীজে ২.৫ গ্রাম কার্বেনডাজিম বা ট্রাইকোডার্মা ভিরিডি ৪ গ্রাম মিশিয়ে শোধন করুন। ২১-২৫ দিনের চারা মূল জমিতে রোপণ করুন।',
        dosage: 'Seed Rate: 6–8 kg / Bigha',
      },
      {
        stage: '২. মূল জমি ও বেসাল সার (Basal Fertilization)',
        timing: 'Final Puddling',
        instruction:
          'শেষ চাষের সময় বিঘাপ্রতি ১৫ কেজি DAP, ১০ কেজি MOP এবং ৩.৫ কেজি জিংক সালফেট (২১%) প্রয়োগ করুন।',
        dosage: 'DAP 45 kg + MOP 30 kg / Acre',
      },
      {
        stage: '৩. চাপান সার ও মাজরা পোকা দমন (Top Dressing & Protection)',
        timing: '21 DAT & 42 DAT',
        instruction:
          'রোপণের ২১ দিন পর প্রথম চাপান ইউরিয়া (১০ কেজি/বিঘা) এবং ৪২ দিন পর দ্বিতীয় চাপান প্রয়োগ করুন। মাজরা পোকা রোধে কার্টাপ ৪জি বা কোরোজেন স্প্রে করুন।',
        dosage: 'Chlorantraniliprole 60 ml / Acre',
      },
    ],
  },
  {
    id: 'tea',
    title: 'North Bengal Tea (চা পাতা)',
    bengaliTitle: 'উত্তরবঙ্গ চা বাগান পরিচর্যা ও ফ্লাশ ম্যানেজমেন্ট',
    scientificName: 'Camellia sinensis • Clone TV-23, TV-25',
    badgeLeft: 'Monsoon Flush',
    badgeRight: 'High Value Plantation',
    duration: 'Continuous Harvest',
    soilType: 'Acidic (pH 4.5 – 5.5)',
    districts: 'Terai, Jalpaiguri, Alipurduar',
    alertText: 'Sulphur & Zinc foliar schedule',
    ctaLabel: 'Tea Care Guide',
    image: IMAGES.teaEstate,
    seasons: ['kharif', 'zaid', 'rabi'],
    protocolSteps: [
      {
        stage: '১. অম্লতা ও মৃত্তিকা পরীক্ষা (Soil pH Conditioning)',
        timing: 'Pre-Flush',
        instruction:
          'মাটির পিএইচ ৪.৫-এর নিচে নেমে গেলে ডলোমাইট চুন প্রয়োগ করুন। জল নিকাশের জন্য ৯০ সেমি গভীর সাব-সারফেস নালা পরিষ্কার রাখুন।',
        dosage: 'Dolomite: 350–400 kg / Acre (if pH < 4.5)',
      },
      {
        stage: '২. ফোলিয়ার মাইক্রোনিউট্রিয়েন্ট স্প্রে (Foliar Nutrition)',
        timing: 'Every 15–21 Days',
        instruction:
          'নতুন দুটি পাতা ও একটি কুঁড়ি (Two Leaves & A Bud) বৃদ্ধির জন্য জিঙ্ক সালফেট ০.৫% এবং বোরন ০.২% সকালে স্প্রে করুন।',
        dosage: 'ZnSO₄ 5g + Boron 2g per Litre',
      },
      {
        stage: '৩. হ্যালোপেলটিস ও ব্লিস্টার ব্লাইট দমন (Pest & Disease)',
        timing: 'Monsoon Mist Window',
        instruction:
          'চা মশা পোকা (Helopeltis) এবং ব্লিস্টার ব্লাইট দেখা দিলে কপার অক্সিক্লোরাইড ৫০ WP (২.৫ গ্রাম/লিটার) স্প্রে করুন এবং ১০ দিন পাতা তোলা বন্ধ রাখুন।',
        dosage: 'COC 50 WP @ 400g / Acre',
      },
    ],
  },
  {
    id: 'jute',
    title: 'Tossa Jute (পাট)',
    bengaliTitle: 'তোষা পাট চাষ ও উন্নত ক্রাইপাফ সোনা রেটিং প্রোটোকল',
    scientificName: 'Corchorus olitorius • JRO-524 (Navin)',
    badgeLeft: 'Retting Window: 18 Days',
    badgeRight: 'Pre-Monsoon Sown',
    duration: '110–120 Days',
    soilType: 'Alluvial Silt Loam (পলি দোআঁশ)',
    districts: 'Cooch Behar, Jalpaiguri, Dinajpur',
    alertText: 'CRIJAF Sona microbial retting available',
    ctaLabel: 'Retting Protocol',
    image: IMAGES.juteCrop,
    seasons: ['zaid', 'kharif'],
    protocolSteps: [
      {
        stage: '১. বীজ বপন ও আগাছা দমন (Sowing & Weeding)',
        timing: 'March 15 – April 30',
        instruction:
          'সারিতে বপনের জন্য বিঘাপ্রতি ৮০০ গ্রাম - ১ কেজি বীজ ব্যবহার করুন। চারা ২০-২৫ দিনের হলে নিড়ানি দিয়ে গাছ পাতলা করুন।',
        dosage: 'Seed Rate: 2.5 – 3.0 kg / Acre',
      },
      {
        stage: '২. পাট কাটা ও জাক দেওয়া (Harvest & Retting Bundle)',
        timing: '110–115 Days (Small Pod Stage)',
        instruction:
          'পাট গাছের কুঁড়ি বা ছোট ফল ধরার সময় কাটলে আঁশের মান ও ফলন উভয়ই সর্বোচ্চ হয়। পাতা ঝরানোর জন্য ২-৩ দিন জমিতে শুকিয়ে নিন।',
        dosage: 'Slow-flowing clean canal water',
      },
      {
        stage: '৩. ক্রাইপাফ সোনা অনুজীব প্রয়োগ (CRIJAF Sona Protocol)',
        timing: 'During Submersion',
        instruction:
          'জাকের প্রতি স্তরে ক্রাইপাফ সোনা (CRIJAF Sona) পাউডার ছিটিয়ে দিন। কচুরিপানা বা খড় দিয়ে ঢেকে দিন (মাটির ঢেলা দেবেন না, এতে আঁশ কালো হয়)।',
        dosage: 'CRIJAF Sona: 3–4 kg / Acre harvest',
      },
    ],
  },
  {
    id: 'mustard',
    title: 'Yellow Mustard / Rai Sarson (সরিষা)',
    bengaliTitle: 'রবি সরিষা চাষ ও প্রাক-বপন নির্দেশিকা',
    scientificName: 'Brassica campestris • Pusa Bold, Binoy (B-9)',
    badgeLeft: 'Upcoming: Rabi Prep',
    badgeRight: 'Oct – Nov Sowing',
    duration: '85–100 Days',
    soilType: 'Sandy to Clay Loam',
    districts: 'Malda, Uttar & Dakshin Dinajpur',
    alertText: 'Subsidized certified seeds booking open',
    ctaLabel: 'Pre-Sow Guide',
    image: IMAGES.mustardField,
    seasons: ['rabi', 'kharif'],
    protocolSteps: [
      {
        stage: '১. আমন ধান কাটার পর রসের ব্যবহার (Residual Moisture Sowing)',
        timing: 'Oct 15 – Nov 15',
        instruction:
          'আমন ধান কাটার পরপরই জমির রস থাকতে থাকতে চাষ দিয়ে বিনয় (B-9) বা পুসা বোল্ড জাতের বীজ বপন করুন।',
        dosage: '1.0 – 1.25 kg / Bigha',
      },
      {
        stage: '২. সালফার ও বোরন প্রয়োগ (Oil Content Enhancement)',
        timing: 'Basal & Pre-Flowering',
        instruction:
          'তেলের পরিমাণ বাড়াতে একর প্রতি ১০ কেজি বেন্টোনাইট সালফার এবং ফুল আসার আগে বোরন ২০% (১.৫ গ্রাম/লিটার) স্প্রে করুন।',
        dosage: 'Sulphur 10 kg/Acre + Boron 1.5g/L',
      },
      {
        stage: '৩. জাব পোকা (Aphid) নিয়ন্ত্রণ',
        timing: 'Flowering to Pod Stage',
        instruction:
          'হলুদ আঠালো ফাঁদ (Yellow Sticky Trap) বিঘাপ্রতি ৬টি ব্যবহার করুন এবং প্রয়োজনে বিকেলে নিম তেল বা থায়ামেথক্সাম স্প্রে করুন (মৌমাছি রক্ষায় সকালে স্প্রে নিষিদ্ধ)।',
        dosage: 'Neem Oil 10000 ppm @ 2 ml/L',
      },
    ],
  },
  {
    id: 'mango',
    title: 'Malda Mango (আম - ফজলী ও ল্যাংড়া)',
    bengaliTitle: 'মালদা জি আই আম বাগান পরিচর্যা ক্যালেন্ডার',
    scientificName: 'Mangifera indica • Fazli, Langra, Himsagar',
    badgeLeft: 'Post-Monsoon Pruning',
    badgeRight: 'Malda GI Tract',
    duration: 'Perennial Orchard',
    soilType: 'Gangetic Diara & Barind Alluvium',
    districts: 'Malda, English Bazar, Ratua',
    alertText: 'Pre-flowering paclobutrazol advisory',
    ctaLabel: 'Orchard Planner',
    image: IMAGES.mangoOrchard,
    seasons: ['kharif', 'rabi', 'zaid'],
    protocolSteps: [
      {
        stage: '১. বর্ষা-পরবর্তী অঙ্গ ছাঁটাই ও বেসিন পরিষ্কার (Sanitary Pruning)',
        timing: 'September – October',
        instruction:
          'মরা, রোগাক্রান্ত ও পরগাছা ডাল ছেঁটে কাটা স্থানে বর্দো পেস্ট বা কপার অক্সিক্লোরাইড প্রলেপ দিন। গাছের গোড়ার চারপাশে রিং বেসিন তৈরি করে সার দিন।',
        dosage: 'Copper Oxychloride 3g / Litre',
      },
      {
        stage: '২. প্যাক্লোবুট্রাজল ও মুকুল আনয়ন (Flowering Regulation)',
        timing: 'October – November',
        instruction:
          '১০ বছরের বেশি বয়সী গাছে নিয়মিত ফলনের জন্য অনুমোদিত মাত্রায় সয়েল ড্রেঞ্চিং ও হালকা সেচ ব্যবস্থাপনা অনুসরণ করুন।',
        dosage: 'Consult Malda Research Station SOP',
      },
      {
        stage: '৩. শোষক পোকা (Mango Hopper) ও ছাতা রোগ দমন',
        timing: 'Bud Burst (Jan – Feb)',
        instruction:
          'মুকুল ফোটার আগে ১ম বার এবং মটর দানার মতো গুটি বাঁধার পর ২য় বার ছত্রাকনাশক ও কীটনাশক স্প্রে করুন। ফুল ফোটা অবস্থায় কখনোই স্প্রে করবেন না।',
        dosage: 'Soluble Sulphur 2g/L + Imidacloprid 0.3ml/L',
      },
    ],
  },
];
