'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, Badge, Input } from '@/components/ui';
import { useState } from 'react';

// TODO: Replace with real data fetching from Supabase profiles + user_roles tables
const mockUsers = [
  { id: '1', displayName: 'Explorer42', email: 'parent1@example.com', status: 'active', role: 'user', joinedAt: '2024-01-05', lastActiveAt: '2 hours ago' },
  { id: '2', displayName: 'StarRunner', email: 'parent2@example.com', status: 'active', role: 'user', joinedAt: '2024-01-08', lastActiveAt: '1 day ago' },
  { id: '3', displayName: 'NaturePal', email: 'parent3@example.com', status: 'active', role: 'user', joinedAt: '2024-01-10', lastActiveAt: '3 hours ago' },
  { id: '4', displayName: 'SpeedDemon', email: 'parent4@example.com', status: 'inactive', role: 'user', joinedAt: '2024-01-12', lastActiveAt: '2 weeks ago' },
  { id: '5', displayName: 'WaveMaker', email: 'parent5@example.com', status: 'active', role: 'admin', joinedAt: '2023-12-01', lastActiveAt: '1 hour ago' },
  { id: '6', displayName: 'CloudHopper', email: 'parent6@example.com', status: 'active', role: 'user', joinedAt: '2024-01-20', lastActiveAt: '5 hours ago' },
];

export default function AdminUsersPage() {
  const t = useTranslations('admin.users');
  const tCommon = useTranslations('common');
  const [search, setSearch] = useState('');

  const filtered = mockUsers.filter(
    (u) =>
      u.displayName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="font-heading text-3xl text-ink-900">{t('title')}</h1>

      {/* Search */}
      <div className="max-w-sm">
        <Input
          placeholder={tCommon('search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Users table */}
      <Card variant="notebook">
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-ink-200">
                  <th className="text-left py-3 px-4 font-heading text-sm text-ink-500">{t('name')}</th>
                  <th className="text-left py-3 px-4 font-heading text-sm text-ink-500 hidden sm:table-cell">{t('email')}</th>
                  <th className="text-left py-3 px-4 font-heading text-sm text-ink-500 hidden md:table-cell">Role</th>
                  <th className="text-left py-3 px-4 font-heading text-sm text-ink-500">{t('status')}</th>
                  <th className="text-left py-3 px-4 font-heading text-sm text-ink-500 hidden lg:table-cell">{t('joined')}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr key={user.id} className="border-b border-ink-100 hover:bg-paper-warm transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-sm font-heading font-bold text-primary-500">
                          {user.displayName.charAt(0)}
                        </div>
                        <span className="font-heading font-bold text-ink-900">{user.displayName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell">
                      <span className="text-sm text-ink-600">{user.email}</span>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <Badge variant={user.role === 'admin' ? 'sticker' : 'default'}>{user.role}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={user.status === 'active' ? 'success' : 'default'}>
                        {user.status === 'active' ? t('active') : t('inactive')}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 hidden lg:table-cell">
                      <span className="text-sm text-ink-500">{user.joinedAt}</span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-ink-500">
                      {tCommon('noResults')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
