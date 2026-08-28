// Central mock data source. In production, each exported constant/function here
// maps 1:1 to a FastAPI endpoint (see README "Backend Integration Map") so the
// UI layer never needs to change shape when real services are wired in.

export const REGIONS = [
  'All NER', 'Assam', 'Arunachal Pradesh', 'Meghalaya', 'Manipur',
  'Mizoram', 'Nagaland', 'Tripura', 'Sikkim'
]

export const KPIS = [
  { id: 'zones', label: 'Total Monitored Zones', value: 1284, trend: '+18 this week', trendUp: true, icon: 'LayoutGrid', tone: 'info' },
  { id: 'high', label: 'High Risk Zones', value: 87, trend: '+6 vs yesterday', trendUp: true, icon: 'TriangleAlert', tone: 'high' },
  { id: 'critical', label: 'Critical Zones', value: 23, trend: '+3 vs yesterday', trendUp: true, icon: 'OctagonAlert', tone: 'critical' },
  { id: 'roads', label: 'Blocked Roads', value: 14, trend: '+2 vs yesterday', trendUp: true, icon: 'Construction', tone: 'high' },
  { id: 'alerts', label: 'Active Alerts', value: 31, trend: '-4 vs yesterday', trendUp: false, icon: 'BellRing', tone: 'critical' },
  { id: 'reports', label: 'Reports Today', value: 126, trend: '+41 vs yesterday', trendUp: true, icon: 'ClipboardList', tone: 'moderate' }
]

export const RISK_SUMMARY = [
  { level: 'Critical', value: 23, color: '#E23636' },
  { level: 'High', value: 87, color: '#F0883E' },
  { level: 'Moderate', value: 214, color: '#EBC94C' },
  { level: 'Low', value: 960, color: '#33C481' }
]

export const RAINFALL_NOW = {
  current: 18, unit24h: 142, unit72h: 281, anomaly: 38
}

export const RAINFALL_7DAY = [
  { day: 'Mon', rainfall: 44 }, { day: 'Tue', rainfall: 62 }, { day: 'Wed', rainfall: 38 },
  { day: 'Thu', rainfall: 91 }, { day: 'Fri', rainfall: 120 }, { day: 'Sat', rainfall: 105 },
  { day: 'Sun', rainfall: 142 }
]

export const AI_FORECAST_72H = [
  { label: 'Now', hours: 0, probability: 42 },
  { label: '+12h', hours: 12, probability: 51 },
  { label: '+24h', hours: 24, probability: 63 },
  { label: '+48h', hours: 48, probability: 71 },
  { label: '+72h', hours: 72, probability: 78 }
]

