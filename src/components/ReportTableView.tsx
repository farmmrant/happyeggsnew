import { useState } from 'react';
import { 
  ExternalLink, 
  Eye, 
  Star, 
  Copy, 
  Check, 
  Trash2, 
  Clock,
  BarChart3,
  Globe
} from 'lucide-react';
import { ReportItem } from '../types';

interface ReportTableViewProps {
  reports: ReportItem[];
  onOpenReport: (report: ReportItem) => void;
  onToggleStar: (id: string) => void;
  onDeleteReport: (id: string) => void;
}

export const ReportTableView = ({
  reports,
  onOpenReport,
  onToggleStar,
  onDeleteReport
}: ReportTableViewProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
            <tr>
              <th className="py-3 px-4 w-10 text-center">Fav</th>
              <th className="py-3 px-4">Nama Laporan & Deskripsi</th>
              <th className="py-3 px-4">Departemen</th>
              <th className="py-3 px-4">Platform Asal</th>
              <th className="py-3 px-4">Status & Siklus</th>
              <th className="py-3 px-4">PIC Penanggung Jawab</th>
              <th className="py-3 px-4 text-right">Aksi Portal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {reports.map((report) => (
              <tr 
                key={report.id}
                className="hover:bg-slate-50/80 transition group"
              >
                {/* Star toggle */}
                <td className="py-3.5 px-4 text-center">
                  <button
                    onClick={() => onToggleStar(report.id)}
                    className="p-1 text-slate-300 hover:text-amber-500 transition cursor-pointer"
                  >
                    <Star className={`w-4 h-4 ${report.starred ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>
                </td>

                {/* Title & Description */}
                <td className="py-3.5 px-4 max-w-xs sm:max-w-md">
                  <div 
                    onClick={() => onOpenReport(report)}
                    className="font-semibold text-slate-900 group-hover:text-blue-600 cursor-pointer transition line-clamp-1"
                    title={report.title}
                  >
                    {report.title}
                  </div>
                  <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                    {report.description}
                  </div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {report.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </td>

                {/* Department */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span className="inline-flex items-center text-xs font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                    {report.department}
                  </span>
                </td>

                {/* Platform */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-800">
                    <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
                    <span>{report.sourcePlatform}</span>
                  </div>
                  <a 
                    href={report.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-blue-600 hover:underline flex items-center space-x-1 mt-0.5 truncate max-w-[150px]"
                    title={report.sourceUrl}
                  >
                    <span className="truncate">{new URL(report.sourceUrl).hostname}</span>
                    <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                  </a>
                </td>

                {/* Status & Frequency */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <div className="flex items-center space-x-1.5 mb-1">
                    <span className={`w-2 h-2 rounded-full ${
                      report.status === 'online' ? 'bg-emerald-500' :
                      report.status === 'syncing' ? 'bg-blue-500 animate-pulse' :
                      report.status === 'scheduled' ? 'bg-amber-500' : 'bg-rose-500'
                    }`} />
                    <span className="text-xs font-medium text-slate-700 capitalize">
                      {report.status === 'online' ? 'Online' :
                       report.status === 'syncing' ? 'Sinkronisasi' :
                       report.status === 'scheduled' ? 'Terjadwal' : 'Pemeliharaan'}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{report.updateFrequency} ({report.lastUpdated})</span>
                  </div>
                </td>

                {/* PIC */}
                <td className="py-3.5 px-4 whitespace-nowrap text-xs text-slate-700">
                  <div className="font-medium text-slate-800">{report.pic}</div>
                  <div className="text-[11px] text-slate-500">{report.picRole}</div>
                </td>

                {/* Actions */}
                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end space-x-1.5">
                    <button
                      onClick={() => handleCopy(report.id, report.sourceUrl)}
                      title="Salin URL Laporan"
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition cursor-pointer"
                    >
                      {copiedId === report.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <a
                      href={report.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Buka Web Eksternal Asal"
                      className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => onOpenReport(report)}
                      className="inline-flex items-center space-x-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 px-2.5 py-1.5 rounded-md transition cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Sematkan</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Hapus laporan "${report.title}"?`)) {
                          onDeleteReport(report.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition cursor-pointer"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
