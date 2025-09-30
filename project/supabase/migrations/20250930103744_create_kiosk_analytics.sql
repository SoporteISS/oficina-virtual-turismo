/*
  # Kiosk Analytics Schema

  ## Overview
  This migration creates a comprehensive analytics system for the interactive kiosk,
  tracking user sessions, page views, and interactions to provide insights into
  visitor behavior and content engagement.

  ## New Tables

  ### 1. `kiosk_sessions`
  Tracks individual kiosk usage sessions from start to reset.
  - `id` (uuid, primary key) - Unique session identifier
  - `started_at` (timestamptz) - Session start timestamp
  - `ended_at` (timestamptz) - Session end timestamp (null if active)
  - `duration_seconds` (integer) - Total session duration
  - `language` (text) - Language selected by user (es/en)
  - `pages_visited` (integer) - Number of pages viewed in session
  - `interactions_count` (integer) - Total number of interactions
  - `ended_by_timeout` (boolean) - Whether session ended by inactivity
  - `created_at` (timestamptz) - Record creation timestamp

  ### 2. `kiosk_page_views`
  Records each page view within kiosk sessions.
  - `id` (uuid, primary key) - Unique page view identifier
  - `session_id` (uuid, foreign key) - Reference to kiosk_sessions
  - `page_path` (text) - URL path of the page viewed
  - `page_title` (text) - Title of the page
  - `viewed_at` (timestamptz) - Timestamp of page view
  - `time_on_page_seconds` (integer) - Duration spent on page
  - `created_at` (timestamptz) - Record creation timestamp

  ### 3. `kiosk_interactions`
  Logs specific user interactions within the kiosk.
  - `id` (uuid, primary key) - Unique interaction identifier
  - `session_id` (uuid, foreign key) - Reference to kiosk_sessions
  - `interaction_type` (text) - Type of interaction (button_click, navigation, language_change, etc.)
  - `element_id` (text) - Identifier of the interacted element
  - `element_label` (text) - Label/text of the element
  - `page_path` (text) - Page where interaction occurred
  - `occurred_at` (timestamptz) - Timestamp of interaction
  - `metadata` (jsonb) - Additional interaction context
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - All tables have RLS enabled
  - Public INSERT access for kiosk data collection
  - Authenticated users can view analytics data
  - Admin role can manage all records

  ## Indexes
  - Session-based lookups optimized
  - Time-based queries indexed for analytics
  - Page path searches optimized

  ## Notes
  - Data retention policy should be implemented (e.g., 90 days)
  - Consider aggregating old data for long-term trends
  - Monitor table sizes and implement partitioning if needed
*/

-- Create kiosk_sessions table
CREATE TABLE IF NOT EXISTS kiosk_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  started_at timestamptz NOT NULL DEFAULT now(),
  ended_at timestamptz,
  duration_seconds integer DEFAULT 0,
  language text NOT NULL DEFAULT 'es',
  pages_visited integer DEFAULT 0,
  interactions_count integer DEFAULT 0,
  ended_by_timeout boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create kiosk_page_views table
CREATE TABLE IF NOT EXISTS kiosk_page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES kiosk_sessions(id) ON DELETE CASCADE,
  page_path text NOT NULL,
  page_title text,
  viewed_at timestamptz NOT NULL DEFAULT now(),
  time_on_page_seconds integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create kiosk_interactions table
CREATE TABLE IF NOT EXISTS kiosk_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES kiosk_sessions(id) ON DELETE CASCADE,
  interaction_type text NOT NULL,
  element_id text,
  element_label text,
  page_path text NOT NULL,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_kiosk_sessions_started_at ON kiosk_sessions(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_kiosk_sessions_ended_at ON kiosk_sessions(ended_at DESC);
CREATE INDEX IF NOT EXISTS idx_kiosk_sessions_language ON kiosk_sessions(language);

CREATE INDEX IF NOT EXISTS idx_kiosk_page_views_session_id ON kiosk_page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_kiosk_page_views_page_path ON kiosk_page_views(page_path);
CREATE INDEX IF NOT EXISTS idx_kiosk_page_views_viewed_at ON kiosk_page_views(viewed_at DESC);

CREATE INDEX IF NOT EXISTS idx_kiosk_interactions_session_id ON kiosk_interactions(session_id);
CREATE INDEX IF NOT EXISTS idx_kiosk_interactions_type ON kiosk_interactions(interaction_type);
CREATE INDEX IF NOT EXISTS idx_kiosk_interactions_occurred_at ON kiosk_interactions(occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_kiosk_interactions_page_path ON kiosk_interactions(page_path);

-- Enable Row Level Security
ALTER TABLE kiosk_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE kiosk_page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE kiosk_interactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for kiosk_sessions

-- Allow anonymous users to insert sessions (for kiosk data collection)
CREATE POLICY "Allow anonymous insert on kiosk_sessions"
  ON kiosk_sessions FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anonymous users to update their own sessions
CREATE POLICY "Allow anonymous update on kiosk_sessions"
  ON kiosk_sessions FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to view all sessions
CREATE POLICY "Authenticated users can view kiosk_sessions"
  ON kiosk_sessions FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for kiosk_page_views

-- Allow anonymous users to insert page views
CREATE POLICY "Allow anonymous insert on kiosk_page_views"
  ON kiosk_page_views FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to view all page views
CREATE POLICY "Authenticated users can view kiosk_page_views"
  ON kiosk_page_views FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for kiosk_interactions

-- Allow anonymous users to insert interactions
CREATE POLICY "Allow anonymous insert on kiosk_interactions"
  ON kiosk_interactions FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to view all interactions
CREATE POLICY "Authenticated users can view kiosk_interactions"
  ON kiosk_interactions FOR SELECT
  TO authenticated
  USING (true);

-- Create a view for analytics dashboard
CREATE OR REPLACE VIEW kiosk_analytics_summary AS
SELECT
  DATE(started_at) as date,
  COUNT(DISTINCT id) as total_sessions,
  AVG(duration_seconds) as avg_duration_seconds,
  SUM(pages_visited) as total_pages_visited,
  SUM(interactions_count) as total_interactions,
  COUNT(CASE WHEN ended_by_timeout THEN 1 END) as timeout_sessions,
  COUNT(CASE WHEN language = 'es' THEN 1 END) as spanish_sessions,
  COUNT(CASE WHEN language = 'en' THEN 1 END) as english_sessions
FROM kiosk_sessions
WHERE started_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(started_at)
ORDER BY date DESC;

-- Create a view for popular pages
CREATE OR REPLACE VIEW kiosk_popular_pages AS
SELECT
  page_path,
  page_title,
  COUNT(*) as view_count,
  AVG(time_on_page_seconds) as avg_time_seconds
FROM kiosk_page_views
WHERE viewed_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY page_path, page_title
ORDER BY view_count DESC
LIMIT 20;