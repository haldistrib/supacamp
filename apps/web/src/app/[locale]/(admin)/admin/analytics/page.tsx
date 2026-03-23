'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardContent, Select } from '@/components/ui';

// TODO: Replace with real aggregated data from Supabase analytics_events table
const mockAnalytics = {
  last7Days: { pageViews: 12450, signups: 89, challengesCompleted: 156 },
  last30Days: { pageViews: 48200, signups: 312, challengesCompleted: 621 },
  allTime: { pageViews: 245000, signups: 1247, challengesCompleted: 3890 },
};

type PeriodKey = keyof typeof mockAnalytics;

const metricConfig = [
  { key: 'pageViews' as const, color: 'bg-primary-100 text-primary-500', barColor: 'bg-primary-400' },
  { key: 'signups' as const, color: 'bg-secondary-100 text-secondary-500', barColor: 'bg-secondary-400' },
  { key: 'challengesCompleted' as const, color: 'bg-tertiary-100 text-tertiary-400', barColor: 'bg-tertiary-300' },
];

// Mock chart data (bar heights as percentages)
const mockChartData = [
  { label: 'Mon', pageViews: 65, signups: 40, challenges: 55 },
  { label: 'Tue', pageViews: 75, signups: 55, challenges: 45 },
  { label: 'Wed', pageViews: 80, signups: 35, challenges: 70 },
  { label: 'Thu', pageViews: 60, signups: 65, challenges: 50 },
  { label: 'Fri', pageViews: 90, signups: 50, challenges: 85 },
  { label: 'Sat', pageViews: 100, signups: 80, challenges: 95 },
  { label: 'Sun', pageViews: 85, signups: 70, challenges: 75 },
];

export default function AdminAnalyticsPage() {
  const t = useTranslations('admin.analytics');
  const [period, setPeriod] = useState<PeriodKey>('last7Days');

  const data = mockAnalytics[period];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="font-heading text-3xl text-ink-900">{t('title')}</h1>
        <div className="w-full sm:w-48">
          <Select
            label={t('period')}
            value={period}
            onChange={(e) => setPeriod(e.target.value as PeriodKey)}
          >
            <option value="last7Days">{t('last7Days')}</option>
            <option value="last30Days">{t('last30Days')}</option>
            <option value="allTime">{t('allTime')}</option>
          </Select>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {metricConfig.map((metric) => (
          <Card key={metric.key} variant="paper">
            <CardContent>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${metric.color}`}>
                {metric.key === 'pageViews' && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
                {metric.key === 'signups' && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                )}
                {metric.key === 'challengesCompleted' && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <p className="text-sm text-ink-500 font-heading">{t(metric.key)}</p>
              <p className="font-heading text-3xl text-ink-900 mt-1">
                {data[metric.key].toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bar Chart (CSS-based placeholder) */}
      <Card variant="notebook">
        <CardHeader>
          <CardTitle>Weekly Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 h-48">
            {mockChartData.map((day) => (
              <div key={day.label} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-0.5 items-end" style={{ height: '160px' }}>
                  <div
                    className="flex-1 bg-primary-400 rounded-t-sm transition-all duration-500"
                    style={{ height: `${day.pageViews}%` }}
                    title={`Page Views: ${day.pageViews}%`}
                  />
                  <div
                    className="flex-1 bg-secondary-400 rounded-t-sm transition-all duration-500"
                    style={{ height: `${day.signups}%` }}
                    title={`Signups: ${day.signups}%`}
                  />
                  <div
                    className="flex-1 bg-tertiary-300 rounded-t-sm transition-all duration-500"
                    style={{ height: `${day.challenges}%` }}
                    title={`Challenges: ${day.challenges}%`}
                  />
                </div>
                <span className="text-xs text-ink-400 font-heading">{day.label}</span>
              </div>
            ))}
          </div>
          {/* Legend */}
          <div className="flex gap-4 mt-4 justify-center">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-primary-400" />
              <span className="text-xs text-ink-500">{t('pageViews')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-secondary-400" />
              <span className="text-xs text-ink-500">{t('signups')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-tertiary-300" />
              <span className="text-xs text-ink-500">{t('challengesCompleted')}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
