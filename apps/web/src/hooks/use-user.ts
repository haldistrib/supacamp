'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from './use-auth';

interface UserProfile {
  id: string;
  displayName: string;
  avatarPreset: string;
  dateOfBirth: string;
  parentEmail: string | null;
  parentConsentGiven: boolean | null;
  locale: string;
  region: string | null;
  isActive: boolean | null;
  createdAt: string | null;
  updatedAt: string | null;
  lastActiveAt: string | null;
}

interface UseUserState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useUser(): UseUserState {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchProfile() {
    if (!user) {
      setProfile(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (fetchError) {
        setError(fetchError.message);
        setProfile(null);
      } else {
        setProfile({
          id: data.id,
          displayName: data.display_name,
          avatarPreset: data.avatar_preset,
          dateOfBirth: data.date_of_birth,
          parentEmail: data.parent_email,
          parentConsentGiven: data.parent_consent_given,
          locale: data.locale,
          region: data.region,
          isActive: data.is_active,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
          lastActiveAt: data.last_active_at,
        });
      }
    } catch {
      setError('Failed to fetch profile');
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return { profile, isLoading, error, refetch: fetchProfile };
}