export const RISK_ZONES = [
  { id: 'z1', name: 'NH-10, East Sikkim', state: 'Sikkim', lat: 27.336, lng: 88.615, risk: 'critical', rainfall: 142, soilMoisture: 82, slope: 38, elevation: 1820, aiProbability: 87, lastUpdated: '4 min ago', historicalIncidents: 12, vegetation: 'Moderate', anomaly: 38 },
  { id: 'z2', name: 'Chandmari Ridge, Kohima', state: 'Nagaland', lat: 25.674, lng: 94.108, risk: 'critical', rainfall: 128, soilMoisture: 79, slope: 41, elevation: 1450, aiProbability: 84, lastUpdated: '9 min ago', historicalIncidents: 8, vegetation: 'Sparse', anomaly: 31 },
  { id: 'z3', name: 'Mawkdok Valley, East Khasi Hills', state: 'Meghalaya', lat: 25.313, lng: 91.845, risk: 'critical', rainfall: 156, soilMoisture: 85, slope: 44, elevation: 1290, aiProbability: 91, lastUpdated: '2 min ago', historicalIncidents: 15, vegetation: 'Dense', anomaly: 45 },
  { id: 'z4', name: 'Aizawl-Lunglei Rd, Km 34', state: 'Mizoram', lat: 23.596, lng: 92.789, risk: 'high', rainfall: 98, soilMoisture: 68, slope: 33, elevation: 980, aiProbability: 68, lastUpdated: '12 min ago', historicalIncidents: 6, vegetation: 'Moderate', anomaly: 22 },
  { id: 'z5', name: 'Bomdila Pass', state: 'Arunachal Pradesh', lat: 27.264, lng: 92.417, risk: 'high', rainfall: 87, soilMoisture: 61, slope: 36, elevation: 2170, aiProbability: 64, lastUpdated: '18 min ago', historicalIncidents: 9, vegetation: 'Sparse', anomaly: 19 },
  { id: 'z6', name: 'Tuensang District Road', state: 'Nagaland', lat: 26.269, lng: 94.834, risk: 'high', rainfall: 76, soilMoisture: 58, slope: 29, elevation: 1120, aiProbability: 59, lastUpdated: '22 min ago', historicalIncidents: 4, vegetation: 'Moderate', anomaly: 14 },
  { id: 'z7', name: 'Ukhrul Hill Slopes', state: 'Manipur', lat: 25.05, lng: 94.36, risk: 'moderate', rainfall: 52, soilMoisture: 46, slope: 22, elevation: 1650, aiProbability: 41, lastUpdated: '31 min ago', historicalIncidents: 3, vegetation: 'Dense', anomaly: 8 },
  { id: 'z8', name: 'Sepahijala Foothills', state: 'Tripura', lat: 23.65, lng: 91.33, risk: 'moderate', rainfall: 41, soilMoisture: 39, slope: 18, elevation: 340, aiProbability: 33, lastUpdated: '40 min ago', historicalIncidents: 2, vegetation: 'Dense', anomaly: 5 },
  { id: 'z9', name: 'Dima Hasao Corridor', state: 'Assam', lat: 25.28, lng: 93.02, risk: 'moderate', rainfall: 48, soilMoisture: 44, slope: 24, elevation: 780, aiProbability: 37, lastUpdated: '45 min ago', historicalIncidents: 5, vegetation: 'Moderate', anomaly: 9 },
  { id: 'z10', name: 'Gangtok Ridge Settlement', state: 'Sikkim', lat: 27.338, lng: 88.613, risk: 'low', rainfall: 21, soilMoisture: 28, slope: 12, elevation: 1650, aiProbability: 14, lastUpdated: '1 hr ago', historicalIncidents: 1, vegetation: 'Dense', anomaly: 2 },
  { id: 'z11', name: 'Shillong Peak Slopes', state: 'Meghalaya', lat: 25.55, lng: 91.87, risk: 'low', rainfall: 18, soilMoisture: 24, slope: 9, elevation: 1960, aiProbability: 11, lastUpdated: '1 hr ago', historicalIncidents: 0, vegetation: 'Dense', anomaly: 1 },
  { id: 'z12', name: 'Imphal Valley Rim', state: 'Manipur', lat: 24.82, lng: 93.94, risk: 'low', rainfall: 15, soilMoisture: 22, slope: 7, elevation: 790, aiProbability: 8, lastUpdated: '2 hr ago', historicalIncidents: 0, vegetation: 'Moderate', anomaly: 0 }
]

export const AI_FACTORS = [
  { label: 'Heavy rainfall', weight: 35, color: '#3B82F6' },
  { label: 'Steep slope', weight: 25, color: '#F0883E' },
  { label: 'High soil moisture', weight: 20, color: '#3ED6D0' },
  { label: 'Historical landslide activity', weight: 12, color: '#EBC94C' },
  { label: 'Terrain instability', weight: 8, color: '#E23636' }
]

export const RECOMMENDATIONS = {
  critical: [
    'Immediate field verification recommended.',
    'Prepare road clearance and emergency response teams.',
    'Consider restricting access to vulnerable road sections.'
  ],
  high: [
    'Schedule field verification within 24 hours.',
    'Alert local disaster response units to stand by.',
    'Increase monitoring frequency for this zone.'
  ],
  moderate: [
    'Continue routine monitoring.',
    'Flag zone for review during next inspection cycle.'
  ],
  low: [
    'No immediate action required.',
    'Maintain standard monitoring schedule.'
  ]
}

export const ALERTS = [
  { id: 'AL-2041', level: 'critical', location: 'NH-10, East Sikkim', time: '4 min ago', reason: 'Heavy rainfall + high soil moisture + steep slope.', probability: 87, status: 'active' },
  { id: 'AL-2040', level: 'critical', location: 'Mawkdok Valley, East Khasi Hills', time: '11 min ago', reason: 'Rainfall anomaly 45% above seasonal average with saturated slope.', probability: 91, status: 'active' },
  { id: 'AL-2039', level: 'critical', location: 'Chandmari Ridge, Kohima', time: '20 min ago', reason: 'Sustained rainfall over fractured terrain, prior incident history.', probability: 84, status: 'active' },
  { id: 'AL-2038', level: 'high', location: 'Aizawl-Lunglei Rd, Km 34', time: '38 min ago', reason: 'Rising soil moisture trend detected over past 6 hours.', probability: 68, status: 'active' },
  { id: 'AL-2037', level: 'high', location: 'Bomdila Pass', time: '1 hr ago', reason: 'Slope instability signature matched to historical event pattern.', probability: 64, status: 'reviewed' },
  { id: 'AL-2036', level: 'moderate', location: 'Ukhrul Hill Slopes', time: '2 hr ago', reason: 'Moderate rainfall accumulation, no immediate structural risk.', probability: 41, status: 'active' },
  { id: 'AL-2035', level: 'moderate', location: 'Dima Hasao Corridor', time: '3 hr ago', reason: 'Localised drainage congestion reported by field officer.', probability: 37, status: 'reviewed' },
  { id: 'AL-2030', level: 'high', location: 'Tuensang District Road', time: 'Yesterday', reason: 'Vegetation loss increasing surface runoff on adjacent slope.', probability: 59, status: 'resolved' },
  { id: 'AL-2028', level: 'critical', location: 'Sohra-Cherrapunji Rd', time: 'Yesterday', reason: 'Record 24h rainfall exceeded threshold for the district.', probability: 88, status: 'resolved' }
]

