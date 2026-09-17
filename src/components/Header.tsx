import { useState, useEffect } from 'react';
import { 
  Layers, 
  PlusCircle, 
  RefreshCw, 
  RotateCcw,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface HeaderProps {
  onAddReport: () => void;
  onRefreshAll: () => void;
  onResetDefaults: () => void;
  isSyncing: boolean;
  totalReports: number;
  onlineReports: number;
}

export const Header = ({
  onAddReport,
  onRefreshAll,
  onResetDefaults,
  isSyncing,
  totalReports,
  onlineReports
}: HeaderProps) => {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleDateString('id-ID', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }) + ' WIB'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Portal Identity */}
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm ring-2 ring-blue-500/30">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  Portal Induk Laporan
                </h1>
                <span className="px-2 py-0.5 text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full">
                  Multi-Web Hub
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Pusat integrasi & agregasi laporan dari berbagai situs web, BI, dan ERP eksternal
              </p>
            </div>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Live Clock */}
            <div className="hidden lg:flex items-center space-x-1.5 text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-md border border-slate-700">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>{timeString || 'Memuat waktu...'}</span>
            </div>

            {/* Online Status Pill */}
            <div className="flex items-center space-x-1.5 text-xs font-medium text-emerald-300 bg-emerald-950/60 border border-emerald-700/60 px-2.5 py-1.5 rounded-md">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{onlineReports}/{totalReports} Web Terhubung</span>
            </div>

            {/* Refresh Button */}
            <button
              id="btn-refresh-all-reports"
              onClick={onRefreshAll}
              disabled={isSyncing}
              title="Sinkronisasi status seluruh sumber laporan web"
              className="inline-flex items-center space-x-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-md transition disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-blue-400' : 'text-slate-300'}`} />
              <span>{isSyncing ? 'Menyinkronkan...' : 'Sinkronkan'}</span>
            </button>

            {/* Reset to Default */}
            <button
              id="btn-reset-default-reports"
              onClick={onResetDefaults}
              title="Kembalikan daftar laporan ke preset bawaan"
              className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-md border border-slate-700/60 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Add Report Button */}
            <button
              id="btn-open-add-report-modal"
              onClick={onAddReport}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 px-3.5 py-1.5 rounded-md shadow-sm transition cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Tambah Web Laporan</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
