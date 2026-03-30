import React from 'react';
import { FiArrowRight, FiDownload, FiRefreshCw } from 'react-icons/fi';

const gradientThemes = {
  green: 'from-emerald-500 via-green-500 to-lime-500',
  purple: 'from-violet-500 via-purple-500 to-fuchsia-500',
  blue: 'from-sky-500 via-blue-500 to-cyan-500',
};

const ChartCard = ({
  title,
  subtitle,
  updatedAt,
  theme = 'blue',
  loading = false,
  hasData = true,
  emptyMessage = 'No data available',
  onViewDetails,
  onDownload,
  children,
}) => {
  return (
    <section className="overflow-hidden rounded-[28px] border border-white/60 bg-white/75 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.45)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_-32px_rgba(15,23,42,0.52)]">
      <div className={`bg-gradient-to-r ${gradientThemes[theme] || gradientThemes.blue} px-6 py-5 text-white`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-lg font-semibold tracking-tight">{title}</p>
            {subtitle && <p className="mt-1 text-sm text-white/80">{subtitle}</p>}
          </div>
          <div className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90">
            Analytics
          </div>
        </div>
      </div>

      <div className="px-6 py-5">
        <div className="mb-5 flex items-center justify-between gap-3 text-sm text-slate-500">
          <span className="inline-flex items-center gap-2">
            <FiRefreshCw className="text-slate-400" />
            Last updated {updatedAt}
          </span>
        </div>

        {loading ? (
          <div className="space-y-4">
            <div className="h-4 w-40 animate-pulse rounded-full bg-slate-200" />
            <div className="h-64 animate-pulse rounded-[22px] bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100" />
          </div>
        ) : hasData ? (
          <div className="h-72">{children}</div>
        ) : (
          <div className="flex h-72 items-center justify-center rounded-[22px] border border-dashed border-slate-200 bg-slate-50/80 px-6 text-center">
            <div>
              <p className="text-base font-semibold text-slate-700">{emptyMessage}</p>
              <p className="mt-2 text-sm text-slate-500">Connect live records or adjust filters to populate this chart.</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/80 px-6 py-4">
        <button
          type="button"
          onClick={onViewDetails}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
        >
          <FiArrowRight />
          View Details
        </button>
        <button
          type="button"
          onClick={onDownload}
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <FiDownload />
          Download
        </button>
      </div>
    </section>
  );
};

export default ChartCard;
