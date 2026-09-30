import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
  Linking,
} from 'react-native';

type ScreenId =
  | 'seasonal-crops'
  | 'district-crops'
  | 'soil-and-pre-sow'
  | 'crop-protection'
  | 'regional-map';

type Language = 'bn' | 'en';
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
  paddy: { dolomite: 300, dap: 45, potash: 30, zinc: 10, tricho: 2.5, cartap: 8 },
  potato: { dolomite: 350, dap: 100, potash: 80, zinc: 12, tricho: 3.5, cartap: 10 },
  jute: { dolomite: 250, dap: 35, potash: 25, zinc: 8, tricho: 2.0, cartap: 6 },
  maize: { dolomite: 280, dap: 55, potash: 40, zinc: 10, tricho: 2.5, cartap: 8 },
  tea: { dolomite: 400, dap: 25, potash: 35, zinc: 15, tricho: 5.0, cartap: 12 },
};

const DISTRICT_COORDS: Record<string, { lat: number; lon: number; bn: string }> = {
  Jalpaiguri: { lat: 26.5215, lon: 88.7196, bn: 'জলপাইগুড়ি' },
  'Cooch Behar': { lat: 26.3242, lon: 89.4457, bn: 'কোচবিহার' },
  'Siliguri / Terai': { lat: 26.7271, lon: 88.3953, bn: 'শিলিগুড়ি / তরাই' },
  Malda: { lat: 25.0108, lon: 88.1411, bn: 'মালদা' },
  'Uttar Dinajpur': { lat: 25.6185, lon: 88.1256, bn: 'উত্তর দিনাজপুর' },
  'Dakshin Dinajpur': { lat: 25.2219, lon: 88.7773, bn: 'দক্ষিণ দিনাজপুর' },
  Alipurduar: { lat: 26.4918, lon: 89.5271, bn: 'আলিপুরদুয়ার' },
};

