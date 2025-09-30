import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

let currentSessionId: string | null = null;
let currentPageStartTime: number | null = null;
let currentPagePath: string | null = null;

export interface KioskSession {
  id?: string;
  started_at?: string;
  ended_at?: string;
  duration_seconds?: number;
  language: string;
  pages_visited?: number;
  interactions_count?: number;
  ended_by_timeout?: boolean;
}

export interface KioskPageView {
  session_id: string;
  page_path: string;
  page_title: string;
  viewed_at?: string;
  time_on_page_seconds?: number;
}

export interface KioskInteraction {
  session_id: string;
  interaction_type: string;
  element_id?: string;
  element_label?: string;
  page_path: string;
  occurred_at?: string;
  metadata?: Record<string, unknown>;
}

export const kioskAnalytics = {
  async startSession(language: string): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('kiosk_sessions')
        .insert({
          language,
          started_at: new Date().toISOString(),
        })
        .select()
        .maybeSingle();

      if (error) {
        console.error('Error starting kiosk session:', error);
        return null;
      }

      if (data) {
        currentSessionId = data.id;
        return data.id;
      }

      return null;
    } catch (error) {
      console.error('Error starting kiosk session:', error);
      return null;
    }
  },

  async endSession(sessionId: string, endedByTimeout: boolean = false): Promise<void> {
    if (!sessionId) return;

    try {
      if (currentPagePath && currentPageStartTime) {
        await this.endPageView(currentPagePath);
      }

      const startedAtResult = await supabase
        .from('kiosk_sessions')
        .select('started_at, pages_visited, interactions_count')
        .eq('id', sessionId)
        .maybeSingle();

      if (startedAtResult.data) {
        const startedAt = new Date(startedAtResult.data.started_at);
        const endedAt = new Date();
        const durationSeconds = Math.floor((endedAt.getTime() - startedAt.getTime()) / 1000);

        await supabase
          .from('kiosk_sessions')
          .update({
            ended_at: endedAt.toISOString(),
            duration_seconds: durationSeconds,
            ended_by_timeout: endedByTimeout,
          })
          .eq('id', sessionId);
      }

      currentSessionId = null;
      currentPagePath = null;
      currentPageStartTime = null;
    } catch (error) {
      console.error('Error ending kiosk session:', error);
    }
  },

  async trackPageView(pagePath: string, pageTitle: string): Promise<void> {
    if (!currentSessionId) return;

    try {
      if (currentPagePath && currentPageStartTime) {
        await this.endPageView(currentPagePath);
      }

      currentPagePath = pagePath;
      currentPageStartTime = Date.now();

      const { error } = await supabase
        .from('kiosk_page_views')
        .insert({
          session_id: currentSessionId,
          page_path: pagePath,
          page_title: pageTitle,
          viewed_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Error tracking page view:', error);
      }

      await supabase
        .from('kiosk_sessions')
        .update({
          pages_visited: supabase.rpc('increment', { x: 1 }),
        })
        .eq('id', currentSessionId);
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  },

  async endPageView(pagePath: string): Promise<void> {
    if (!currentSessionId || !currentPageStartTime) return;

    try {
      const timeOnPageSeconds = Math.floor((Date.now() - currentPageStartTime) / 1000);

      const { data } = await supabase
        .from('kiosk_page_views')
        .select('id')
        .eq('session_id', currentSessionId)
        .eq('page_path', pagePath)
        .order('viewed_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (data) {
        await supabase
          .from('kiosk_page_views')
          .update({
            time_on_page_seconds: timeOnPageSeconds,
          })
          .eq('id', data.id);
      }
    } catch (error) {
      console.error('Error ending page view:', error);
    }
  },

  async trackInteraction(
    interactionType: string,
    elementLabel: string,
    pagePath: string,
    elementId?: string,
    metadata?: Record<string, unknown>
  ): Promise<void> {
    if (!currentSessionId) return;

    try {
      const { error } = await supabase
        .from('kiosk_interactions')
        .insert({
          session_id: currentSessionId,
          interaction_type: interactionType,
          element_id: elementId,
          element_label: elementLabel,
          page_path: pagePath,
          occurred_at: new Date().toISOString(),
          metadata: metadata || {},
        });

      if (error) {
        console.error('Error tracking interaction:', error);
      }

      await supabase
        .from('kiosk_sessions')
        .update({
          interactions_count: supabase.rpc('increment', { x: 1 }),
        })
        .eq('id', currentSessionId);
    } catch (error) {
      console.error('Error tracking interaction:', error);
    }
  },

  getCurrentSessionId(): string | null {
    return currentSessionId;
  },

  async getAnalyticsSummary(days: number = 30) {
    try {
      const { data, error } = await supabase
        .from('kiosk_analytics_summary')
        .select('*')
        .limit(days);

      if (error) {
        console.error('Error fetching analytics summary:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching analytics summary:', error);
      return null;
    }
  },

  async getPopularPages() {
    try {
      const { data, error } = await supabase
        .from('kiosk_popular_pages')
        .select('*');

      if (error) {
        console.error('Error fetching popular pages:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching popular pages:', error);
      return null;
    }
  },
};