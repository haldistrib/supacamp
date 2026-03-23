-- Supacamp Initial Migration
-- Generated from Drizzle schema definitions

-- ============================================
-- PROFILES (extends Supabase Auth)
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  avatar_preset TEXT NOT NULL DEFAULT 'default',
  date_of_birth DATE NOT NULL,
  parent_email TEXT,
  parent_consent_given BOOLEAN DEFAULT FALSE,
  parent_consent_date TIMESTAMPTZ,
  parent_pin_hash TEXT,
  locale TEXT NOT NULL DEFAULT 'en',
  region TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_active_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TEAMS
-- ============================================
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  avatar_preset TEXT NOT NULL DEFAULT 'team_default',
  invite_code TEXT UNIQUE NOT NULL,
  created_by UUID REFERENCES profiles(id),
  max_members INT DEFAULT 8,
  total_points INT DEFAULT 0,
  challenges_completed INT DEFAULT 0,
  region TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TEAM MEMBERS
-- ============================================
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member',
  points_contributed INT DEFAULT 0,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT team_members_team_user_unique UNIQUE(team_id, user_id)
);

-- ============================================
-- CHALLENGES (Admin-managed)
-- ============================================
CREATE TABLE IF NOT EXISTS challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard', 'legendary')),
  points_reward INT NOT NULL,
  estimated_duration TEXT,
  required_players_min INT DEFAULT 1,
  required_players_max INT DEFAULT 8,
  age_range_min INT DEFAULT 6,
  age_range_max INT DEFAULT 17,
  is_indoor BOOLEAN DEFAULT FALSE,
  is_outdoor BOOLEAN DEFAULT TRUE,
  equipment TEXT[] DEFAULT '{}',
  video_ai_style TEXT DEFAULT 'default',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'approved', 'archived')),
  approved_by UUID REFERENCES profiles(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CHALLENGE TRANSLATIONS
-- ============================================
CREATE TABLE IF NOT EXISTS challenge_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
  locale TEXT NOT NULL,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  instructions TEXT NOT NULL,
  safety_notes TEXT NOT NULL,
  CONSTRAINT challenge_translations_challenge_locale_unique UNIQUE(challenge_id, locale)
);

-- ============================================
-- CHALLENGE SUBMISSIONS
-- ============================================
CREATE TABLE IF NOT EXISTS challenge_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id UUID NOT NULL REFERENCES challenges(id),
  team_id UUID NOT NULL REFERENCES teams(id),
  submitted_by UUID NOT NULL REFERENCES profiles(id),
  original_video_url TEXT,
  ai_transformed_video_url TEXT,
  moderation_status TEXT DEFAULT 'pending' CHECK (moderation_status IN ('pending', 'scanning', 'approved', 'rejected', 'flagged')),
  moderation_notes TEXT,
  ai_processing_status TEXT DEFAULT 'queued' CHECK (ai_processing_status IN ('queued', 'processing', 'completed', 'failed')),
  points_awarded INT DEFAULT 0,
  visibility TEXT DEFAULT 'team' CHECK (visibility IN ('team', 'public')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ
);

-- ============================================
-- TEAM CHALLENGES (PvP)
-- ============================================
CREATE TABLE IF NOT EXISTS team_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id UUID NOT NULL REFERENCES challenges(id),
  challenger_team_id UUID NOT NULL REFERENCES teams(id),
  challenged_team_id UUID NOT NULL REFERENCES teams(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'in_progress', 'voting', 'completed', 'expired', 'declined')),
  deadline TIMESTAMPTZ,
  winner_team_id UUID REFERENCES teams(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- LEADERBOARD CACHE
-- ============================================
CREATE TABLE IF NOT EXISTS leaderboard_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id),
  leaderboard_type TEXT NOT NULL,
  region TEXT,
  rank INT NOT NULL,
  total_points INT NOT NULL,
  period_start DATE,
  period_end DATE,
  computed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- BLOG POSTS
-- ============================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published', 'archived')),
  published_at TIMESTAMPTZ,
  author_name TEXT DEFAULT 'Supacamp Team',
  featured_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- BLOG POST TRANSLATIONS
-- ============================================
CREATE TABLE IF NOT EXISTS blog_post_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  locale TEXT NOT NULL,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  reading_time_minutes INT,
  target_keyword TEXT,
  secondary_keywords TEXT[],
  og_image_url TEXT,
  CONSTRAINT blog_translations_post_locale_unique UNIQUE(post_id, locale),
  CONSTRAINT blog_translations_locale_slug_unique UNIQUE(locale, slug)
);

-- ============================================
-- ANALYTICS EVENTS (COPPA-compliant, no PII)
-- ============================================
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  page_path TEXT,
  locale TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  device_type TEXT,
  country TEXT,
  session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ADMIN AUDIT LOG
-- ============================================
CREATE TABLE IF NOT EXISTS admin_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID NOT NULL REFERENCES profiles(id),
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  details JSONB,
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- USER ROLES
-- ============================================
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('kid', 'parent', 'moderator', 'admin', 'super_admin')),
  granted_by UUID REFERENCES profiles(id),
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT user_roles_user_role_unique UNIQUE(user_id, role)
);

-- ============================================
-- CONTENT REPORTS
-- ============================================
CREATE TABLE IF NOT EXISTS content_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES profiles(id),
  content_type TEXT NOT NULL CHECK (content_type IN ('video', 'team', 'user')),
  content_id UUID NOT NULL,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'action_taken', 'dismissed')),
  reviewed_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_reports ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES
-- ============================================

-- Profiles: users read own data
CREATE POLICY "profiles_read_own" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Teams: members can read their team
CREATE POLICY "teams_read_member" ON teams
  FOR SELECT USING (
    id IN (SELECT team_id FROM team_members WHERE user_id = auth.uid())
    OR is_active = TRUE
  );

