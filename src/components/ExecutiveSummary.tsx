import { ReportItem } from '../types';
import { 
  TrendingUp, 
  Users, 
  Activity, 
  DollarSign, 
  ShieldCheck, 
  Radio, 
  ExternalLink
} from 'lucide-react';

interface ExecutiveSummaryProps {
  reports: ReportItem[];
  onOpenReport: (report: ReportItem) => void;
}

export const ExecutiveSummary = ({ reports, onOpenReport }: ExecutiveSummaryProps) => {
  // Extract key metrics from reports
  const financeReport = reports.find(r => r.id === 'rep-001');
  const marketingReport = reports.find(r => r.id === 'rep-002');
  const salesReport = reports.find(r => r.id === 'rep-003');
  const techReport = reports.find(r => r.id === 'rep-004');

  const platforms = Array.from(new Set(reports.map(r => r.sourcePlatform)));

  return (
    <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 sm:p-5 mb-6 text-slate-100 shadow-sm backdrop-blur-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800/80">
        <div className="flex items-center space-x-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <h2 className="text-sm font-semibold tracking-wide uppercase text-slate-300">
            Rangkuman Eksekutif Lintas Sistem Web
          </h2>
          <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
            Live Aggregated
          </span>
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span>Sumber Terkoneksi:</span>
          <div className="flex flex-wrap gap-1.5">
            {platforms.slice(0, 5).map(plat => (
              <span key={plat} className="bg-slate-800/90 text-slate-300 border border-slate-700/60 px-2 py-0.5 rounded text-[11px]">
                {plat}
              </span>
            ))}
            {platforms.length > 5 && (
              <span className="bg-slate-800/90 text-slate-400 border border-slate-700/60 px-1.5 py-0.5 rounded text-[11px]">
                +{platforms.length - 5}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Grid of Key Cross-Web KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        {/* KPI 1: Keuangan Konsolidasi */}
        <div 
          onClick={() => financeReport && onOpenReport(financeReport)}
          className="bg-slate-800/60 hover:bg-slate-800/90 border border-slate-700/60 rounded-lg p-3.5 transition cursor-pointer group"
          title="Klik untuk membuka laporan keuangan konsolidasi"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <div className="flex items-center space-x-1.5">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>Pendapatan Bulan Ini</span>
            </div>
            <span className="text-[10px] text-slate-400 bg-slate-700/50 px-1.5 py-0.5 rounded group-hover:text-blue-300">
              Power BI
            </span>
          </div>
          <div className="text-xl font-bold text-white mb-1">Rp 4,82 M</div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-medium flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" /> +12.4% MoM
            </span>
            <span className="text-slate-400 text-[11px] flex items-center group-hover:text-blue-400 transition">
              Buka <ExternalLink className="w-3 h-3 ml-1" />
            </span>
          </div>
        </div>

        {/* KPI 2: Trafik Web & Sesi Digital */}
        <div 
          onClick={() => marketingReport && onOpenReport(marketingReport)}
          className="bg-slate-800/60 hover:bg-slate-800/90 border border-slate-700/60 rounded-lg p-3.5 transition cursor-pointer group"
          title="Klik untuk membuka laporan digital marketing"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <div className="flex items-center space-x-1.5">
              <Users className="w-4 h-4 text-blue-400" />
              <span>Sesi Kunjungan Web</span>
            </div>
            <span className="text-[10px] text-slate-400 bg-slate-700/50 px-1.5 py-0.5 rounded group-hover:text-blue-300">
              Looker Studio
            </span>
          </div>
          <div className="text-xl font-bold text-white mb-1">184.250</div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-blue-400 font-medium flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" /> Conv. Rate: 3.82%
            </span>
            <span className="text-slate-400 text-[11px] flex items-center group-hover:text-blue-400 transition">
              Buka <ExternalLink className="w-3 h-3 ml-1" />
            </span>
          </div>
        </div>

        {/* KPI 3: Pipeline Penjualan CRM */}
        <div 
          onClick={() => salesReport && onOpenReport(salesReport)}
          className="bg-slate-800/60 hover:bg-slate-800/90 border border-slate-700/60 rounded-lg p-3.5 transition cursor-pointer group"
          title="Klik untuk membuka laporan pipeline sales"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <div className="flex items-center space-x-1.5">
              <Activity className="w-4 h-4 text-amber-400" />
              <span>Pipeline B2B Aktif</span>
            </div>
            <span className="text-[10px] text-slate-400 bg-slate-700/50 px-1.5 py-0.5 rounded group-hover:text-blue-300">
              Metabase
            </span>
          </div>
          <div className="text-xl font-bold text-white mb-1">Rp 14,2 M</div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-amber-400 font-medium">38 Kesepakatan Berjalan</span>
            <span className="text-slate-400 text-[11px] flex items-center group-hover:text-blue-400 transition">
              Buka <ExternalLink className="w-3 h-3 ml-1" />
            </span>
          </div>
        </div>

        {/* KPI 4: Ketersediaan Layanan Cloud (SRE) */}
        <div 
          onClick={() => techReport && onOpenReport(techReport)}
          className="bg-slate-800/60 hover:bg-slate-800/90 border border-slate-700/60 rounded-lg p-3.5 transition cursor-pointer group"
          title="Klik untuk membuka monitoring uptime server"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>SLA Ketersediaan IT</span>
            </div>
            <span className="text-[10px] text-slate-400 bg-slate-700/50 px-1.5 py-0.5 rounded group-hover:text-blue-300">
              Grafana
            </span>
          </div>
          <div className="text-xl font-bold text-white mb-1">99.98%</div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-medium">Latency: 48 ms</span>
            <span className="text-slate-400 text-[11px] flex items-center group-hover:text-blue-400 transition">
              Buka <ExternalLink className="w-3 h-3 ml-1" />
            </span>
          </div>
        </div>

      </div>

      {/* Status Notice Feed */}
      <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <Radio className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
          <span>
            <strong className="text-slate-300 font-medium">Status Web Induk:</strong> Seluruh feed data terenkripsi dan otomatis diperbarui sesuai siklus sumber masing-masing.
          </span>
        </div>
        <div className="text-slate-500 text-[11px]">
          Tekan kartu apa saja untuk melihat ringkasan atau membuka tampilan laporan.
        </div>
      </div>
    </section>
  );
};
