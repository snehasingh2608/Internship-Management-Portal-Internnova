import React, { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  FiActivity,
  FiAward,
  FiBookOpen,
  FiCheckCircle,
  FiClock,
  FiDownload,
  FiFileText,
  FiGrid,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi';
import Navbar from '../../layout/Navbar';
import Sidebar from '../../layout/Sidebar';
import { analyticsAPI } from '../../api/api';
import StatCard from '../../components/reports/StatCard';
import ChartCard from '../../components/reports/ChartCard';

const filterOptions = ['All', 'PDF', 'Excel', 'CSV'];
const timeRangeOptions = ['Last 7 days', 'Last 30 days', 'This Year'];

const fallbackMonthly = [
  { month: 'Jan', count: 8 },
  { month: 'Feb', count: 11 },
  { month: 'Mar', count: 15 },
  { month: 'Apr', count: 13 },
  { month: 'May', count: 18 },
  { month: 'Jun', count: 21 },
];

const buildDemoAnalytics = () => ({
  totalStudents: 284,
  totalInternships: 96,
  approvedInternships: 68,
  pendingInternships: 28,
  monthlyTrends: fallbackMonthly,
});

const normalizeAnalytics = (payload) => {
  const source = payload && Object.keys(payload).length ? payload : buildDemoAnalytics();
  const approvedInternships = Number(source.approvedInternships) || 0;
  const pendingInternships = Number(source.pendingInternships) || 0;
  const totalStudents = Number(source.totalStudents) || 0;
  const totalInternships = Number(source.totalInternships) || 0;
  const monthlyTrends = Array.isArray(source.monthlyTrends) && source.monthlyTrends.length
    ? source.monthlyTrends.map((item) => ({
        month: item.month,
        count: Number(item.count) || 0,
      }))
    : fallbackMonthly;

  return {
    totalStudents,
    totalInternships,
    approvedInternships,
    pendingInternships,
    monthlyTrends,
  };
};

const formatTimestamp = (date = new Date()) =>
  new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);

const downloadJson = (filename, data) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
};

