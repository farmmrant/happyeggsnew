import { ReportItem } from '../types';

export const DEFAULT_REPORTS: ReportItem[] = [
  {
    id: 'rep-001',
    title: 'Laporan Arus Kas & Laba Rugi Konsolidasi',
    department: 'Keuangan & Akuntansi',
    sourcePlatform: 'Power BI',
    sourceUrl: 'https://app.powerbi.com/view?r=financial-consolidated-q3',
    embedUrl: 'https://en.wikipedia.org/wiki/Financial_statement',
    updateFrequency: 'Harian',
    status: 'online',
    lastUpdated: 'Hari ini, 08:30 WIB',
    description: 'Dashboard keuangan bulanan mencakup perputaran arus kas, EBITDA, margin laba bersih, dan realisasi anggaran vs target tahun berjalan.',
    pic: 'Siti Rahmawati, S.E., Ak.',
    picRole: 'Head of Financial Reporting',
    starred: true,
    accessLevel: 'Manajemen',
    kpis: [
      { label: 'Pendapatan Bulan Ini', value: 'Rp 4,82 Milyar', change: '+12.4%', isPositive: true },
      { label: 'Margin EBITDA', value: '28.6%', change: '+1.8%', isPositive: true },
      { label: 'Rasio Likuiditas', value: '2.4x', change: 'Sehat', isPositive: true }
    ],
    tags: ['Cashflow', 'EBITDA', 'Laba-Rugi', 'Audit Keuangan'],
    executiveNote: 'Kinerja kuartal berjalan melampaui target revenue 108%. Saldo kas operasional aman untuk 9 bulan ke depan.',
    previewTable: {
      headers: ['Periode', 'Pendapatan (IDR)', 'Beban Pokok (IDR)', 'Laba Kotor', 'Laba Bersih', 'Status'],
      rows: [
        { Periode: 'Agustus 2026', 'Pendapatan (IDR)': 'Rp 4.820.000.000', 'Beban Pokok (IDR)': 'Rp 2.150.000.000', 'Laba Kotor': 'Rp 2.670.000.000', 'Laba Bersih': 'Rp 1.380.000.000', Status: 'Audited' },
        { Periode: 'Juli 2026', 'Pendapatan (IDR)': 'Rp 4.290.000.000', 'Beban Pokok (IDR)': 'Rp 1.980.000.000', 'Laba Kotor': 'Rp 2.310.000.000', 'Laba Bersih': 'Rp 1.150.000.000', Status: 'Audited' },
        { Periode: 'Juni 2026', 'Pendapatan (IDR)': 'Rp 4.100.000.000', 'Beban Pokok (IDR)': 'Rp 1.920.000.000', 'Laba Kotor': 'Rp 2.180.000.000', 'Laba Bersih': 'Rp 1.090.000.000', Status: 'Audited' },
        { Periode: 'Mei 2026', 'Pendapatan (IDR)': 'Rp 3.950.000.000', 'Beban Pokok (IDR)': 'Rp 1.880.000.000', 'Laba Kotor': 'Rp 2.070.000.000', 'Laba Bersih': 'Rp 980.000.000', Status: 'Audited' }
      ]
    }
  },
  {
    id: 'rep-002',
    title: 'Dashboard Trafik & Konversi Digital Marketing',
    department: 'Pemasaran & Digital',
    sourcePlatform: 'Looker Studio',
    sourceUrl: 'https://lookerstudio.google.com/reporting/marketing-traffic-funnel-2026',
    embedUrl: 'https://lookerstudio.google.com/',
    updateFrequency: 'Realtime',
    status: 'online',
    lastUpdated: '10 menit yang lalu',
    description: 'Statistik kunjungan web induk dan e-commerce dari Google Analytics 4, performa iklan Meta & Google Ads, serta conversion rate saluran organik.',
    pic: 'Dimas Wicaksono',
    picRole: 'Lead Growth & Performance Marketing',
    starred: true,
    accessLevel: 'Publik Internal',
    kpis: [
      { label: 'Total Sesi Aktif', value: '184.250', change: '+24.1%', isPositive: true },
      { label: 'Conversion Rate', value: '3.82%', change: '+0.45%', isPositive: true },
      { label: 'ROAS Rata-rata', value: '4.6x', change: '+0.3x', isPositive: true }
    ],
    tags: ['Google Analytics', 'ROAS', 'Traffic', 'Ads Campaign'],
    executiveNote: 'Kampanye digital semester 2 mencetak lonjakan sesi 24% berkat optimasi SEO artikel pilar dan retargeting iklan video.',
    previewTable: {
      headers: ['Saluran Akuisisi', 'Sesi Pengunjung', 'Pengguna Baru', 'Bounce Rate', 'Transaksi', 'Nilai Konversi'],
      rows: [
        { 'Saluran Akuisisi': 'Organic Search (Google)', 'Sesi Pengunjung': '89.420', 'Pengguna Baru': '64.100', 'Bounce Rate': '32.1%', Transaksi: '3.420', 'Nilai Konversi': 'Rp 1.250.000.000' },
        { 'Saluran Akuisisi': 'Paid Ads (Meta & Google)', 'Sesi Pengunjung': '52.180', 'Pengguna Baru': '41.200', 'Bounce Rate': '41.5%', Transaksi: '2.190', 'Nilai Konversi': 'Rp 890.000.000' },
        { 'Saluran Akuisisi': 'Direct & Referral', 'Sesi Pengunjung': '28.350', 'Pengguna Baru': '12.800', 'Bounce Rate': '28.4%', Transaksi: '1.050', 'Nilai Konversi': 'Rp 410.000.000' },
        { 'Saluran Akuisisi': 'Email Newsletter', 'Sesi Pengunjung': '14.300', 'Pengguna Baru': '3.200', 'Bounce Rate': '22.0%', Transaksi: '780', 'Nilai Konversi': 'Rp 295.000.000' }
      ]
    }
  },
  {
    id: 'rep-003',
    title: 'Pipeline Penjualan B2B & Akuisisi Klien Baru',
    department: 'Penjualan & CRM',
    sourcePlatform: 'Metabase',
    sourceUrl: 'https://metabase.internal-corp.net/dashboard/crm-pipeline-deal-flow',
    embedUrl: 'https://en.wikipedia.org/wiki/Customer_relationship_management',
    updateFrequency: 'Harian',
    status: 'online',
    lastUpdated: 'Hari ini, 07:15 WIB',
    description: 'Pelacakan prospek penjualan B2B, status kesepakatan (deal stage), estimasi nilai kontrak, dan produktivitas per representatif account executive.',
    pic: 'Ferry Hendrawan',
    picRole: 'VP of Commercial & Enterprise Sales',
    starred: false,
    accessLevel: 'Manajemen',
    kpis: [
      { label: 'Pipeline Aktif', value: 'Rp 14,2 Milyar', change: '38 Prospek', isPositive: true },
      { label: 'Win Rate', value: '41.2%', change: '+3.5%', isPositive: true },
      { label: 'Rata-rata Deal Size', value: 'Rp 340 Juta', change: '+8.1%', isPositive: true }
    ],
    tags: ['Sales Pipeline', 'B2B', 'Deals', 'Account Executives'],
    executiveNote: 'Ada 4 penawaran enterprise bernilai >Rp 1 Milyar yang kini masuk tahap negosiasi akhir kontrak.',
    previewTable: {
      headers: ['Klien / Prospek', 'Nilai Potensial', 'Tahap / Tahapan', 'Probabilitas', 'PIC Sales', 'Target Closing'],
      rows: [
        { 'Klien / Prospek': 'PT Bank Mandiri Sejahtera', 'Nilai Potensial': 'Rp 1.450.000.000', 'Tahap / Tahapan': 'Legal & Kontrak', Probabilitas: '90%', 'PIC Sales': 'Budi Santoso', 'Target Closing': '28 Sept 2026' },
        { 'Klien / Prospek': 'Nusantara Logistics Group', 'Nilai Potensial': 'Rp 1.100.000.000', 'Tahap / Tahapan': 'Negosiasi Harga', Probabilitas: '75%', 'PIC Sales': 'Anita Wijaya', 'Target Closing': '05 Okt 2026' },
        { 'Klien / Prospek': 'Kalla Medika Hospital', 'Nilai Potensial': 'Rp 820.000.000', 'Tahap / Tahapan': 'Proposal Presentasi', Probabilitas: '50%', 'PIC Sales': 'Rian Pradipta', 'Target Closing': '14 Okt 2026' },
        { 'Klien / Prospek': 'Indo Retail Distribusi', 'Nilai Potensial': 'Rp 650.000.000', 'Tahap / Tahapan': 'Uji Coba POC', Probabilitas: '65%', 'PIC Sales': 'Budi Santoso', 'Target Closing': '20 Okt 2026' }
      ]
    }
  },
  {
    id: 'rep-004',
    title: 'Monitoring Ketersediaan Sistem & Server (Uptime APM)',
    department: 'Teknologi & IT',
    sourcePlatform: 'Grafana',
    sourceUrl: 'https://grafana.cloud-infra.id/d/uptime-core-services-latency',
    embedUrl: 'https://en.wikipedia.org/wiki/System_monitor',
    updateFrequency: 'Realtime',
    status: 'online',
    lastUpdated: '1 menit yang lalu',
    description: 'Pemantauan status infrastruktur cloud, latency database, utilisasi CPU/Memory cluster Kubernetes, dan riwayat incident response SLA.',
    pic: 'Agus Pratama, M.Kom.',
    picRole: 'Principal DevOps & Site Reliability Engineer',
    starred: true,
    accessLevel: 'Semua Karyawan',
    kpis: [
      { label: 'Uptime 30 Hari', value: '99.98%', change: 'SLA Terpenuhi', isPositive: true },
      { label: 'Rata-rata Latensi API', value: '48 ms', change: '-6 ms', isPositive: true },
      { label: 'Error Rate', value: '0.012%', change: 'Normal', isPositive: true }
    ],
    tags: ['Grafana', 'SRE', 'Kubernetes', 'Cloud Uptime'],
    executiveNote: 'Seluruh cluster database primer dan failover beroperasi stabil tanpa ada insiden kritis selama 45 hari berturut-turut.',
    previewTable: {
      headers: ['Nama Layanan', 'Region / Zona', 'Status', 'Uptime', 'Rata-rata Latensi', 'Kapasitas Memori'],
      rows: [
        { 'Nama Layanan': 'API Gateway Core', 'Region / Zona': 'Jakarta (asia-se1)', Status: 'Normal (Sehat)', Uptime: '100%', 'Rata-rata Latensi': '24 ms', 'Kapasitas Memori': '42%' },
        { 'Nama Layanan': 'PostgreSQL Master DB', 'Region / Zona': 'Jakarta (asia-se1)', Status: 'Normal (Sehat)', Uptime: '99.99%', 'Rata-rata Latensi': '12 ms', 'Kapasitas Memori': '68%' },
        { 'Nama Layanan': 'Elasticsearch Log Node', 'Region / Zona': 'Singapura (asia-se2)', Status: 'Normal (Sehat)', Uptime: '99.95%', 'Rata-rata Latensi': '65 ms', 'Kapasitas Memori': '74%' },
        { 'Nama Layanan': 'Redis Cache Cluster', 'Region / Zona': 'Jakarta (asia-se1)', Status: 'Normal (Sehat)', Uptime: '100%', 'Rata-rata Latensi': '4 ms', 'Kapasitas Memori': '35%' }
      ]
    }
  },
  {
    id: 'rep-005',
    title: 'Pelacakan Inventaris & Pengiriman Logistik Nasional',
    department: 'Operasional & Logistik',
    sourcePlatform: 'ERP Portal',
    sourceUrl: 'https://erp.perusahaan-induk.co.id/reports/warehouse-fulfillment-sla',
    embedUrl: 'https://en.wikipedia.org/wiki/Supply_chain_management',
    updateFrequency: 'Harian',
    status: 'online',
    lastUpdated: 'Hari ini, 06:00 WIB',
    description: 'Ringkasan stok barang di 5 hub regional, perputaran stok (inventory turnover), status fulfillment pesanan, dan rata-rata waktu kirim kurir.',
    pic: 'Bambang Sudirjo',
    picRole: 'Head of Logistics & Supply Chain',
    starred: false,
    accessLevel: 'Publik Internal',
    kpis: [
      { label: 'Ketepatan Waktu Kirim', value: '96.8%', change: '+1.2%', isPositive: true },
      { label: 'Stok Kritis / Minim', value: '3 SKU', change: 'Segera Restock', isPositive: false },
      { label: 'Volume Kirim Harian', value: '4.850 Koli', change: '+320 Koli', isPositive: true }
    ],
    tags: ['Logistik', 'Gudang', 'Fulfillment', 'ERP Sap'],
    executiveNote: 'Hub Cikarang & Surabaya mencatatkan efisiensi pick-and-pack tercepat dengan rata-rata 22 menit per dokumen.',
    previewTable: {
      headers: ['Hub Gudang', 'Pesanan Masuk', 'Terkirim Tepat Waktu', 'Pending Gudang', 'Tingkat Okupansi', 'Status'],
      rows: [
        { 'Hub Gudang': 'Hub Utama Cikarang Barat', 'Pesanan Masuk': '2.450 order', 'Terkirim Tepat Waktu': '98.2%', 'Pending Gudang': '42', 'Tingkat Okupansi': '81%', Status: 'Optimal' },
        { 'Hub Gudang': 'Hub Regional Surabaya Rungkut', 'Pesanan Masuk': '1.340 order', 'Terkirim Tepat Waktu': '96.5%', 'Pending Gudang': '35', 'Tingkat Okupansi': '74%', Status: 'Optimal' },
        { 'Hub Gudang': 'Hub Regional Medan Amplas', 'Pesanan Masuk': '620 order', 'Terkirim Tepat Waktu': '94.8%', 'Pending Gudang': '21', 'Tingkat Okupansi': '62%', Status: 'Siaga Cuaca' },
        { 'Hub Gudang': 'Hub Regional Makassar Maros', 'Pesanan Masuk': '440 order', 'Terkirim Tepat Waktu': '95.1%', 'Pending Gudang': '18', 'Tingkat Okupansi': '58%', Status: 'Optimal' }
      ]
    }
  },
  {
    id: 'rep-006',
    title: 'Rekapitulasi Kehadiran, Cuti & Kinerja SDM',
    department: 'SDM & Personalia',
    sourcePlatform: 'Google Sheets',
    sourceUrl: 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit',
    embedUrl: 'https://docs.google.com/spreadsheets/',
    updateFrequency: 'Harian',
    status: 'online',
    lastUpdated: 'Hari ini, 09:00 WIB',
    description: 'Data harian absensi karyawan kantor pusat dan cabang, pengajuan izin/cuti, rasio kehadiran tepat waktu, dan pengawasan lembur bulanan.',
    pic: 'Dewi Lestari, S.Psi., CHRP',
    picRole: 'Human Capital Operations Lead',
    starred: false,
    accessLevel: 'Konfidensial',
    kpis: [
      { label: 'Tingkat Kehadiran', value: '97.4%', change: '+0.8%', isPositive: true },
      { label: 'Total Karyawan Aktif', value: '418 Orang', change: '8 Rekrut Baru', isPositive: true },
      { label: 'Karyawan WFH / Remote', value: '64 Orang', change: 'Terjadwal', isPositive: true }
    ],
    tags: ['HRIS', 'Absensi', 'Google Sheets', 'Kepegawaian'],
    executiveNote: 'Penyelesaian evaluasi masa percobaan 8 karyawan baru berlangsung lancar dengan kepuasan tim rata-rata 4.7/5.0.',
    previewTable: {
      headers: ['Divisi / Departemen', 'Jumlah Karyawan', 'Hadir Kantor (WFO)', 'Kerja Remote (WFH)', 'Izin / Cuti', 'Ketepatan Waktu'],
      rows: [
        { 'Divisi / Departemen': 'Teknologi & Produk', 'Jumlah Karyawan': '124', 'Hadir Kantor (WFO)': '72', 'Kerja Remote (WFH)': '46', 'Izin / Cuti': '6', 'Ketepatan Waktu': '98.5%' },
        { 'Divisi / Departemen': 'Operasional & Logistik', 'Jumlah Karyawan': '142', 'Hadir Kantor (WFO)': '138', 'Kerja Remote (WFH)': '0', 'Izin / Cuti': '4', 'Ketepatan Waktu': '97.2%' },
        { 'Divisi / Departemen': 'Pemasaran & Sales', 'Jumlah Karyawan': '88', 'Hadir Kantor (WFO)': '70', 'Kerja Remote (WFH)': '14', 'Izin / Cuti': '4', 'Ketepatan Waktu': '96.8%' },
        { 'Divisi / Departemen': 'Keuangan & Legal', 'Jumlah Karyawan': '64', 'Hadir Kantor (WFO)': '58', 'Kerja Remote (WFH)': '4', 'Izin / Cuti': '2', 'Ketepatan Waktu': '99.1%' }
      ]
    }
  },
  {
    id: 'rep-007',
    title: 'Analisis Tiket Layanan & Kepuasan Pelanggan (CSAT)',
    department: 'Layanan Pelanggan',
    sourcePlatform: 'Tableau',
    sourceUrl: 'https://public.tableau.com/views/CustomerServiceAnalyticsDashboard2026',
    embedUrl: 'https://en.wikipedia.org/wiki/Customer_satisfaction',
    updateFrequency: 'Mingguan',
    status: 'online',
    lastUpdated: 'Kemarin, 16:45 WIB',
    description: 'Volume tiket bantuan keluhan pelanggan dari Helpdesk, First Response Time (FRT), waktu penyelesaian masalah (Resolution Time), dan skor CSAT/NPS.',
    pic: 'Kevin Ardiansyah',
    picRole: 'Customer Experience & Quality Manager',
    starred: true,
    accessLevel: 'Publik Internal',
    kpis: [
      { label: 'Skor CSAT', value: '4.85 / 5.0', change: '+0.12', isPositive: true },
      { label: 'First Response Time', value: '4.2 Menit', change: '-1.1 m', isPositive: true },
      { label: 'Tiket Terselesaikan', value: '1.240 / 1.285', change: '96.5%', isPositive: true }
    ],
    tags: ['Zendesk', 'CSAT', 'Customer Service', 'Helpdesk'],
    executiveNote: 'Implementasi quick response bot AI berhasil mempercepat First Response Time dari 8 menit menjadi 4.2 menit.',
    previewTable: {
      headers: ['Kategori Tiket', 'Jumlah Tiket Masuk', 'Terselesaikan', 'Dalam Proses', 'Rata-rata Waktu Tanggap', 'Skor Kepuasan'],
      rows: [
        { 'Kategori Tiket': 'Kendala Akun & Login', 'Jumlah Tiket Masuk': '420', Terselesaikan: '412', 'Dalam Proses': '8', 'Rata-rata Waktu Tanggap': '2.4 m', 'Skor Kepuasan': '4.9 / 5.0' },
        { 'Kategori Tiket': 'Pertanyaan Penagihan / Invoice', 'Jumlah Tiket Masuk': '315', Terselesaikan: '308', 'Dalam Proses': '7', 'Rata-rata Waktu Tanggap': '4.8 m', 'Skor Kepuasan': '4.8 / 5.0' },
        { 'Kategori Tiket': 'Permintaan Fitur Baru', 'Jumlah Tiket Masuk': '180', Terselesaikan: '150', 'Dalam Proses': '30', 'Rata-rata Waktu Tanggap': '12.0 m', 'Skor Kepuasan': '4.7 / 5.0' },
        { 'Kategori Tiket': 'Integrasi Web & API Teknis', 'Jumlah Tiket Masuk': '370', Terselesaikan: '355', 'Dalam Proses': '15', 'Rata-rata Waktu Tanggap': '5.1 m', 'Skor Kepuasan': '4.8 / 5.0' }
      ]
    }
  },
  {
    id: 'rep-008',
    title: 'Audit Kepatuhan Pajak & Legalitas Perizinan Usaha',
    department: 'Keuangan & Akuntansi',
    sourcePlatform: 'Web Custom',
    sourceUrl: 'https://djp-online-portal.pajak.go.id/corporate/rekapitulasi-ppn-pph',
    embedUrl: 'https://en.wikipedia.org/wiki/Tax',
    updateFrequency: 'Bulanan',
    status: 'scheduled',
    lastUpdated: '3 hari yang lalu',
    description: 'Status pelaporan SPT Masa PPh 21, PPh 23, PPN, rekonsiliasi e-Faktur pajak masukan dan keluaran, serta monitoring masa berlaku perizinan usaha OSS.',
    pic: 'Maya Indrayani, S.H., M.Kn.',
    picRole: 'Corporate Legal & Tax Compliance Head',
    starred: false,
    accessLevel: 'Konfidensial',
    kpis: [
      { label: 'Status SPT Terakhir', value: 'Nihil / Lapor Tepat', change: '100% On-time', isPositive: true },
      { label: 'Total Rekonsiliasi PPN', value: 'Rp 482 Juta', change: 'Sesuai Ledger', isPositive: true },
      { label: 'Izin Usaha Aktif', value: '24 Dokumen', change: 'Valid', isPositive: true }
    ],
    tags: ['Pajak', 'Legal', 'DJP', 'Kepatuhan'],
    executiveNote: 'Seluruh kewajiban pelaporan pajak masa bulan sebelumnya telah terbit Bukti Penerimaan Elektronik (BPE).',
    previewTable: {
      headers: ['Jenis Pajak / Izin', 'Masa Pajak', 'Batas Waktu', 'Tanggal Pelaporan', 'Nomor Tanda Terima / BPE', 'Status'],
      rows: [
        { 'Jenis Pajak / Izin': 'SPT Masa PPh 21 Karyawan', 'Masa Pajak': 'Agustus 2026', 'Batas Waktu': '20 Sept 2026', 'Tanggal Pelaporan': '14 Sept 2026', 'Nomor Tanda Terima / BPE': 'BPE-20260914-00291', Status: 'Selesai' },
        { 'Jenis Pajak / Izin': 'SPT Masa PPh 23 Jasa', 'Masa Pajak': 'Agustus 2026', 'Batas Waktu': '20 Sept 2026', 'Tanggal Pelaporan': '14 Sept 2026', 'Nomor Tanda Terima / BPE': 'BPE-20260914-00305', Status: 'Selesai' },
        { 'Jenis Pajak / Izin': 'SPT Masa PPN 11%', 'Masa Pajak': 'Agustus 2026', 'Batas Waktu': '30 Sept 2026', 'Tanggal Pelaporan': '15 Sept 2026', 'Nomor Tanda Terima / BPE': 'BPE-20260915-00118', Status: 'Selesai' },
        { 'Jenis Pajak / Izin': 'Izin Operasional OSS RBA', 'Masa Pajak': 'Tahun 2026-2029', 'Batas Waktu': '31 Des 2029', 'Tanggal Pelaporan': '10 Jan 2026', 'Nomor Tanda Terima / BPE': 'NIB-91200088192', Status: 'Berlaku' }
      ]
    }
  }
];

export const DEPARTMENTS = [
  'Semua',
  'Keuangan & Akuntansi',
  'Pemasaran & Digital',
  'Penjualan & CRM',
  'Operasional & Logistik',
  'SDM & Personalia',
  'Teknologi & IT',
  'Layanan Pelanggan'
] as const;

export const PLATFORMS = [
  'Semua Platform',
  'Power BI',
  'Looker Studio',
  'Tableau',
  'Metabase',
  'Google Sheets',
  'Grafana',
  'ERP Portal',
  'Web Custom'
] as const;
