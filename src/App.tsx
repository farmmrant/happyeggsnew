import { useState, useEffect, useMemo } from 'react';
import { 
  Header 
} from './components/Header';
import { 
  ExecutiveSummary 
} from './components/ExecutiveSummary';
import { 
  FilterBar 
} from './components/FilterBar';
import { 
  ReportCard 
} from './components/ReportCard';
import { 
  ReportTableView 
} from './components/ReportTableView';
import { 
  ReportViewerModal 
} from './components/ReportViewerModal';
import { 
  AddReportModal 
} from './components/AddReportModal';
import { 
  DEFAULT_REPORTS 
} from './data/defaultReports';
import { 
  ReportItem, 
  FilterState 
} from './types';
import { 
  Globe2, 
  Plus, 
  SearchX, 
  CheckCircle, 
  Layers, 
  Shield, 
  ExternalLink,
  BookOpen
} from 'lucide-react';

const STORAGE_KEY = 'portal_induk_laporan_data_v1';

export default function App() {
  // Load reports from localStorage or defaults
  const [reports, setReports] = useState<ReportItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse saved reports:', e);
    }
    return DEFAULT_REPORTS;
  });

  // Save to localStorage whenever reports change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
    } catch (e) {
      console.error('Failed to save reports:', e);
    }
  }, [reports]);

  // View state
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    department: 'Semua',
    platform: 'Semua Platform',
    status: 'all',
    onlyStarred: false,
    sortBy: 'latest'
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Toggle favorite star
  const handleToggleStar = (id: string) => {
    setReports(prev =>
      prev.map(r => (r.id === id ? { ...r, starred: !r.starred } : r))
    );
  };

  // Delete report
  const handleDeleteReport = (id: string) => {
    setReports(prev => prev.filter(r => r.id !== id));
    showToast('Laporan berhasil dihapus dari web induk.');
  };

  // Add report
  const handleAddReport = (newReport: ReportItem) => {
    setReports(prev => [newReport, ...prev]);
    showToast(`Laporan "${newReport.title}" berhasil ditambahkan.`);
  };

  // Refresh all reports
  const handleRefreshAll = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setReports(prev =>
        prev.map(r => ({
          ...r,
          status: 'online',
          lastUpdated: 'Baru saja disinkronkan'
        }))
      );
      setIsSyncing(false);
      showToast('Seluruh status web laporan eksternal berhasil disinkronkan.');
    }, 1200);
  };

  // Reset to default
  const handleResetDefaults = () => {
    if (confirm('Kembalikan seluruh daftar laporan ke pengaturan bawaan awal?')) {
      setReports(DEFAULT_REPORTS);
      localStorage.removeItem(STORAGE_KEY);
      showToast('Daftar laporan telah direset ke setelan standar.');
    }
  };

  // Filter & Sort Logic
  const filteredReports = useMemo(() => {
    return reports
      .filter(item => {
        // Search filter
        if (filters.search.trim()) {
          const q = filters.search.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(q);
          const matchDesc = item.description.toLowerCase().includes(q);
          const matchPic = item.pic.toLowerCase().includes(q);
          const matchPlatform = item.sourcePlatform.toLowerCase().includes(q);
          const matchTags = item.tags.some(t => t.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchPic && !matchPlatform && !matchTags) {
            return false;
          }
        }

        // Department filter
        if (filters.department !== 'Semua' && item.department !== filters.department) {
          return false;
        }

        // Platform filter
        if (filters.platform !== 'Semua Platform' && item.sourcePlatform !== filters.platform) {
          return false;
        }

        // Status filter
        if (filters.status !== 'all' && item.status !== filters.status) {
          return false;
        }

        // Starred only
        if (filters.onlyStarred && !item.starred) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        if (filters.sortBy === 'department') {
          return a.department.localeCompare(b.department);
        }
        // latest: keep order as is (or custom IDs first)
        return 0;
      });
  }, [reports, filters]);

  const onlineCount = reports.filter(r => r.status === 'online').length;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* Portal Header */}
      <Header
        onAddReport={() => setIsAddModalOpen(true)}
        onRefreshAll={handleRefreshAll}
        onResetDefaults={handleResetDefaults}
        isSyncing={isSyncing}
        totalReports={reports.length}
        onlineReports={onlineCount}
      />

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-800 text-white border border-slate-700 px-4 py-3 rounded-lg shadow-xl flex items-center space-x-2 text-xs animate-fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Top Banner / Guidance */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-gradient-to-r from-blue-900/40 via-slate-800/60 to-slate-900 border border-blue-800/40 rounded-xl p-4 sm:p-5">
          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 shrink-0 mt-0.5">
              <Globe2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Pusat Monitoring Laporan Terpadu
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                Web induk ini mengonsolidasikan seluruh laporan yang tersebar di berbagai platform (Looker Studio, Power BI, Google Sheets, Tableau, Metabase, ERP, dan Grafana) ke dalam satu dashboard sentral.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="self-start md:self-center inline-flex items-center space-x-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 px-4 py-2.5 rounded-lg shadow-sm transition shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Sumber Web</span>
          </button>
        </div>

        {/* Cross-Report Executive Summary */}
        <ExecutiveSummary
          reports={reports}
          onOpenReport={(rep) => setSelectedReport(rep)}
        />

        {/* Filter and Control Bar */}
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          totalResults={filteredReports.length}
        />

        {/* Content Section: Grid vs Table */}
        {filteredReports.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredReports.map(report => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onOpenReport={(rep) => setSelectedReport(rep)}
                  onToggleStar={handleToggleStar}
                  onDeleteReport={handleDeleteReport}
                />
              ))}
            </div>
          ) : (
            <ReportTableView
              reports={filteredReports}
              onOpenReport={(rep) => setSelectedReport(rep)}
              onToggleStar={handleToggleStar}
              onDeleteReport={handleDeleteReport}
            />
          )
        ) : (
          /* Empty State */
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-12 text-center my-6">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 mx-auto mb-3">
              <SearchX className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-white mb-1">
              Tidak ada laporan yang sesuai kriteria filter
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
              Silakan ubah kata kunci pencarian, ganti kategori departemen, atau bersihkan filter untuk menampilkan kembali laporan.
            </p>
            <button
              onClick={() => {
                setFilters({
                  search: '',
                  department: 'Semua',
                  platform: 'Semua Platform',
                  status: 'all',
                  onlyStarred: false,
                  sortBy: 'latest'
                });
              }}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 bg-blue-950/60 border border-blue-800/60 px-3.5 py-2 rounded-lg transition cursor-pointer"
            >
              <span>Reset Semua Filter</span>
            </button>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-blue-400" />
            <span className="font-semibold text-slate-300">Portal Laporan Terpadu Enterprise</span>
            <span>&bull;</span>
            <span>Versi Agregator 2.4</span>
          </div>

          <div className="flex items-center space-x-4 text-slate-400 text-[11px]">
            <span className="flex items-center space-x-1">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Koneksi Aman TLS 1.3</span>
            </span>
            <span>&bull;</span>
            <span>Penyimpanan Lokal Aktif</span>
          </div>
        </div>
      </footer>

      {/* In-App Report Viewer Modal */}
      <ReportViewerModal
        report={selectedReport}
        onClose={() => setSelectedReport(null)}
      />

      {/* Add Report Modal */}
      <AddReportModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddReport={handleAddReport}
      />

    </div>
  );
}