export const NOTIFICATIONS = [
  { id: 'n1', text: 'Critical risk detected near NH-10', time: '4 min ago', read: false },
  { id: 'n2', text: 'Heavy rainfall recorded in East Sikkim', time: '22 min ago', read: false },
  { id: 'n3', text: 'New field report received', time: '35 min ago', read: false },
  { id: 'n4', text: 'Road blockage reported', time: '1 hr ago', read: true },
  { id: 'n5', text: 'AI risk forecast updated', time: '2 hr ago', read: true }
]

export const REPORT_TYPES = ['Ground crack', 'Slope movement', 'Road blockage', 'Rockfall', 'Waterlogging', 'Landslide', 'Other']
export const REPORTER_TYPES = ['Field Officer', 'Local Volunteer', 'Village Council', 'Police / Admin', 'Citizen']

export const FIELD_REPORTS = [
  { id: 'FR-3391', location: 'NH-10, East Sikkim', type: 'Ground crack', severity: 'Critical', time: '18 min ago', status: 'New', reporterType: 'Field Officer', description: 'Fresh 40m crack observed above carriageway, widening after rainfall.', photo: true },
  { id: 'FR-3390', location: 'Mawkdok Valley', type: 'Slope movement', severity: 'High', time: '52 min ago', status: 'Under Review', reporterType: 'Local Volunteer', description: 'Visible soil creep on the eastern slope face near the viewpoint.', photo: true },
  { id: 'FR-3388', location: 'Aizawl-Lunglei Rd, Km 34', type: 'Road blockage', severity: 'High', time: '2 hr ago', status: 'Verified', reporterType: 'Police / Admin', description: 'Debris covering one lane, traffic diverted.', photo: false },
  { id: 'FR-3384', location: 'Bomdila Pass', type: 'Rockfall', severity: 'Moderate', time: '5 hr ago', status: 'Verified', reporterType: 'Field Officer', description: 'Small rockfall cleared by maintenance crew, monitoring continues.', photo: true },
  { id: 'FR-3379', location: 'Sepahijala Foothills', type: 'Waterlogging', severity: 'Low', time: 'Yesterday', status: 'Resolved', reporterType: 'Citizen', description: 'Waterlogging near foothill settlement drained after 6 hours.', photo: false },
  { id: 'FR-3375', location: 'Dima Hasao Corridor', type: 'Landslide', severity: 'High', time: 'Yesterday', status: 'Resolved', reporterType: 'Village Council', description: 'Minor landslide cleared, no injuries reported.', photo: true }
]

export const ROADS = [
  { id: 'RD-1', name: 'NH-10', district: 'East Sikkim', status: 'At Risk', risk: 'High', lastUpdate: '10 min ago', altRoute: 'Available', lat: 27.336, lng: 88.615 },
  { id: 'RD-2', name: 'NH-129', district: 'East Khasi Hills', status: 'Blocked', risk: 'Critical', lastUpdate: '25 min ago', altRoute: 'Available', lat: 25.313, lng: 91.845 },
  { id: 'RD-3', name: 'Aizawl-Lunglei Rd', district: 'Aizawl', status: 'Blocked', risk: 'High', lastUpdate: '2 hr ago', altRoute: 'Not Available', lat: 23.596, lng: 92.789 },
  { id: 'RD-4', name: 'NH-13', district: 'West Kameng', status: 'At Risk', risk: 'Moderate', lastUpdate: '1 hr ago', altRoute: 'Available', lat: 27.264, lng: 92.417 },
  { id: 'RD-5', name: 'Kohima Bypass', district: 'Kohima', status: 'Open', risk: 'Moderate', lastUpdate: '30 min ago', altRoute: 'Available', lat: 25.674, lng: 94.108 },
  { id: 'RD-6', name: 'Ukhrul Link Road', district: 'Ukhrul', status: 'Open', risk: 'Low', lastUpdate: '3 hr ago', altRoute: 'Available', lat: 25.05, lng: 94.36 },
  { id: 'RD-7', name: 'Tripura SH-1', district: 'Sepahijala', status: 'Open', risk: 'Low', lastUpdate: '4 hr ago', altRoute: 'Available', lat: 23.65, lng: 91.33 },
  { id: 'RD-8', name: 'Silchar-Haflong Rd', district: 'Dima Hasao', status: 'At Risk', risk: 'Moderate', lastUpdate: '45 min ago', altRoute: 'Available', lat: 25.28, lng: 93.02 }
]

