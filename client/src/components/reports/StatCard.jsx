import React from 'react';
import {
  FiArrowDownRight,
  FiArrowRight,
  FiArrowUpRight,
} from 'react-icons/fi';

const themes = {
  blue: {
    card: 'from-sky-500/15 via-white to-sky-50 border-sky-100',
    halo: 'bg-sky-500/10',
    icon: 'from-sky-500 to-cyan-500 text-white shadow-sky-200',
    trend: {
      up: 'text-emerald-600 bg-emerald-50',
      down: 'text-rose-600 bg-rose-50',
      neutral: 'text-slate-600 bg-slate-100',
    },
  },
  green: {
    card: 'from-emerald-500/15 via-white to-emerald-50 border-emerald-100',
    halo: 'bg-emerald-500/10',
    icon: 'from-emerald-500 to-lime-500 text-white shadow-emerald-200',
    trend: {
      up: 'text-emerald-600 bg-emerald-50',
      down: 'text-rose-600 bg-rose-50',
      neutral: 'text-slate-600 bg-slate-100',
    },
  },
  purple: {
    card: 'from-violet-500/15 via-white to-fuchsia-50 border-violet-100',
    halo: 'bg-violet-500/10',
    icon: 'from-violet-500 to-fuchsia-500 text-white shadow-violet-200',
    trend: {
      up: 'text-emerald-600 bg-emerald-50',
      down: 'text-rose-600 bg-rose-50',
      neutral: 'text-slate-600 bg-slate-100',
    },
  },
  amber: {
    card: 'from-amber-500/15 via-white to-orange-50 border-amber-100',
    halo: 'bg-amber-500/10',
    icon: 'from-amber-500 to-orange-500 text-white shadow-amber-200',
    trend: {
      up: 'text-emerald-600 bg-emerald-50',
      down: 'text-rose-600 bg-rose-50',
      neutral: 'text-slate-600 bg-slate-100',
    },
  },
};

const trendIcons = {
  up: FiArrowUpRight,
  down: FiArrowDownRight,
  neutral: FiArrowRight,
};

const StatCard = ({
  title,
  value,
  icon,
  trend,
  trendDirection = 'up',
  theme = 'blue',
  subtitle,
  onClick,
}) => {
  const palette = themes[theme] || themes.blue;
  const TrendIcon = trendIcons[trendDirection] || FiArrowRight;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative overflow-hidden rounded-[24px] border bg-gradient-to-br p-6 text-left shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_-30px_rgba(15,23,42,0.45)] ${
        palette.card
      } ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
    >
      <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl ${palette.halo}`} />

      <div className="relative flex items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="text-sm font-medium tracking-wide text-slate-500">{title}</p>
          <div>
            <p className="text-3xl font-bold tracking-tight text-slate-900">{value}</p>
            {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
          </div>
          {trend && (
            <span
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${palette.trend[trendDirection]}`}
            >
              <TrendIcon className="text-sm" />
              {trend}
            </span>
          )}
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl shadow-lg transition duration-300 group-hover:scale-105 ${palette.icon}`}
        >
          {icon}
        </div>
      </div>
    </button>
  );
};

export default StatCard;
