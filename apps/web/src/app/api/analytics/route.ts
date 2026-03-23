import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/supabase/drizzle';
import { analyticsEvents } from '@/db/schema';
import { locales, type Locale } from '@/lib/i18n/config';

interface AnalyticsEventPayload {
  eventType: string;
  pagePath: string;
  locale: string;
  referrer: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  deviceType: string;
  country: string | null;
  sessionId: string;
}

const VALID_EVENT_TYPES = ['page_view', 'click', 'scroll', 'form_submit', 'video_play', 'share'];
const VALID_DEVICE_TYPES = ['mobile', 'tablet', 'desktop'];
const MAX_STRING_LENGTH = 2048;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidStringOrNull(value: unknown): value is string | null {
  return value === null || (typeof value === 'string' && value.length <= MAX_STRING_LENGTH);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AnalyticsEventPayload;

    // Validate required fields
    if (!isNonEmptyString(body.eventType)) {
      return NextResponse.json({ error: 'eventType is required' }, { status: 400 });
    }

    if (!VALID_EVENT_TYPES.includes(body.eventType)) {
      return NextResponse.json({ error: 'Invalid eventType' }, { status: 400 });
    }

    if (!isNonEmptyString(body.pagePath)) {
      return NextResponse.json({ error: 'pagePath is required' }, { status: 400 });
    }

    if (!isNonEmptyString(body.sessionId)) {
      return NextResponse.json({ error: 'sessionId is required' }, { status: 400 });
    }

    if (body.locale && !locales.includes(body.locale as Locale)) {
      return NextResponse.json({ error: 'Invalid locale' }, { status: 400 });
    }

    if (body.deviceType && !VALID_DEVICE_TYPES.includes(body.deviceType)) {
      return NextResponse.json({ error: 'Invalid deviceType' }, { status: 400 });
    }

    // Validate optional string fields
    if (!isValidStringOrNull(body.referrer)) {
      return NextResponse.json({ error: 'Invalid referrer' }, { status: 400 });
    }
    if (!isValidStringOrNull(body.utmSource)) {
      return NextResponse.json({ error: 'Invalid utmSource' }, { status: 400 });
    }
    if (!isValidStringOrNull(body.utmMedium)) {
      return NextResponse.json({ error: 'Invalid utmMedium' }, { status: 400 });
    }
    if (!isValidStringOrNull(body.utmCampaign)) {
      return NextResponse.json({ error: 'Invalid utmCampaign' }, { status: 400 });
    }

    await db.insert(analyticsEvents).values({
      eventType: body.eventType,
      pagePath: body.pagePath,
      locale: body.locale || null,
      referrer: body.referrer || null,
      utmSource: body.utmSource || null,
      utmMedium: body.utmMedium || null,
      utmCampaign: body.utmCampaign || null,
      deviceType: body.deviceType || null,
      country: body.country || null,
      sessionId: body.sessionId,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Analytics event error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
