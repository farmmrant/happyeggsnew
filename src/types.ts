export type Department = 
  | 'Semua'
  | 'Keuangan & Akuntansi'
  | 'Pemasaran & Digital'
  | 'Penjualan & CRM'
  | 'Operasional & Logistik'
  | 'SDM & Personalia'
  | 'Teknologi & IT'
  | 'Layanan Pelanggan';

export type PlatformType = 
  | 'Looker Studio'
  | 'Power BI'
  | 'Tableau'
  | 'Google Sheets'
  | 'Metabase'
  | 'ERP Portal'
  | 'Grafana'
  | 'Web Custom';

export type ReportStatus = 'online' | 'syncing' | 'scheduled' | 'maintenance';

export type UpdateFrequency = 'Realtime' | 'Harian' | 'Mingguan' | 'Bulanan';

export interface KPIItem {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

export interface ReportTableRow {
  [key: string]: string | number;
}

export interface ReportItem {
  id: string;
  title: string;
  department: Department;
  sourcePlatform: PlatformType;
  sourceUrl: string;
  embedUrl?: string;
  updateFrequency: UpdateFrequency;
  status: ReportStatus;
  lastUpdated: string;
  description: string;
  pic: string;
  picRole: string;
  starred: boolean;
  kpis: KPIItem[];
  tags: string[];
  accessLevel: 'Publik Internal' | 'Manajemen' | 'Konfidensial' | 'Semua Karyawan';
  previewTable?: {
    headers: string[];
    rows: ReportTableRow[];
  };
  executiveNote?: string;
}

export interface FilterState {
  search: string;
  department: Department;
  platform: string;
  status: string;
  onlyStarred: boolean;
  sortBy: 'latest' | 'title' | 'department';
}
