import React, { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import AlertCard from '../components/AlertCard.jsx'
import Modal from '../components/Modal.jsx'
import { ALERTS, RISK_ZONES } from '../data/mockData.js'
import { LANGUAGES } from '../data/translations.js'
import { useApp } from '../context/AppContext.jsx'

const FILTERS = ['All', 'Critical', 'High', 'Moderate', 'Resolved']

const emptyForm = { type: 'Landslide Risk', location: RISK_ZONES[0].name, severity: 'critical', message: '', affectedArea: '', audience: 'District Officials', language: 'en' }

export default function Alerts() {
  const { pushToast } = useApp()
  const [filter, setFilter] = useState('All')
  const [alerts, setAlerts] = useState(ALERTS)
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const filtered = useMemo(() => {
    if (filter === 'All') return alerts
    if (filter === 'Resolved') return alerts.filter((a) => a.status === 'resolved')
    return alerts.filter((a) => a.level === filter.toLowerCase() && a.status !== 'resolved')
  }, [alerts, filter])

  function markReviewed(id) {
    setAlerts((list) => list.map((a) => (a.id === id ? { ...a, status: 'reviewed' } : a)))
    pushToast('Alert marked as reviewed.', 'success')
  }

  function sendAlert(e) {
    e.preventDefault()
    const newAlert = {
      id: `AL-${2050 + Math.floor(Math.random() * 900)}`,
      level: form.severity,
      location: form.location,
      time: 'Just now',
      reason: form.message || `${form.type} — manually issued alert.`,
      probability: form.severity === 'critical' ? 88 : form.severity === 'high' ? 65 : 42,
      status: 'active'
    }
    setAlerts((list) => [newAlert, ...list])
    setModalOpen(false)
    setForm(emptyForm)
    pushToast('Alert simulated and broadcast to target audience (no real SMS sent).', 'success')
  }

  return (
    <div className="space-y-5 animate-fade-up">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="label-eyebrow">Emergency Alert Management</p>
          <h2 className="text-xl sm:text-2xl font-display font-semibold text-white mt-1">Alerts &amp; Early Warnings</h2>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn-primary">
          <Plus size={16} /> Create Alert
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`chip !text-xs !py-1.5 !px-3.5 border ${filter === f ? 'bg-accent/15 text-accent border-accent/40' : 'bg-base-800 text-slate-400 border-line hover:text-slate-200'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((alert) => <AlertCard key={alert.id} alert={alert} onReview={markReviewed} />)}
      </div>
      {filtered.length === 0 && <p className="text-center text-faint py-12 text-sm">No alerts match this filter.</p>}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create Alert"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="btn-danger" form="alert-form" type="submit">Send Alert</button>
          </>
        }
      >
        <form id="alert-form" onSubmit={sendAlert} className="space-y-4">
          <Field label="Alert Type">
            <select className="input-field" value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}>
              {['Landslide Risk', 'Flash Flood', 'Road Blockage', 'Rockfall', 'Evacuation Advisory'].map((t) => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Location">
            <select className="input-field" value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}>
              {RISK_ZONES.map((z) => <option key={z.id}>{z.name}</option>)}
            </select>
          </Field>
          <Field label="Severity">
            <div className="flex gap-2">
              {['critical', 'high', 'moderate'].map((s) => (
                <button
                  type="button" key={s}
                  onClick={() => setForm((f) => ({ ...f, severity: s }))}
                  className={`flex-1 rounded-lg py-2 text-xs font-mono uppercase border ${form.severity === s ? 'border-accent text-accent bg-accent/10' : 'border-line text-faint'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Message">
            <textarea
              className="input-field min-h-[90px] resize-none" placeholder="Describe the situation and required action…"
              value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            />
          </Field>
          <Field label="Affected Area">
            <input className="input-field" placeholder="e.g. 5 km radius around NH-10" value={form.affectedArea} onChange={(e) => setForm((f) => ({ ...f, affectedArea: e.target.value }))} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Target Audience">
              <select className="input-field" value={form.audience} onChange={(e) => setForm((f) => ({ ...f, audience: e.target.value }))}>
                {['District Officials', 'Field Teams', 'Local Community', 'All Stakeholders'].map((a) => <option key={a}>{a}</option>)}
              </select>
            </Field>
            <Field label="Language">
              <select className="input-field" value={form.language} onChange={(e) => setForm((f) => ({ ...f, language: e.target.value }))}>
                {LANGUAGES.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
              </select>
            </Field>
          </div>
        </form>
      </Modal>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label className="label-eyebrow block mb-1.5">{label}</label>
      {children}
    </div>
  )
}
