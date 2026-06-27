"use client";

import { useEffect } from "react";

// ════════════════════════════════════════════════════════════════
// AnalyticsTracker — Track page_view saat halaman undangan dibuka
//
// Cara kerja:
//   1. Generate visitor_id (UUID) & simpan di localStorage
//   2. Saat komponen mount → POST /api/analytics dengan event_type='page_view'
//   3. Hanya track 1x per visitor per 30 menit (anti double-count)
// ════════════════════════════════════════════════════════════════

interface AnalyticsTrackerProps {
  orderId: string;
}

const VISITOR_ID_KEY = "nauka_visitor_id";
const TRACK_WINDOW_KEY = "nauka_track_window"; // 30 menit anti double-count

function getOrCreateVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_ID_KEY);
    if (!id) {
      id = `v-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem(VISITOR_ID_KEY, id);
    }
    return id;
  } catch {
    return `v-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

function shouldTrack(orderId: string): boolean {
  try {
    const key = `${TRACK_WINDOW_KEY}_${orderId}`;
    const lastTrack = localStorage.getItem(key);
    const now = Date.now();
    const WINDOW_MS = 30 * 60 * 1000; // 30 menit

    if (lastTrack && now - parseInt(lastTrack, 10) < WINDOW_MS) {
      return false; // Sudah track dalam 30 menit terakhir, skip
    }
    localStorage.setItem(key, String(now));
    return true;
  } catch {
    return true;
  }
}

export function AnalyticsTracker({ orderId }: AnalyticsTrackerProps) {
  useEffect(() => {
    if (!orderId) return;

    // Cek apakah sudah track dalam 30 menit terakhir
    if (!shouldTrack(orderId)) return;

    const visitorId = getOrCreateVisitorId();

    // POST track event (fire-and-forget, gak perlu tunggu response)
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_id: orderId,
        event_type: "page_view",
        visitor_id: visitorId,
      }),
    }).catch((err) => {
      // Silent fail — tracking gak boleh ganggu UX
      console.warn("[analytics] track error:", err);
    });
  }, [orderId]);

  // Komponen ini tidak render apa-apa (invisible tracker)
  return null;
}