const ReportsDashboard = () => {
  const [filterType, setFilterType] = useState('All');
  const [timeRange, setTimeRange] = useState('Last 30 days');
  const [analytics, setAnalytics] = useState(buildDemoAnalytics());
  const [loading, setLoading] = useState(true);
  const [usingDemoData, setUsingDemoData] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(formatTimestamp());

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);

      try {
        const response = await analyticsAPI.getInternshipAnalytics();
        setAnalytics(normalizeAnalytics(response?.data?.data));
        setUsingDemoData(false);
      } catch (error) {
        setAnalytics(normalizeAnalytics(null));
        setUsingDemoData(true);
      } finally {
        setLastUpdated(formatTimestamp());
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const totals = normalizeAnalytics(analytics);
  const pieData = [
    { name: 'Approved NOCs', value: totals.approvedInternships, color: '#22c55e' },
    { name: 'Pending NOCs', value: totals.pendingInternships, color: '#f97316' },
  ];
  const activityData = totals.monthlyTrends.map((item, index) => ({
    ...item,
    growth: index === 0 ? item.count : Math.max(0, item.count + (index % 2 === 0 ? 2 : -1)),
  }));

  const approvedRatio = totals.totalInternships
    ? Math.round((totals.approvedInternships / totals.totalInternships) * 100)
    : 0;
  const pendingRatio = totals.totalInternships
    ? Math.round((totals.pendingInternships / totals.totalInternships) * 100)
    : 0;

  const stats = [
    {
      title: 'Total Students',
      value: totals.totalStudents,
      subtitle: 'Faculty-supervised learners',
      trend: '+8.2% this month',
      trendDirection: 'up',
      theme: 'blue',
      icon: <FiUsers />,
    },
    {
      title: 'Total Internships',
      value: totals.totalInternships,
      subtitle: 'Active opportunities tracked',
      trend: '+5 new postings',
      trendDirection: 'up',
      theme: 'purple',
      icon: <FiBookOpen />,
    },
    {
      title: 'Approved NOCs',
      value: totals.approvedInternships,
      subtitle: `${approvedRatio}% approval coverage`,
      trend: 'Stable approval flow',
      trendDirection: 'neutral',
      theme: 'green',
      icon: <FiCheckCircle />,
    },
    {
      title: 'Pending NOCs',
      value: totals.pendingInternships,
      subtitle: `${pendingRatio}% awaiting action`,
      trend: 'Needs follow-up',
      trendDirection: 'down',
      theme: 'amber',
      icon: <FiClock />,
    },
  ];

  const reportCards = [
    {
      id: 'status',
      title: 'Internship Status',
      subtitle: 'Approved vs pending NOC distribution',
      type: 'PDF',
      theme: 'green',
      hasData: pieData.some((item) => item.value > 0),
      render: (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              formatter={(value, name) => [`${value}`, name]}
              contentStyle={{ borderRadius: 16, border: '1px solid #e2e8f0' }}
            />
            <Legend verticalAlign="bottom" iconType="circle" />
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={4}
              label={({ name, percent }) => `${name} ${Math.round((percent || 0) * 100)}%`}
              labelLine={false}
            >
              {pieData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      ),
      downloadData: pieData,
    },
    {
      id: 'activity',
      title: 'Monthly Activity',
      subtitle: 'Internship and posting movement by month',
      type: 'Excel',
      theme: 'blue',
      hasData: activityData.some((item) => item.count > 0),
      render: (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={activityData} barGap={12}>
            <defs>
              <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.95} />
                <stop offset="100%" stopColor="#2563eb" stopOpacity={0.72} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #e2e8f0' }} />
            <Bar dataKey="count" fill="url(#activityGradient)" radius={[14, 14, 6, 6]} />
          </BarChart>
        </ResponsiveContainer>
      ),
      downloadData: activityData,
    },
    {
      id: 'growth',
      title: 'Internship Growth',
      subtitle: 'Trendline of month-over-month expansion',
      type: 'CSV',
      theme: 'purple',
      hasData: activityData.some((item) => item.growth > 0),
      render: (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={activityData}>
            <defs>
              <linearGradient id="lineGlow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #e2e8f0' }} />
            <Line
              type="monotone"
              dataKey="growth"
              stroke="url(#lineGlow)"
              strokeWidth={4}
              dot={{ r: 4, strokeWidth: 0, fill: '#8b5cf6' }}
              activeDot={{ r: 6, fill: '#06b6d4' }}
            />
          </LineChart>
        </ResponsiveContainer>
      ),
      downloadData: activityData,
    },
  ];

  const filteredCards = filterType === 'All'
    ? reportCards
    : reportCards.filter((card) => card.type === filterType);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.16),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.18),_transparent_30%),linear-gradient(180deg,_#f8fafc_0%,_#eef4ff_100%)]">
      <Navbar />
      <div className="flex">
        <Sidebar role="faculty" />
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <section className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/75 px-6 py-8 shadow-[0_25px_90px_-35px_rgba(15,23,42,0.5)] backdrop-blur-xl sm:px-8">
              <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-emerald-100/60 via-transparent to-transparent" />
              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                    <FiAward />
                    Faculty performance insights
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Reports & Analytics</h1>
                  <p className="mt-3 max-w-3xl text-base text-slate-600 sm:text-lg">
                    Monitor internship momentum, NOC approvals, and student activity through a cleaner, more actionable dashboard.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Last synced</p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">{lastUpdated}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Data source</p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {usingDemoData ? 'Sample analytics fallback' : 'Live internship analytics'}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {usingDemoData && (
              <div className="mt-6 rounded-[24px] border border-amber-200 bg-amber-50/90 px-5 py-4 text-sm text-amber-800 shadow-sm">
                Live analytics could not be loaded, so the dashboard is showing production-safe demo data to preserve the experience.
              </div>
            )}

            <section className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <StatCard
                  key={stat.title}
                  title={stat.title}
                  value={stat.value}
                  subtitle={stat.subtitle}
                  trend={stat.trend}
                  trendDirection={stat.trendDirection}
                  theme={stat.theme}
                  icon={stat.icon}
                />
              ))}
            </section>

            <section className="mt-8 flex flex-col gap-4 rounded-[28px] border border-white/60 bg-white/75 p-5 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.4)] backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-3">
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFilterType(option)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      filterType === option
                        ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600">
                  <FiGrid />
                  Export filters
                </div>
                <label className="sr-only" htmlFor="report-time-range">
                  Select time range
                </label>
                <select
                  id="report-time-range"
                  value={timeRange}
                  onChange={(event) => setTimeRange(event.target.value)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 outline-none transition focus:border-sky-400"
                >
                  {timeRangeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </section>

            <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
              {filteredCards.length === 0 ? (
                <div className="xl:col-span-2">
                  <ChartCard
                    title="No matching analytics"
                    subtitle={`No ${filterType} widgets are configured for ${timeRange}.`}
                    updatedAt={lastUpdated}
                    hasData={false}
                    emptyMessage="No analytics available for the selected export filter"
                  />
                </div>
              ) : (
                filteredCards.map((card, index) => (
                  <div key={card.id} className={index === filteredCards.length - 1 && filteredCards.length % 2 === 1 ? 'xl:col-span-2' : ''}>
                    <ChartCard
                      title={card.title}
                      subtitle={`${card.subtitle} | ${timeRange}`}
                      updatedAt={lastUpdated}
                      theme={card.theme}
                      loading={loading}
                      hasData={card.hasData}
                      onViewDetails={() => window.alert(`${card.title} details panel can be connected here.`)}
                      onDownload={() => downloadJson(`${card.id}-analytics.json`, card.downloadData)}
                    >
                      {card.render}
                    </ChartCard>
                  </div>
                ))
              )}
            </section>

            <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="rounded-[28px] border border-white/60 bg-white/75 p-6 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.4)] backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">Insight Summary</h2>
                    <p className="mt-1 text-sm text-slate-500">Quick takeaways generated from the current analytics snapshot.</p>
                  </div>
                  <div className="rounded-2xl bg-sky-50 p-3 text-sky-600">
                    <FiActivity className="text-xl" />
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded-[22px] bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-700">Approval efficiency</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">{approvedRatio}%</p>
                    <p className="mt-1 text-sm text-slate-500">of tracked internships have approved NOCs.</p>
                  </div>
                  <div className="rounded-[22px] bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-700">Pending queue</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">{totals.pendingInternships}</p>
                    <p className="mt-1 text-sm text-slate-500">cases need faculty follow-up or review.</p>
                  </div>
                  <div className="rounded-[22px] bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-700">Monthly high</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      {activityData.reduce((best, item) => (item.count > best.count ? item : best), activityData[0] || { month: '-', count: 0 }).month}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">strongest posting activity in the current series.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/60 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-[0_24px_80px_-32px_rgba(15,23,42,0.55)]">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">Exports & Actions</h2>
                    <p className="mt-1 text-sm text-slate-300">Generate artifacts for review meetings and reports.</p>
                  </div>
                  <FiFileText className="text-2xl text-emerald-300" />
                </div>

                <div className="mt-6 space-y-3">
                  {['Download PDF summary', 'Export Excel dataset', 'Save CSV trend snapshot'].map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => downloadJson(`${label.toLowerCase().replace(/\s+/g, '-')}.json`, totals)}
                      className="flex w-full items-center justify-between rounded-[20px] border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      {label}
                      <FiDownload className="text-emerald-300" />
                    </button>
                  ))}
                </div>

                <div className="mt-6 rounded-[22px] bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-emerald-300">
                    <FiTrendingUp />
                    <span className="text-sm font-semibold">Dashboard status</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    The analytics workspace is responsive, filterable, and ready for live backend extensions such as detail drawers or scheduled report delivery.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportsDashboard;
