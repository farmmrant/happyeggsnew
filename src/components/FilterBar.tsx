import { 
  Search, 
  Filter, 
  LayoutGrid, 
  Table as TableIcon, 
  Star, 
  X,
  SlidersHorizontal
} from 'lucide-react';
import { Department, FilterState } from '../types';
import { DEPARTMENTS, PLATFORMS } from '../data/defaultReports';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  viewMode: 'grid' | 'table';
  onViewModeChange: (mode: 'grid' | 'table') => void;
  totalResults: number;
}

export const FilterBar = ({
  filters,
  onFilterChange,
  viewMode,
  onViewModeChange,
  totalResults
}: FilterBarProps) => {

  const handleSearchChange = (value: string) => {
    onFilterChange({ ...filters, search: value });
  };

  const handleDepartmentChange = (dept: Department) => {
    onFilterChange({ ...filters, department: dept });
  };

  const handlePlatformChange = (platform: string) => {
    onFilterChange({ ...filters, platform });
  };

  const handleStatusChange = (status: string) => {
    onFilterChange({ ...filters, status });
  };

  const toggleStarred = () => {
    onFilterChange({ ...filters, onlyStarred: !filters.onlyStarred });
  };

  const clearFilters = () => {
    onFilterChange({
      search: '',
      department: 'Semua',
      platform: 'Semua Platform',
      status: 'all',
      onlyStarred: false,
      sortBy: 'latest'
    });
  };

  const hasActiveFilters = 
    filters.search !== '' || 
    filters.department !== 'Semua' || 
    filters.platform !== 'Semua Platform' || 
    filters.status !== 'all' || 
    filters.onlyStarred;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[240px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            id="input-search-reports"
            type="text"
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Cari judul laporan, sumber web, nama PIC, atau tag..."
            className="w-full pl-9 pr-8 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-sm text-slate-800 placeholder-slate-400 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          {filters.search && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dropdown Filters & Controls */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Platform Selector */}
          <div className="relative">
            <select
              id="select-platform-filter"
              value={filters.platform}
              onChange={(e) => handlePlatformChange(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-lg pl-3 pr-8 py-2 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {PLATFORMS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-400">
              <Filter className="w-3 h-3" />
            </div>
          </div>

          {/* Status Selector */}
          <select
            id="select-status-filter"
            value={filters.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-lg px-3 py-2 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">Semua Status</option>
            <option value="online">Online / Aktif</option>
            <option value="syncing">Sedang Sinkronisasi</option>
            <option value="scheduled">Terjadwal</option>
            <option value="maintenance">Pemeliharaan</option>
          </select>

          {/* Starred Toggle */}
          <button
            id="btn-filter-starred"
            onClick={toggleStarred}
            className={`inline-flex items-center space-x-1.5 text-xs font-medium px-3 py-2 rounded-lg border transition cursor-pointer ${
              filters.onlyStarred
                ? 'bg-amber-50 text-amber-800 border-amber-300 font-semibold'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${filters.onlyStarred ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
            <span>Favorit</span>
          </button>

          {/* Sort Selector */}
          <select
            id="select-sort-reports"
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as any })}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-lg px-2.5 py-2 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="latest">Urut: Terbaru</option>
            <option value="title">Urut: Nama (A-Z)</option>
            <option value="department">Urut: Departemen</option>
          </select>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center space-x-1 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2 py-1.5 rounded transition cursor-pointer"
              title="Bersihkan semua filter"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          {/* View Mode Switch (Grid vs Table) */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 ml-auto sm:ml-0">
            <button
              id="btn-view-grid"
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-md text-xs font-medium transition cursor-pointer ${
                viewMode === 'grid' 
                  ? 'bg-white text-blue-600 shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Tampilan Kartu (Grid)"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              id="btn-view-table"
              onClick={() => onViewModeChange('table')}
              className={`p-1.5 rounded-md text-xs font-medium transition cursor-pointer ${
                viewMode === 'table' 
                  ? 'bg-white text-blue-600 shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Tampilan Tabel (Rinci)"
            >
              <TableIcon className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Department Tabs Bar */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-thin text-xs">
          <span className="text-slate-400 text-xs font-medium mr-1 flex items-center">
            <SlidersHorizontal className="w-3 h-3 mr-1" /> Kategori:
          </span>
          {DEPARTMENTS.map((dept) => {
            const isActive = filters.department === dept;
            return (
              <button
                key={dept}
                onClick={() => handleDepartmentChange(dept)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {dept}
              </button>
            );
          })}
        </div>

        <div className="text-xs text-slate-500 whitespace-nowrap pl-2 font-medium">
          Ditemukan <strong className="text-slate-800">{totalResults}</strong> laporan
        </div>
      </div>

    </div>
  );
};
