export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'as', label: 'অসমীয়া' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'ta', label: 'தமிழ்' }
]

export const translations = {
  en: {
    dashboard: 'Dashboard', riskMap: 'Risk Map', riskAnalysis: 'Risk Analysis',
    alerts: 'Alerts & Warnings', fieldReports: 'Field Reports', roadStatus: 'Road & Infrastructure',
    historicalData: 'Historical Data', aiPrediction: 'AI Prediction', settings: 'Settings',
    logout: 'Log out', allNER: 'All NER', reports: 'Reports', map: 'Map'
  },
  hi: {
    dashboard: 'डैशबोर्ड', riskMap: 'जोखिम मानचित्र', riskAnalysis: 'जोखिम विश्लेषण',
    alerts: 'चेतावनियाँ', fieldReports: 'फील्ड रिपोर्ट', roadStatus: 'सड़क स्थिति',
    historicalData: 'ऐतिहासिक डेटा', aiPrediction: 'एआई पूर्वानुमान', settings: 'सेटिंग्स',
    logout: 'लॉग आउट', allNER: 'संपूर्ण एनईआर', reports: 'रिपोर्ट', map: 'मानचित्र'
  },
  as: {
    dashboard: 'ডেশ্ববৰ্ড', riskMap: 'বিপদ মানচিত্ৰ', riskAnalysis: 'বিপদ বিশ্লেষণ',
    alerts: 'সতৰ্কতা', fieldReports: 'ক্ষেত্ৰ প্ৰতিবেদন', roadStatus: 'পথৰ অৱস্থা',
    historicalData: 'ঐতিহাসিক তথ্য', aiPrediction: 'এআই পূৰ্বানুমান', settings: 'ছেটিংছ',
    logout: 'লগ আউট', allNER: 'সমগ্ৰ এনইআৰ', reports: 'প্ৰতিবেদন', map: 'মানচিত্ৰ'
  },
  bn: {
    dashboard: 'ড্যাশবোর্ড', riskMap: 'ঝুঁকি মানচিত্র', riskAnalysis: 'ঝুঁকি বিশ্লেষণ',
    alerts: 'সতর্কতা', fieldReports: 'ফিল্ড রিপোর্ট', roadStatus: 'সড়ক অবস্থা',
    historicalData: 'ঐতিহাসিক তথ্য', aiPrediction: 'এআই পূর্বাভাস', settings: 'সেটিংস',
    logout: 'লগ আউট', allNER: 'সমগ্র এনইআর', reports: 'প্রতিবেদন', map: 'মানচিত্র'
  },
  ta: {
    dashboard: 'டாஷ்போர்டு', riskMap: 'இடர் வரைபடம்', riskAnalysis: 'இடர் பகுப்பாய்வு',
    alerts: 'எச்சரிக்கைகள்', fieldReports: 'கள அறிக்கைகள்', roadStatus: 'சாலை நிலை',
    historicalData: 'வரலாற்று தரவு', aiPrediction: 'AI முன்னறிவிப்பு', settings: 'அமைப்புகள்',
    logout: 'வெளியேறு', allNER: 'அனைத்து NER', reports: 'அறிக்கைகள்', map: 'வரைபடம்'
  }
}

export function t(lang, key) {
  return translations[lang]?.[key] ?? translations.en[key] ?? key
}
