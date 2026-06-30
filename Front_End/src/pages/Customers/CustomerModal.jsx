import React from 'react';
import { C } from '../../theme/colors';

const STATUS_OPTIONS = ['Lead', 'Active', 'Inactive', 'VIP'];

export default function CustomerModal({ modal, onClose, form, setForm, save, saving, error }) {
  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 14,
          padding: 24, width: 420, maxWidth: '90vw',
        }}
      >
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.1rem', marginBottom: 18 }}>
          {modal === 'add' ? 'Add Customer' : 'Edit Customer'}
        </h3>

        {error && (
          <div style={{ background: '#ff000020', border: '1px solid #ff4444', borderRadius: 8, padding: '8px 12px', marginBottom: 14, color: '#ff4444', fontSize: '0.82rem' }}>
            ⚠ {error}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Field label="Name *" value={form.name} onChange={update('name')} />
          <Field label="Email *" value={form.email} onChange={update('email')} type="email" />
          <Field label="Phone" value={form.phone} onChange={update('phone')} />
          <Field label="Company" value={form.company} onChange={update('company')} />
          <Field label="Address" value={form.address} onChange={update('address')} />

          <div>
            <label style={{ fontSize: '0.78rem', color: C.textMuted, marginBottom: 4, display: 'block' }}>Status</label>
            <select
              value={form.status}
              onChange={update('status')}
              style={{
                width: '100%', padding: '8px 10px', borderRadius: 8,
                background: '#ffffff08', border: `1px solid ${C.cardBorder}`,
                color: C.text, fontSize: '0.85rem',
              }}
            >
              {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', color: C.textMuted, marginBottom: 4, display: 'block' }}>Notes</label>
            <textarea
              value={form.notes}
              onChange={update('notes')}
              rows={3}
              style={{
                width: '100%', padding: '8px 10px', borderRadius: 8,
                background: '#ffffff08', border: `1px solid ${C.cardBorder}`,
                color: C.text, fontSize: '0.85rem', resize: 'vertical',
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px', borderRadius: 8, border: `1px solid ${C.cardBorder}`,
              background: 'transparent', color: C.textMuted, cursor: 'pointer', fontSize: '0.85rem',
            }}
          >
            Cancel
          </button>
          <button
            onClick={save}
            disabled={saving}
            style={{
              padding: '8px 16px', borderRadius: 8, border: 'none',
              background: C.accent, color: '#fff', cursor: saving ? 'default' : 'pointer',
              fontSize: '0.85rem', opacity: saving ? 0.6 : 1,
            }}
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text' }) {
  return (
    <div>
      <label style={{ fontSize: '0.78rem', color: C.textMuted, marginBottom: 4, display: 'block' }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        style={{
          width: '100%', padding: '8px 10px', borderRadius: 8,
          background: '#ffffff08', border: `1px solid ${C.cardBorder}`,
          color: C.text, fontSize: '0.85rem', boxSizing: 'border-box',
        }}
      />
    </div>
  );
}