export const ROAD_SUMMARY = {
  open: 342, blocked: 14, atRisk: 61, underInspection: 27
}

export const HISTORICAL_SUMMARY = {
  totalIncidents: 1842, mostAffectedDistrict: 'East Khasi Hills, Meghalaya', mostAffectedMonth: 'July', highestRainfallCorrelation: '0.86'
}

export const HISTORICAL_BY_YEAR = [
  { year: '2019', incidents: 142 }, { year: '2020', incidents: 168 }, { year: '2021', incidents: 201 },
  { year: '2022', incidents: 245 }, { year: '2023', incidents: 268 }, { year: '2024', incidents: 312 }, { year: '2025', incidents: 341 }
]

export const HISTORICAL_BY_MONTH = [
  { month: 'Jan', incidents: 12 }, { month: 'Feb', incidents: 9 }, { month: 'Mar', incidents: 18 },
  { month: 'Apr', incidents: 34 }, { month: 'May', incidents: 61 }, { month: 'Jun', incidents: 128 },
  { month: 'Jul', incidents: 214 }, { month: 'Aug', incidents: 196 }, { month: 'Sep', incidents: 142 },
  { month: 'Oct', incidents: 58 }, { month: 'Nov', incidents: 21 }, { month: 'Dec', incidents: 14 }
]

export const RAINFALL_VS_LANDSLIDE = Array.from({ length: 36 }).map((_, i) => {
  const rainfall = 20 + Math.round(Math.random() * 220)
  const events = Math.max(0, Math.round((rainfall - 40) / 25 + (Math.random() * 2 - 1)))
  return { rainfall, events }
})

export const HISTORICAL_RECORDS = [
  { date: '2025-07-14', location: 'Mawkdok Valley, Meghalaya', rainfall: 268, slope: 42, severity: 'Severe', damage: 'Road cut, 2 houses affected', source: 'District Admin' },
  { date: '2025-07-02', location: 'NH-10, Sikkim', rainfall: 231, slope: 38, severity: 'Severe', damage: 'National highway blocked 18 hrs', source: 'PWD' },
  { date: '2025-06-21', location: 'Kohima Ridge, Nagaland', rainfall: 184, slope: 40, severity: 'Moderate', damage: 'Retaining wall failure', source: 'Field Report' },
  { date: '2024-08-09', location: 'Aizawl, Mizoram', rainfall: 198, slope: 35, severity: 'Severe', damage: '4 dwellings evacuated', source: 'District Admin' },
  { date: '2024-07-27', location: 'Dima Hasao, Assam', rainfall: 156, slope: 30, severity: 'Moderate', damage: 'Rail line disrupted', source: 'NFR' },
  { date: '2024-06-30', location: 'Bomdila, Arunachal Pradesh', rainfall: 142, slope: 33, severity: 'Minor', damage: 'Minor road debris', source: 'Field Report' },
  { date: '2023-07-19', location: 'Ukhrul, Manipur', rainfall: 176, slope: 28, severity: 'Moderate', damage: 'Footpath washed out', source: 'Village Council' },
  { date: '2023-06-05', location: 'Sepahijala, Tripura', rainfall: 121, slope: 20, severity: 'Minor', damage: 'Localised flooding', source: 'Citizen Report' }
]

export const SYSTEM_STATUS = [
  { name: 'Weather API', status: 'Connected' },
  { name: 'Satellite Data', status: 'Connected' },
  { name: 'GIS Services', status: 'Connected' },
  { name: 'AI Prediction Engine', status: 'Running' },
  { name: 'Database', status: 'Connected' },
  { name: 'Field Reports', status: 'Syncing' }
]

export function runAIPrediction({ region, location, duration }) {
  // Deterministic pseudo-random mock so demo results feel consistent per input.
  const seed = `${region}-${location}-${duration}`.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const base = 40 + (seed % 50)
  const score = Math.min(96, base)
  const level = score >= 75 ? 'Critical' : score >= 55 ? 'High' : score >= 30 ? 'Moderate' : 'Low'
  return {
    score,
    level,
    confidence: 82 + (seed % 13),
    forecast: [
      { window: 'Next 24 hours', level: score >= 70 ? 'High' : score >= 40 ? 'Moderate' : 'Low' },
      { window: 'Next 48 hours', level: score >= 60 ? 'High' : 'Moderate' },
      { window: 'Next 72 hours', level: level }
    ],
    factors: AI_FACTORS
  }
}