export default function App() {
  const [lang, setLang] = useState<Language>('bn');
  const [activeScreen, setActiveScreen] = useState<ScreenId>('seasonal-crops');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Jalpaiguri');
  const [weatherDays, setWeatherDays] = useState<
    { date: string; max: number; min: number; rainProb: number }[]
  >([
    { date: 'Today', max: 29, min: 23, rainProb: 68 },
    { date: 'Tomorrow', max: 30, min: 23, rainProb: 42 },
    { date: 'Day 3', max: 31, min: 24, rainProb: 20 },
  ]);

  // Soil Calculator state
  const [selectedCrop, setSelectedCrop] = useState<CalcCropKey>('paddy');
  const [landArea, setLandArea] = useState<string>('1');
  const [landUnit, setLandUnit] = useState<LandUnitKey>('bigha');

  const t = useCallback(
    (bn: string, en: string) => (lang === 'bn' ? bn : en),
    [lang]
  );

  useEffect(() => {
    const coords = DISTRICT_COORDS[selectedDistrict] || DISTRICT_COORDS.Jalpaiguri;
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FKolkata&forecast_days=3`
    )
      .then((r) => r.json())
      .then((data) => {
        if (data?.daily?.time) {
          setWeatherDays(
            data.daily.time.slice(0, 3).map((d: string, i: number) => ({
              date: i === 0 ? t('আজ', 'Today') : i === 1 ? t('আগামীকাল', 'Tomorrow') : d,
              max: Math.round(data.daily.temperature_2m_max?.[i] ?? 29),
              min: Math.round(data.daily.temperature_2m_min?.[i] ?? 22),
              rainProb: Math.round(data.daily.precipitation_probability_max?.[i] ?? 30),
            }))
          );
        }
      })
      .catch(() => {
        // Offline fallback retained
      });
  }, [selectedDistrict, t]);

  const areaNum = Math.max(0, parseFloat(landArea) || 0);
  const totalAcres = areaNum * UNIT_MULTIPLIERS[landUnit];
  const formula = CROP_FORMULATIONS[selectedCrop];
  const roundDose = (val: number) => Math.round(val * totalAcres * 10) / 10;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f1fceb" />

      {/* Header with Language Toggle */}
      <View style={styles.header}>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.brandTitle}>AKASHDEEP KRISHI LLP</Text>
          <Text style={styles.brandSub}>
            {t(
              'উত্তরবঙ্গ কৃষি সহায়ক • অফলাইন প্রস্তুত',
              'North Bengal Agronomy & Field Guide'
            )}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.langBtn}
          onPress={() => setLang((prev) => (prev === 'bn' ? 'en' : 'bn'))}
        >
          <Text style={styles.langBtnText}>
            {lang === 'bn' ? 'বাং / EN' : 'EN / বাং'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {activeScreen === 'seasonal-crops' && (
          <View style={styles.sectionStack}>
            {/* District Selector */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.pillRow}
            >
              {Object.keys(DISTRICT_COORDS).map((dist) => {
                const active = selectedDistrict === dist;
                return (
                  <TouchableOpacity
                    key={dist}
                    onPress={() => setSelectedDistrict(dist)}
                    style={[styles.pill, active && styles.pillActive]}
                  >
                    <Text
                      style={[styles.pillText, active && styles.pillTextActive]}
                    >
                      {t(DISTRICT_COORDS[dist].bn, dist)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* 3-Day Open-Meteo Weather Forecast Card */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                {t(
                  `৩-দিনের কৃষি আবহাওয়া (${DISTRICT_COORDS[selectedDistrict]?.bn})`,
                  `3-Day Agri-Weather (${selectedDistrict})`
                )}
              </Text>
              <View style={styles.weatherGrid}>
                {weatherDays.map((day, idx) => (
                  <View key={idx} style={styles.weatherBox}>
                    <Text style={styles.weatherDay}>{day.date}</Text>
                    <Text style={styles.weatherTemp}>
                      {day.max}° / {day.min}°C
                    </Text>
                    <Text style={styles.weatherRain}>
                      {t('বৃষ্টি:', 'Rain:')} {day.rainProb}%
                    </Text>
                    <Text
                      style={[
                        styles.sprayBadge,
                        day.rainProb >= 65
                          ? styles.badgeDanger
                          : styles.badgeSuccess,
                      ]}
                    >
                      {day.rainProb >= 65
                        ? t('স্প্রে স্থগিত', 'Hold Spray')
                        : t('স্প্রে অনুকূল', 'Ideal Spray')}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Seasonal Crops Cards */}
            <View style={styles.card}>
              <Text style={styles.cardBadge}>
                {t('খরিফ ও বোরো ধান', 'Kharif & Boro Paddy')}
              </Text>
              <Text style={styles.cardTitle}>
                {t(
                  'আমন ও বোরো ধান (Swarna Sub-1, MTU 7029)',
                  'Aman & Boro Paddy (Swarna Sub-1, MTU 7029)'
                )}
              </Text>
              <Text style={styles.cardBody}>
                {t(
                  'মাটি: এঁটেল দোআঁশ • সময়কাল: ১২০–১৪৫ দিন • জেলা: মালদা, দিনাজপুর, কোচবিহার',
                  'Soil: Clay Loam • Duration: 120–145 Days • Districts: Malda, Dinajpur, Cooch Behar'
                )}
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardBadge}>
                {t('ডুয়ার্স ও তরাই বাগান ফসল', 'Dooars & Terai Plantation')}
              </Text>
              <Text style={styles.cardTitle}>
                {t(
                  'উত্তরবঙ্গ চা পাতা (Clone TV-23, TV-25)',
                  'North Bengal Tea (Clone TV-23, TV-25)'
                )}
              </Text>
              <Text style={styles.cardBody}>
                {t(
                  'মাটির pH: ৪.৫ – ৫.৫ (আম্লিক) • অঞ্চল: তরাই, ডুয়ার্স, জলপাইগুড়ি, আলিপুরদুয়ার',
                  'Soil pH: 4.5 – 5.5 (Acidic) • Belt: Terai, Dooars, Jalpaiguri, Alipurduar'
                )}
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardBadge}>
                {t('সোনালী আঁশ', 'Golden Fiber')}
              </Text>
              <Text style={styles.cardTitle}>
                {t('তোষা পাট (JRO-524 Navin)', 'Tossa Jute (JRO-524 Navin)')}
              </Text>
              <Text style={styles.cardBody}>
                {t(
                  'মাটি: পলি দোআঁশ • ক্রাইপাফ সোনা (CRIJAF Sona) অনুজীব পচন প্রযুক্তি',
                  'Soil: Alluvial Silt Loam • CRIJAF Sona microbial retting protocol'
                )}
              </Text>
            </View>
          </View>
        )}

        {activeScreen === 'soil-and-pre-sow' && (
          <View style={styles.sectionStack}>
            <View style={styles.card}>
              <Text style={styles.cardBadge}>
                Terai, Dooars & Sub-Himalayan Acid Belt (pH 4.2 - 5.2)
              </Text>
              <Text style={styles.cardTitle}>
                {t('প্রাক-বপন ডোজ ক্যালকুলেটর', 'Pre-Sow Dosage Calculator')}
              </Text>

              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={landArea}
                  onChangeText={setLandArea}
                  placeholder="1.0"
                />
                {(['bigha', 'acre', 'katha'] as LandUnitKey[]).map((u) => (
                  <TouchableOpacity
                    key={u}
                    onPress={() => setLandUnit(u)}
                    style={[
                      styles.unitBtn,
                      landUnit === u && styles.unitBtnActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.unitBtnText,
                        landUnit === u && styles.unitBtnTextActive,
                      ]}
                    >
                      {u.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.doseGrid}>
                <View style={styles.doseItem}>
                  <Text style={styles.doseLabel}>
                    {t('ডলোমাইট চুন', 'Dolomite Lime')}
                  </Text>
                  <Text style={styles.doseValue}>
                    {roundDose(formula.dolomite)} kg
                  </Text>
                </View>
                <View style={styles.doseItem}>
                  <Text style={styles.doseLabel}>
                    {t('ডিএপি (DAP)', 'Basal DAP')}
                  </Text>
                  <Text style={styles.doseValue}>
                    {roundDose(formula.dap)} kg
                  </Text>
                </View>
                <View style={styles.doseItem}>
                  <Text style={styles.doseLabel}>
                    {t('পটাশ (MOP)', 'MOP Potash')}
                  </Text>
                  <Text style={styles.doseValue}>
                    {roundDose(formula.potash)} kg
                  </Text>
                </View>
                <View style={styles.doseItem}>
                  <Text style={styles.doseLabel}>
                    {t('জিংক সালফেট ২১%', 'Zinc 21%')}
                  </Text>
                  <Text style={styles.doseValue}>
                    {roundDose(formula.zinc)} kg
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {activeScreen === 'crop-protection' && (
          <View style={styles.sectionStack}>
            <View style={styles.card}>
              <Text style={styles.cardBadge}>CIB&RC Regulated Protocol</Text>
              <Text style={styles.cardTitle}>
                Chlorantraniliprole 18.5% SC (Coragen)
              </Text>
              <Text style={styles.cardBody}>
                {t(
                  'লক্ষ্য: ধানের মাজরা পোকা ও চায়ের হ্যালোপেলটিস • মাত্রা: ৬০ মিলি / একর (১৫০-২০০ লিটার জলে)',
                  'Target: Yellow Stem Borer & Tea Helopeltis • Dose: 60 ml / Acre in 150-200 L water'
                )}
              </Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardBadge}>Broad Spectrum Fungicide</Text>
              <Text style={styles.cardTitle}>
                Azoxystrobin 18.2% + Difenoconazole 11.4% SC
              </Text>
              <Text style={styles.cardBody}>
                {t(
                  'লক্ষ্য: ধানের শীথ ব্লাইট ও আলুর নাবি ধসা • মাত্রা: ১ মিলি / লিটার জল',
                  'Target: Paddy Sheath Blight & Potato Late Blight • Dose: 1 ml / Litre water'
                )}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.emergencyBtn}
              onPress={() => Linking.openURL('tel:18001801551')}
            >
              <Text style={styles.emergencyBtnText}>
                {t(
                  'কিষাণ কল সেন্টার: 1800-180-1551 (টোল-ফ্রি)',
                  'Kisan Call Centre: 1800-180-1551 (Toll-Free)'
                )}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {(activeScreen === 'district-crops' ||
          activeScreen === 'regional-map') && (
          <View style={styles.sectionStack}>
            <View style={styles.card}>
              <Text style={styles.cardBadge}>
                {t('উত্তরবঙ্গ কৃষি বলয়', 'North Bengal Agro-Climatic Zones')}
              </Text>
              <Text style={styles.cardTitle}>
                {t(
                  '১. তরাই ও ডুয়ার্স বলয় (Terai & Dooars)',
                  '1. Terai & Dooars Zone (pH 4.5 - 5.5)'
                )}
              </Text>
              <Text style={styles.cardBody}>
                {t(
                  'প্রধান ফসল: চা পাতা, জায়ান্ট কিউ আনারস, আমন ধান, সুপাড়ি, আদা ও হলুদ।',
                  'Key Crops: Tea, Giant Kew Pineapple, Aman Paddy, Arecanut, Ginger & Turmeric.'
                )}
              </Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                {t(
                  '২. তিস্তা পলি সমভূমি (Cooch Behar & Dinajpur)',
                  '2. Teesta Alluvial Floodplain'
                )}
              </Text>
              <Text style={styles.cardBody}>
                {t(
                  'প্রধান ফসল: তোষা পাট, বোরো ধান, হাইব্রিড ভুট্টা, আলু ও সরিষা।',
                  'Key Crops: Tossa Jute, Boro Paddy, Hybrid Maize, Potato & Yellow Mustard.'
                )}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Tab Navigation */}
      <View style={styles.bottomNav}>
        {(
          [
            { id: 'seasonal-crops', bn: 'ফসল', en: 'Crops' },
            { id: 'district-crops', bn: 'জেলা শস্য', en: 'Districts' },
            { id: 'soil-and-pre-sow', bn: 'মাটি শোধন', en: 'Soil Prep' },
            { id: 'crop-protection', bn: 'সুরক্ষা', en: 'Protection' },
            { id: 'regional-map', bn: 'মানচিত্র', en: 'Agro-Map' },
          ] as { id: ScreenId; bn: string; en: string }[]
        ).map((tab) => {
          const active = activeScreen === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActiveScreen(tab.id)}
              style={[styles.navItem, active && styles.navItemActive]}
            >
              <Text style={[styles.navText, active && styles.navTextActive]}>
                {t(tab.bn, tab.en)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1fceb',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#d9e5db',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitleWrap: {
    flex: 1,
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#003622',
  },
  brandSub: {
    fontSize: 11,
    color: '#404943',
    marginTop: 2,
  },
  langBtn: {
    backgroundColor: '#e0ebe2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  langBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#003622',
  },
  content: {
    padding: 16,
    paddingBottom: 96,
  },
  sectionStack: {
    gap: 12,
  },
  pillRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  pill: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: 8,
  },
  pillActive: {
    backgroundColor: '#003622',
  },
  pillText: {
    fontSize: 12,
    color: '#404943',
    fontWeight: '600',
  },
  pillTextActive: {
    color: '#ffffff',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#003622',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8e3d00',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#141e18',
    marginBottom: 6,
  },
  cardBody: {
    fontSize: 13,
    color: '#404943',
    lineHeight: 19,
  },
  weatherGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 8,
  },
  weatherBox: {
    flex: 1,
    backgroundColor: '#ebf7ed',
    borderRadius: 12,
    padding: 10,
  },
  weatherDay: {
    fontSize: 11,
    fontWeight: '700',
    color: '#003622',
  },
  weatherTemp: {
    fontSize: 15,
    fontWeight: '700',
    color: '#141e18',
    marginVertical: 4,
  },
  weatherRain: {
    fontSize: 11,
    color: '#404943',
  },
  sprayBadge: {
    marginTop: 6,
    fontSize: 10,
    fontWeight: '700',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 6,
    textAlign: 'center',
  },
  badgeDanger: {
    backgroundColor: '#ffdad6',
    color: '#93000a',
  },
  badgeSuccess: {
    backgroundColor: '#b4f0cd',
    color: '#002113',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#ebf7ed',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    fontWeight: '700',
    color: '#141e18',
  },
  unitBtn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#e0ebe2',
  },
  unitBtnActive: {
    backgroundColor: '#003622',
  },
  unitBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#141e18',
  },
  unitBtnTextActive: {
    color: '#ffffff',
  },
  doseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  doseItem: {
    width: '48%',
    backgroundColor: '#ebf7ed',
    borderRadius: 10,
    padding: 10,
  },
  doseLabel: {
    fontSize: 11,
    color: '#404943',
  },
  doseValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#003622',
    marginTop: 2,
  },
  emergencyBtn: {
    backgroundColor: '#ba1a1a',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  emergencyBtnText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#d9e5db',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  navItemActive: {
    backgroundColor: '#b4f0cd',
  },
  navText: {
    fontSize: 11,
    color: '#404943',
    fontWeight: '600',
  },
  navTextActive: {
    color: '#003622',
    fontWeight: '700',
  },
});
