import React, { useMemo } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip as LeafletTooltip } from 'react-leaflet'
import { RISK_STYLES, normalizeRisk } from '../utils/risk.js'

const NER_CENTER = [25.6, 92.9]

const ROAD_COLOR = {
  Open: '#33C481',
  'At Risk': '#F0883E',
  Blocked: '#E23636'
}

export default function RiskMap({
  zones = [],
  roads = [],
  height = '420px',
  zoom = 6,
  onSelectZone,
  selectedId,
  showZones = true,
  showRoads = false,
  className = ''
}) {
  const center = useMemo(() => {
    if (selectedId) {
      const z = zones.find((z) => z.id === selectedId)
      if (z) return [z.lat, z.lng]
    }
    return NER_CENTER
  }, [selectedId, zones])

  return (
    <div className={`rounded-2xl overflow-hidden border border-line relative z-0 ${className}`} style={{ height }}>
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%', background: '#0B1220' }} scrollWheelZoom>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors, &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {showZones && zones.map((zone) => {
          const style = RISK_STYLES[normalizeRisk(zone.risk)] || RISK_STYLES.info
          const isSelected = selectedId === zone.id
          return (
            <CircleMarker
              key={zone.id}
              center={[zone.lat, zone.lng]}
              radius={isSelected ? 14 : 9}
              pathOptions={{
                color: style.hex,
                fillColor: style.hex,
                fillOpacity: isSelected ? 0.85 : 0.55,
                weight: isSelected ? 3 : 1.5
              }}
              eventHandlers={{ click: () => onSelectZone?.(zone) }}
            >
              <LeafletTooltip direction="top" offset={[0, -6]} opacity={1}>
                <span className="font-medium">{zone.name}</span>
              </LeafletTooltip>
              <Popup>
                <div className="text-xs space-y-1 min-w-[180px]">
                  <p className="font-semibold text-sm">{zone.name}</p>
                  <p><strong>Risk:</strong> {style.label.toUpperCase()}</p>
                  <p><strong>Rainfall:</strong> {zone.rainfall} mm / 24h</p>
                  <p><strong>Slope:</strong> {zone.slope}°</p>
                  <p><strong>Soil Moisture:</strong> {zone.soilMoisture}%</p>
                  <p><strong>AI Landslide Probability:</strong> {zone.aiProbability}%</p>
                  <p><strong>Last updated:</strong> {zone.lastUpdated}</p>
                </div>
              </Popup>
            </CircleMarker>
          )
        })}

        {showRoads && roads.map((road) => (
          <CircleMarker
            key={road.id}
            center={[road.lat, road.lng]}
            radius={8}
            pathOptions={{
              color: ROAD_COLOR[road.status] || '#3B82F6',
              fillColor: ROAD_COLOR[road.status] || '#3B82F6',
              fillOpacity: 0.7,
              weight: 2
            }}
          >
            <LeafletTooltip direction="top" offset={[0, -6]} opacity={1}>
              <span className="font-medium">{road.name} — {road.status}</span>
            </LeafletTooltip>
            <Popup>
              <div className="text-xs space-y-1 min-w-[160px]">
                <p className="font-semibold text-sm">{road.name}</p>
                <p><strong>District:</strong> {road.district}</p>
                <p><strong>Status:</strong> {road.status}</p>
                <p><strong>Risk:</strong> {road.risk}</p>
                <p><strong>Alternative route:</strong> {road.altRoute}</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  )
}
