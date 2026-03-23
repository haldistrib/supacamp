'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui';

// TODO: Replace with real aggregated data from Supabase
const mockMetrics = {
  totalUsers: 1247,
  totalTeams: 312,
  totalChallenges: 48,
  pendingModeration: 7,
};

const metricConfig = [
  { key: 'totalUsers' as const, icon: '👥', color: 'bg-primary-100 text-primary-500' },
  { key: 'totalTeams' as const, icon: '🏆', color: 'bg-secondary-100 text-secondary-500' },
  { key: 'totalChallenges' as const, icon: '⭐', color: 'bg-tertiary-100 text-tertiary-400' },
  { key: 'pendingModeration' as const, icon: '🛡️', color: 'bg-accent-100 text-accent-400' },
];

export default function AdminDashboardPage() {
  const t = useTranslations('admin.dashboard');

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="font-heading text-3xl text-ink-900">{t('title')}</h1>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricConfig.map((metric) => (
          <Card key={metric.key} variant="paper">
            <CardContent>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${metric.color}`}>
                  {metric.icon}
                </div>
                <div>
                  <p className="text-sm text-ink-500 font-heading">{t(metric.key)}</p>
                  <p className="font-heading text-3xl text-ink-900">
                    {mockMetrics[metric.key].toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions / Recent Activity placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="notebook">
          <CardContent>
            <h2 className="font-heading text-xl text-ink-900 mb-4">Recent Activity</h2>
            {/* TODO: Fetch recent admin_audit_log entries */}
            <div className="space-y-3">
              {[
                { action: 'Challenge approved', resource: 'Mountain Hike', time: '2 hours ago' },
                { action: 'Video moderated', resource: 'Team Relay clip', time: '4 hours ago' },
                { action: 'User flagged', resource: 'user#4521', time: '1 day ago' },
                { action: 'Challenge created', resource: 'River Crossing', time: '2 days ago' },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-paper-warm">
                  <div>
                    <p className="font-heading font-bold text-ink-900 text-sm">{activity.action}</p>
                    <p className="text-xs text-ink-500">{activity.resource}</p>
                  </div>
                  <span className="text-xs text-ink-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card variant="folded">
          <CardContent>
            <h2 className="font-heading text-xl text-ink-900 mb-4">Quick Stats</h2>
            {/* TODO: Fetch aggregated analytics */}
            <div className="space-y-4">
              {[
                { label: 'New signups today', value: 23 },
                { label: 'Videos processed today', value: 18 },
                { label: 'Challenges completed today', value: 41 },
                { label: 'Active teams this week', value: 156 },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <span className="text-sm text-ink-600">{stat.label}</span>
                  <span className="font-heading font-bold text-ink-900">{stat.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