CREATE POLICY "teams_insert_authenticated" ON teams
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "teams_update_captain" ON teams
  FOR UPDATE USING (
    id IN (SELECT team_id FROM team_members WHERE user_id = auth.uid() AND role = 'captain')
  );

-- Team Members: members can read their team's members
CREATE POLICY "team_members_read" ON team_members
  FOR SELECT USING (
    team_id IN (SELECT team_id FROM team_members AS tm WHERE tm.user_id = auth.uid())
  );

CREATE POLICY "team_members_insert" ON team_members
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "team_members_delete_captain" ON team_members
  FOR DELETE USING (
    team_id IN (SELECT team_id FROM team_members AS tm WHERE tm.user_id = auth.uid() AND tm.role = 'captain')
  );

-- Challenges: approved challenges are public
CREATE POLICY "challenges_read_approved" ON challenges
  FOR SELECT USING (status = 'approved');

CREATE POLICY "challenges_admin_manage" ON challenges
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- Challenge Translations: readable if challenge is approved
CREATE POLICY "challenge_translations_read" ON challenge_translations
  FOR SELECT USING (
    challenge_id IN (SELECT id FROM challenges WHERE status = 'approved')
    OR EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- Challenge Submissions: team members can read their team's submissions
CREATE POLICY "submissions_read_team" ON challenge_submissions
  FOR SELECT USING (
    team_id IN (SELECT team_id FROM team_members WHERE user_id = auth.uid())
    OR visibility = 'public'
  );

CREATE POLICY "submissions_insert_team" ON challenge_submissions
  FOR INSERT WITH CHECK (
    team_id IN (SELECT team_id FROM team_members WHERE user_id = auth.uid())
  );

-- Team Challenges: participants can read
CREATE POLICY "team_challenges_read" ON team_challenges
  FOR SELECT USING (
    challenger_team_id IN (SELECT team_id FROM team_members WHERE user_id = auth.uid())
    OR challenged_team_id IN (SELECT team_id FROM team_members WHERE user_id = auth.uid())
  );

-- Leaderboard: public read
CREATE POLICY "leaderboard_read_public" ON leaderboard_cache
  FOR SELECT USING (TRUE);

-- Blog Posts: published posts are public
CREATE POLICY "blog_posts_read_published" ON blog_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "blog_posts_admin_manage" ON blog_posts
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- Blog Post Translations: readable if post is published
CREATE POLICY "blog_translations_read" ON blog_post_translations
  FOR SELECT USING (
    post_id IN (SELECT id FROM blog_posts WHERE status = 'published')
    OR EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- Analytics Events: insert only (no user can read, admin via server)
CREATE POLICY "analytics_insert_anon" ON analytics_events
  FOR INSERT WITH CHECK (TRUE);

-- Admin Audit Log: only admins read
CREATE POLICY "audit_log_admin_read" ON admin_audit_log
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

CREATE POLICY "audit_log_admin_insert" ON admin_audit_log
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- User Roles: users can read own roles, admins can manage
CREATE POLICY "user_roles_read_own" ON user_roles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "user_roles_admin_manage" ON user_roles
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_roles AS ur WHERE ur.user_id = auth.uid() AND ur.role = 'super_admin')
  );

-- Content Reports: authenticated users can create, admins can read
CREATE POLICY "reports_create" ON content_reports
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "reports_admin_read" ON content_reports
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('moderator', 'admin', 'super_admin'))
  );

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_team_members_user ON team_members(user_id);
CREATE INDEX idx_team_members_team ON team_members(team_id);
CREATE INDEX idx_submissions_team ON challenge_submissions(team_id);
CREATE INDEX idx_submissions_challenge ON challenge_submissions(challenge_id);
CREATE INDEX idx_submissions_moderation ON challenge_submissions(moderation_status);
CREATE INDEX idx_leaderboard_type_rank ON leaderboard_cache(leaderboard_type, rank);
CREATE INDEX idx_blog_translations_locale_slug ON blog_post_translations(locale, slug);
CREATE INDEX idx_challenge_translations_locale ON challenge_translations(locale);
CREATE INDEX idx_analytics_events_type ON analytics_events(event_type, created_at);
CREATE INDEX idx_analytics_events_page ON analytics_events(page_path, locale, created_at);
CREATE INDEX idx_user_roles_user ON user_roles(user_id);
CREATE INDEX idx_content_reports_status ON content_reports(status);
CREATE INDEX idx_teams_invite_code ON teams(invite_code);
CREATE INDEX idx_teams_slug ON teams(slug);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER teams_updated_at
  BEFORE UPDATE ON teams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER challenges_updated_at
  BEFORE UPDATE ON challenges
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, display_name, date_of_birth)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', 'Adventurer'),
    COALESCE((NEW.raw_user_meta_data->>'date_of_birth')::DATE, '2010-01-01'::DATE)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- STORAGE BUCKETS
-- ============================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('challenge-videos', 'challenge-videos', FALSE, 104857600, ARRAY['video/mp4', 'video/quicktime', 'video/webm']),
  ('ai-videos', 'ai-videos', FALSE, 104857600, ARRAY['video/mp4', 'video/webm']),
  ('og-images', 'og-images', TRUE, 5242880, ARRAY['image/png', 'image/jpeg', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "challenge_videos_upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'challenge-videos' AND auth.uid() IS NOT NULL
  );

CREATE POLICY "challenge_videos_read_own_team" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'challenge-videos'
    AND auth.uid() IS NOT NULL
  );

CREATE POLICY "ai_videos_read_team" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'ai-videos'
    AND auth.uid() IS NOT NULL
  );

CREATE POLICY "og_images_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'og-images');
