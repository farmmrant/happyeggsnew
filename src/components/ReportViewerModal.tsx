import { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  RefreshCw, 
  Copy, 
  Check, 
  Download, 
  Maximize2, 
  Minimize2, 
  BarChart2, 
  Globe, 
  User, 
  Clock, 
  ShieldCheck, 
  AlertCircle,
  FileText,
  TrendingUp,
  Table as TableIcon
} from 'lucide-react';
import { ReportItem } from '../types';

interface ReportViewerModalProps {
  report: ReportItem | null;
  onClose: () => void;
}

export const ReportViewerModal = ({ report, onClose }: ReportViewerModalProps) => {
  if (!report) return null;

  const [activeTab, setActiveTab] = useState<'interactive' | 'live-frame'>('interactive');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [iframeKey, setIframeKey] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const [tableSearch, setTableSearch] = useState('');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(report.sourceUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefreshIframe = () => {
    setIframeKey(prev => prev + 1);
  };

  const handleExportCSV = () => {
    setIsExporting(true);
    setTimeout(() => {
      if (!report.previewTable) return;
      const headers = report.previewTable.headers.join(',');
      const rows = report.previewTable.rows
        .map(row => report.previewTable!.headers.map(h => `"${row[h] || ''}"`).join(','))
        .join('\n');
      const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + rows;
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${report.title.replace(/\s+/g, '_')}_laporan.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsExporting(false);
    }, 400);
  };

  // Filter preview table rows if search is typed
  const filteredRows = report.previewTable?.rows.filter(row => {
    if (!tableSearch) return true;
    return Object.values(row).some(val => 
      String(val).toLowerCase().includes(tableSearch.toLowerCase())
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div 
        className={`bg-white rounded-xl shadow-2xl border border-slate-200 flex flex-col transition-all duration-200 overflow-hidden ${
          isFullscreen 
            ? 'w-full h-full fixed inset-0 rounded-none' 
            : 'w-full max-w-6xl max-h-[92vh] h-[850px]'
        }`}
      >
        
        {/* Top Modal Header */}
        <div className="bg-slate-900 text-white px-4 sm:px-6 py-3.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-lg font-bold text-white truncate" title={report.title}>
                  {report.title}
                </h2>
                <span className="hidden sm:inline-flex px-2 py-0.5 text-[11px] font-semibold bg-slate-800 text-blue-300 border border-slate-700 rounded">
                  {report.sourcePlatform}
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate">
                Sumber Web: <span className="text-slate-300">{report.sourceUrl}</span>
              </p>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center bg-slate-800 p-1 rounded-lg border border-slate-700 text-xs">
            <button
              onClick={() => setActiveTab('interactive')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition cursor-pointer ${
                activeTab === 'interactive'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Dashboard Interaktif</span>
            </button>
            <button
              onClick={() => setActiveTab('live-frame')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition cursor-pointer ${
                activeTab === 'live-frame'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Frame Web Sumber</span>
            </button>
          </div>

          {/* Control Actions */}
          <div className="flex items-center space-x-1.5">
            <button
              onClick={handleCopyLink}
              title="Salin Tautan Sumber"
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>

            <a
              href={report.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Buka Website Asal di Tab Baru"
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh'}
              className="hidden sm:block p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition cursor-pointer"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              title="Tutup Pratinjau"
              className="p-1.5 text-slate-300 hover:text-rose-400 hover:bg-slate-800 rounded transition cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col">
          
          {activeTab === 'interactive' ? (
            /* TAB 1: INTERACTIVE DATA & REPORT METRICS */
            <div className="p-4 sm:p-6 space-y-6 flex-1">
              
              {/* Report Header Bar */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2.5 py-1 text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-md">
                        {report.department}
                      </span>
                      <span className="px-2 py-0.5 text-xs text-slate-600 bg-slate-100 border border-slate-200 rounded-md">
                        Akses: {report.accessLevel}
                      </span>
                      <span className="px-2 py-0.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md flex items-center space-x-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span className="capitalize">{report.status}</span>
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed max-w-3xl">
                      {report.description}
                    </p>
                  </div>

                  {/* PIC & Refresh Info Box */}
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-600 space-y-1.5 shrink-0 min-w-[240px]">
                    <div className="flex items-center space-x-2">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>PIC: <strong className="text-slate-800">{report.pic}</strong></span>
                    </div>
                    <div className="text-[11px] text-slate-500 pl-5">
                      {report.picRole}
                    </div>
                    <div className="flex items-center space-x-2 pt-1 border-t border-slate-200">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Pembaruan: {report.updateFrequency} ({report.lastUpdated})</span>
                    </div>
                  </div>
                </div>

                {/* Executive Note Banner */}
                {report.executiveNote && (
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-start space-x-2.5 text-xs text-slate-700 bg-amber-50/70 border border-amber-200/80 p-3 rounded-lg">
                    <FileText className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-amber-900">Catatan Analisis Eksekutif: </strong>
                      <span>{report.executiveNote}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* KPI Performance Metrics */}
              {report.kpis && report.kpis.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                    Indikator Kinerja Utama (KPI Ringkas)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {report.kpis.map((kpi, idx) => (
                      <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
                        <div className="text-xs text-slate-500 font-medium mb-1">{kpi.label}</div>
                        <div className="text-2xl font-extrabold text-slate-900 mb-1">{kpi.value}</div>
                        {kpi.change && (
                          <div className={`text-xs font-semibold flex items-center space-x-1 ${
                            kpi.isPositive ? 'text-emerald-600' : 'text-slate-500'
                          }`}>
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span>{kpi.change}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interactive Report Data Table */}
              {report.previewTable && (
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                  <div className="px-5 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <TableIcon className="w-4 h-4 text-blue-600" />
                        <h4 className="text-sm font-bold text-slate-900">
                          Data Rinci Teragregasi dari Sumber Web
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Rekapitulasi baris data yang disinkronkan dari platform {report.sourcePlatform}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input 
                        type="text"
                        placeholder="Saring data tabel..."
                        value={tableSearch}
                        onChange={(e) => setTableSearch(e.target.value)}
                        className="text-xs bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        onClick={handleExportCSV}
                        disabled={isExporting}
                        className="inline-flex items-center space-x-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 py-1.5 rounded-md transition cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-slate-600" />
                        <span>{isExporting ? 'Mengekspor...' : 'Ekspor CSV'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-700">
                      <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-600 uppercase tracking-wider">
                        <tr>
                          {report.previewTable.headers.map((header) => (
                            <th key={header} className="py-3 px-4 whitespace-nowrap">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredRows && filteredRows.length > 0 ? (
                          filteredRows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50/80 transition">
                              {report.previewTable!.headers.map((hKey, cIdx) => (
                                <td key={cIdx} className="py-3 px-4 whitespace-nowrap">
                                  {cIdx === 0 ? (
                                    <strong className="font-semibold text-slate-900">{row[hKey]}</strong>
                                  ) : (
                                    <span>{row[hKey]}</span>
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={report.previewTable.headers.length} className="py-8 text-center text-slate-400">
                              Tidak ada baris yang sesuai dengan kata kunci pencarian.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Bottom Quick Launch Banner */}
              <div className="bg-blue-50/60 border border-blue-200/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">Akses Web Laporan Asli</h5>
                    <p className="text-slate-600">
                      Untuk modifikasi filter mendalam atau manipulasi dataset asli, Anda dapat mengakses URL sumber.
                    </p>
                  </div>
                </div>

                <a
                  href={report.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition shrink-0"
                >
                  <span>Buka di {report.sourcePlatform}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          ) : (
            /* TAB 2: LIVE WEB FRAME / IFRAME */
            <div className="flex-1 flex flex-col relative bg-slate-100">
              
              {/* Iframe notice bar */}
              <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-900 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    <strong>Informasi Sematan Web:</strong> Jika situs web sumber mengaktifkan kebijakan keamanan <em>X-Frame-Options</em> atau pembatasan cross-origin, gunakan tab <strong>Dashboard Interaktif</strong> atau tombol buka tab baru.
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleRefreshIframe}
                    className="inline-flex items-center space-x-1 text-xs text-amber-900 hover:text-amber-950 font-medium px-2 py-0.5 rounded bg-amber-200/60 hover:bg-amber-200 transition cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Muat Ulang Frame</span>
                  </button>

                  <a
                    href={report.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-xs text-blue-700 hover:text-blue-900 font-semibold underline"
                  >
                    <span>Buka Jendela Penuh</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Iframe View */}
              <div className="flex-1 relative w-full h-full min-h-[500px]">
                <iframe
                  key={iframeKey}
                  src={report.embedUrl || report.sourceUrl}
                  title={`Sematan Laporan - ${report.title}`}
                  className="w-full h-full border-0 absolute inset-0 bg-white"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
