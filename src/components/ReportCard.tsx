import React, { useState, type MouseEvent } from 'react';
import { 
  ExternalLink, 
  Eye, 
  Star, 
  Copy, 
  Check, 
  Trash2, 
  Clock, 
  User, 
  Lock,
  Globe,
  Radio,
  FileSpreadsheet,
  BarChart3,
  Server,
  Sparkles
} from 'lucide-react';
import { ReportItem, PlatformType } from '../types';

interface ReportCardProps {
  key?: string;
  report: ReportItem;
  onOpenReport: (report: ReportItem) => void;
  onToggleStar: (id: string) => void;
  onDeleteReport: (id: string) => void;
}

export const ReportCard = ({
  report,
  onOpenReport,
  onToggleStar,
  onDeleteReport
}: ReportCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = (e: MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(report.sourceUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPlatformStyle = (platform: PlatformType) => {
    switch (platform) {
      case 'Power BI':
        return {
          bg: 'bg-amber-500/10 text-amber-700 border-amber-300',
          icon: BarChart3
        };
      case 'Looker Studio':
        return {
          bg: 'bg-blue-500/10 text-blue-700 border-blue-300',
          icon: BarChart3
        };
      case 'Google Sheets':
        return {
          bg: 'bg-emerald-500/10 text-emerald-700 border-emerald-300',
          icon: FileSpreadsheet
        };
      case 'Tableau':
        return {
          bg: 'bg-indigo-500/10 text-indigo-700 border-indigo-300',
          icon: BarChart3
        };
      case 'Metabase':
        return {
          bg: 'bg-teal-500/10 text-teal-700 border-teal-300',
          icon: BarChart3
        };
      case 'Grafana':
        return {
          bg: 'bg-orange-500/10 text-orange-700 border-orange-300',
          icon: Server
        };
      case 'ERP Portal':
        return {
          bg: 'bg-purple-500/10 text-purple-700 border-purple-300',
          icon: Globe
        };
      default:
        return {
          bg: 'bg-slate-500/10 text-slate-700 border-slate-300',
          icon: Globe
        };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Online</span>
          </span>
        );
      case 'syncing':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
            <Radio className="w-2.5 h-2.5 animate-spin text-blue-500" />
            <span>Sinkron</span>
          </span>
        );
      case 'scheduled':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-2.5 h-2.5 text-amber-500" />
            <span>Terjadwal</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200">
            <span>Pemeliharaan</span>
          </span>
        );
    }
  };

  const platformInfo = getPlatformStyle(report.sourcePlatform);
  const PlatformIcon = platformInfo.icon;

  return (
    <div 
      id={`report-card-${report.id}`}
      className="bg-white rounded-xl border border-slate-200 hover:border-blue-400/80 shadow-xs hover:shadow-md transition duration-200 flex flex-col justify-between overflow-hidden group"
    >
      <div className="p-4 sm:p-5">
        
        {/* Top Badges: Platform, Department & Star */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`inline-flex items-center space-x-1 text-xs font-semibold px-2 py-0.5 rounded border ${platformInfo.bg}`}>
              <PlatformIcon className="w-3 h-3" />
              <span>{report.sourcePlatform}</span>
            </span>

            <span className="text-[11px] font-medium text-slate-600 bg-slate-100 border border-slate-200/80 px-2 py-0.5 rounded">
              {report.department}
            </span>
          </div>

          <div className="flex items-center space-x-1">
            {getStatusBadge(report.status)}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleStar(report.id);
              }}
              title={report.starred ? 'Hapus dari favorit' : 'Tandai sebagai favorit'}
              className="p-1 rounded text-slate-400 hover:text-amber-500 transition cursor-pointer"
            >
              <Star className={`w-4 h-4 ${report.starred ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title & Description */}
        <h3 
          onClick={() => onOpenReport(report)}
          className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition cursor-pointer line-clamp-1 mb-1.5"
          title={report.title}
        >
          {report.title}
        </h3>

        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {report.description}
        </p>

        {/* KPI Preview Chips */}
        {report.kpis && report.kpis.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-4 bg-slate-50 border border-slate-100 p-2.5 rounded-lg">
            {report.kpis.slice(0, 2).map((kpi, idx) => (
              <div key={idx} className="overflow-hidden">
                <div className="text-[10px] text-slate-400 truncate">{kpi.label}</div>
                <div className="text-xs font-bold text-slate-800 truncate">{kpi.value}</div>
                {kpi.change && (
                  <div className={`text-[10px] font-medium truncate ${kpi.isPositive ? 'text-emerald-600' : 'text-slate-500'}`}>
                    {kpi.change}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {report.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-sm">
              #{tag}
            </span>
          ))}
          {report.tags.length > 3 && (
            <span className="text-[10px] text-slate-400 px-1 py-0.5">
              +{report.tags.length - 3}
            </span>
          )}
        </div>

        {/* Meta Details (PIC & Update Cycle) */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center space-x-1 truncate max-w-[170px]" title={`PIC: ${report.pic} (${report.picRole})`}>
            <User className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="truncate">{report.pic}</span>
          </div>

          <div className="flex items-center space-x-1 shrink-0">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>{report.updateFrequency}</span>
          </div>
        </div>

      </div>

      {/* Action Footer */}
      <div className="bg-slate-50/80 px-4 py-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
        <div className="flex items-center space-x-1">
          <button
            onClick={handleCopyLink}
            title={copied ? 'Tersalin!' : 'Salin URL sumber eksternal'}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded transition cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm(`Hapus laporan "${report.title}" dari portal induk?`)) {
                onDeleteReport(report.id);
              }
            }}
            title="Hapus laporan dari portal"
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {/* Open in Tab */}
          <a
            href={report.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center space-x-1 text-xs text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 px-2.5 py-1.5 rounded-md transition"
            title="Buka situs web sumber langsung di tab baru"
          >
            <span>Buka Web</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          {/* Open in Master Portal Viewer */}
          <button
            id={`btn-open-viewer-${report.id}`}
            onClick={() => onOpenReport(report)}
            className="inline-flex items-center space-x-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 px-3 py-1.5 rounded-md shadow-2xs transition cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Sematkan</span>
          </button>
        </div>
      </div>

    </div>
  );
};
