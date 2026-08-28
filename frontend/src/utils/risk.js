export const RISK_STYLES = {
  critical: { text: 'text-risk-critical', bg: 'bg-risk-critical', dim: 'bg-risk-criticalDim', ring: 'ring-risk-critical/40', hex: '#E23636', label: 'Critical' },
  high: { text: 'text-risk-high', bg: 'bg-risk-high', dim: 'bg-risk-highDim', ring: 'ring-risk-high/40', hex: '#F0883E', label: 'High' },
  moderate: { text: 'text-risk-moderate', bg: 'bg-risk-moderate', dim: 'bg-risk-moderateDim', ring: 'ring-risk-moderate/40', hex: '#EBC94C', label: 'Moderate' },
  low: { text: 'text-risk-low', bg: 'bg-risk-low', dim: 'bg-risk-lowDim', ring: 'ring-risk-low/40', hex: '#33C481', label: 'Low' },
  info: { text: 'text-risk-info', bg: 'bg-risk-info', dim: 'bg-risk-infoDim', ring: 'ring-risk-info/40', hex: '#3B82F6', label: 'Info' }
}

export function riskFromScore(score) {
  if (score >= 75) return 'critical'
  if (score >= 55) return 'high'
  if (score >= 30) return 'moderate'
  return 'low'
}

export function normalizeRisk(level) {
  return (level || '').toLowerCase()
}
