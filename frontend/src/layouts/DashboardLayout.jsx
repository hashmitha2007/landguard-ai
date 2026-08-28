import React, { useState } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import Header from '../components/Header.jsx'
import MobileNav from '../components/MobileNav.jsx'
import ToastStack from '../components/Toast.jsx'
import { useApp } from '../context/AppContext.jsx'

const PAGE_TITLES = {
  '/dashboard': 'Regional Overview',
  '/risk-map': 'Live Risk Map',
  '/risk-analysis': 'AI Risk Analysis',
  '/alerts': 'Alerts & Early Warnings',
  '/field-reports': 'Field Reports',
  '/road-status': 'Connectivity & Infrastructure',
  '/historical-data': 'Historical Landslide Analysis',
  '/ai-prediction': 'Predictive Intelligence',
  '/settings': 'Settings'
}

export default function DashboardLayout() {
  const { isAuthed } = useApp()
  const [navOpen, setNavOpen] = useState(false)
  const location = useLocation()

  if (!isAuthed) return <Navigate to="/" replace />

  return (
    <div className="min-h-screen flex bg-base-900">
      <Sidebar />
      <MobileNav open={navOpen} onClose={() => setNavOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col">
        <Header onMenuClick={() => setNavOpen(true)} title={PAGE_TITLES[location.pathname]} />
        <main className="flex-1 min-w-0 p-3 sm:p-5 xl:p-6">
          <Outlet />
        </main>
      </div>
      <ToastStack />
    </div>
  )
}
