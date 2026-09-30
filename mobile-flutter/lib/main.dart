import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(const AkashdeepKrishiApp());
}

class AkashdeepKrishiApp extends StatelessWidget {
  const AkashdeepKrishiApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AKASHDEEP KRISHI LLP',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        scaffoldBackgroundColor: const Color(0xFFF1FCEB),
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF003622),
          primary: const Color(0xFF003622),
          secondary: const Color(0xFF8E3D00),
          surface: const Color(0xFFFFFFFF),
        ),
      ),
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  bool isBengali = true;
  int currentTab = 0;
  String selectedDistrict = 'Jalpaiguri';
  double landArea = 1.0;
  String landUnit = 'Bigha';

  List<Map<String, dynamic>> forecast = [
    {'day': 'Today', 'max': 29, 'min': 23, 'rain': 68},
    {'day': 'Tomorrow', 'max': 30, 'min': 23, 'rain': 42},
    {'day': 'Day 3', 'max': 31, 'min': 24, 'rain': 20},
  ];

  String t(String bn, String en) => isBengali ? bn : en;

  @override
  void initState() {
    super.initState();
    fetchWeather();
  }

  Future<void> fetchWeather() async {
    try {
      final url = Uri.parse(
        'https://api.open-meteo.com/v1/forecast?latitude=26.5215&longitude=88.7196&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FKolkata&forecast_days=3',
      );
      final res = await http.get(url);
      if (res.statusCode == 200) {
        final data = jsonDecode(res.body);
        final List times = data['daily']['time'];
        setState(() {
          forecast = List.generate(times.length.clamp(0, 3), (i) {
            return {
              'day': i == 0
                  ? t('আজ', 'Today')
                  : i == 1
                      ? t('আগামীকাল', 'Tomorrow')
                      : times[i],
              'max': (data['daily']['temperature_2m_max'][i] as num).round(),
              'min': (data['daily']['temperature_2m_min'][i] as num).round(),
              'rain':
                  (data['daily']['precipitation_probability_max'][i] as num)
                      .round(),
            };
          });
        });
      }
    } catch (_) {
      // Offline fallback retained
    }
  }

  @override
  Widget build(BuildContext context) {
    final double unitMultiplier =
        landUnit == 'Acre' ? 1.0 : (landUnit == 'Bigha' ? 0.33 : 0.0165);
    final double acres = landArea * unitMultiplier;

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        surfaceTintColor: Colors.white,
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'AKASHDEEP KRISHI LLP',
              style: TextStyle(
                color: Color(0xFF003622),
                fontWeight: FontWeight.bold,
                fontSize: 17,
              ),
            ),
            Text(
              t('উত্তরবঙ্গ কৃষি সহায়ক • অফলাইন প্রস্তুত',
                  'North Bengal Agronomy & Field Guide'),
              style: const TextStyle(color: Color(0xFF404943), fontSize: 11),
            ),
          ],
        ),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 12.0),
            child: ActionChip(
              backgroundColor: const Color(0xFFE0EBE2),
              label: Text(
                isBengali ? 'বাং / EN' : 'EN / বাং',
                style: const TextStyle(
                  color: Color(0xFF003622),
                  fontWeight: FontWeight.bold,
                  fontSize: 12,
                ),
              ),
              onPressed: () => setState(() => isBengali = !isBengali),
            ),
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          if (currentTab == 0) ...[
            Card(
              elevation: 0,
              color: Colors.white,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
              ),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      t('৩-দিনের কৃষি আবহাওয়া ও স্প্রে সূচী ($selectedDistrict)',
                          '3-Day Agri-Weather & Spray Planner ($selectedDistrict)'),
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 15,
                      ),
                    ),
                    const SizedBox(height: 12),
                    Row(
                      children: forecast.map((d) {
                        final bool holdSpray = (d['rain'] as int) >= 65;
                        return Expanded(
                          child: Container(
                            margin: const EdgeInsets.symmetric(horizontal: 4),
                            padding: const EdgeInsets.all(10),
                            decoration: BoxDecoration(
                              color: const Color(0xFFEBF7ED),
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  '${d['day']}',
                                  style: const TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 11,
                                  ),
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  '${d['max']}°/${d['min']}°C',
                                  style: const TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 14,
                                  ),
                                ),
                                Text(
                                  'Rain: ${d['rain']}%',
                                  style: const TextStyle(fontSize: 11),
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  holdSpray
                                      ? t('স্প্রে স্থগিত', 'Hold Spray')
                                      : t('স্প্রে অনুকূল', 'Ideal Spray'),
                                  style: TextStyle(
                                    fontSize: 10,
                                    fontWeight: FontWeight.bold,
                                    color: holdSpray
                                        ? const Color(0xFFBA1A1A)
                                        : const Color(0xFF003622),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        );
                      }).toList(),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 12),
            _buildInfoCard(
              badge: t('খরিফ ও বোরো ধান', 'Kharif & Boro Paddy'),
              title: t('আমন ও বোরো ধান (Swarna Sub-1, MTU 7029)',
                  'Aman & Boro Paddy (Swarna Sub-1, MTU 7029)'),
              body: t(
                'মাটি: এঁটেল দোআঁশ • সময়কাল: ১২০–১৪৫ দিন • জেলা: মালদা, দিনাজপুর, কোচবিহার',
                'Soil: Clay Loam • Duration: 120–145 Days • Malda, Dinajpur, Cooch Behar',
              ),
            ),
            _buildInfoCard(
              badge: t('ডুয়ার্স ও তরাই বাগান ফসল', 'Dooars & Terai Plantation'),
              title: t('উত্তরবঙ্গ চা পাতা (Clone TV-23, TV-25)',
                  'North Bengal Tea (Clone TV-23, TV-25)'),
              body: t(
                'মাটির pH: ৪.৫ – ৫.৫ (আম্লিক) • অঞ্চল: তরাই, ডুয়ার্স, জলপাইগুড়ি, আলিপুরদুয়ার',
                'Soil pH: 4.5 – 5.5 (Acidic) • Terai, Dooars, Jalpaiguri, Alipurduar',
              ),
            ),
          ],
          if (currentTab == 2) ...[
            Card(
              elevation: 0,
              color: Colors.white,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
              ),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      t('প্রাক-বপন ডোজ ক্যালকুলেটর (Terai & Dooars)',
                          'Pre-Sow Soil Conditioning Calculator'),
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 16,
                      ),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      'Dolomite Lime: ${(300 * acres).toStringAsFixed(1)} kg\n'
                      'Basal DAP: ${(45 * acres).toStringAsFixed(1)} kg\n'
                      'MOP Potash: ${(30 * acres).toStringAsFixed(1)} kg\n'
                      'Zinc Sulphate 21%: ${(10 * acres).toStringAsFixed(1)} kg',
                      style: const TextStyle(fontSize: 14, height: 1.6),
                    ),
                  ],
                ),
              ),
            ),
          ],
          if (currentTab != 0 && currentTab != 2) ...[
            _buildInfoCard(
              badge: 'AKASHDEEP KRISHI LLP • UBKV & CIB&RC Protocol',
              title: t('উত্তরবঙ্গ ফসল সুরক্ষা ও জেলা নির্দেশিকা',
                  'North Bengal Crop Protection & District Guide'),
              body: t(
                'জলপাইগুড়ি, কোচবিহার, শিলিগুড়ি/তরাই, ডুয়ার্স, আলিপুরদুয়ার, মালদা ও দিনাজপুর বলয়ের সম্পূর্ণ কৃষি প্রোটোকল।',
                'Complete agronomy protocol for Jalpaiguri, Cooch Behar, Siliguri/Terai, Dooars, Alipurduar, Malda & Dinajpur.',
              ),
            ),
          ],
        ],
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: currentTab,
        onDestinationSelected: (idx) => setState(() => currentTab = idx),
        destinations: [
          NavigationDestination(
            icon: const Icon(Icons.agriculture),
            label: t('ফসল', 'Crops'),
          ),
          NavigationDestination(
            icon: const Icon(Icons.yard),
            label: t('জেলা শস্য', 'Districts'),
          ),
          NavigationDestination(
            icon: const Icon(Icons.science),
            label: t('মাটি শোধন', 'Soil Prep'),
          ),
          NavigationDestination(
            icon: const Icon(Icons.shield),
            label: t('সুরক্ষা', 'Protection'),
          ),
          NavigationDestination(
            icon: const Icon(Icons.map),
            label: t('মানচিত্র', 'Agro-Map'),
          ),
        ],
      ),
    );
  }

  Widget _buildInfoCard({
    required String badge,
    required String title,
    required String body,
  }) {
    return Card(
      elevation: 0,
      color: Colors.white,
      margin: const EdgeInsets.only(bottom: 12),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              badge,
              style: const TextStyle(
                color: Color(0xFF8E3D00),
                fontWeight: FontWeight.bold,
                fontSize: 11,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              title,
              style: const TextStyle(
                color: Color(0xFF141E18),
                fontWeight: FontWeight.bold,
                fontSize: 15,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              body,
              style: const TextStyle(color: Color(0xFF404943), fontSize: 13),
            ),
          ],
        ),
      ),
    );
  }
}
