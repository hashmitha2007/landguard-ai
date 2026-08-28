import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { NOTIFICATIONS, FIELD_REPORTS, REGIONS } from '../data/mockData.js'

const AppContext = createContext(null)

const LS_KEYS = {
  auth: 'landguard.auth',
  pendingReports: 'landguard.pendingReports',
  lang: 'landguard.lang',
  region: 'landguard.region'
}

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function AppProvider({ children }) {
  const [isAuthed, setIsAuthed] = useState(() => loadJSON(LS_KEYS.auth, false))
  const [officer, setOfficer] = useState(() => loadJSON('landguard.officer', null))
  const [region, setRegion] = useState(() => loadJSON(LS_KEYS.region, REGIONS[0]))
  const [language, setLanguage] = useState(() => loadJSON(LS_KEYS.lang, 'en'))
  const [isOnline, setIsOnline] = useState(true)
  const [notifications, setNotifications] = useState(NOTIFICATIONS)
  const [toasts, setToasts] = useState([])
  const [reports, setReports] = useState(FIELD_REPORTS)
  const [pendingReports, setPendingReports] = useState(() => loadJSON(LS_KEYS.pendingReports, []))
  const [lastSync, setLastSync] = useState('2 minutes ago')
  const [syncing, setSyncing] = useState(false)

  useEffect(() => localStorage.setItem(LS_KEYS.auth, JSON.stringify(isAuthed)), [isAuthed])
  useEffect(() => localStorage.setItem(LS_KEYS.lang, JSON.stringify(language)), [language])
  useEffect(() => localStorage.setItem(LS_KEYS.region, JSON.stringify(region)), [region])
  useEffect(() => localStorage.setItem(LS_KEYS.pendingReports, JSON.stringify(pendingReports)), [pendingReports])

  const pushToast = useCallback((message, tone = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    setToasts((t) => [...t, { id, message, tone }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200)
  }, [])

  const login = useCallback((name = 'Demo Officer') => {
    setOfficer({ name, id: 'OFC-2291', role: 'District Nodal Officer' })
    setIsAuthed(true)
  }, [])

  const logout = useCallback(() => {
    setIsAuthed(false)
    setOfficer(null)
  }, [])

  const markNotificationsRead = useCallback(() => {
    setNotifications((list) => list.map((n) => ({ ...n, read: true })))
  }, [])

  const toggleOnline = useCallback(() => {
    setIsOnline((prev) => {
      const next = !prev
      if (next && pendingReports.length > 0) {
        setSyncing(true)
        setTimeout(() => {
          setReports((r) => [...pendingReports.map((p) => ({ ...p, status: 'New' })), ...r])
          setPendingReports([])
          setSyncing(false)
          setLastSync('just now')
          pushToast(`${pendingReports.length} pending report(s) synchronized.`, 'success')
        }, 1400)
      }
      return next
    })
  }, [pendingReports, pushToast])

  const addReport = useCallback((report) => {
    const id = `FR-${3400 + Math.floor(Math.random() * 500)}`
    const full = { ...report, id, time: 'Just now' }
    if (!isOnline) {
      setPendingReports((p) => [full, ...p])
      pushToast('No connection — report saved locally as Pending Sync.', 'warning')
    } else {
      setReports((r) => [{ ...full, status: 'New' }, ...r])
      pushToast('Field report submitted successfully.', 'success')
    }
  }, [isOnline, pushToast])

  const value = useMemo(() => ({
    isAuthed, login, logout, officer,
    region, setRegion, language, setLanguage,
    isOnline, toggleOnline, syncing, lastSync,
    notifications, markNotificationsRead,
    toasts, pushToast,
    reports, pendingReports, addReport
  }), [isAuthed, login, logout, officer, region, language, isOnline, toggleOnline, syncing, lastSync, notifications, markNotificationsRead, toasts, pushToast, reports, pendingReports, addReport])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
