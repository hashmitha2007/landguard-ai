import React, { useState } from 'react'
import { Plus, Camera, Video, WifiOff } from 'lucide-react'
import Modal from '../components/Modal.jsx'
import FieldReportCard from '../components/FieldReportCard.jsx'
import DataTable from '../components/DataTable.jsx'
import { REPORT_TYPES, REPORTER_TYPES, RISK_ZONES } from '../data/mockData.js'
import { useApp } from '../context/AppContext.jsx'

const emptyForm = {
  location: RISK_ZONES[0].name, gps: '27.336, 88.615', type: REPORT_TYPES[0],
  description: '', severity: 'Moderate', reporterType: REPORTER_TYPES[0], photo: false, video: false
}

const STATUS_CHIP = {
  New: 'bg-risk-infoDim text-risk-info ring-risk-info/30',
  'Under Review': 'bg-risk-moderateDim text-risk-moderate ring-risk-moderate/30',
  Verified: 'bg-accent/10 text-accent ring-accent/30',
  Resolved: 'bg-risk-lowDim text-risk-low ring-risk-low/30'
}

export default function FieldReports() {
  const { reports, pendingReports, addReport, isOnline } = useApp()
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [view, setView] = useState('cards')

  function handlePhoto(e) {
    const file = e.target.files?.[0]
    if (file) {
      setPhotoPreview(URL.createObjectURL(file))
      setForm((f) => ({ ...f, photo: true }))
    }
  }

  function submit(e) {
    e.preventDefault()
    addReport({ ...form })
    setModalOpen(false)
    setForm(emptyForm)
    setPhotoPreview(null)
  }

  const columns = [
    { key: 'id', header: 'Report ID' },
    { key: 'location', header: 'Location' },
    { key: 'type', header: 'Type' },
    { key: 'severity', header: 'Severity' },
    { key: 'time', header: 'Reported' },
    { key: 'status', header: 'Status', render: (r) => (
      <span className={`chip ring-1 ${STATUS_CHIP[r.status] || STATUS_CHIP.New}`}>{r.status}</span>
    ) }
  ]

  return (
    <div className="space-y-5 animate-fade-up">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="label-eyebrow">Citizen &amp; Field Reporting</p>
          <h2 className="text-xl sm:text-2xl font-display font-semibold text-white mt-1">Field Reports</h2>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn-primary !py-3 !px-5">
          <Plus size={18} /> Submit Field Report
        </button>
      </div>

      {!isOnline && (
        <div className="panel p-3.5 flex items-center gap-2.5 border-l-4 border-l-risk-moderate">
          <WifiOff size={16} className="text-risk-moderate shrink-0" />
          <p className="text-sm text-slate-300">You're in Offline Mode. New reports are saved on this device and marked <span className="text-risk-moderate font-medium">Pending Sync</span> until connection is restored.</p>
        </div>
      )}

      {pendingReports.length > 0 && (
        <div>
          <p className="label-eyebrow mb-2">Pending Sync ({pendingReports.length})</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {pendingReports.map((r) => (
              <div key={r.id} className="panel p-4 border border-dashed border-risk-moderate/40">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-faint">{r.id}</span>
                  <span className="chip bg-risk-moderateDim text-risk-moderate ring-1 ring-risk-moderate/30">Pending Sync</span>
                </div>
                <p className="text-sm text-white font-medium mt-2">{r.location}</p>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{r.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="label-eyebrow">All Reports</p>
        <div className="flex gap-1 bg-base-800 border border-line rounded-lg p-1">
          {['cards', 'table'].map((v) => (
            <button key={v} onClick={() => setView(v)} className={`px-3 py-1 rounded-md text-xs capitalize ${view === v ? 'bg-accent/15 text-accent' : 'text-faint'}`}>{v}</button>
          ))}
        </div>
      </div>

      {view === 'cards' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {reports.map((r) => <FieldReportCard key={r.id} report={r} />)}
        </div>
      ) : (
        <div className="panel p-2">
          <DataTable columns={columns} rows={reports} />
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Submit Field Report"
        size="lg"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="btn-primary" form="report-form" type="submit">Submit Report</button>
          </>
        }
      >
        <form id="report-form" onSubmit={submit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Location">
              <select className="input-field" value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}>
                {RISK_ZONES.map((z) => <option key={z.id}>{z.name}</option>)}
              </select>
            </Field>
            <Field label="GPS Coordinates">
              <input className="input-field font-mono" value={form.gps} onChange={(e) => setForm((f) => ({ ...f, gps: e.target.value }))} />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Report Type">
              <select className="input-field" value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}>
                {REPORT_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Severity">
              <select className="input-field" value={form.severity} onChange={(e) => setForm((f) => ({ ...f, severity: e.target.value }))}>
                {['Critical', 'High', 'Moderate', 'Low'].map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Description">
            <textarea
              required className="input-field min-h-[90px] resize-none" placeholder="Describe what you observed…"
              value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Upload Photo">
              <label className="flex items-center justify-center gap-2 border border-dashed border-line rounded-lg py-4 text-sm text-faint cursor-pointer hover:border-accent/40 hover:text-accent transition">
                <Camera size={16} /> {form.photo ? 'Photo attached' : 'Choose photo'}
                <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
              </label>
              {photoPreview && <img src={photoPreview} alt="Preview" className="mt-2 rounded-lg h-24 w-full object-cover border border-line" />}
            </Field>
            <Field label="Upload Video">
              <label className="flex items-center justify-center gap-2 border border-dashed border-line rounded-lg py-4 text-sm text-faint cursor-pointer hover:border-accent/40 hover:text-accent transition">
                <Video size={16} /> {form.video ? 'Video attached' : 'Choose video'}
                <input type="file" accept="video/*" className="hidden" onChange={() => setForm((f) => ({ ...f, video: true }))} />
              </label>
            </Field>
          </div>

          <Field label="Reporter Type">
            <select className="input-field" value={form.reporterType} onChange={(e) => setForm((f) => ({ ...f, reporterType: e.target.value }))}>
              {REPORTER_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </Field>
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
