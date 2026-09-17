import React, { useState, type FormEvent } from 'react';
import { 
  X, 
  Plus, 
  Globe, 
  BarChart3, 
  Tag, 
  User, 
  CheckCircle2 
} from 'lucide-react';
import { ReportItem, Department, PlatformType, UpdateFrequency, ReportStatus } from '../types';
import { DEPARTMENTS, PLATFORMS } from '../data/defaultReports';

interface AddReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReport: (newReport: ReportItem) => void;
}

export const AddReportModal = ({ isOpen, onClose, onAddReport }: AddReportModalProps) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [department, setDepartment] = useState<Department>('Keuangan & Akuntansi');
  const [sourcePlatform, setSourcePlatform] = useState<PlatformType>('Looker Studio');
  const [updateFrequency, setUpdateFrequency] = useState<UpdateFrequency>('Harian');
  const [status, setStatus] = useState<ReportStatus>('online');
  const [accessLevel, setAccessLevel] = useState<'Publik Internal' | 'Manajemen' | 'Konfidensial' | 'Semua Karyawan'>('Publik Internal');
  const [pic, setPic] = useState('');
  const [picRole, setPicRole] = useState('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  
  // Quick KPIs
  const [kpi1Label, setKpi1Label] = useState('Metrik Utama');
  const [kpi1Value, setKpi1Value] = useState('100%');
  const [kpi2Label, setKpi2Label] = useState('Target');
  const [kpi2Value, setKpi2Value] = useState('Tercapai');

  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Judul laporan wajib diisi');
      return;
    }
    if (!sourceUrl.trim()) {
      setError('URL web sumber laporan wajib diisi');
      return;
    }

    // Ensure URL has protocol
    let formattedUrl = sourceUrl.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }

    const tags = tagsInput
      .split(',')
      .map(t => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    if (tags.length === 0) {
      tags.push('WebLaporan', sourcePlatform.replace(/\s+/g, ''));
    }

    const newReport: ReportItem = {
      id: `rep-custom-${Date.now()}`,
      title: title.trim(),
      department,
      sourcePlatform,
      sourceUrl: formattedUrl,
      updateFrequency,
      status,
      lastUpdated: 'Baru saja didaftarkan',
      description: description.trim() || `Laporan terintegrasi dari ${sourcePlatform} untuk departemen ${department}.`,
      pic: pic.trim() || 'Admin Portal',
      picRole: picRole.trim() || 'Data Custodian',
      starred: false,
      accessLevel,
      kpis: [
        { label: kpi1Label.trim() || 'Metrik Utama', value: kpi1Value.trim() || 'Aktif', change: 'Live', isPositive: true },
        { label: kpi2Label.trim() || 'Target', value: kpi2Value.trim() || 'Stabil', change: 'Normal', isPositive: true }
      ],
      tags,
      executiveNote: 'Laporan ini baru didaftarkan ke Web Induk Laporan Terpadu.',
      previewTable: {
        headers: ['Item / Metrik', 'Realisasi Saat Ini', 'Target Periode', 'Status'],
        rows: [
          { 'Item / Metrik': kpi1Label || 'Indikator Primer', 'Realisasi Saat Ini': kpi1Value || '95%', 'Target Periode': '100%', Status: 'On Track' },
          { 'Item / Metrik': kpi2Label || 'Indikator Sekunder', 'Realisasi Saat Ini': kpi2Value || '120 unit', 'Target Periode': '100 unit', Status: 'Optimal' },
          { 'Item / Metrik': 'Tingkat Keterisian Data', 'Realisasi Saat Ini': '100%', 'Target Periode': '100%', Status: 'Lengkap' }
        ]
      }
    };

    onAddReport(newReport);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Daftarkan Laporan Web Baru</h2>
              <p className="text-xs text-slate-400">Hubungkan laporan dari website, BI, atau portal eksternal</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs font-medium">
              {error}
            </div>
          )}

          {/* Report Title */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Nama / Judul Laporan <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => { setTitle(e.target.value); setError(''); }}
              placeholder="Contoh: Laporan Penjualan Q3 Looker Studio"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
            />
          </div>

          {/* Source URL */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              URL Web Sumber / Tautan Laporan <span className="text-rose-500">*</span>
            </label>
            <input
              type="url"
              required
              value={sourceUrl}
              onChange={(e) => { setSourceUrl(e.target.value); setError(''); }}
              placeholder="https://lookerstudio.google.com/reporting/..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
            />
            <span className="text-[11px] text-slate-500 mt-0.5 block">
              Dapat berupa link Looker Studio, Power BI, Google Sheets, Metabase, Tableau, atau website custom.
            </span>
          </div>

          {/* Department & Platform Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Kategori / Departemen</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value as Department)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 cursor-pointer"
              >
                {DEPARTMENTS.filter(d => d !== 'Semua').map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Platform Asal</label>
              <select
                value={sourcePlatform}
                onChange={(e) => setSourcePlatform(e.target.value as PlatformType)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 cursor-pointer"
              >
                {PLATFORMS.filter(p => p !== 'Semua Platform').map((plat) => (
                  <option key={plat} value={plat}>{plat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Frequency, Status & Access Level */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Siklus Pembaruan</label>
              <select
                value={updateFrequency}
                onChange={(e) => setUpdateFrequency(e.target.value as UpdateFrequency)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 cursor-pointer"
              >
                <option value="Realtime">Realtime</option>
                <option value="Harian">Harian</option>
                <option value="Mingguan">Mingguan</option>
                <option value="Bulanan">Bulanan</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Status Web</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ReportStatus)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 cursor-pointer"
              >
                <option value="online">Online (Tersedia)</option>
                <option value="scheduled">Terjadwal</option>
                <option value="syncing">Sedang Sinkronisasi</option>
                <option value="maintenance">Pemeliharaan</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tingkat Akses</label>
              <select
                value={accessLevel}
                onChange={(e) => setAccessLevel(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 cursor-pointer"
              >
                <option value="Publik Internal">Publik Internal</option>
                <option value="Semua Karyawan">Semua Karyawan</option>
                <option value="Manajemen">Manajemen</option>
                <option value="Konfidensial">Konfidensial</option>
              </select>
            </div>
          </div>

          {/* PIC info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nama PIC Penanggung Jawab</label>
              <input
                type="text"
                value={pic}
                onChange={(e) => setPic(e.target.value)}
                placeholder="Contoh: Rahmat Hidayat, S.Kom."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Jabatan / Role PIC</label>
              <input
                type="text"
                value={picRole}
                onChange={(e) => setPicRole(e.target.value)}
                placeholder="Contoh: Lead Data Analyst"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              />
            </div>
          </div>

          {/* Quick KPIs preview */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-semibold text-slate-700 block mb-2">
              Indikator Metrik Cepat (Untuk Ditampilkan di Kartu Web Induk)
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <input
                  type="text"
                  value={kpi1Label}
                  onChange={(e) => setKpi1Label(e.target.value)}
                  placeholder="Label KPI 1"
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded mb-1 text-slate-800"
                />
                <input
                  type="text"
                  value={kpi1Value}
                  onChange={(e) => setKpi1Value(e.target.value)}
                  placeholder="Nilai KPI 1 (cth: Rp 2,5 M)"
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-slate-800 font-bold"
                />
              </div>

              <div>
                <input
                  type="text"
                  value={kpi2Label}
                  onChange={(e) => setKpi2Label(e.target.value)}
                  placeholder="Label KPI 2"
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded mb-1 text-slate-800"
                />
                <input
                  type="text"
                  value={kpi2Value}
                  onChange={(e) => setKpi2Value(e.target.value)}
                  placeholder="Nilai KPI 2 (cth: 99.4%)"
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-slate-800 font-bold"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Deskripsi Singkat</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan isi laporan dan tujuan pemantauan..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Tag (Pisahkan dengan koma)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Finance, Bulanan, SAP, Revenue"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
            />
          </div>

          {/* Footer actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Simpan ke Web Induk</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
